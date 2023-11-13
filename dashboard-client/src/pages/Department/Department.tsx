import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';

import { EMPTY_ARRAY } from 'common';
import { ProfilesOutput } from 'components';
import {
  DEPARTMENT_LABEL,
  InfoPanel,
  STAFF_LABEL,
  Statistics,
  styles as dashboardStyles,
} from 'pages/Dashboard';

import { DEPARTMENTS_TITLE, SHOW_OPEN_MODAL_BUTTON_TITLE } from './constants';
import { UserProfile } from '../../../../dashboard-server/src/types';
import { IDepartment } from './types';
import styles from './styles';

const Department: FC<IDepartment> = ({ departments }) => {
  const [modalShow, setModalShow] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>(EMPTY_ARRAY);

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
            {departments.map(
              ({ departmentName, _count, profiles, createdAt }, index) => (
                <div className={styles['departments-item']} key={index}>
                  <div className={styles['departments-item__department-value']}>
                    {DEPARTMENT_LABEL} {departmentName}
                  </div>
                  <div className={styles['departments-item__staff']}>
                    {STAFF_LABEL} {_count.departmentName}
                  </div>
                  <div className={styles['departments-item__staff']}>
                    {createdAt}
                  </div>
                  <div className={styles['departments-item__open-manager']}>
                    <Button
                      variant='primary'
                      size='sm'
                      onClick={() => {
                        setProfiles(profiles);
                        setModalShow(true);
                      }}
                    >
                      {SHOW_OPEN_MODAL_BUTTON_TITLE}
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
          <ProfilesOutput
            data={profiles}
            forManager
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
