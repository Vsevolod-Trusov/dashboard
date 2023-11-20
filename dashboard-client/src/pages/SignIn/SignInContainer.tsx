import { NOTISTACK_DURATION, ROUTES, SIGN_IN_INITIALS } from 'common';
import { useFormik } from 'formik';
import { trpc } from 'index';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { signInValidationSchema } from 'validation/signIn';

import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

const SignInContainer = () => {
  const { mutate: signIn, error, isSuccess } = trpc.users.signIn.useMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: SIGN_IN_INITIALS,
    validationSchema: signInValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { email, password, role } = values;

      signIn({
        email,
        password,
        role,
      });
    },
  });

  if (isSuccess) {
    enqueueSnackbar('Sign in successful', {
      variant: 'success',
      autoHideDuration: NOTISTACK_DURATION,
    });
    navigate(ROUTES.MAIN);
  }

  useEffect(() => {
    if (error)
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: NOTISTACK_DURATION,
      });
  }, [error]);

  return <SignIn formik={formik} />;
};
export default SignInContainer;
