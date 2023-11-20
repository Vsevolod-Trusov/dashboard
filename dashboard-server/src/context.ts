/* eslint-disable @typescript-eslint/no-unused-vars */
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

export type IContext = inferAsyncReturnType<typeof createContext>;

export default createContext;
