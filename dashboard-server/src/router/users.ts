import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { SALT_ROUNDS } from '../common';
import { prisma } from '../prisma';
import { authenticatedProcedure, procedure, router } from '../trpc';
import { compareHashes, getDate, hashData } from '../utils';
import { removeUserSchema, signInSchema, signUpSchema } from '../validation';

export const userRouter = router({
  getUsers: procedure.query(async () => {
    try {
      const profiles = await prisma.profile.findMany({
        select: {
          id: true,
          email: true,
          createdAt: true,
          role: true,
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
          role: {
            not: 'admin',
          },
        },
      });

      const modifiedProfiles = profiles.map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.credentials.name,
        lastname: profile.credentials.lastname,
        role: profile.role,
        companyName: profile?.company?.name,
        departmentName: profile.department?.name,
        createdAt: getDate(profile.createdAt),
      }));

      return modifiedProfiles;
    } catch (e) {
      throw new TRPCError({
        message: 'Some server error',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  getUsersByName: procedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const profiles = await prisma.profile.findMany({
          select: {
            id: true,
            email: true,
            createdAt: true,
            role: true,
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
            AND: {
              credentials: {
                name: input.name,
              },
              role: {
                not: 'admin',
              },
            },
          },
        });

        const modifiedProfiles = profiles.map(profile => ({
          id: profile.id,
          email: profile.email,
          name: profile.credentials.name,
          lastname: profile.credentials.lastname,
          role: profile.role,
          companyName: profile?.company?.name,
          departmentName: profile.department?.name,
          createdAt: getDate(profile.createdAt),
        }));

        return modifiedProfiles;
      } catch (e) {
        throw new TRPCError({
          message: 'Some server error',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    }),

  getStaffCount: procedure.query(async () => {
    try {
      const count = await prisma.profile.count({
        where: {
          role: {
            not: 'admin',
          },
        },
      });
      return count;
    } catch (exception) {
      return new TRPCError({
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }),

  signUp: authenticatedProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      try {
        const {
          name,
          lastname,
          password,
          departmentName,
          companyName,
          ...profile
        } = input;

        const dep = await prisma.department.findFirst({
          where: {
            name: departmentName,
          },
        });

        if (!dep) {
          throw new TRPCError({
            message: 'No such department',
            code: 'BAD_REQUEST',
          });
        }

        const comp = await prisma.company.findFirst({
          where: {
            id: companyName,
          },
        });

        if (!comp) {
          throw new TRPCError({
            message: 'No such company',
            code: 'BAD_REQUEST',
          });
        }

        const hashedPassword = await hashData(password, SALT_ROUNDS);
        const credentials = await prisma.credential.create({
          data: {
            name,
            lastname,
            password: hashedPassword,
          },
        });

        const profileResult = await prisma.profile.create({
          data: {
            departmentId: dep.id,
            credentialsId: credentials.id,
            companyId: comp.id,
            ...profile,
          },
        });

        return profileResult;
      } catch (exception) {
        throw new TRPCError({
          message: 'Such email already exists',
          code: 'BAD_REQUEST',
        });
      }
    }),

  signIn: procedure.input(signInSchema).mutation(async ({ input, ctx }) => {
    const { email, password, role } = input;

    const profileResult = await prisma.profile.findUnique({
      select: {
        role: true,
        credentials: {
          select: {
            password: true,
          },
        },
      },
      where: {
        email: email,
      },
    });

    if (!profileResult)
      throw new TRPCError({
        message: 'No such profile',
        code: 'BAD_REQUEST',
      });

    const compareResult = await compareHashes(
      password,
      profileResult.credentials.password,
    );
    if (!compareResult)
      throw new TRPCError({
        message: 'Wrong password',
        code: 'BAD_REQUEST',
      });

    if (role !== profileResult.role)
      throw new TRPCError({
        message: 'Wrong role',
        code: 'BAD_REQUEST',
      });

    ctx.res.cookie('user', JSON.stringify({ email, password, role }), {
      maxAge: 1 * 1 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: 'none',
      secure: true,
    });
  }),

  deleteUser: authenticatedProcedure
    .input(removeUserSchema)
    .mutation(async ({ input }) => {
      const profile = await prisma.profile.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!profile) {
        throw new TRPCError({
          message: 'No such Profile',
          code: 'BAD_REQUEST',
        });
      }

      await prisma.credential.delete({
        where: {
          id: profile.credentialsId,
        },
      });
    }),
});
