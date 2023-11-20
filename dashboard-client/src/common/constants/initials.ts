import { ICompanyValues } from 'components/CompanyForm/types';
import { IDepartmentValues } from 'components/DepartmentForm/types';
import { IStaffValues } from 'components/SignUpForm/types';
import { IStatistics } from 'pages/Dashboard';
import { ISignInValues } from 'pages/SignIn/types';

import { EMPTY_STRING, ZERO } from './common';

export const STATISTICS_INIT: IStatistics = {
  departmentsCount: ZERO,
  staffCount: ZERO,
  companiesCount: ZERO,
};

export const CREATE_STAFF_INITIALS: IStaffValues = {
  username: EMPTY_STRING,
  lastname: EMPTY_STRING,
  password: EMPTY_STRING,
  confirm: EMPTY_STRING,
  departmentName: EMPTY_STRING,
  companyName: EMPTY_STRING,
  email: EMPTY_STRING,
  isManager: false,
};

export const CREATE_DEPARTMENT_INITIALS: IDepartmentValues = {
  name: EMPTY_STRING,
  companyId: EMPTY_STRING,
  description: EMPTY_STRING,
};

export const CREATE_COMPANY_INITIALS: ICompanyValues = {
  name: EMPTY_STRING,
};

export const STATISTICS_SLICE = {
  departmentsCount: ZERO,
  staffCount: ZERO,
  companiesCount: ZERO,
};

export const SIGN_IN_INITIALS: ISignInValues = {
  email: EMPTY_STRING,
  password: EMPTY_STRING,
  role: EMPTY_STRING,
};
