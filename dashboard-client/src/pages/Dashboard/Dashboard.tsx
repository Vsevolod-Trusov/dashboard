import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

import { ProfilesOutput } from 'components';
import { EMPTY_ARRAY } from 'common';

import { IDashboard } from './types';
import styles from './styles';
import { InfoPanel, Statistics } from './components';
import {
  COMPANY_LABEL,
  DASHBOARD_TITLE,
  DEPARTMENT_LABEL,
  OPEN_MODAL_BUTTON_LABEL,
  STAFF_LABEL,
} from './constants';
import {
  DepartmentWithProfiles,
  UserProfile,
} from '../../../../dashboard-server/src/types';

const Dashboard: FC<IDashboard> = ({ departments }) => {
  const [modalShow, setModalShow] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>(EMPTY_ARRAY);

  return (
    <div className={styles['template-wrapper']}>
      <div className={styles['template']}>
        <InfoPanel departments={departments} forDepartments={false} />
        <div className={styles['dashboard-wrapper']}>
          <div className={styles['dashboard-title']}>
            <h2 className={styles['dashboard-title__item']}>
              {DASHBOARD_TITLE}
            </h2>
          </div>
          <div className={styles['dashboard']}>
            {departments.map(
              ({ _count, profiles, names }: DepartmentWithProfiles, index) => (
                <div className={styles['dashboard-item']} key={index}>
                  <div className={styles['dashboard-item__department']}>
                    {COMPANY_LABEL} {names?.company.name}
                  </div>
                  <div className={styles['dashboard-item__department']}>
                    {DEPARTMENT_LABEL} {names?.name}
                  </div>
                  <div className={styles['dashboard-item__staff']}>
                    {STAFF_LABEL} {_count.departmentId}
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
                      {OPEN_MODAL_BUTTON_LABEL}
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
        <Statistics />
      </div>
    </div>
  );
};

export default Dashboard;
