import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

import { ProfilesOutput } from 'components';
import { EMPTY_ARRAY } from 'common';

import {
  DepartmentWithProfiles,
  UserProfile,
} from '../../../../dashboard-server/src/types';
import { Doughnut } from 'react-chartjs-2';
import { IDashboard } from './types';
import styles from './styles';

const Dashboard: FC<IDashboard> = ({ departments, statistics }) => {
  const { departmentsCount, companiesCount, staffCount } = statistics;

  const [modalShow, setModalShow] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>(EMPTY_ARRAY);

  const data = {
    labels: departments.map(({ departmentName }) => departmentName),
    datasets: [
      {
        label: 'Staff',
        data: departments.map(({ _count }) => _count.departmentName),
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
    <div className={styles['template-wrapper']}>
      <div className={styles['template']}>
        <div className={styles['info-panel']}>
          <div className={styles['dashboard-title']}>
            <h2 className={styles['dashboard-title__item']}>Departments</h2>
          </div>
          <div className={styles['info-panel-wrapper']}>
            <Doughnut data={data} options={options} />
          </div>
        </div>
        <div className={styles['dashboard-wrapper']}>
          <div className={styles['dashboard-title']}>
            <h2 className={styles['dashboard-title__item']}>Dashboard</h2>
          </div>
          <div className={styles['dashboard']}>
            {departments.map(
              (
                { departmentName, _count, profiles }: DepartmentWithProfiles,
                index,
              ) => (
                <div className={styles['dashboard-item']} key={index}>
                  <div className={styles['dashboard-item__department']}>
                    Department: {departmentName}
                  </div>
                  <div className={styles['dashboard-item__staff']}>
                    Staff: {_count.departmentName}
                  </div>
                  <div className={styles['dashboard-item__open-profiles']}>
                    <Button
                      variant='primary'
                      size='sm'
                      onClick={() => {
                        setProfiles(profiles);
                        setModalShow(true);
                      }}
                    >
                      Show Profiles
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
          <ProfilesOutput
            data={profiles}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <div className={styles['info-panel']}>
          <div className={styles['dashboard-title']}>
            <h2 className={styles['dashboard-title__item']}>Statistics</h2>
          </div>
          <div className={styles['info-panel-wrapper']}>
            <div className={styles['statistics-content']}>
              <div>Companies:</div>
              <div>{companiesCount}</div>
            </div>
            <div className={styles['statistics-content']}>
              <div>Departments:</div>
              <div>{departmentsCount}</div>
            </div>
            <div className={styles['statistics-content']}>
              <div>Staff:</div>
              <div>{staffCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
