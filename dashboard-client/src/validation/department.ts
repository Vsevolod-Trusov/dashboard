import { MAX_DESCRIPTION_LENGTH, VALIDATION_ERRORS } from 'common';
import { object, string } from 'yup';

export const departmentValidationSchema = object().shape({
  name: string().required(VALIDATION_ERRORS.INVALID_NAME),
  companyId: string().required(VALIDATION_ERRORS.INVALID_COMPANY_NAME),
  description: string()
    .required(VALIDATION_ERRORS.INVALID_DESCRIPTION)
    .max(MAX_DESCRIPTION_LENGTH, VALIDATION_ERRORS.MAX_DESCRIPTION),
});
