import { EMPTY_ARRAY } from 'common';
import { Button, Modal } from 'react-bootstrap';

import { UserProfile } from '../../../../dashboard-server/src/types';
import styles from './styles';

const ProfilesOutput = ({ data, forManager, ...props }: any) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      scrollable
      centered
    >
      <Modal.Header className={styles['modal-header']} closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {forManager ? 'Manager' : 'Profiles'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        {(data ?? EMPTY_ARRAY).map((profile: UserProfile, index: any) => (
          <div className={styles['modal-body__item']} key={profile.email}>
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
