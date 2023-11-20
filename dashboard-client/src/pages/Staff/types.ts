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
  setSelectedProfile: Dispatch<SetStateAction<UserProfile | undefined>>;
  selectedProfile?: UserProfile | undefined;
  setTimer: Dispatch<SetStateAction<NodeJS.Timer | undefined>>;
  timer?: NodeJS.Timer;
  setSearchName: Dispatch<SetStateAction<string | undefined>>;
  searchName?: string;
  handleSearch: () => void;
  handleGetAll: () => void;
}
