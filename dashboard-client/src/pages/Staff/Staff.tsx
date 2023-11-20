/* eslint-disable no-extra-boolean-cast */
import { ChangeEvent, FC } from 'react';
import { Button, Table } from 'react-bootstrap';

import { EMPTY_STRING, NO_DATA } from 'common';
import { DropModal, ProfileOutput } from 'components';
import { styles as signUpStyles } from 'components/SignUpForm';
import { Statistics, styles as dashboardStyles } from 'pages/Dashboard';
import { InfoPanel, STAFF_TITLE } from 'pages/Dashboard/components';
import { styles as infoPanel } from 'pages/Dashboard/components/InfoPanel';

import styles from './styles';
import { IStaff } from './types';

const Staff: FC<IStaff> = ({
  staff,
  handleDelete,
  setDropModalShow,
  modalShow,
  setStaffId,
  profileOutput,
  setProfileOutput,
  selectedProfile,
  setSelectedProfile,
  setSearchName,
  timer,
  setTimer,
  handleSearch,
  handleGetAll,
}) => {
  return (
    <div className={dashboardStyles['template-wrapper']}>
      <div className={dashboardStyles['template']}>
        <InfoPanel forStaff />
        <div className={dashboardStyles['dashboard-wrapper']}>
          <div className={dashboardStyles['dashboard-title']}>
            <h2 className={dashboardStyles['dashboard-title__item']}>
              {STAFF_TITLE}
            </h2>
          </div>
          <div className={styles['layout']}>
            {staff.length ? (
              <>
                <div className={signUpStyles['field-wrapper']}>
                  <input
                    className={`${signUpStyles['field-wrapper__input']} ${styles['for-staff-page']}`}
                    type='text'
                    placeholder='Search by name'
                    onInput={async (e: ChangeEvent<HTMLInputElement>) => {
                      await setSearchName(e.target.value);
                      clearTimeout(timer);
                      const t = setTimeout(function () {
                        if (e.target.value) handleSearch();
                        else handleGetAll();
                      }, 500);
                      await setTimer(t);
                    }}
                  />
                </div>
                <div className={styles['table-wrapper']}>
                  <Table
                    striped
                    bordered
                    hover
                    className={styles['table-custom']}
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>email</th>
                        <th>company</th>
                        <th>createdAt</th>
                        <th>profile</th>
                        <th>delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((profile, index) => (
                        <tr key={profile.email}>
                          <td>{++index}</td>
                          <td>{profile.name}</td>
                          <td>{profile.email}</td>
                          <td>{profile.companyName}</td>
                          <td>{profile.createdAt}</td>
                          <td>
                            <Button
                              className='btn'
                              onClick={() => {
                                setSelectedProfile(profile);
                                setProfileOutput(true);
                              }}
                            >
                              Show
                            </Button>
                          </td>
                          <td>
                            <Button
                              className='btn btn-danger'
                              onClick={() => {
                                setStaffId(profile.id ?? EMPTY_STRING);
                                setDropModalShow(true);
                              }}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <p
                className={`${infoPanel['no-data-item']} ${infoPanel['no-data-item-block']}`}
              >
                {NO_DATA}
              </p>
            )}
          </div>
        </div>
        <Statistics />
      </div>
      <ProfileOutput
        profile={selectedProfile}
        show={profileOutput}
        onHide={() => setProfileOutput(false)}
      />
      <DropModal
        dropAim='staff'
        handleDelete={handleDelete}
        show={modalShow}
        onHide={() => setDropModalShow(false)}
      />
    </div>
  );
};
export default Staff;
