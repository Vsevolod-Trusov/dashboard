import { FC, useEffect, useState } from 'react';

import { client } from 'index';
import { EMPTY_ARRAY } from 'common';

import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';
import Department from './Department';

const DepartmentContainer: FC = () => {
  const [departments, setDepartments] =
    useState<DepartmentWithProfiles[]>(EMPTY_ARRAY);

  useEffect(() => {
    (async function () {
      const departments = await client.departments.getAllDepartments.query();
      console.log(departments);
      setDepartments(departments);
    })();
  }, []);

  return <Department departments={departments} />;
};
export default DepartmentContainer;
