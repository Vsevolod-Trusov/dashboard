import { EMPTY_ARRAY } from 'common';
import { Button, Modal } from 'react-bootstrap';

import { IModal } from 'components/DropModal/types';

import { UserProfile } from '../../../../dashboard-server/src/types';
import styles from './styles';

const ProfilesOutput = ({
  data,
  selectProfile,
  openProfileOutput,
  ...props
}: IModal) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      scrollable
      centered
    >
      <Modal.Header className={styles['modal-header']} closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Profiles</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        {(data ?? EMPTY_ARRAY).map((profile: UserProfile, index) => (
          <div
            className={styles['modal-body__item']}
            key={profile.email}
            onClick={() => {
              selectProfile && selectProfile(profile);
              props.onHide && props.onHide();
              openProfileOutput && openProfileOutput();
            }}
          >
            <div>
              {++index}. {profile.email}
            </div>
            <div>date: {profile.createdAt}</div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfilesOutput;
