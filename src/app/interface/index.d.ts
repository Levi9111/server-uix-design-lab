import { IJwtPayload } from '../modules/Auth/auth.interface';

declare global {
  namespace Express {
    // Merge IJwtPayload into Express.User so req.user.userId etc. are recognized
    interface User extends IJwtPayload {}
    interface Request {
      user?: IJwtPayload;
    }
  }
}
