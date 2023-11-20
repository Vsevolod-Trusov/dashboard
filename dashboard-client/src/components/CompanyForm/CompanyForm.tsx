import { Field, FormikProvider } from 'formik';
import { FC } from 'react';

import { styles } from 'components/SignUpForm';
import signIn from 'pages/SignIn/styles';

import { ICompanyValues, ICreateCompany } from './types';

const DepartmentForm: FC<ICreateCompany<ICompanyValues>> = ({ formik }) => {
  const { errors, touched, handleSubmit } = formik;
  return (
    <div className={styles['form-wrapper']}>
      <FormikProvider value={formik}>
        <form className={styles['form-main']} onSubmit={handleSubmit}>
          <div className={styles['form-title']}>
            <div className={styles['logo-wrapper']}>
              <i className={`bi bi-box ${styles['logo-wrapper__item']}`} />
            </div>
            <h2 className={styles['form-title__item']}>Company</h2>
            <h3 className={styles['form-title__second']}>Enter company name</h3>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Name</label>
            <Field
              className={styles['field-wrapper__input']}
              id='name'
              name='name'
              type='text'
              placeholder='Name'
              touched={touched}
              error={errors.name}
            />
            <p className={styles['error']}>{errors.name}</p>
          </div>

          <div className={`${signIn['submit']} ${styles['submit-position']}`}>
            <button className={signIn['submit__item']} type='submit'>
              Create
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};
export default DepartmentForm;
