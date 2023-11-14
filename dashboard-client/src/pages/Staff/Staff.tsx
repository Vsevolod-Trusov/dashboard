import { FC } from 'react';
import { Table } from 'react-bootstrap';

import { Statistics, styles as dashboardStyles } from 'pages/Dashboard';
import { InfoPanel, STAFF_TITLE } from 'pages/Dashboard/components';
import styles from './styles';

import { IStaff } from './types';

const Staff: FC<IStaff> = ({ staff }) => (
  <div className={dashboardStyles['template-wrapper']}>
    <div className={dashboardStyles['template']}>
      <InfoPanel forStaff />
      <div className={dashboardStyles['dashboard-wrapper']}>
        <div className={dashboardStyles['dashboard-title']}>
          <h2 className={dashboardStyles['dashboard-title__item']}>
            {STAFF_TITLE}
          </h2>
        </div>
        <div className={styles['table-wrapper']}>
          <Table striped bordered hover className={styles['table']}>
            <thead>
              <tr>
                <th>#</th>
                <th>email</th>
                <th>company</th>
                <th>createdAt</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(({ email, company, createdAt }, index) => (
                <tr key={email}>
                  <td>{++index}</td>
                  <td>{email}</td>
                  <td>{company?.name}</td>
                  <td>{createdAt}</td>
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
