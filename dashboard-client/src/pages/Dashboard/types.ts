import { Dispatch, SetStateAction } from 'react';

import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';

export interface IStatistics {
  departmentsCount: number;
  staffCount: number;
  companiesCount: number;
}

export interface IDashboard {
  departments: DepartmentsWithCount[];
  setDepartmentId: Dispatch<SetStateAction<string>>;
  handleDelete: () => void;
}
