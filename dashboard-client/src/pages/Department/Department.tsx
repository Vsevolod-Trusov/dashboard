import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

import {
  DEPARTMENT_LABEL,
  InfoPanel,
  STAFF_LABEL,
  Statistics,
  styles as dashboardStyles,
} from 'pages/Dashboard';
import { ManagerOutput } from 'components';

import { DEPARTMENTS_TITLE, SHOW_OPEN_MODAL_BUTTON_TITLE } from './constants';
import { UserProfile } from '../../../../dashboard-server/src/types';
import { IDepartment } from './types';
import styles from './styles';

const Department: FC<IDepartment> = ({ departments }) => {
  const [modalShow, setModalShow] = useState(false);
  const [profile, setProfiles] = useState<UserProfile>();

  return (
    <div className={dashboardStyles['template-wrapper']}>
      <div className={dashboardStyles['template']}>
        <InfoPanel departments={departments} forDepartments />
        <div className={dashboardStyles['dashboard-wrapper']}>
          <div className={dashboardStyles['dashboard-title']}>
            <h2 className={dashboardStyles['dashboard-title__item']}>
              {DEPARTMENTS_TITLE}
            </h2>
          </div>
          <div className={styles['departments']}>
            {departments.map(({ name, count, profiles, createdAt }, index) => (
              <div className={styles['departments-item']} key={index}>
                <div className={styles['departments-item__department-value']}>
                  {DEPARTMENT_LABEL} {name}
                </div>
                <div className={styles['departments-item__staff']}>
                  {STAFF_LABEL} {count}
                </div>
                <div className={styles['departments-item__staff']}>
                  {createdAt}
                </div>
                <div className={styles['departments-item__open-manager']}>
                  <Button
                    variant='primary'
                    size='sm'
                    onClick={() => {
                      const [profile] = new Array(profiles);
                      setProfiles(profile as unknown as UserProfile);
                      setModalShow(true);
                    }}
                  >
                    {SHOW_OPEN_MODAL_BUTTON_TITLE}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ManagerOutput
            profile={profile}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <Statistics />
      </div>
    </div>
  );
};
export default Department;
