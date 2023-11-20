import { FC } from 'react';

import { DepartmentForm } from 'components';
import { IDepartmentValues } from 'components/DepartmentForm/types';
import { styles as dashboardStyles } from 'pages/Dashboard';

import { ADD_DEPARTMENT } from './constants';
import styles from './styles';
import { ICreateDepartment } from './types';

const CreateDepartment: FC<ICreateDepartment<IDepartmentValues>> = ({
  companies,
  formik,
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
              {ADD_DEPARTMENT}
            </h2>
          </div>
          <DepartmentForm formik={formik} companies={companies} />
        </div>
      </div>
    </div>
  );
};
export default CreateDepartment;
