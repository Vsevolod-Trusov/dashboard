import { FC, SyntheticEvent, useState } from 'react';
import { Button } from 'react-bootstrap';

import { NO_DATA, ZERO } from 'common';
import { DepartmentOutput, DropModal, ProfileOutput } from 'components';
import {
  DEPARTMENT_LABEL,
  InfoPanel,
  STAFF_LABEL,
  Statistics,
  styles as dashboardStyles,
} from 'pages/Dashboard';

import { styles as infoPanel } from 'pages/Dashboard/components/InfoPanel';
import {
  DepartmentsWithCount,
  UserProfile,
} from '../../../../dashboard-server/src/types';
import { DEPARTMENTS_TITLE, SHOW_OPEN_MODAL_BUTTON_TITLE } from './constants';
import styles from './styles';
import { IDepartment } from './types';

const Department: FC<IDepartment> = ({
  departments,
  setDepartmentId,
  handleDelete,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [dropModalShow, setDropModalShow] = useState(false);
  const [profile, setProfiles] = useState<UserProfile>();
  const [departmentOutput, setDepartmentOutput] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsWithCount>();

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
            {departments.length ? (
              <>
                {departments.map(
                  (
                    {
                      id,
                      name,
                      count,
                      profiles,
                      companyName,
                      description,
                      createdAt,
                    },
                    index,
                  ) => (
                    <div
                      className={styles['departments-item']}
                      key={index}
                      onClick={() => {
                        setSelectedDepartment({
                          id,
                          count,
                          name,
                          companyName,
                          description: description?.substring(0, 20),
                          createdAt,
                        });
                        setDepartmentOutput(true);
                      }}
                    >
                      <div className={styles['departments-item-wrapper']}>
                        <div
                          className={
                            styles['departments-item-wrapper__department-value']
                          }
                        >
                          {DEPARTMENT_LABEL} {name}
                        </div>
                        <div
                          className={styles['departments-item-wrapper__staff']}
                        >
                          {STAFF_LABEL} {count ?? ZERO}
                        </div>
                        <div
                          className={styles['departments-item-wrapper__staff']}
                        >
                          {createdAt}
                        </div>
                        <div
                          className={
                            styles['departments-item-wrapper__open-manager']
                          }
                        >
                          <Button
                            variant='primary'
                            size='sm'
                            onClick={(e: SyntheticEvent) => {
                              if (e.stopPropagation) e.stopPropagation();
                              const [profile] = new Array(profiles);
                              setProfiles(profile as unknown as UserProfile);
                              setModalShow(true);
                            }}
                          >
                            {SHOW_OPEN_MODAL_BUTTON_TITLE}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <button
                          type='button'
                          aria-label='Close'
                          className={`btn-close btn-danger ${styles['departments-button-wrapper']}`}
                          onClick={(e: SyntheticEvent) => {
                            if (e.stopPropagation) e.stopPropagation();
                            setDepartmentId(id);
                            setDropModalShow(true);
                          }}
                        ></button>
                      </div>
                    </div>
                  ),
                )}
              </>
            ) : (
              <p
                className={`${infoPanel['no-data-item']} ${infoPanel['no-data-item-block']} ${infoPanel['dashboard-mod']}`}
              >
                {NO_DATA}
              </p>
            )}
          </div>
          <ProfileOutput
            forManager
            profile={profile}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <DepartmentOutput
            department={selectedDepartment}
            show={departmentOutput}
            onHide={() => setDepartmentOutput(false)}
          />
          <DropModal
            dropAim='department'
            show={dropModalShow}
            handleDelete={handleDelete}
            onHide={() => setDropModalShow(false)}
          />
        </div>
        <Statistics />
      </div>
    </div>
  );
};
export default Department;
