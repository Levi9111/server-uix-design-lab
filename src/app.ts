import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(
  cors({
    origin: ['https://dashboard-uix-design-lab.vercel.app'],
    credentials: true,
  }),
);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const test = (_req: Request, res: Response) => {
  const message = 'Mongoose Express server application';
  res.send(message);
};

app.get('/', test);

//Not Found
app.use(notFound);

app.use(globalErrorHandler);

export default app;
