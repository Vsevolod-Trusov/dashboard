import { Button, Modal } from 'react-bootstrap';

import styles from './styles';

const DepartmentOutput = ({ department, ...props }: any) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      scrollable
      centered
    >
      <Modal.Header className={styles['modal-header']} closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Dapartment</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        {Object.keys(department ?? {}).map((key) => (
          <div key={key} className={styles['data-template']}>
            <div className={styles['data-template__item']}>
              <div>{key}</div>
              <div>{department[key]}</div>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DepartmentOutput;
