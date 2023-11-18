import Prisma, { Department } from '@prisma/client';

export { type Company } from '@prisma/client';
export type DepartmentAggregate = {
  id?: string | null;
  count: number;
};

export type UserProfile = Omit<Partial<Prisma.Profile>, 'createdAt'> & {
  createdAt: string;
} & { credentials?: Partial<Omit<Prisma.Credential, 'createdAt'>> } & {
  company?: Partial<Omit<Prisma.Company, 'createdAt'>>;
};

export type DepartmentsWithCount = Pick<Department, 'name' | 'id'> &
  Partial<{ count: number }> &
  Partial<{ companyName: string }> &
  Partial<{
    profiles: UserProfile[];
  }> & { createdAt?: string | undefined | null };

export type CompanyType = {
  id: string;
  name: string;
};
