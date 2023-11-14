import { FormikProps } from 'formik';

import { CompanyType } from '../../../../dashboard-server/src/types';

export interface ISignUpForm<T> {
    forCreateStaff?: {
        departmentNames: string[],
        companyNames: CompanyType[]
    },
    formik: FormikProps<T>,
    handleSelectedCompany: (data: string) => void
}

export interface IStaffValues {
    username: string;
    lastname: string;
    password: string;
    confirm: string;
    departmentName: string;
    companyName: string;
    email: string;
    isManager: boolean;
  }
  
  