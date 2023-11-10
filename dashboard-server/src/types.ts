
export { type Department } from '@prisma/client'
export { type Profile } from '@prisma/client'
export { type Company } from '@prisma/client'
export { type Credential } from '@prisma/client'
export type DepartmentsAggregate = {
    departmentName: string | null;
    _count: {
        departmentName: number;
    };
}[]