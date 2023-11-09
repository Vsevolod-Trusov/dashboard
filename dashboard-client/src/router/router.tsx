import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Dashboard, Department, SignIn, SignUp, Staff } from 'pages';
import { BASE_NAME, ROUTES } from 'common';
import { Template } from 'components';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.MAIN} element={<Template />}>
      <Route path={ROUTES.MAIN} element={<Dashboard />} />
      <Route path={ROUTES.DEPARTMENTS} element={<Department />} />
      <Route path={ROUTES.STAFF} element={<Staff />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
    </Route>,
  ),
  { basename: BASE_NAME },
);

export default Router;
