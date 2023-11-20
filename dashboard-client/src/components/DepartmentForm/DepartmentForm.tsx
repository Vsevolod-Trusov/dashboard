import { FC } from 'react';

import { styles } from 'components/SignUpForm';
import { Field, FormikProvider } from 'formik';
import { ICreateDepartment } from 'pages/CreateDepartment/types';
import signIn from 'pages/SignIn/styles';

import { IDepartmentValues } from './types';

const DepartmentForm: FC<ICreateDepartment<IDepartmentValues>> = ({
  formik,
  companies,
}) => {
  const { errors, touched, handleSubmit } = formik;
  return (
    <div className={styles['form-wrapper']}>
      <FormikProvider value={formik}>
        <form className={styles['form-main']} onSubmit={handleSubmit}>
          <div className={styles['form-title']}>
            <div className={styles['logo-wrapper']}>
              <i className={`bi bi-box ${styles['logo-wrapper__item']}`} />
            </div>
            <h2 className={styles['form-title__item']}>Department</h2>
            <h3 className={styles['form-title__second']}>
              Enter your details below to create your account and get started
            </h3>
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

          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Description</label>
            <Field
              className={styles['field-wrapper__input']}
              id='description'
              name='description'
              type='text'
              placeholder='Description'
              as='textarea'
              touched={touched}
              error={errors.description}
            />
            <p className={styles['error']}>{errors.description}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__select']}>Company</label>
            <Field
              className={styles['field-wrapper__select']}
              id='companyId'
              name='companyId'
              as='select'
              touched={touched}
              errors={errors.companyId}
            >
              {companies ? (
                <>
                  <option value='enter...'>Enter...</option>
                  {companies.map((company) => (
                    <option key={company?.id} value={company?.id}>
                      {company?.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value='enter...'>Enter...</option>
              )}
            </Field>
            <p className={styles['error']}>{errors.companyId}</p>
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
