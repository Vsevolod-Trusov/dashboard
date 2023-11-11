import { FC } from 'react';

import { EMPTY_ARRAY } from 'common';

import { IDashboard } from './types';
import {
  DepartmentWithProfiles,
  UserProfile,
} from '../../../../dashboard-server/src/types';

const Dashboard: FC<IDashboard> = ({ departments }) => (
  <div>
    {departments.map(
      ({ departmentName, _count, profiles }: DepartmentWithProfiles, index) => (
        <div key={index}>
          <div>
            {departmentName} {_count?.departmentName}
            <div>
              <h3>Users</h3>
              {(profiles ?? EMPTY_ARRAY).map((profile: UserProfile) => (
                <div key={profile.email}>
                  <div>{profile.email}</div>
                  <div>{profile.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    )}
  </div>
);

export default Dashboard;

{
  /* */
}
