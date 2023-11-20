import { ICreateDepartment } from 'pages/CreateDepartment/types';

export interface ICompanyValues {
  name: string;
}

export interface ICreateCompany<T>
  extends Pick<ICreateDepartment<T>, 'formik'> {}
