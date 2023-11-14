import { FormikProps } from 'formik';

import { CompanyType } from '../../../../dashboard-server/src/types';

export interface ICreateDepartment<T> {
  companies: CompanyType[];
  formik: FormikProps<T>;
}
