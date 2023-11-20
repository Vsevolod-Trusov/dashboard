import { VALIDATION_ERRORS } from 'common';
import { object, string } from 'yup';

export const companyValidationSchema = object().shape({
  name: string().required(VALIDATION_ERRORS.INVALID_COMPANY_NAME),
});
