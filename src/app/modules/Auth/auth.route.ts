import { Router } from 'express';
import passport from 'passport';

import { USER_ROLE } from './auth.interface';
import { AuthControllers } from './auth.controller';
import { authValidations } from './auth.validation';
import config from '../../config';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = Router();

// ─── Callback URLs ────────────────────────────────────────────────────────────
// Single source of truth — must match Google/GitHub Console exactly
export const GOOGLE_CALLBACK_URL = `${config.server_url}/api/v1/auth/google/callback`;
export const GITHUB_CALLBACK_URL = `${config.server_url}/api/v1/auth/github/callback`;

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post(
  '/register',
  validateRequest(authValidations.registerValidationSchema),
  AuthControllers.register,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forgot-password',
  validateRequest(authValidations.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

// ─── OAuth: Google ────────────────────────────────────────────────────────────
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${config.client_url}/login`,
  }),
  AuthControllers.oauthCallback,
);

// ─── OAuth: GitHub ────────────────────────────────────────────────────────────
router.get(
  '/github',
  passport.authenticate('github', { session: false, scope: ['user:email'] }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    session: false,
    failureRedirect: `${config.client_url}/login`,
  }),
  AuthControllers.oauthCallback,
);

// ─── Protected Routes ─────────────────────────────────────────────────────────
router.get('/me', auth(), AuthControllers.getMe);

router.post('/logout', auth(), AuthControllers.logout);

router.post(
  '/change-password',
  auth(),
  validateRequest(authValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
router.patch(
  '/update-role/:userId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(authValidations.updateRoleValidationSchema),
  AuthControllers.updateUserRole,
);

router.patch(
  '/block-user/:userId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  AuthControllers.blockUser,
);

router.patch(
  '/unblock-user/:userId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  AuthControllers.unblockUser,
);

export const AuthRoute = router;
