import { FC } from 'react';

import Department from 'test/Department';
import User from 'test/User';

const Dashboard: FC = () => (
  <div>
    Here will be dashboard
    <User />
    <Department />
  </div>
);

export default Dashboard;
