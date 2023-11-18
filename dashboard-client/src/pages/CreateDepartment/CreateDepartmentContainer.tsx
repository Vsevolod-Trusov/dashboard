import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CREATE_DEPARTMENT_INITIALS, EMPTY_ARRAY } from 'common';
import { departmentValidationSchema } from 'validation';
import { trpc } from 'index';

import CreateDepartment from './CreateDepartment';
import { CompanyType } from '../../../../dashboard-server/src/types';

const CreateDepartmentContainer: FC = () => {
  const [companies, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);
  const { mutate: createDepartment } =
    trpc.departments.createDepartment.useMutation();
  const { data: companiesData } = trpc.companies.getCompanyNames.useQuery();

  const formik = useFormik({
    initialValues: CREATE_DEPARTMENT_INITIALS,
    validationSchema: departmentValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name, companyId, description } = values;

      createDepartment({
        name,
        companyId,
        description,
      });
    },
  });

  useEffect(() => {
    (async function () {
      setCompanyNames(companiesData ?? EMPTY_ARRAY);
    })();
  }, [companiesData]);

  return <CreateDepartment formik={formik} companies={companies} />;
};
export default CreateDepartmentContainer;
