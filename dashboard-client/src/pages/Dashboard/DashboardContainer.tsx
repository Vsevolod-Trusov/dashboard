import { FC, useEffect, useState } from 'react';

import { client } from 'index';
import { EMPTY_ARRAY } from 'common';

import Dashboard from './Dashboard';
import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';

const DashboardContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentWithProfiles[]>(EMPTY_ARRAY);

  useEffect(() => {
    (async () => {
      const data = await client.departments.getDepartments.query();
      setDepartments(data as DepartmentWithProfiles[]);
    })();
  }, []);

  return <Dashboard departments={departments} />;
};
export default DashboardContainer;
