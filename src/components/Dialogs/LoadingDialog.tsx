
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
export default function LoadingDialog({ show, handleClose }) {


    return (
        <>
            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création Modéle conceptuel DD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-wrap container w-100 justify-content-center'>
                        <h5 className='flex-item w-100 justify-content-center my-2'>Votre MCD sera génerer dans un instant...</h5>
                        <div className="flex-item my-3">
                            <Spinner animation="border" role="status" />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}