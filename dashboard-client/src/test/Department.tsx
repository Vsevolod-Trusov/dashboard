import { client } from 'index';
import { FC, useState } from 'react';

import { User as UserSelect } from 'types';

const Department: FC = () => {
  const [users, setUsers] = useState<UserSelect>([]);

  const getUsersByDepartment = async () => {
    const users = await client.departments.getUsersByDepartment.query({
      name: 'east-west',
    });
    setUsers(users);
    console.log(users);
    alert('GET USERS:');
  };

  const createDepartment = async () => {
    const dep = await client.departments.createDepartment.mutate({
      name: 'depName',
      description: 'some descr',
    });
    console.log('Dep', dep);
  };

  const removeDepartment = async () => {
    const removed = await client.departments.deleteDepartment.query({
      name: 'east-west',
    });
    console.log(removed);
  };

  return (
    <div>
      <h1>-----------Department--------</h1>
      <button onClick={getUsersByDepartment}>GetUsers by deps</button>
      <button onClick={createDepartment}>Create Dep</button>
      <button onClick={removeDepartment}>Remove Dep</button>
      <div>
        {(users ?? []).map((item, index) => (
          <div key={index}>
            <div>{item.email}</div>
            <div>{item.companyName}</div>
            <div>{item.departmentId}</div>
            <div>{item.credentialsId}</div>
            <div>Header{item.isHeader}</div>
          </div>
        ))}
      </div>
      <h1>-----------USER--------</h1>
    </div>
  );
};

export default Department;
