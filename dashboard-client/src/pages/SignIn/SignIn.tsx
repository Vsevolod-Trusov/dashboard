import { Field, FormikProvider } from 'formik';
import { FC } from 'react';

import { styles as SignUpStyles } from 'components/SignUpForm';

import { ROLES } from 'common';
import signIn from './styles';
import { ISignIn, ISignInValues } from './types';

const SignIn: FC<ISignIn<ISignInValues>> = ({ formik }) => {
  const { errors, touched, handleSubmit } = formik;

  return (
    <div className={signIn['form-wrapper']}>
      <FormikProvider value={formik}>
        <form className={signIn['form-main']} onSubmit={handleSubmit}>
          <div className={signIn['form-title']}>
            <div className={signIn['logo-wrapper']}>
              <i className={`bi bi-box ${signIn['logo-wrapper__item']}`} />
            </div>
            <h2 className={signIn['form-title__item']}>Sign In</h2>
            <h3 className={signIn['form-title__second']}>
              Glad to see you again. Login to your account below
            </h3>
          </div>
          <div className={signIn['field-wrapper']}>
            <label htmlFor={signIn['field-wrapper__input']}>Email</label>
            <Field
              className={signIn['field-wrapper__input']}
              id='email'
              name='email'
              type='text'
              placeholder='Email'
              touched={touched}
              error={errors.email}
            />
            <p className={SignUpStyles['error']}>{errors.email}</p>
          </div>
          <div className={signIn['field-wrapper']}>
            <label htmlFor={signIn['field-wrapper__input']}>Role</label>
            <Field
              className={signIn['field-wrapper__select']}
              id='role'
              name='role'
              as='select'
              touched={touched}
              errors={errors.role}
            >
              <>
                <option value='enter...'>Enter...</option>
                {ROLES.map((role, index) => (
                  <option key={index}>{role}</option>
                ))}
              </>
            </Field>
            <p className={SignUpStyles['error']}>{errors.role}</p>
          </div>
          <div className={signIn['field-wrapper']}>
            <label htmlFor={signIn['field-wrapper__input']}>Password</label>
            <Field
              className={signIn['field-wrapper__input']}
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              touched={touched}
              error={errors.password}
            />
            <p className={SignUpStyles['error']}>{errors.password}</p>
          </div>

          <div className={`${signIn['submit']}`}>
            <button className={signIn['submit__item']} type='submit'>
              Submit
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};
export default SignIn;
