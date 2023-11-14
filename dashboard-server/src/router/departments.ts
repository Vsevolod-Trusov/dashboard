import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

import { createDepartmentSchema, removeDepartmentSchema } from '../validation';
import { DepartmentWithProfiles } from '../types';
import { procedure, router } from '../trpc';
import { prisma } from '../prisma';
import { z } from 'zod';

export const departmentRouter = router({

    getDepartments: procedure.query(async (): Promise<DepartmentWithProfiles[] | TRPCError> => {
        try {
            const departments = await prisma.profile.groupBy({
                by: ['departmentId'],
                _count: {
                    departmentId: true,
                },
                orderBy: {
                    _count: {
                    departmentId: 'desc',
                    },
                },
                where: {
                    departmentId: {
                        not: null
                    }
                },
                take: 5,
            })
    
        const departmentsWithProfiles = await Promise.all(departments.map( async department => {
                const profiles = await prisma.profile.findMany({
                            where: {
                                departmentId: department.departmentId
                            },
                            orderBy: {
                                createdAt: 'desc'
                            },
                            include: {
                                credentials: true
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
            return (departmentsWithProfiles as unknown as DepartmentWithProfiles[])
        }
        catch (exception) {
            console.log(`[ Department Service ]: ${exception}`)
            return new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
        }
    }),

    getDepartmentsCount: procedure.query(async () => {
        try {
            const count = await prisma.department.count()

            return count
        }
        catch(exception) {
            console.log(exception)
            return new TRPCError({message: 'Internal server error', code: 'INTERNAL_SERVER_ERROR'})
        }
    }),

    getAllDepartments: procedure.query(async () => {
       
        const departments = await prisma.profile.groupBy({
        by: ['departmentId'],
        _count: {
            departmentId: true,
        },
        where: {
            departmentId: {
                not: null
            }
        },
    })

       const departmentsWithManagers = await Promise.all(departments.map( async department => {
        const profiles = await prisma.profile.findMany({
                    select: {
                        credentials: {
                            select: {
                             name: true,
                             lastname:true
                            }
                            },
                            email: true,
                       company: {
                        select: {
                            name: true
                        }
                       },
                       department: {
                        select: {name: true}
                       },
                       createdAt: true,

                    },
                    where: {
                        departmentId: department.departmentId ,
                        isHeader: true
                    },
                    
                })
                
        const departmentInfo = await prisma.department.findFirst({
            select: {
                name: true,
                createdAt: true
            },
            where: {
                id: department.departmentId || ''
            }
        })
                const modifiedProfiles = profiles.map(profile => ({...profile, createdAt: `${profile.createdAt.toLocaleDateString()} ${profile.createdAt.toLocaleTimeString()}`}))
                
                const createdAtField = departmentInfo && `${departmentInfo.createdAt?.toLocaleDateString()} ${departmentInfo?.createdAt?.toLocaleTimeString()}`
                
                return {
                    ...department,
                    departmentName:departmentInfo?.name,
                    createdAt: createdAtField,
                    profiles: modifiedProfiles
                }
        } ))

       console.log('TASK 2:',departmentsWithManagers)
       
       return departmentsWithManagers
    }),

    createDepartment: procedure.input(createDepartmentSchema)
    .mutation(async ({input}) => {
        try {
            const {name, description, companyId} = input
        
            const company = await prisma.company.findUnique({
                where: {
                    id: companyId
                }
            })

            if (!company) throw new TRPCError({message: 'No such company', code: 'BAD_REQUEST'})

        const created =  await prisma.department.create({
        data: {
            name,
            companyId: companyId,
            description,
        }
        })

        return created
        }catch(exception) {
            if (exception instanceof Prisma.PrismaClientKnownRequestError) {
                if (exception.code === 'P2002') {
                  console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                  )
                }
              }
              console.log('created error')
              throw new TRPCError({message: 'Such email already exists', code: 'BAD_REQUEST'})
        }
    }),

    getDepartmentsNames: procedure.input(z.string()).query(async ({input}) => {
            console.log('INPUT', input)
            const departmentsNames = await prisma.department.findMany({
                select: {
                    name: true
                },
                where: {
                    companyId: input
                }
            })
            return departmentsNames.map(department => department.name)
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