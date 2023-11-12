import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

import { ProfilesOutput } from 'components';
import { EMPTY_ARRAY } from 'common';

import {
  DepartmentWithProfiles,
  UserProfile,
} from '../../../../dashboard-server/src/types';
import { IDashboard } from './types';
import styles from './styles';

const Dashboard: FC<IDashboard> = ({ departments }) => {
  const [modalShow, setModalShow] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>(EMPTY_ARRAY);

  return (
    <div className={styles['template']}>
      <div className={styles['graph']}>GRAPH</div>
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
      <div className={styles['statistic']}>NUMBERS</div>
    </div>
  );
};

export default Dashboard;
