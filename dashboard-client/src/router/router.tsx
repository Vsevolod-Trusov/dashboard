import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { BASE_NAME, ROUTES } from 'common';
import { Template } from 'components';
import {
  CreateCompany,
  CreateDepartment,
  CreateStaff,
  Dashboard,
  Department,
  SignIn,
  Staff,
} from 'pages';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.MAIN} element={<Template />}>
      <Route path={ROUTES.MAIN} element={<Dashboard />} />
      <Route path={ROUTES.DEPARTMENTS} element={<Department />} />
      <Route path={ROUTES.STAFF} element={<Staff />} />
      <Route path={ROUTES.CREATE_STAFF} element={<CreateStaff />} />
      <Route path={ROUTES.CREATE_DEPARTMENT} element={<CreateDepartment />} />
      <Route path={ROUTES.CREATE_COMPANY} element={<CreateCompany />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
    </Route>,
  ),
  { basename: BASE_NAME },
);

export default Router;
