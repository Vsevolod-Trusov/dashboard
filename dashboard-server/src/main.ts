import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

import { DEFAULT_PORT, ROUTES, STARTED_APP } from './common';
import createContext from './context';
import { router } from './router';

const app: Application = express();
const port = process.env.PORT || DEFAULT_PORT;

const appRouter = router;

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use(
  ROUTES.TRPC,
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(port, () => {
  console.log(STARTED_APP, port);
});

export type AppRouter = typeof appRouter;
