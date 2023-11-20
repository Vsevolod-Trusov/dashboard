import { useFormik } from 'formik';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CREATE_STAFF_INITIALS,
  EMPTY_ARRAY,
  EMPTY_STRING,
  NOTISTACK_DURATION,
  ROUTES,
} from 'common';
import { trpc } from 'index';
import { staffValidationSchema } from 'validation';

import { enqueueSnackbar } from 'notistack';
import { CompanyType } from '../../../../dashboard-server/src/types';
import CreateStaff from './CreateStaff';

const CreateStaffContainer: FC = () => {
  const navigate = useNavigate();
  const [departmentsNames, setDepartmentsNames] =
    useState<string[]>(EMPTY_ARRAY);
  const [companyNames, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);
  const [companyId, setCompanyId] = useState<string>(EMPTY_STRING);
  const { refetch } = trpc.departments.getDepartmentsNames.useQuery(companyId);
  const { data: companyData } = trpc.companies.getCompanyNames.useQuery();
  const { mutate: signIn, error, isSuccess } = trpc.users.signUp.useMutation();

  const formik = useFormik({
    initialValues: CREATE_STAFF_INITIALS,
    validationSchema: staffValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const {
        username,
        lastname,
        email,
        password,
        confirm,
        isManager,
        companyName,
        departmentName,
      } = values;

      if (password !== confirm) {
        enqueueSnackbar('wrong confirm password, try again', {
          variant: 'error',
          autoHideDuration: NOTISTACK_DURATION,
        });
      }

      signIn({
        name: username,
        lastname,
        role: isManager ? 'manager' : 'user',
        email,
        password,
        isHeader: isManager,
        companyName,
        departmentName,
      });
    },
  });

  const handleSelectedCompany = async (e: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    await setCompanyId(e.target.value);
    const { data: departmentsData } = await refetch(); // e.currentTarget.value
    setDepartmentsNames(departmentsData ?? EMPTY_ARRAY);
  };

  useEffect(() => {
    setCompanyNames(companyData ?? EMPTY_ARRAY);
  }, [companyData]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Staff added', {
        variant: 'success',
        autoHideDuration: NOTISTACK_DURATION,
      });
      navigate(ROUTES.STAFF);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  return (
    <CreateStaff
      formik={formik}
      departmentNames={departmentsNames}
      companyNames={companyNames}
      handleSelectedCompany={handleSelectedCompany}
    />
  );
};
export default CreateStaffContainer;
