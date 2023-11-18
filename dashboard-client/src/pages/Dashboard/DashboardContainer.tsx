import { FC, useEffect, useState } from 'react';

import { EMPTY_ARRAY } from 'common';
import { trpc } from 'index';

import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';
import Dashboard from './Dashboard';

const DashboardContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentsWithCount[]>(EMPTY_ARRAY);
  const { data: dashBoardData } = trpc.departments.getDepartments.useQuery();

  useEffect(() => {
    (async () => {
      setDepartments(dashBoardData as DepartmentsWithCount[]);
    })();
  }, [dashBoardData]);

  return <Dashboard departments={departments ?? EMPTY_ARRAY} />;
};
export default DashboardContainer;
