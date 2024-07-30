
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
export default function McdDialog({ show, handleClose, onConfirm }) {

    const [mcd, setMcd] = useState("");
    const handleInputChange = (e) => {
        setMcd(e.target.value);
    }
    const createMcd = () => {
        onConfirm(mcd);
        handleClose();
    }

    return (
        <>
            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création Modéle conceptuel DD</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nom du MCD</InputGroup.Text>
                        <Form.Control
                            id='attributValue'
                            aria-describedby="basic-addon1"
                            onChange={handleInputChange}
                        />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={createMcd}>
                        Créer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}