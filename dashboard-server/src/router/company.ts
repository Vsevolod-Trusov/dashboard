import { TRPCError } from '@trpc/server';
import { procedure, router } from '../trpc';
import { prisma } from '../prisma';

export const companyRouter = router({

    getCompaniesCount: procedure.query(async () => {
        try {
            const count = await prisma.company.count()
            return count
        }
        catch(exception) {
            console.log(exception)
            return new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
        }
    }),
});