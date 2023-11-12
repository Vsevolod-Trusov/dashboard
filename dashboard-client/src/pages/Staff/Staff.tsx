import { FC } from 'react';

import { IStaff } from './types';

const Staff: FC<IStaff> = ({ staff }) => (
  <div>
    {staff.map(({ email, companyName }) => (
      <div key={email}>
        <div>{email}</div>
        <div>{companyName}</div>
      </div>
    ))}
  </div>
);
export default Staff;
