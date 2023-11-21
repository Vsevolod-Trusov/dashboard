/* eslint-disable @typescript-eslint/no-unused-vars */
import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Request } from 'express';
import { Session } from 'express-session';

type ExpressRequest = Omit<CreateExpressContextOptions, 'req'> & {
  req: Request & { session: Session };
};

const createContext = ({ req, res }: ExpressRequest) => {
  return { req, res };
};

export type IContext = inferAsyncReturnType<typeof createContext>;

export default createContext;
