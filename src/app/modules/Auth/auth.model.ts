import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, IUserModel, IOAuthProfile, USER_ROLE } from './auth.interface';
import config from '../../config';

// ─── OAuth Sub-Schema ─────────────────────────────────────────────────────────
const oauthProfileSchema = new Schema<IOAuthProfile>(
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
const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      select: false, // never returned by default
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
    refreshToken: { type: String, select: false }, // hashed, never returned
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
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
  // Subtract 1s so that token issued right after change is still valid
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

const User = model<IUser, IUserModel>('User', userSchema);
export default User;
