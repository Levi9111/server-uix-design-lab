import { Document, Model } from 'mongoose';

// ─── Roles ────────────────────────────────────────────────────────────────────
export type TUserRole = 'superAdmin' | 'admin' | 'user';

export const USER_ROLE = {
  superAdmin: 'superAdmin',
  admin: 'admin',
  user: 'user',
} as const;

// ─── OAuth Provider ───────────────────────────────────────────────────────────
export type TOAuthProvider = 'google' | 'github' | 'local';

export interface IOAuthProfile {
  provider: TOAuthProvider;
  providerId: string;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}

// ─── User Document ────────────────────────────────────────────────────────────
export interface IUser {
  name: string;
  email: string;
  password?: string; // optional for OAuth users
  role: TUserRole;
  profilePhoto?: string | undefined;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  oauthProfiles: IOAuthProfile[];
  passwordChangedAt?: Date;
  refreshToken?: string; // hashed refresh token stored in DB
  createdAt?: Date;
  updatedAt?: Date;
}

// ─── Statics ──────────────────────────────────────────────────────────────────
export interface IUserModel extends Model<IUser & Document> {
  isUserExistsByEmail(email: string): Promise<(IUser & Document) | null>;
  isPasswordMatched(plain: string, hashed: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number,
  ): boolean;
}

// ─── Token Payloads ───────────────────────────────────────────────────────────
export interface IJwtPayload {
  userId: string;
  email: string;
  role: TUserRole;
}

// ─── Request Bodies ───────────────────────────────────────────────────────────
export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IRefreshTokenBody {
  refreshToken: string;
}

export interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface IForgotPasswordBody {
  email: string;
}

export interface IResetPasswordBody {
  token: string;
  newPassword: string;
}

// ─── Auth Service Return Types ────────────────────────────────────────────────
export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResult {
  user: Partial<IUser>;
  tokens: IAuthTokens;
}
