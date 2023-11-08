import { TRPCError } from '@trpc/server';

import { procedure, router } from '../trpc';
import { createDepartmentSchema, removeDepartmentSchema, selectionByDepartmentSchema } from '../validation';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

export const departmentRouter = router({
    getUsersByDepartment: procedure.input(selectionByDepartmentSchema).query(async ({input}) => {
    try {

        console.log(input.name)

        const users = await prisma.profile.findMany({
            where: {
                department: {
                    name: input.name
                }
            },
            include: {
                department: true
            }
        });

        console.log(users)

        return users
    } catch (e) {
        throw new TRPCError({message: 'Some server error', code: 'INTERNAL_SERVER_ERROR'});
    }}),

    createDepartment: procedure.input(createDepartmentSchema)
    .mutation(async ({input}) => {
        try {
            const {name, description} = input
        
        const department =  await prisma.department.create({
        data: {
            name,
            description,
        }
        })

        return department
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

    deleteDepartment: procedure.input(removeDepartmentSchema)
    .query(async ({input}) => {
        
        const department = await prisma.department.findFirst({
            where: {
                name: input.name
            }
        })

        if (!department) {
            throw new TRPCError({message: 'No such deprtment', code: 'BAD_REQUEST'})
        }

        await prisma.profile.updateMany({
            where: {
              departmentId: department.id,
            },
            data: {
              departmentId: undefined,
            },
          });

        const deleted = await prisma.department.deleteMany({
            where: {
                name: input.name
            }
        })
        
        return deleted
    }),
});