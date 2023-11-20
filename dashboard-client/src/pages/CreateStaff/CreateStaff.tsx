import { FC } from 'react';

import { SignUpForm } from 'components';
import { IStaffValues } from 'components/SignUpForm';
import styles from 'pages/CreateDepartment/styles';
import { styles as dashboardStyles } from 'pages/Dashboard';

import { ADD_STAFF } from './constants';
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
              {ADD_STAFF}
            </h2>
          </div>
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
  );
};
export default CreateStaff;
