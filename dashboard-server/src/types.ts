import Prisma from '@prisma/client';

export { type Company } from '@prisma/client';
export type DepartmentAggregate = {
  departmentId?: string | null;
  name?: string | null;
  _count: {
    departmentId: number;
  };
};

export type UserProfile = Omit<Partial<Prisma.Profile>, 'createdAt'> & {
  createdAt: string;
} & { credentials?: Partial<Omit<Prisma.Credential, 'createdAt'>> } & {
  company?: Partial<Omit<Prisma.Company, 'createdAt'>>;
};

export type DepartmentWithProfiles = DepartmentAggregate & {
  profiles: UserProfile[];
} & { createdAt?: string | undefined | null } & {
  departmentName?: string | undefined;
};

export type CompanyType = {
  id: string;
  name: string;
};
