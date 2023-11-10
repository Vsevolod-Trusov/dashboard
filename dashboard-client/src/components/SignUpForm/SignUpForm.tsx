import { FC } from 'react';

import styles from './styles';
import signIn from 'components/SignInForm/styles';

const SignUpForm: FC = () => (
  <div className={styles['form-wrapper']}>
    <form action='' className={styles['form-main']}>
      <div className={styles['form-title']}>
        <div className={styles['logo-wrapper']}>
          <i className={`bi bi-box ${styles['logo-wrapper__item']}`} />
        </div>
        <h2 className={styles['form-title__item']}>Sign up</h2>
        <h3 className={styles['form-title__second']}>
          Enter your details below to create your account and get started
        </h3>
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__input']}>Name</label>
        <input
          className={styles['field-wrapper__input']}
          type='text'
          placeholder='Name'
        />
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__input']}>Lastname</label>
        <input
          className={styles['field-wrapper__input']}
          type='text'
          placeholder='Lastname'
        />
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__input']}>Email</label>
        <input
          className={styles['field-wrapper__input']}
          type='text'
          placeholder='Email'
        />
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__input']}>Password</label>
        <input
          className={styles['field-wrapper__input']}
          type='text'
          placeholder='Password'
        />
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__input']}>Confirm</label>
        <input
          className={styles['field-wrapper__input']}
          type='text'
          placeholder='Password again'
        />
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__select']}>Company</label>
        <select className={styles['field-wrapper__select']}>
          <option value='enter...'>Enter...</option>
        </select>
      </div>
      <div className={styles['field-wrapper']}>
        <label htmlFor={styles['field-wrapper__select']}>Department</label>
        <select className={styles['field-wrapper__select']}>
          <option value='enter...'>Enter...</option>
        </select>
      </div>
      <div className={`${styles['field-wrapper']} ${styles['role']}`}>
        <label htmlFor={styles['field-wrapper__radio']}>Are you manager?</label>
        <input
          className={styles['field-wrapper__radio']}
          type='radio'
          name='radio'
        />
      </div>

      <div className={`${signIn['submit']} ${styles['submit-position']}`}>
        <button className={signIn['submit__item']}>Submit</button>
      </div>

      <div className={`${signIn['links']} ${styles['links-position']}`}>
        <a className={signIn['links__forgotLink']} href='#'>
          Already have an account? Sign In
        </a>
      </div>
    </form>
  </div>
);
export default SignUpForm;
