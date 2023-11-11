import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

import { createDepartmentSchema, removeDepartmentSchema } from '../validation';
import { DepartmentWithProfiles } from '../types';
import { procedure, router } from '../trpc';
import { prisma } from '../prisma';

export const departmentRouter = router({

    getDepartments: procedure.query(async (): Promise<DepartmentWithProfiles[] | TRPCError> => {
        try {
            const departments = await prisma.profile.groupBy({
                by: ['departmentName'],
                _count: {
                    departmentName: true,
                },
                orderBy: {
                    _count: {
                    departmentName: 'desc',
                    },
                },
                where: {
                    departmentName: {
                        not: null
                    }
                },
                take: 5,
            })
    
        const departmentsWithProfiles = await Promise.all(departments.map( async department => {
                const profiles = await prisma.profile.findMany({
                            where: {
                                departmentName: department.departmentName
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            take: 5
                        })
    
                        const modifiedProfiles = profiles.map(profile => ({...profile, createdAt: `${profile.createdAt.toLocaleDateString()} ${profile.createdAt.toLocaleTimeString()}`}))
                        
                        return {
                            ...department,
                            profiles: modifiedProfiles
                        }
                } ))
    
    
            console.log(departmentsWithProfiles)
            return (departmentsWithProfiles as DepartmentWithProfiles[])
        }
        catch (exception) {
            console.log(`[ Department Service ]: ${exception}`)
            return new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
        }
    }),

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
            departmentName: department.name,
            },
            data: {
            departmentName: undefined,
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