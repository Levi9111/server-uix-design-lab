import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, IUserModel, TOAuthProfile, USER_ROLE } from './auth.interface';
import config from '../../config';

// ─── OAuth Sub-Schema ─────────────────────────────────────────────────────────
const oauthProfileSchema = new Schema<TOAuthProfile>(
  {
    provider: {
      type: String,
      enum: ['google', 'github', 'local'],
      required: true,
    },
    providerId: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { _id: false },
);

// ─── User Schema ──────────────────────────────────────────────────────────────
const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      select: false,
      minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
    profilePhoto: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    oauthProfiles: { type: [oauthProfileSchema], default: [] },
    passwordChangedAt: { type: Date },
    refreshToken: { type: String, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as Record<string, unknown>).password;
        delete (ret as Record<string, unknown>).refreshToken;
        delete (ret as Record<string, unknown>).__v;
        return ret;
      },
    },
  },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({
  'oauthProfiles.provider': 1,
  'oauthProfiles.providerId': 1,
});

// ─── Pre-save: Hash Password ──────────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds!),
  );
  next();
});

// ─── Pre-save: Track Password Change ─────────────────────────────────────────
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// ─── Query Middleware: Exclude Deleted ────────────────────────────────────────
userSchema.pre(/^find/, function (this: any, next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// ─── Static: Find by Email ────────────────────────────────────────────────────
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return this.findOne({ email }).select('+password +refreshToken');
};

// ─── Static: Compare Password ─────────────────────────────────────────────────
userSchema.statics.isPasswordMatched = async function (
  plain: string,
  hashed: string,
) {
  return bcrypt.compare(plain, hashed);
};

// ─── Static: JWT Issued Before Password Change? ───────────────────────────────
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedAt: Date,
  jwtIssuedAt: number,
) {
  return passwordChangedAt.getTime() / 1000 > jwtIssuedAt;
};

export const User = model<TUser, IUserModel>('User', userSchema);
