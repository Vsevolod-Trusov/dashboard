import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { EMPTY_STRING, TOP_NOTES } from '../common';
import { prisma } from '../prisma';
import { procedure, router } from '../trpc';
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
              where: {
                departmentId: department.id,
              },
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                credentials: true,
              },
              take: TOP_NOTES,
            });

            const departmentNameAndCompanyName =
              await prisma.department.findUnique({
                select: {
                  name: true,
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
              ...profile,
              createdAt: `${profile.createdAt.toLocaleDateString()} ${profile.createdAt.toLocaleTimeString()}`,
            }));

            return {
              ...department,
              profiles: modifiedProfiles,
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
        company: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        profiles: true,
      },
    });

    const updatedDepartments = departments.map(
      ({ company, ...department }) => ({
        ...department,
        companyName: company.name,
        createdAt: getDate(department.createdAt),
        profiles: department.profiles.map(profile => ({
          ...profile,
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

  createDepartment: procedure
    .input(createDepartmentSchema)
    .mutation(async ({ input }) => {
      try {
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

        const created = await prisma.department.create({
          data: {
            name,
            companyId: companyId,
            description,
          },
        });
        return created;
      } catch (exception) {
        throw new TRPCError({
          message: 'Such email already exists',
          code: 'BAD_REQUEST',
        });
      }
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

  deleteDepartment: procedure
    .input(removeDepartmentSchema)
    .query(async ({ input }) => {
      const department = await prisma.department.findFirst({
        where: {
          id: input.id,
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

      const deleted = await prisma.department.delete({
        where: {
          id: department.id,
        },
      });

      return deleted;
    }),
});
