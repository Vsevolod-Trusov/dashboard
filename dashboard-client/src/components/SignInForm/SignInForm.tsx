import { FC } from 'react';

import signIn from './styles';

const SignInForm: FC = () => (
  <div className={signIn['form-wrapper']}>
    <form action='' className={signIn['form-main']}>
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
        <input
          className={signIn['field-wrapper__input']}
          type='text'
          placeholder='Email'
        />
      </div>
      <div className={signIn['field-wrapper']}>
        <label htmlFor={signIn['field-wrapper__input']}>Password</label>
        <input
          className={signIn['field-wrapper__input']}
          type='text'
          placeholder='Password'
        />
      </div>

      <div className={`${signIn['submit']}`}>
        <button className={signIn['submit__item']}>Submit</button>
      </div>

      <div className={`${signIn['links']}`}>
        <a className={signIn['links__forgotLink']} href='#'>
          Do not have an account? Sign Up
        </a>
      </div>
    </form>
  </div>
);
export default SignInForm;
