import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';

interface IStatistics {
    departmentsCount: number,
    staffCount: number,
    companiesCount: number
}

export interface IDashboard {
    departments: DepartmentWithProfiles[] 
    statistics: IStatistics 
}