import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { EMPTY_STRING, TOP_NOTES } from '../common';
import { prisma } from '../prisma';
import { authenticatedProcedure, procedure, router } from '../trpc';
import { DepartmentsWithCount } from '../types';
import { getDate } from '../utils';
import { createDepartmentSchema, removeDepartmentSchema } from '../validation';

export const departmentRouter = router({
  getDepartments: procedure.query(
    async (): Promise<DepartmentsWithCount[] | TRPCError> => {
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
              not: null,
            },
          },
          take: TOP_NOTES,
        });

        const modifiedProfiles = departments.map(
          ({ departmentId, _count }) => ({
            id: departmentId,
            count: _count.departmentId,
          }),
        );

        const departmentsWithProfiles = await Promise.all(
          modifiedProfiles.map(async department => {
            const profiles = await prisma.profile.findMany({
              select: {
                email: true,
                createdAt: true,
                credentials: {
                  select: {
                    name: true,
                    lastname: true,
                  },
                },
                company: {
                  select: {
                    name: true,
                  },
                },
                department: {
                  select: {
                    name: true,
                  },
                },
              },
              where: {
                departmentId: department.id,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: TOP_NOTES,
            });

            const departmentNameAndCompanyName =
              await prisma.department.findUnique({
                select: {
                  name: true,
                  createdAt: true,
                  description: true,
                  company: {
                    select: {
                      name: true,
                    },
                  },
                },
                where: {
                  id: department.id || EMPTY_STRING,
                },
              });

            const modifiedProfiles = profiles.map(profile => ({
              email: profile.email,
              name: profile.credentials.name,
              lastname: profile.credentials.lastname,
              companyName: profile.company?.name,
              departmentName: profile.department?.name,
              createdAt: getDate(profile.createdAt),
            }));

            return {
              ...department,
              profiles: modifiedProfiles,
              description: departmentNameAndCompanyName?.description,
              createdAt: getDate(
                departmentNameAndCompanyName?.createdAt ?? new Date(),
              ),
              name: departmentNameAndCompanyName?.name,
              companyName: departmentNameAndCompanyName?.company.name,
            };
          }),
        );

        return departmentsWithProfiles as DepartmentsWithCount[];
      } catch (exception) {
        return new TRPCError({
          message: 'Internal server error',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  ),

  getDepartmentsCount: procedure.query(async () => {
    try {
      const count = await prisma.department.count();

      return count;
    } catch (exception) {
      return new TRPCError({
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  getAllDepartments: procedure.query(async () => {
    const departments = await prisma.department.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        company: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        profiles: {
          select: {
            email: true,
            createdAt: true,
            credentials: {
              select: {
                name: true,
                lastname: true,
              },
            },
            company: {
              select: {
                name: true,
              },
            },
            department: {
              select: {
                name: true,
              },
            },
          },
          where: {
            isHeader: true,
          },
          take: 1,
        },
      },
    });

    const updatedDepartments = departments.map(
      ({ company, ...department }) => ({
        ...department,
        companyName: company.name,
        createdAt: getDate(department.createdAt),
        profiles: department.profiles.map(profile => ({
          email: profile.email,
          name: profile.credentials.name,
          lastname: profile.credentials.lastname,
          companyName: profile.company?.name,
          departmentName: profile.department?.name,
          createdAt: getDate(profile.createdAt),
        })),
      }),
    );

    const departmentsWithManagers = await Promise.all(
      (updatedDepartments as DepartmentsWithCount[]).map(async department => {
        const staffCount = await prisma.profile.groupBy({
          by: ['departmentId'],
          _count: {
            departmentId: true,
          },
          where: {
            departmentId: department.id,
          },
        });

        const count = staffCount.find(
          item => item.departmentId === department.id,
        );

        return {
          ...department,
          count: count?._count.departmentId,
          profiles: department.profiles,
        };
      }),
    );

    return departmentsWithManagers;
  }),

  createDepartment: authenticatedProcedure
    .input(createDepartmentSchema)
    .mutation(async ({ input }) => {
      const { name, description, companyId } = input;

      const company = await prisma.company.findUnique({
        where: {
          id: companyId,
        },
      });

      if (!company)
        throw new TRPCError({
          message: 'No such company',
          code: 'BAD_REQUEST',
        });

      let created;
      try {
        created = await prisma.department.create({
          data: {
            name,
            companyId: companyId,
            description,
          },
        });
      } catch (exception) {
        throw new TRPCError({
          message: 'Such email already exists',
          code: 'BAD_REQUEST',
        });
      }

      return created;
    }),

  getDepartmentsNames: procedure.input(z.string()).query(async ({ input }) => {
    const departmentsNames = await prisma.department.findMany({
      select: {
        name: true,
      },
      where: {
        companyId: input,
      },
    });

    return departmentsNames.map(department => department.name);
  }),

  deleteDepartment: authenticatedProcedure
    .input(removeDepartmentSchema)
    .mutation(async ({ input }) => {
      const department = await prisma.department.findFirst({
        where: {
          id: input,
        },
      });

      if (!department) {
        throw new TRPCError({
          message: 'No such deprtment',
          code: 'BAD_REQUEST',
        });
      }

      await prisma.profile.updateMany({
        where: {
          departmentId: department.id,
        },
        data: {
          departmentId: undefined,
        },
      });

      await prisma.department.delete({
        where: {
          id: department.id,
        },
      });
    }),
});
