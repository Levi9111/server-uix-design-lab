import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

import { USER_ROLE } from './auth.interface';
import { AuthControllers } from './auth.controller';

import * as V from './auth.validation';
import config from '../../config';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

// ─── Passport: Google Strategy ────────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id as string,
      clientSecret: config.google_client_secret as string,
      callbackURL: `${config.server_url}/api/v1/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email from Google'), false);

        // Pass a normalized profile — service handles find-or-create
        done(null, {
          provider: 'google' as const,
          providerId: profile.id,
          name: profile.displayName,
          email,
          profilePhoto: profile.photos?.[0]?.value,
          accessToken: _accessToken,
        });
      } catch (err: any) {
        done(err, false);
      }
    },
  ),
);

// ─── Passport: GitHub Strategy ────────────────────────────────────────────────
passport.use(
  new GitHubStrategy(
    {
      clientID: config.github_client_id as string,
      clientSecret: config.github_client_secret as string,
      callbackURL: `${config.server_url}/api/v1/auth/github/callback`,
      scope: ['user:email'],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: any,
    ) => {
      try {
        const email =
          profile.emails?.find((e: any) => e.primary)?.value ||
          profile.emails?.[0]?.value;

        if (!email) return done(new Error('No email from GitHub'), false);

        done(null, {
          provider: 'github' as const,
          providerId: profile.id,
          name: profile.displayName || profile.username,
          email,
          profilePhoto: profile.photos?.[0]?.value,
          accessToken: _accessToken,
        });
      } catch (err: any) {
        done(err, false);
      }
    },
  ),
);

// Minimal session serialization (we use JWT, not sessions)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post(
  '/register',
  validateRequest(V.registerValidationSchema),
  AuthControllers.register,
);

router.post(
  '/login',
  validateRequest(V.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/refresh-token',
  validateRequest(V.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forgot-password',
  validateRequest(V.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(V.resetPasswordValidationSchema),
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
    failureRedirect: '/login',
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
    failureRedirect: '/login',
  }),
  AuthControllers.oauthCallback,
);

// ─── Protected Routes (any authenticated user) ────────────────────────────────
router.get('/me', auth(), AuthControllers.getMe);

router.post('/logout', auth(), AuthControllers.logout);

router.post(
  '/change-password',
  auth(),
  validateRequest(V.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// ─── RBAC: Admin-only Routes ──────────────────────────────────────────────────
router.patch(
  '/users/:userId/role',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(V.updateRoleValidationSchema),
  AuthControllers.updateUserRole,
);

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  AuthControllers.blockUser,
);

router.patch(
  '/users/:userId/unblock',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  AuthControllers.unblockUser,
);

export const AuthRoute = router;
