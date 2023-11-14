import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { procedure, router} from '../trpc';
import { removeUserSchema, signUpSchema } from '../validation';
import { prisma } from '../prisma';

export const userRouter = router({
    getUsers: procedure.query(async () => {
    try {
        const profiles = await prisma.profile.findMany({
            include: {
                company: true,
                department: true
            }
        });

        const modifiedProfiles = profiles.map(profile => ({...profile, createdAt: `${profile.createdAt.toLocaleDateString()} ${profile.createdAt.toLocaleTimeString()}`}))

        return modifiedProfiles 
    } catch (e) {
        throw new TRPCError({message: 'Some server error', code: 'INTERNAL_SERVER_ERROR'});
    }}),

    getStaffCount: procedure.query(async () => {
        try {
            const count = await prisma.profile.count()
            return count
        }
        catch(exception) {
            console.log(exception)
            return new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
        }
    }),

    sigUp: procedure.input(signUpSchema)
    .mutation(async ({input}) => {
        try {
            const {name, lastname, password, departmentName, companyName, ...profile} = input
        
        const dep = await prisma.department.findFirst({
            where: {
                name: departmentName
            }
        })

        if (!dep) {
            throw new TRPCError({message: 'No such department', code: 'BAD_REQUEST'})
        }

        const comp = await prisma.company.findFirst({
            where: {
                id: companyName
            }
        })

        if (!comp) {
            throw new TRPCError({message: 'No such company', code: 'BAD_REQUEST'})
        }

        const credentials =  await prisma.credential.create({
        data: {
            name,
            lastname,
            password
        }
        })

        const profileResult =  await prisma.profile.create({
            data: {
                departmentId: dep.id,
                credentialsId: credentials.id,
                companyId: comp.id,
                ...profile
            },
        })

        return profileResult

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