import { FormikProps } from 'formik';

import { CompanyType } from '../../../../dashboard-server/src/types';

export interface ICreateStaff<T> {
    departmentNames: string[],
    companyNames: CompanyType[],
    formik: FormikProps<T>,
    handleSelectedCompany: (data: string) => void
}