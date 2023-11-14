import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CREATE_DEPARTMENT_INITIALS, EMPTY_ARRAY } from 'common';
import { client } from 'index';
import { departmentValidationSchema } from 'validation';

import CreateDepartment from './CreateDepartment';
import { CompanyType } from '../../../../dashboard-server/src/types';

const CreateDepartmentContainer: FC = () => {
  const [companies, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);

  const formik = useFormik({
    initialValues: CREATE_DEPARTMENT_INITIALS,
    validationSchema: departmentValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name, companyId, description } = values;

      const response = await client.departments.createDepartment.mutate({
        name,
        companyId,
        description,
      });

      if (!response) {
        alert('wrong create department request');
      } else {
        alert('Successfully');
      }
    },
  });

  useEffect(() => {
    (async function () {
      const companyNames = await client.companies.getCompanyNames.query();

      setCompanyNames(companyNames);
    })();
  }, []);

  return <CreateDepartment formik={formik} companies={companies} />;
};
export default CreateDepartmentContainer;
