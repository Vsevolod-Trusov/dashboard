import { Dispatch, SetStateAction } from 'react';
import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';

export interface IDepartment {
  departments: DepartmentsWithCount[];
  setDepartmentId: Dispatch<SetStateAction<string>>;
  handleDelete: () => void;
}
