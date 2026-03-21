import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import config from '../config';
import {
  GOOGLE_CALLBACK_URL,
  GITHUB_CALLBACK_URL,
} from '../modules/Auth/auth.route';

export const initPassport = () => {
  // ─── Google Strategy ──────────────────────────────────────────────────────
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google_client_id as string,
        clientSecret: config.google_client_secret as string,
        callbackURL: GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) return done(new Error('No email from Google'), false);

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

  // ─── GitHub Strategy ──────────────────────────────────────────────────────
  passport.use(
    new GitHubStrategy(
      {
        clientID: config.github_client_id as string,
        clientSecret: config.github_client_secret as string,
        callbackURL: GITHUB_CALLBACK_URL,
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

  // Stateless — no session serialization needed (JWT handles auth)
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));
};
