import { EMPTY_ARRAY } from 'common';
import { Button, Modal } from 'react-bootstrap';

import { UserProfile } from '../../../../dashboard-server/src/types';

const ProfilesOutput = ({ data, ...props }: any) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      scrollable
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Profiles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(data ?? EMPTY_ARRAY).map((profile: UserProfile) => (
          <div key={profile.email}>
            <div>{profile.email}</div>
            <div>{profile.createdAt}</div>
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
