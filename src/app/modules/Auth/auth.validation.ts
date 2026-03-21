import { z } from 'zod';
import { USER_ROLE } from './auth.interface';

// ─── Reusable Field Schemas ───────────────────────────────────────────────────
const emailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email address')
  .toLowerCase()
  .trim();

const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must not exceed 64 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    'Password must contain uppercase, lowercase, number, and special character',
  );

// ─── Register ─────────────────────────────────────────────────────────────────
const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name must not exceed 60 characters')
      .trim(),
    email: emailSchema,
    password: passwordSchema,
    role: z
      .enum(Object.values(USER_ROLE) as [string, ...string[]])
      .optional()
      .default(USER_ROLE.user),
  }),
});

// ─── Login ────────────────────────────────────────────────────────────────────
const loginValidationSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// ─── Refresh Token ────────────────────────────────────────────────────────────
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

// ─── Change Password ──────────────────────────────────────────────────────────
const changePasswordValidationSchema = z.object({
  body: z
    .object({
      oldPassword: z.string({ required_error: 'Old password is required' }),
      newPassword: passwordSchema,
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: 'New password must differ from old password',
      path: ['newPassword'],
    }),
});

// ─── Forgot Password ──────────────────────────────────────────────────────────
const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

// ─── Reset Password ───────────────────────────────────────────────────────────
const resetPasswordValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: 'Token is required' }),
    newPassword: passwordSchema,
  }),
});

// ─── Update Role ──────────────────────────────────────────────────────────────
const updateRoleValidationSchema = z.object({
  params: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
  }),
  body: z.object({
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]], {
      required_error: 'Role is required',
    }),
  }),
});

export const authValidations = {
  registerValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  updateRoleValidationSchema,
};
