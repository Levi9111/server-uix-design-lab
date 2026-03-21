import { Document, Model } from 'mongoose';

// ─── Roles ────────────────────────────────────────────────────────────────────
export type TUserRole = 'superAdmin' | 'admin' | 'user';

export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  user: 'user',
} as const;

// ─── OAuth ────────────────────────────────────────────────────────────────────
export type TOAuthProvider = 'google' | 'github' | 'local';

export type TOAuthProfile = {
  provider: TOAuthProvider;
  providerId: string;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
};

export type TOAuthCallbackUser = {
  provider: TOAuthProvider;
  providerId: string;
  name: string;
  email: string;
  profilePhoto?: string | undefined;
  accessToken?: string;
};

// ─── User ─────────────────────────────────────────────────────────────────────
export type TUser = {
  name: string;
  email: string;
  password?: string;
  role: TUserRole;
  profilePhoto?: string | undefined;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  oauthProfiles: TOAuthProfile[];
  passwordChangedAt?: Date;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// ─── Statics ──────────────────────────────────────────────────────────────────
export interface IUserModel extends Model<TUser & Document> {
  isUserExistsByEmail(email: string): Promise<(TUser & Document) | null>;
  isPasswordMatched(plain: string, hashed: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number,
  ): boolean;
}

// ─── JWT ──────────────────────────────────────────────────────────────────────
export type TJwtPayload = {
  userId: string;
  email: string;
  role: TUserRole;
};

// ─── Request Bodies ───────────────────────────────────────────────────────────
export type TRegisterBody = {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
};

export type TLoginBody = {
  email: string;
  password: string;
};

export type TChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

export type TForgotPasswordBody = {
  email: string;
};

export type TResetPasswordBody = {
  token: string;
  newPassword: string;
};

// ─── Return Types ─────────────────────────────────────────────────────────────
export type TAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TLoginResult = {
  user: Partial<TUser>;
  tokens: TAuthTokens;
};
