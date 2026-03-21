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
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

// ─── Register ─────────────────────────────────────────────────────────────────
const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

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
  const result = await AuthServices.login(req.body);

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

  // Rotate the cookie
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
    data: null,
  });
});

// ─── Change Password ──────────────────────────────────────────────────────────
const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.changePassword(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: null,
  });
});

// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'If that email exists, a reset link has been sent',
    data: null,
  });
});

// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.resetPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: null,
  });
});

// ─── OAuth Callback Handler (called after Passport strategy) ─────────────────
const oauthCallback = catchAsync(async (req: Request, res: Response) => {
  // req.user is populated by Passport after successful OAuth
  const result = await AuthServices.findOrCreateOAuthUser(req.user as any);

  res.cookie(
    'refreshToken',
    result.tokens.refreshToken,
    REFRESH_COOKIE_OPTIONS,
  );

  // Redirect to client with access token as query param (or use a code exchange)
  const redirectUrl = new URL(`${config.client_url}/oauth/callback`);
  redirectUrl.searchParams.set('accessToken', result.tokens.accessToken);
  res.redirect(redirectUrl.toString());
});

// ─── RBAC: Update Role ────────────────────────────────────────────────────────
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.updateUserRole(req.params.userId, req.body.role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: null,
  });
});

// ─── RBAC: Block / Unblock ────────────────────────────────────────────────────
const blockUser = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.toggleBlockUser(req.params.userId, true);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: null,
  });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.toggleBlockUser(req.params.userId, false);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unblocked successfully',
    data: null,
  });
});

// ─── Get Me ───────────────────────────────────────────────────────────────────
const getMe = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: req.user,
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
  updateUserRole,
  blockUser,
  unblockUser,
  getMe,
};
