import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { EMPTY_ARRAY, NO_DATA } from 'common';
import { IDashboard } from 'pages/Dashboard/types';
import { selectStatistics } from 'store';

import dashboardStyles from '../../styles';
import {
  ALL_DEPARTMENTS_TITLE,
  CHART_TITLE,
  DEPARTMENTS_TITLE,
} from './constants';
import styles from './styles';

const InfoPanel: FC<
  Partial<Pick<IDashboard, 'departments'>> & { forDepartments?: boolean } & {
    forStaff?: boolean;
  }
> = ({ departments, forDepartments, forStaff }) => {
  const staffData = useSelector(selectStatistics);
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
        labels: (departments ?? EMPTY_ARRAY).map(
          (department) => department.companyName + `(${department.name})`,
        ),
        datasets: [
          {
            label: 'Staff',
            data: departments?.map(({ count }) => count),
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
            ? CHART_TITLE
            : DEPARTMENTS_TITLE}
        </h2>
      </div>
      <div className={styles['info-panel-wrapper']}>
        {forStaff ? (
          <>
            {!staffData.companiesCount &&
            !staffData.departmentsCount &&
            !staffData.staffCount ? (
              <p className={styles['no-data-item']}>{NO_DATA}</p>
            ) : (
              <Doughnut data={data} options={options} />
            )}
          </>
        ) : (
          <>
            {departments?.length ? (
              <>
                {departments[0].count ? (
                  <Doughnut data={data} options={options} />
                ) : (
                  <p className={styles['no-data-item']}>{NO_DATA}</p>
                )}
              </>
            ) : (
              <p className={styles['no-data-item']}>{NO_DATA}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default InfoPanel;
