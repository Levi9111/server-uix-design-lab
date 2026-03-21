import {
  TJwtPayload,
  TOAuthCallbackUser,
} from '../modules/Auth/auth.interface';

declare global {
  namespace Express {
    // Allow Express.User to be either a JWT payload or an OAuth callback user
    interface User extends Partial<TJwtPayload>, Partial<TOAuthCallbackUser> {}
    interface Request {
      user?: TJwtPayload | TOAuthCallbackUser;
    }
  }
}
