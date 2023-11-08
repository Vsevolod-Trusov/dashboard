import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { procedure, router} from '../trpc';
import { removeUserSchema, signUpSchema } from '../validation';
import { prisma } from '../prisma';

export const userRouter = router({
    getUsers: procedure.query(async () => {
    try {
        return await prisma.profile.findMany();
    } catch (e) {
        throw new TRPCError({message: 'Some server error', code: 'INTERNAL_SERVER_ERROR'});
    }}),

    sigUp: procedure.input(signUpSchema)
    .mutation(async ({input}) => {
        try {
            const {name, lastname, password, department, companyName, ...profile} = input
        
        const dep = await prisma.department.findFirst({
            where: {
                name: department
            }
        })

        if (!dep) {
            throw new TRPCError({message: 'No such department', code: 'BAD_REQUEST'})
        }

        console.log('DEP', dep)

        const comp = await prisma.company.findUnique({
            where: {
                name: companyName
            }
        })

        if (!comp) {
            throw new TRPCError({message: 'No such company', code: 'BAD_REQUEST'})
        }

        console.log('COMP', comp)

        const credentials =  await prisma.credential.create({
        data: {
            name,
            lastname,
            password
        }
        })

        console.log('CREDENTIALS', credentials)
        const profileResult =  await prisma.profile.create({
            data: {
                departmentId: dep.id,
                credentialsId: credentials.id,
                companyName: comp.name,
                ...profile
            },
        })

        console.log(profileResult)

        return {
            ...credentials,
            ...profileResult
        }
        }catch(exception) {
            if (exception instanceof Prisma.PrismaClientKnownRequestError) {
                if (exception.code === 'P2002') {
                  console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                  )
                }
              }
              throw new TRPCError({message: 'Such email already exists', code: 'BAD_REQUEST'})
        }
    }),

    deleteUser: procedure.input(removeUserSchema)
    .query(async ({input}) => {
        
        const profile = await prisma.profile.findUnique({
            where: {
                email: input.email
            }
        })

        if (!profile){
            throw new TRPCError({message: 'No such Profile', code: 'BAD_REQUEST'})
        }

        const remove = await prisma.credential.delete({
            where: {
                id: profile.credentialsId
            }
        })

        return remove
    }),
});