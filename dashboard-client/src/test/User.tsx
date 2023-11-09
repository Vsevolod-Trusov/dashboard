import { client } from 'index';
import { FC, useState } from 'react';

import { User as UserSelect } from 'types';

const User: FC = () => {
  const [users, setUsers] = useState<UserSelect>([]);

  const signUp = async () => {
    const user = await client.users.sigUp.mutate({
      name: 'vsevolod',
      lastname: 'trusov',
      password: 'qwerty',
      companyName: 'company',
      department: 'east-west',
      email: 'seva@mail.ru',
      role: 'user',
      isHeader: false,
    });
    console.log(user);
    alert('Sign Up');
  };

  const getUsers = async () => {
    const users = await client.users.getUsers.query();
    setUsers(users);
    alert('GET USERS:');
  };

  const removeUser = async () => {
    const removed = await client.users.deleteUser.query({
      email: 'seva@mail.ru',
    });
    console.log(removed);
    alert('Remove');
  };

  return (
    <div>
      <h1>-----------USER--------</h1>
      <button onClick={signUp}>SignUp</button>
      <button onClick={removeUser}>RemoveUser</button>
      <button onClick={getUsers}>GetUsers</button>
      <p>
        {(users ?? []).map((item, index) => (
          <div key={index}>
            <div>{item.email}</div>
            <div>{item.companyName}</div>
            <div>{item.departmentId}</div>
            <div>{item.credentialsId}</div>
          </div>
        ))}
      </p>
      <h1>-----------USER--------</h1>
    </div>
  );
};

export default User;
