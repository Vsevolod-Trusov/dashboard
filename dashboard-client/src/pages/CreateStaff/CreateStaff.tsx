import { FC } from 'react';

import { styles as dashboardStyles } from 'pages/Dashboard';
import { IStaffValues } from 'components/SignUpForm';
import { SignUpForm } from 'components';

import { ADD_STFF } from './constants';
import styles from './styles';
import { ICreateStaff } from './types';

const CreateStaff: FC<ICreateStaff<IStaffValues>> = ({
  departmentNames,
  companyNames,
  formik,
  handleSelectedCompany,
}) => {
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
              {ADD_STFF}
            </h2>
          </div>
          <div className={styles['form']}>
            <SignUpForm
              formik={formik}
              forCreateStaff={{
                departmentNames,
                companyNames,
              }}
              handleSelectedCompany={handleSelectedCompany}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateStaff;
