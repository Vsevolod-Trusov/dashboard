import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { EMPTY_ARRAY, EMPTY_STRING, NOTISTACK_DURATION } from 'common';
import { trpc } from 'index';
import { setStatistics } from 'store';

import { UserProfile } from '../../../../dashboard-server/src/types';
import Staff from './Staff';

const StaffContainer: FC = () => {
  const dispatch = useDispatch();
  const [staff, setStaff] = useState<UserProfile[]>(EMPTY_ARRAY);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>();
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [modalShow, setModalShow] = useState(false);
  const [profileOutput, setProfileOutput] = useState(false);
  const [staffId, setStaffId] = useState(EMPTY_STRING);
  const { data: staffData, refetch } = trpc.users.getUsers.useQuery();
  const { data: searchedData, refetch: get } =
    trpc.users.getUsersByName.useQuery(
      { name: searchName || EMPTY_STRING },
      { enabled: false },
    );
  const {
    mutate: deleteStaff,
    error,
    isSuccess,
  } = trpc.users.deleteUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async () => {
    await deleteStaff({ id: staffId });
  };

  const handleSearch = () => {
    get();
  };

  const handleGetAll = () => {
    refetch();
  };

  useEffect(() => {
    if (searchedData?.length) {
      setStaff(searchedData ?? EMPTY_ARRAY);
    } else {
      setStaff(staffData ?? EMPTY_ARRAY);
      dispatch(
        setStatistics({
          staffCount: (staffData ?? EMPTY_ARRAY).length,
        }),
      );
    }
  }, [staffData, searchedData]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: NOTISTACK_DURATION,
      });

      return;
    }

    if (isSuccess)
      enqueueSnackbar('Staff deleted', {
        variant: 'success',
        autoHideDuration: NOTISTACK_DURATION,
      });
  }, [error, isSuccess]);

  return (
    <Staff
      staff={staff}
      setDropModalShow={setModalShow}
      setStaffId={setStaffId}
      modalShow={modalShow}
      handleDelete={handleDelete}
      profileOutput={profileOutput}
      setProfileOutput={setProfileOutput}
      setSelectedProfile={setSelectedProfile}
      selectedProfile={selectedProfile}
      timer={timer}
      setTimer={setTimer}
      searchName={searchName}
      setSearchName={setSearchName}
      handleSearch={handleSearch}
      handleGetAll={handleGetAll}
    />
  );
};
export default StaffContainer;
