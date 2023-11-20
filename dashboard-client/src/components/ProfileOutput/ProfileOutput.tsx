import { Button, Modal } from 'react-bootstrap';

import { IModal } from 'components/DropModal/types';

import { NO_MANAGER, NO_PROFILE } from './constants';
import styles from './styles';

const ProfileOutput = ({ profile, forManager, ...props }: IModal) => {
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
          {forManager ? 'Manager' : 'Profile'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        {Object.keys(profile ?? {}).length ? (
          <>
            {Object.keys(profile ?? {}).map((key) => (
              <div key={key} className={styles['data-template']}>
                {typeof profile[key] === 'object' ? (
                  <div className={styles['item-template']}>
                    {Object.keys(profile[key]).map((innerKey) => (
                      <div
                        key={innerKey}
                        className={styles['item-template__element']}
                      >
                        <div>{innerKey}</div>
                        <div>{profile[key][innerKey]}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles['data-template__item']}>
                    <div>{key}</div>
                    <div>{profile[key]}</div>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div>{forManager ? NO_MANAGER : NO_PROFILE}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfileOutput;
