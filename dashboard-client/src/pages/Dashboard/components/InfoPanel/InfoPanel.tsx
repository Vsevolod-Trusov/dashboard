import { FC, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { IDashboard } from 'pages/Dashboard/types';

import styles from './styles';
import {
  ALL_DEPARTMENTS_TITLE,
  DEPARTMENTS_TITLE,
  STAFF_TITLE,
} from './constants';
import dashboardStyles from '../../styles';
import { StatisticsContext } from 'context';

const InfoPanel: FC<
  Partial<Pick<IDashboard, 'departments'>> & { forDepartments?: boolean } & {
    forStaff?: boolean;
  }
> = ({ departments, forDepartments, forStaff }) => {
  const staffData = useContext(StatisticsContext);

  const data = forStaff
    ? {
        labels: Object.keys(staffData),
        datasets: [
          {
            label: 'Staff',
            data: Object.values(staffData),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 102, 86)',
              'rgb(45, 43, 86)',
            ],
            hoverOffset: 5,
          },
        ],
      }
    : {
        labels: departments?.map(({ departmentName }) => departmentName),
        datasets: [
          {
            label: 'Staff',
            data: departments?.map(({ _count }) => _count.departmentName),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(255, 102, 86)',
              'rgb(45, 43, 86)',
            ],
            hoverOffset: 5,
          },
        ],
      };

  const options = {
    responsive: true,
    legend: {
      display: true,
    },
  };

  return (
    <div className={styles['info-panel']}>
      <div className={dashboardStyles['dashboard-title']}>
        <h2 className={dashboardStyles['dashboard-title__item']}>
          {forDepartments
            ? ALL_DEPARTMENTS_TITLE
            : forStaff
            ? STAFF_TITLE
            : DEPARTMENTS_TITLE}
        </h2>
      </div>
      <div className={styles['info-panel-wrapper']}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
export default InfoPanel;
