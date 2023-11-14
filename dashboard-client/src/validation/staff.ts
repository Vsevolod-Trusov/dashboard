import { VALIDATION_ERRORS } from 'common';
import { boolean, object, string } from 'yup';

export const staffValidationSchema = object().shape({
  email: string()
    .required(VALIDATION_ERRORS.INVALID_EMAIL)
    .email(VALIDATION_ERRORS.INVALID_EMAIL),
  username: string().required(VALIDATION_ERRORS.INVALID_NAME),
  lastname: string().required(VALIDATION_ERRORS.INVALID_LASTNAME),
  departmentName: string().required(VALIDATION_ERRORS.INVALID_DEPARTMENT_NAME),
  companyName: string().required(VALIDATION_ERRORS.INVALID_COMPANY_NAME),
  password: string()
    .required(VALIDATION_ERRORS.INVALID_PASSWORD)
    .min(8, VALIDATION_ERRORS.MIN_PASSWORD),
  confirm: string()
    .required(VALIDATION_ERRORS.REQUIRED_CONFIRM)
    .min(8, VALIDATION_ERRORS.MIN_PASSWORD),
  isManager: boolean(),
});
