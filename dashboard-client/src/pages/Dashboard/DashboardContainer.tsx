import { FC, useEffect, useState } from 'react';

import { trpc } from 'index';
import { EMPTY_ARRAY } from 'common';

import Dashboard from './Dashboard';
import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';

const DashboardContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentWithProfiles[]>(EMPTY_ARRAY);
  const { data: dashBoardData } = trpc.departments.getDepartments.useQuery();

  useEffect(() => {
    (async () => {
      setDepartments(dashBoardData as DepartmentWithProfiles[]);
    })();
  }, [dashBoardData]);

  return <Dashboard departments={departments ?? EMPTY_ARRAY} />;
};
export default DashboardContainer;
