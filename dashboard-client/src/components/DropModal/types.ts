import { Dispatch, SetStateAction } from 'react';

import { ModalProps } from 'react-bootstrap';
import {
  DepartmentsWithCount,
  UserProfile,
} from '../../../../dashboard-server/src/types';

export interface IModal extends ModalProps {
  selectedDepartment?: DepartmentsWithCount;
  selectedProfile?: UserProfile;
  dropAim?: string;
  department?: DepartmentsWithCount;
  handleDelete?: () => void;

  data?: UserProfile[];
  selectProfile?: Dispatch<SetStateAction<UserProfile | undefined>>;
  openProfileOutput?: () => void;
}
