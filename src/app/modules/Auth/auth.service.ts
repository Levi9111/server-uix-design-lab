import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';

import {
  IAuthTokens,
  IChangePasswordBody,
  IForgotPasswordBody,
  IJwtPayload,
  ILoginBody,
  ILoginResult,
  IRegisterBody,
  IResetPasswordBody,
  IOAuthProfile,
} from './auth.interface';
import User from './auth.model';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/sendEmail';

// ─── Token Helpers ────────────────────────────────────────────────────────────

/** Sign a short-lived access token */
const signAccessToken = (payload: IJwtPayload): string => {
  const options = {
    expiresIn: config.jwt_access_expires_in as StringValue,
  };
  return jwt.sign(payload, config.jwt_access_secret as string, options);
};

/** Sign a long-lived refresh token */
const signRefreshToken = (payload: IJwtPayload): string => {
  const options = {
    expiresIn: config.jwt_refresh_expires_in as StringValue,
  };
  return jwt.sign(payload, config.jwt_refresh_secret as string, options);
};

/** Hash a refresh token before storing in DB (treat like a password) */
const hashToken = (token: string): string =>
  crypto.createHash('sha256').update(token).digest('hex');

/** Issue both tokens and persist the hashed refresh token */
const issueTokens = async (payload: IJwtPayload): Promise<IAuthTokens> => {
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Store hashed refresh token – enables single-use rotation & invalidation
  await User.findByIdAndUpdate(payload.userId, {
    refreshToken: hashToken(refreshToken),
  });

  return { accessToken, refreshToken };
};

// ─── Register ─────────────────────────────────────────────────────────────────
const register = async (payload: IRegisterBody): Promise<ILoginResult> => {
  const existing = await User.isUserExistsByEmail(payload.email);
  if (existing) {
    throw new AppError(httpStatus.CONFLICT, 'Email already registered');
  }

  const user = await User.create(payload);

  const jwtPayload: IJwtPayload = {
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
const login = async (payload: ILoginBody): Promise<ILoginResult> => {
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

  const jwtPayload: IJwtPayload = {
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
): Promise<IAuthTokens> => {
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

  // ── Rotation check: incoming token must match the stored hash ────────────
  const incomingHash = hashToken(incomingRefreshToken);
  if (user.refreshToken !== incomingHash) {
    // Possible token reuse — invalidate all sessions (security measure)
    await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Refresh token reuse detected. Please log in again.',
    );
  }

  // ── Password changed after token issued? ─────────────────────────────────
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

  const jwtPayload: IJwtPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role,
  };

  // Issue brand-new token pair (rotation)
  return issueTokens(jwtPayload);
};

// ─── Logout ───────────────────────────────────────────────────────────────────
const logout = async (userId: string): Promise<void> => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// ─── Change Password ──────────────────────────────────────────────────────────
const changePassword = async (
  userId: string,
  payload: IChangePasswordBody,
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
  await user.save(); // triggers pre-save hash + passwordChangedAt
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = async (payload: IForgotPasswordBody): Promise<void> => {
  const user = await User.isUserExistsByEmail(payload.email);

  // Always respond OK to prevent email enumeration
  if (!user || user.isDeleted || user.isBlocked) return;

  // Create a signed, short-lived reset token (10 min)
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
const resetPassword = async (payload: IResetPasswordBody): Promise<void> => {
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

  // Invalidate all existing sessions on password reset
  await User.findByIdAndUpdate(decoded.userId, { refreshToken: null });
};

// ─── OAuth: Find or Create ────────────────────────────────────────────────────
const findOrCreateOAuthUser = async (
  profile: IOAuthProfile & {
    name: string;
    email: string;
    profilePhoto?: string;
  },
): Promise<ILoginResult> => {
  let user = await User.findOne({
    oauthProfiles: {
      $elemMatch: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
    },
  });

  if (!user) {
    // Try to link to existing account with same email
    user = await User.findOne({ email: profile.email });

    if (user) {
      // Link new OAuth provider to existing account
      user.oauthProfiles.push({
        provider: profile.provider,
        providerId: profile.providerId,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
      });
      await user.save();
    } else {
      // Create brand-new user
      user = await User.create({
        name: profile.name,
        email: profile.email,
        profilePhoto: profile.profilePhoto,
        isVerified: true, // OAuth users are pre-verified
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

  const jwtPayload: IJwtPayload = {
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

// ─── RBAC: Update User Role ───────────────────────────────────────────────────
const updateUserRole = async (
  userId: string,
  newRole: string,
): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  if (user.role === 'superAdmin')
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot modify superAdmin role');

  await User.findByIdAndUpdate(userId, { role: newRole });
};

// ─── RBAC: Block / Unblock User ───────────────────────────────────────────────
const toggleBlockUser = async (
  userId: string,
  block: boolean,
): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  if (user.role === 'superAdmin')
    throw new AppError(httpStatus.FORBIDDEN, 'Cannot block superAdmin');

  await User.findByIdAndUpdate(userId, { isBlocked: block });
};

export const AuthServices = {
  register,
  login,
  refreshTokens,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  findOrCreateOAuthUser,
  updateUserRole,
  toggleBlockUser,
};
