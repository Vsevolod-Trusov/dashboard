// import { Profile } from '@prisma/client'

import { Profile } from '@prisma/client'

export { type Department } from '@prisma/client'
export { type Company } from '@prisma/client'
export { type Credential } from '@prisma/client'
export type DepartmentAggregate = {
    departmentName?: string | null; 
    name?: string | null; 
    _count: {
        departmentName: number;
    };
}

export type UserProfile = Omit<Profile, 'createdAt'> & {createdAt: string}

export type DepartmentWithProfiles = DepartmentAggregate & { profiles: UserProfile[] }
