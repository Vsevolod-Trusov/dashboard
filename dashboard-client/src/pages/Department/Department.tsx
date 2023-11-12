import { FC } from 'react';

import { IDepartment } from './types';

const Department: FC<IDepartment> = ({ departments }) => (
  <div>
    <div>
      {departments.map((department) => (
        <div key={department.departmentName}>
          <div>{department.departmentName}</div>
          <div>{department._count.departmentName}</div>
          <div>
            {department.profiles.map(({ email }) => (
              <div key={email}>
                <div>{email}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Department;
