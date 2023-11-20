import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';

import {
  CREATE_DEPARTMENT_INITIALS,
  EMPTY_ARRAY,
  NOTISTACK_DURATION,
  ROUTES,
} from 'common';
import { trpc } from 'index';
import { useNavigate } from 'react-router-dom';
import { departmentValidationSchema } from 'validation';

import { CompanyType } from '../../../../dashboard-server/src/types';
import CreateDepartment from './CreateDepartment';

const CreateDepartmentContainer: FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);
  const {
    mutate: createDepartment,
    error,
    isSuccess,
  } = trpc.departments.createDepartment.useMutation();
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
    setCompanyNames(companiesData ?? EMPTY_ARRAY);
  }, [companiesData]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Department added', {
        variant: 'success',
        autoHideDuration: NOTISTACK_DURATION,
      });
      navigate(ROUTES.DEPARTMENTS);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  return <CreateDepartment formik={formik} companies={companies} />;
};
export default CreateDepartmentContainer;
