import { FC, useEffect, useState } from 'react';

import { EMPTY_ARRAY } from 'common';

import Department from './Department';
import { client } from 'index';
import { DepartmentWithProfiles } from '../../../../dashboard-server/src/types';

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
