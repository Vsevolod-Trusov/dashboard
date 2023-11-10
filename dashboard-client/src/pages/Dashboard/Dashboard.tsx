import { FC } from 'react';

import Department from 'test/Department';
import User from 'test/User';

import { IDashboard } from './types';

const Dashboard: FC<IDashboard> = ({ departments }) => (
  <div>
    <div>
      {departments.map(({ departmentName, _count }, index) => (
        <div key={index}>
          <div>
            {departmentName} {_count.departmentName}
          </div>
        </div>
      ))}
    </div>

    <div>
      Here will be dashboard
      <User />
      <Department />
    </div>
  </div>
);

export default Dashboard;
