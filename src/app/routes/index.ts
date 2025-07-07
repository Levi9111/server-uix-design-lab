import { Router, Request, Response } from 'express';

const router = Router();

const testRoute = (_req: Request, res: Response) => {
  const message = 'Server for UIX Design Lab';
  res.send(message);
};

const moduleRoutes = [
  {
    path: '/',
    router: testRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
