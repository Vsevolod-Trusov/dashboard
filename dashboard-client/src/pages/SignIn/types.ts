import { ICreateDepartment } from 'pages/CreateDepartment/types';

export interface ISignInValues {
  email: string;
  password: string;
  role: string;
}

export interface ISignIn<T> extends Pick<ICreateDepartment<T>, 'formik'> {}
