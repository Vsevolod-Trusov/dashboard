import { TRPCError, initTRPC } from '@trpc/server';

import { IContext } from './context';
import { prisma } from './prisma';
import { compareHashes } from './utils';
export const tRPC = initTRPC.context<IContext>().create();

// Middleware
const isAuthenticated = tRPC.middleware(async ({ ctx, next }) => {
  if (!ctx.req.cookies?.user) {
    throw new TRPCError({ message: 'UNAUTHORIZED', code: 'UNAUTHORIZED' });
  }

  const user = JSON.parse(ctx.req.cookies?.user);
  if (!user.email || !user.password || !user.role) {
    throw new TRPCError({ message: 'UNAUTHORIZED', code: 'UNAUTHORIZED' });
  }

  const profile = await prisma.profile.findUnique({
    select: {
      credentials: {
        select: {
          password: true,
        },
      },
    },
    where: {
      email: user.email,
    },
  });

  if (!profile) {
    throw new TRPCError({ message: 'UNAUTHORIZED', code: 'UNAUTHORIZED' });
  }

  const compareResult = compareHashes(
    user.password,
    profile.credentials.password,
  );

  if (!compareResult)
    throw new TRPCError({ message: 'UNAUTHORIZED', code: 'UNAUTHORIZED' });

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

const isAuthorization = tRPC.middleware(async ({ ctx, next }) => {
  const user = JSON.parse(ctx.req.cookies?.user);
  if (user.role !== 'admin') {
    throw new TRPCError({ message: 'Forbidden', code: 'FORBIDDEN' });
  }
  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

export const authenticatedProcedure = tRPC.procedure
  .use(isAuthenticated)
  .use(isAuthorization);

export const router = tRPC.router;
export const procedure = tRPC.procedure;
