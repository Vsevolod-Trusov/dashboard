import { FC } from 'react';

import styles from './styles';

const Form: FC = () => (
  <form action='' className={styles['form-main']}>
    <p className={styles['form-main__heading']}>Login</p>

    <div className={styles['inputContainer']}>
      <i className={`bi bi-person ${styles['inputContainer__inputIcon']}`} />
      <input
        type='text'
        className={styles['inputContainer__inputField']}
        id='username'
        placeholder='Username'
      />
    </div>

    <div className={styles['inputContainer']}>
      <i
        className={`bi bi-file-lock2-fill ${styles['inputContainer__inputIcon']}`}
      />
      <input
        type='password'
        className={styles['inputContainer__inputField']}
        id='password'
        placeholder='Password'
      />
    </div>

    <div className={styles['submit']}>
      <button className={styles['submit__item']}>Submit</button>
    </div>

    <div className={styles['links']}>
      <a className={styles['links__forgotLink']} href='#'>
        Sign Up?
      </a>
    </div>
  </form>
);
export default Form;
