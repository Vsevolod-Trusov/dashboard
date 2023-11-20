import { Dispatch, SetStateAction } from 'react';

import { UserProfile } from '../../../../dashboard-server/src/types';

export interface IStaff {
  staff: UserProfile[];
  setStaffId: Dispatch<SetStateAction<string>>;
  setDropModalShow: Dispatch<SetStateAction<boolean>>;
  modalShow: boolean;
  handleDelete: () => void;
  setProfileOutput: Dispatch<SetStateAction<boolean>>;
  profileOutput: boolean;
  setSelectedProfile: React.Dispatch<
    React.SetStateAction<UserProfile | undefined>
  >;
  selectedProfile?: UserProfile | undefined;
  setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timer | undefined>>;
  timer?: NodeJS.Timer;
  setSearchName: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchName?: string;
  handleSearch: () => void;
  handleGetAll: () => void;
}
