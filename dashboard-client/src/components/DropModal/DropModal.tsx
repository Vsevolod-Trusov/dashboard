import { Button, Modal } from 'react-bootstrap';

import styles from './styles';

const DropModal = ({ dropAim, ...props }: any) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header className={styles['modal-header']} closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        Confirm to remove {dropAim}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button
          className='btn btn-danger'
          onClick={() => {
            props.handleDelete();
            props.onHide();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DropModal;
