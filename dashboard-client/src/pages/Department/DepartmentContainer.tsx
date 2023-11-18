import { FC, useEffect, useState } from 'react';

import { EMPTY_ARRAY } from 'common';
import { trpc } from 'index';

import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';
import Department from './Department';

const DepartmentContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentsWithCount[]>(EMPTY_ARRAY);
  const { data: departmentsData } =
    trpc.departments.getAllDepartments.useQuery();
  useEffect(() => {
    (async function () {
      const departments = departmentsData ?? EMPTY_ARRAY;
      setDepartments(departments);
    })();
  }, [departmentsData]);

  return <Department departments={departments} />;
};
export default DepartmentContainer;
