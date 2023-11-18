import { Button, Modal } from 'react-bootstrap';

import styles from './styles';
import { NO_MANAGER } from './constants';

const ProfilesOutput = ({ profile, ...props }: any) => {
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
          {'Manager'}
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
          <div>{NO_MANAGER}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfilesOutput;
