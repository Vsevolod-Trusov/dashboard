import { FC, useEffect, useState } from 'react';

import { client } from 'index';
import { EMPTY_ARRAY } from 'common';

import Dashboard from './Dashboard';
import { DepartmentsAggregate } from '../../../../dashboard-server/src/types';

const DashboardContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentsAggregate>(EMPTY_ARRAY);

  useEffect(() => {
    (async () => {
      const data = await client.departments.getDepartments.query();
      setDepartments(data);
    })();
  }, []);

  return <Dashboard departments={departments} />;
};
export default DashboardContainer;
