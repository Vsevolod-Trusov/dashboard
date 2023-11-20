import { FormikProps } from 'formik';

import { ChangeEvent } from 'react';
import { CompanyType } from '../../../../dashboard-server/src/types';

export interface ICreateStaff<T> {
  departmentNames: string[];
  companyNames: CompanyType[];
  formik: FormikProps<T>;
  handleSelectedCompany: (event: ChangeEvent<HTMLSelectElement>) => void;
}
