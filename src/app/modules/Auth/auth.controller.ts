import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AuthServices } from './auth.service';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// ─── Cookie Options ───────────────────────────────────────────────────────────
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ─── Register ─────────────────────────────────────────────────────────────────
const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerIntoDB(req.body);

  res.cookie(
    'refreshToken',
    result.tokens.refreshToken,
    REFRESH_COOKIE_OPTIONS,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Registered successfully',
    data: {
      user: result.user,
      accessToken: result.tokens.accessToken,
    },
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginFromDB(req.body);

  res.cookie(
    'refreshToken',
    result.tokens.refreshToken,
    REFRESH_COOKIE_OPTIONS,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: {
      user: result.user,
      accessToken: result.tokens.accessToken,
    },
  });
});

// ─── Refresh Token ────────────────────────────────────────────────────────────
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const incomingToken = req.cookies?.refreshToken;
  const result = await AuthServices.refreshTokens(incomingToken);

  res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed successfully',
    data: { accessToken: result.accessToken },
  });
});

// ─── Logout ───────────────────────────────────────────────────────────────────
const logout = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.logout(req.user!.userId);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully',
  });
});

// ─── Change Password ──────────────────────────────────────────────────────────
const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.changePasswordIntoDB(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
});

// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'If that email exists, a reset link has been sent',
  });
});

// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.resetPasswordIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
  });
});

// ─── OAuth Callback ───────────────────────────────────────────────────────────
const oauthCallback = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.findOrCreateOAuthUser(req.user as any);

  res.cookie('refreshToken', result.tokens.refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    sameSite: 'lax',
  });

  res.cookie('accessToken', result.tokens.accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  res.redirect(`${config.client_url}/oauth/callback`);
});

// ─── Get Me ───────────────────────────────────────────────────────────────────
const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getMeFromDB(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

// ─── Update Role ──────────────────────────────────────────────────────────────
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.updateUserRoleIntoDB(req.params.userId, req.body.role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
  });
});

// ─── Block User ───────────────────────────────────────────────────────────────
const blockUser = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.toggleBlockUserIntoDB(req.params.userId, true);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

// ─── Unblock User ─────────────────────────────────────────────────────────────
const unblockUser = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.toggleBlockUserIntoDB(req.params.userId, false);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unblocked successfully',
  });
});

export const AuthControllers = {
  register,
  login,
  refreshToken,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  oauthCallback,
  getMe,
  updateUserRole,
  blockUser,
  unblockUser,
};
