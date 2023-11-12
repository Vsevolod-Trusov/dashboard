import { FC, useEffect, useState } from 'react';

import { client } from 'index';
import { EMPTY_ARRAY } from 'common';

import Dashboard from './Dashboard';
import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';

const DashboardContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentWithProfiles[]>(EMPTY_ARRAY);

  const [departmentsCount, setDepartmentsCount] = useState<number>(0);
  const [companiesCount, setCompaniesCount] = useState<number>(0);
  const [staffCount, setStaffCount] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const data = await client.departments.getDepartments.query();
      setDepartments(data as DepartmentWithProfiles[]);

      const depCount = await client.departments.getDepartmentsCount.query();
      setDepartmentsCount(depCount as number);

      const staffCount = await client.users.getStaffCount.query();
      setStaffCount(staffCount as number);

      const companiesCount = await client.companies.getCompaniesCount.query();
      setCompaniesCount(companiesCount as number);
    })();
  }, []);

  return (
    <Dashboard
      departments={departments}
      statistics={{
        departmentsCount,
        companiesCount,
        staffCount,
      }}
    />
  );
};
export default DashboardContainer;
