import { FC } from 'react';

import { CompanyForm } from 'components';
import { ICompanyValues, ICreateCompany } from 'components/CompanyForm/types';
import styles from 'pages/CreateDepartment/styles';
import { styles as dashboardStyles } from 'pages/Dashboard';

import { ADD_COMPANY } from './constants';

const CreateCompany: FC<ICreateCompany<ICompanyValues>> = ({ formik }) => {
  return (
    <div className={dashboardStyles['template-wrapper']}>
      <div
        className={`${dashboardStyles['template']} ${styles['layout-size']}`}
      >
        <div
          className={`${dashboardStyles['dashboard-wrapper']} ${styles['form-layout']}`}
        >
          <div className={dashboardStyles['dashboard-title']}>
            <h2 className={dashboardStyles['dashboard-title__item']}>
              {ADD_COMPANY}
            </h2>
          </div>
          <div className={styles['form']}>
            <CompanyForm formik={formik} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCompany;
