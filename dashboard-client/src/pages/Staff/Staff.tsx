import { FC } from 'react';
import { Table } from 'react-bootstrap';

import { Statistics, styles as dashboardStyles } from 'pages/Dashboard';
import { DEPARTMENTS_TITLE, InfoPanel } from 'pages/Dashboard/components';
import styles from './styles';

import { IStaff } from './types';

const Staff: FC<IStaff> = ({ staff }) => (
  <div className={dashboardStyles['template-wrapper']}>
    <div className={dashboardStyles['template']}>
      <InfoPanel forStaff />
      <div className={dashboardStyles['dashboard-wrapper']}>
        <div className={dashboardStyles['dashboard-title']}>
          <h2 className={dashboardStyles['dashboard-title__item']}>
            {DEPARTMENTS_TITLE}
          </h2>
        </div>
        <div className={styles['table-wrapper']}>
          <Table striped bordered hover className={styles['table']}>
            <thead>
              <tr>
                <th>#</th>
                <th>email</th>
                <th>company</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(({ email, companyName }, index) => (
                <tr key={email}>
                  <td>{++index}</td>
                  <td>{email}</td>
                  <td>{companyName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Statistics />
    </div>
  </div>
);
export default Staff;
