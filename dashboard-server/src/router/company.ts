import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { prisma } from '../prisma';
import { authenticatedProcedure, procedure, router } from '../trpc';

export const companyRouter = router({
  getCompaniesCount: procedure.query(async () => {
    try {
      const count = await prisma.company.count();
      return count;
    } catch (exception) {
      return new TRPCError({
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  getCompanyNames: procedure.query(async () => {
    const companyNames = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return companyNames;
  }),

  createCompany: authenticatedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      try {
        const created = await prisma.company.create({
          data: {
            name: input,
          },
        });

        return created;
      } catch (exception) {
        throw new TRPCError({
          message: 'Internal error',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),
});
