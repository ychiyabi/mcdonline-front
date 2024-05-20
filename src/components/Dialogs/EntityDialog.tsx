import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
export default function EntityDialog({ show, handleClose, onConfirm }) {
    const [entity, setEntity] = useState("");
    const handleInputChange = (e) => {
        setEntity(e.target.value);
    }
    const createEntity = () => {
        onConfirm(entity);
        handleClose();
    }
    return (
        <>


            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création Entité</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">L'entité</InputGroup.Text>
                        <Form.Control
                            id='entityValue'
                            aria-describedby="basic-addon1"
                            onChange={handleInputChange}
                        />
                    </InputGroup>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={createEntity}>
                        Créer
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
} 