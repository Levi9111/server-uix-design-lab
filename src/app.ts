import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import config from './app/config';
import { initPassport } from './app/middlewares/passport';

const app: Application = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Supports multiple origins via comma-separated CLIENT_URL env var
// e.g. CLIENT_URL=http://localhost:5173,https://dashboard-uix-design-lab.vercel.app
const allowedOrigins = (config.client_url as string)
  .split(',')
  .map((url) => url.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} is not allowed`));
      }
    },
    credentials: true,
  }),
);

// ─── Parsers ──────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Passport ─────────────────────────────────────────────────────────────────
// Register strategies first, then initialize — must come before routes
initPassport();
app.use(passport.initialize() as unknown as express.Handler);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1', router);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.send('Mongoose Express server application');
});

// ─── Not Found ────────────────────────────────────────────────────────────────
app.use(notFound);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(globalErrorHandler);

export default app;
