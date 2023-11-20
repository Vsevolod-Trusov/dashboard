import { VALIDATION_ERRORS } from 'common';
import { object, string } from 'yup';

export const signInValidationSchema = object().shape({
  email: string()
    .required(VALIDATION_ERRORS.INVALID_EMAIL)
    .email(VALIDATION_ERRORS.INVALID_EMAIL),
  role: string().required(VALIDATION_ERRORS.INVALID_ROLE),
  password: string()
    .required(VALIDATION_ERRORS.INVALID_PASSWORD)
    .min(8, VALIDATION_ERRORS.MIN_PASSWORD),
});
