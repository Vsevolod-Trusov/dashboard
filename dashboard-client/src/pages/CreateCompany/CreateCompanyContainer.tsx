import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CREATE_COMPANY_INITIALS, NOTISTACK_DURATION, ROUTES } from 'common';
import { trpc } from 'index';
import { enqueueSnackbar } from 'notistack';
import { companyValidationSchema } from 'validation';

import CreateCompany from './CreateCompany';

const CreateCompanyContainer: FC = () => {
  const {
    mutate: createCompany,
    error,
    isSuccess,
  } = trpc.companies.createCompany.useMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: CREATE_COMPANY_INITIALS,
    validationSchema: companyValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { name } = values;

      createCompany(name);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Company added', {
        variant: 'success',
        autoHideDuration: NOTISTACK_DURATION,
      });
      navigate(ROUTES.MAIN);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [error]);

  return <CreateCompany formik={formik} />;
};
export default CreateCompanyContainer;
