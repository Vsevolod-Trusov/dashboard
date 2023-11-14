import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express, { Application } from 'express';
import cors from 'cors';

import { router } from './router';
import { DEFAULT_PORT, ROUTES, STARTED_APP } from './common';
import createContext from './context';

const app: Application = express();
const port = process.env.PORT || DEFAULT_PORT;

const appRouter = router;

app.use(cors({ origin: true }));

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
