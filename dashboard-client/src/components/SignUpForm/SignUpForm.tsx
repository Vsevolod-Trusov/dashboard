import { FC } from 'react';

import { Field, FormikProvider } from 'formik';
import signIn from 'pages/SignIn/styles';
import styles from './styles';
import { ISignUpForm, IStaffValues } from './types';

const SignUpForm: FC<ISignUpForm<IStaffValues>> = ({
  formik,
  forCreateStaff,
  handleSelectedCompany,
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
            <h2 className={styles['form-title__item']}>Staff</h2>
            <h3 className={styles['form-title__second']}>
              Enter your details below to create your account and get started
            </h3>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Name</label>
            <Field
              className={styles['field-wrapper__input']}
              id='username'
              name='username'
              type='text'
              placeholder='Name'
              touched={touched}
              error={errors.username}
            />
            <p className={styles['error']}>{errors.username}</p>
          </div>

          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Lastname</label>
            <Field
              className={styles['field-wrapper__input']}
              id='lastname'
              name='lastname'
              type='text'
              placeholder='Lastname'
              touched={touched}
              error={errors.lastname}
            />
            <p className={styles['error']}>{errors.lastname}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Password</label>
            <Field
              className={styles['field-wrapper__input']}
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              touched={touched}
              errors={errors.password}
            />
            <p className={styles['error']}>{errors.password}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Email</label>
            <Field
              className={styles['field-wrapper__input']}
              id='email'
              name='email'
              type='text'
              placeholder='Email'
              touched={touched}
              errors={errors.email}
            />
            <p className={styles['error']}>{errors.email}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__input']}>Confirm</label>
            <Field
              className={styles['field-wrapper__input']}
              id='confirm'
              name='confirm'
              type='password'
              placeholder='Password again'
              touched={touched}
              errors={errors.confirm}
            />
            <p className={styles['error']}>{errors.confirm}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__select']}>Company</label>
            <Field
              className={styles['field-wrapper__select']}
              id='companyName'
              name='companyName'
              as='select'
              touched={touched}
              errors={errors.companyName}
              onChange={handleSelectedCompany}
            >
              {forCreateStaff ? (
                <>
                  <option value='enter...'>Enter...</option>
                  {forCreateStaff.companyNames.map(({ name, id }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
                </>
              ) : (
                <option value='enter...'>Enter...</option>
              )}
            </Field>
            <p className={styles['error']}>{errors.companyName}</p>
          </div>
          <div className={styles['field-wrapper']}>
            <label htmlFor={styles['field-wrapper__select']}>Department</label>
            <Field
              className={styles['field-wrapper__select']}
              id='departmentName'
              name='departmentName'
              as='select'
              touched={touched}
              errors={errors.departmentName}
            >
              {forCreateStaff ? (
                <>
                  <option value='enter...'>Enter...</option>
                  {forCreateStaff.departmentNames.map((name, index) => (
                    <option key={index}>{name}</option>
                  ))}
                </>
              ) : (
                <option value='enter...'>Enter...</option>
              )}
            </Field>
            <p className={styles['error']}>{errors.departmentName}</p>
          </div>
          <div className={`${styles['field-wrapper']} ${styles['role']}`}>
            <label htmlFor={styles['field-wrapper__radio']}>
              Are you manager?
            </label>
            <Field
              className={styles['field-wrapper__radio']}
              type='checkbox'
              id='isManager'
              name='isManager'
              touched={touched}
              errors={errors.isManager}
            />
            <p className={styles['error']}>{errors.isManager}</p>
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
export default SignUpForm;
