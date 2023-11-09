import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components';

const Template: FC = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);
export default Template;
