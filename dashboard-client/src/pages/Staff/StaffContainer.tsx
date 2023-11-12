import { FC, useEffect, useState } from 'react';

import { EMPTY_ARRAY } from 'common';

import Staff from './Staff';
import { client } from 'index';
import { UserProfile } from '../../../../dashboard-server/src/types';

const StaffContainer: FC = () => {
  const [staff, setStaff] = useState<UserProfile[]>(EMPTY_ARRAY);

  useEffect(() => {
    (async function () {
      const staff = await client.users.getUsers.query();
      setStaff(staff);
    })();
  }, []);

  return <Staff staff={staff} />;
};
export default StaffContainer;
