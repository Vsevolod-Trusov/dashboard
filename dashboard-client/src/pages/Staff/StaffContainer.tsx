import { FC, useEffect, useState } from 'react';

import { EMPTY_ARRAY } from 'common';
import { trpc } from 'index';

import Staff from './Staff';
import { UserProfile } from '../../../../dashboard-server/src/types';

const StaffContainer: FC = () => {
  const [staff, setStaff] = useState<UserProfile[]>(EMPTY_ARRAY);

  const { data: staffData } = trpc.users.getUsers.useQuery();
  useEffect(() => {
    (async function () {
      setStaff(staffData ?? EMPTY_ARRAY);
    })();
  }, [staffData]);

  return <Staff staff={staff} />;
};
export default StaffContainer;
