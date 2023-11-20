import { FC, SyntheticEvent, useState } from 'react';
import { Button } from 'react-bootstrap';

import { EMPTY_ARRAY, NO_DATA } from 'common';
import {
  DepartmentOutput,
  DropModal,
  ProfileOutput,
  ProfilesOutput,
} from 'components';

import {
  DepartmentsWithCount,
  UserProfile,
} from '../../../../dashboard-server/src/types';
import { InfoPanel, Statistics } from './components';
import { styles as infoPanel } from './components/InfoPanel';
import {
  COMPANY_LABEL,
  DASHBOARD_TITLE,
  DEPARTMENT_LABEL,
  OPEN_MODAL_BUTTON_LABEL,
  STAFF_LABEL,
} from './constants';
import styles from './styles';
import { IDashboard } from './types';

const Dashboard: FC<IDashboard> = ({
  departments,
  handleDelete,
  setDepartmentId,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [profileOutput, setProfileOutput] = useState(false);
  const [departmentOutput, setDepartmentOutput] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>();
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsWithCount>();
  const [dropModalShow, setDropModalShow] = useState(false);
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
            {departments.length ? (
              <>
                {departments.map(
                  (
                    {
                      id,
                      count,
                      profiles,
                      name,
                      companyName,
                      createdAt,
                      description,
                    }: DepartmentsWithCount,
                    index,
                  ) => (
                    <div
                      className={styles['dashboard-item']}
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
                      <div className={styles['dashboard-item-wrapper']}>
                        <div
                          className={
                            styles['dashboard-item-wrapper__department']
                          }
                        >
                          {COMPANY_LABEL} {companyName}
                        </div>
                        <div
                          className={
                            styles['dashboard-item-wrapper__department']
                          }
                        >
                          {DEPARTMENT_LABEL} {name}
                        </div>
                        <div
                          className={styles['dashboard-item-wrapper__staff']}
                        >
                          {STAFF_LABEL} {count}
                        </div>
                        <div
                          className={
                            styles['dashboard-item-wrapper__open-profiles']
                          }
                        >
                          <Button
                            variant='primary'
                            size='sm'
                            onClick={(e: SyntheticEvent) => {
                              if (e.stopPropagation) e.stopPropagation();
                              setProfiles(profiles ?? EMPTY_ARRAY);
                              setModalShow(true);
                            }}
                          >
                            {OPEN_MODAL_BUTTON_LABEL}
                          </Button>
                        </div>
                      </div>
                      <button
                        type='button'
                        className={`btn-close btn-danger ${styles['dashboard-button-wrapper']}`}
                        aria-label='Close'
                        onClick={(e: SyntheticEvent) => {
                          if (e.stopPropagation) e.stopPropagation();
                          setDepartmentId(id);
                          setDropModalShow(true);
                        }}
                      ></button>
                    </div>
                  ),
                )}
              </>
            ) : (
              <div
                className={`${infoPanel['no-data-item']} ${infoPanel['no-data-item-block']} ${infoPanel['dashboard-mod']}`}
              >
                {NO_DATA}
              </div>
            )}
          </div>
          <ProfilesOutput
            data={profiles}
            show={modalShow}
            onHide={() => setModalShow(false)}
            selectProfile={setSelectedProfile}
            openProfileOutput={() => setProfileOutput(true)}
          />
          <ProfileOutput
            profile={selectedProfile}
            show={profileOutput}
            onHide={() => setProfileOutput(false)}
          />
          <DepartmentOutput
            department={selectedDepartment}
            show={departmentOutput}
            onHide={() => setDepartmentOutput(false)}
          />
          <DropModal
            dropAim='department'
            handleDelete={handleDelete}
            show={dropModalShow}
            onHide={() => setDropModalShow(false)}
          />
        </div>
        <Statistics />
      </div>
    </div>
  );
};

export default Dashboard;
