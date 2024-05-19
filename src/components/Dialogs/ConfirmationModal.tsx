import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from "@fortawesome/free-solid-svg-icons";
function ConfirmationModal({ onConfirm, handleClose, show, message }) {


    return (
        <>


            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="">
                    <div className="d-flex justify-content-center h1 text-danger"><FontAwesomeIcon icon={faWarning} /></div>
                    <div className="d-flex justify-content-center h4">{message}</div></div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Confirmer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ConfirmationModal;