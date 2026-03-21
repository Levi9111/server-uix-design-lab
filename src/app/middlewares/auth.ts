import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { IJwtPayload, TUserRole } from '../modules/Auth/auth.interface';
import User from '../modules/Auth/auth.model';

// ─── Extend Express Request ───────────────────────────────────────────────────

// ─── Auth Guard ───────────────────────────────────────────────────────────────
/**
 * Verifies JWT access token from Authorization header.
 * Optionally enforces role-based access control when roles are passed.
 *
 * Usage:
 *   auth()                          → any authenticated user
 *   auth('admin', 'superAdmin')     → only admin or superAdmin
 */
const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    // ── 1. Extract token ─────────────────────────────────────────────────────
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'No token provided. Access denied.',
      );
    }

    const token = authHeader.split(' ')[1];

    // ── 2. Verify & decode ───────────────────────────────────────────────────
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Access token expired');
      }
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid access token');
    }

    const { userId, email, role, iat } = decoded;

    // ── 3. Verify user still exists & is active ──────────────────────────────
    const user = await User.findById(userId).select('+passwordChangedAt');
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User no longer exists');
    }

    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
    }

    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'Account has been blocked');
    }

    // ── 4. Check token wasn't issued before a password change ────────────────
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Password was recently changed. Please log in again.',
      );
    }

    // ── 5. RBAC check ────────────────────────────────────────────────────────
    if (
      requiredRoles.length > 0 &&
      !requiredRoles.includes(role as TUserRole)
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Access denied. Required role(s): ${requiredRoles.join(', ')}`,
      );
    }

    // ── 6. Attach decoded user to request ────────────────────────────────────
    req.user = { userId, email, role: role as TUserRole };
    next();
  });

export default auth;
