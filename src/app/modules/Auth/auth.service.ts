import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import httpStatus from 'http-status';

import {
  TAuthTokens,
  TChangePasswordBody,
  TForgotPasswordBody,
  TJwtPayload,
  TLoginBody,
  TLoginResult,
  TRegisterBody,
  TResetPasswordBody,
  TOAuthProfile,
  TUserRole,
} from './auth.interface';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';

// ─── Token Helpers ────────────────────────────────────────────────────────────
const signAccessToken = (payload: TJwtPayload): string =>
  jwt.sign(payload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as StringValue,
  });

const signRefreshToken = (payload: TJwtPayload): string =>
  jwt.sign(payload, config.jwt_refresh_secret as string, {
    expiresIn: config.jwt_refresh_expires_in as StringValue,
  });

const hashToken = (token: string): string =>
  crypto.createHash('sha256').update(token).digest('hex');

const issueTokens = async (payload: TJwtPayload): Promise<TAuthTokens> => {
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await User.findByIdAndUpdate(payload.userId, {
    refreshToken: hashToken(refreshToken),
  });

  return { accessToken, refreshToken };
};

// ─── Register ─────────────────────────────────────────────────────────────────
const registerIntoDB = async (
  payload: TRegisterBody,
): Promise<TLoginResult> => {
  const existing = await User.isUserExistsByEmail(payload.email);

  if (existing)
    throw new AppError(httpStatus.CONFLICT, 'Email already registered');

  const user = await User.create(payload);

  const jwtPayload: TJwtPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  const tokens = await issueTokens(jwtPayload);

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      isVerified: user.isVerified,
    },
    tokens,
  };
};

// ─── Login ────────────────────────────────────────────────────────────────────
const loginFromDB = async (payload: TLoginBody): Promise<TLoginResult> => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  if (user.isDeleted)
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');

  if (user.isBlocked)
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been blocked');

  if (!user.password)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This account uses OAuth. Please sign in with your provider.',
    );

  const isMatch = await User.isPasswordMatched(payload.password, user.password);

  if (!isMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  const jwtPayload: TJwtPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  const tokens = await issueTokens(jwtPayload);

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      isVerified: user.isVerified,
    },
    tokens,
  };
};

// ─── Refresh Token Rotation ───────────────────────────────────────────────────
const refreshTokens = async (
  incomingRefreshToken: string,
): Promise<TAuthTokens> => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  } catch {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid or expired refresh token',
    );
  }

  const user = await User.findById(decoded.userId).select(
    '+refreshToken +password',
  );

  if (!user) throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');

  if (user.isBlocked || user.isDeleted)
    throw new AppError(httpStatus.FORBIDDEN, 'Account is inactive');

  const incomingHash = hashToken(incomingRefreshToken);

  if (user.refreshToken !== incomingHash) {
    await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Refresh token reuse detected. Please log in again.',
    );
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      decoded.iat as number,
    )
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Password changed. Please log in again.',
    );
  }

  const jwtPayload: TJwtPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  return issueTokens(jwtPayload);
};

// ─── Logout ───────────────────────────────────────────────────────────────────
const logout = async (userId: string): Promise<void> => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// ─── Change Password ──────────────────────────────────────────────────────────
const changePasswordIntoDB = async (
  userId: string,
  payload: TChangePasswordBody,
): Promise<void> => {
  const user = await User.findById(userId).select('+password');

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (!user.password)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'OAuth accounts cannot change password here',
    );

  const isMatch = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );

  if (!isMatch)
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');

  user.password = payload.newPassword;
  await user.save();

  // Invalidate all sessions after password change
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = async (payload: TForgotPasswordBody): Promise<void> => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user || user.isDeleted || user.isBlocked) return;

  const resetToken = jwt.sign(
    { userId: String(user._id), email: user.email },
    config.jwt_reset_secret as string,
    { expiresIn: '10m' },
  );

  const resetUrl = `${config.client_url}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <h2>Reset Your Password</h2>
      <p>This link expires in <strong>10 minutes</strong>.</p>
      <a href="${resetUrl}" style="padding:10px 20px;background:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;">
        Reset Password
      </a>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPasswordIntoDB = async (
  payload: TResetPasswordBody,
): Promise<void> => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      payload.token,
      config.jwt_reset_secret as string,
    ) as JwtPayload;
  } catch {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid or expired reset token',
    );
  }

  const user = await User.findById(decoded.userId).select('+password');

  if (!user || user.isDeleted || user.isBlocked)
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  user.password = payload.newPassword;
  await user.save();

  await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
};

// ─── OAuth: Find or Create ────────────────────────────────────────────────────
const findOrCreateOAuthUser = async (
  profile: TOAuthProfile & {
    name: string;
    email: string;
    profilePhoto?: string;
  },
): Promise<TLoginResult> => {
  let user = await User.findOne({
    oauthProfiles: {
      $elemMatch: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
    },
  });

  if (!user) {
    user = await User.findOne({ email: profile.email });

    if (user) {
      user.oauthProfiles.push({
        provider: profile.provider,
        providerId: profile.providerId,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      });
      await user.save();
    } else {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        profilePhoto: profile.profilePhoto,
        isVerified: true,
        oauthProfiles: [
          {
            provider: profile.provider,
            providerId: profile.providerId,
            accessToken: profile.accessToken,
            refreshToken: profile.refreshToken,
          },
        ],
      });
    }
  }

  const jwtPayload: TJwtPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  const tokens = await issueTokens(jwtPayload);

  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      isVerified: user.isVerified,
    },
    tokens,
  };
};

// ─── RBAC: Update Role ────────────────────────────────────────────────────────
const updateUserRoleIntoDB = async (
  userId: string,
  newRole: TUserRole,
): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (user.role === 'superAdmin')
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot modify superAdmin role');

  user.role = newRole;
  await user.save();
};

// ─── RBAC: Block / Unblock ────────────────────────────────────────────────────
const toggleBlockUserIntoDB = async (
  userId: string,
  block: boolean,
): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  if (user.role === 'superAdmin')
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot block superAdmin');

  user.isBlocked = block;
  await user.save();
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
const getMeFromDB = async (userId: string) => {
  const result = await User.findById(userId);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

  return result;
};

export const AuthServices = {
  registerIntoDB,
  loginFromDB,
  refreshTokens,
  logout,
  changePasswordIntoDB,
  forgotPassword,
  resetPasswordIntoDB,
  findOrCreateOAuthUser,
  updateUserRoleIntoDB,
  toggleBlockUserIntoDB,
  getMeFromDB,
};
