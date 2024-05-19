import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';


function AttributDialog({ onConfirm, handleClose, show }) {

    const [attribut, setAttribut] = useState("");
    const [primary, setPrimary] = useState("");
    const handleInputChange = (e) => {
        setAttribut(e.target.value);
    }
    const handleSwitchChange = (e) => {
        setPrimary(e.target.value);
    }

    const confirmCreation = () => {
        primary == 'on' ? setPrimary('1') : setPrimary('0')
        onConfirm(attribut, '0');
        handleClose();
    }

    return (
        <>


            <Modal size="md" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création Attribut</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <div className='d-flex justify-content-center'>
                            <div className='col'>
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="primaryKey"
                                    label="Clé primaire"
                                    onChange={handleSwitchChange}
                                />
                            </div>
                            <div className='col'>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">L'attribut</InputGroup.Text>
                                    <Form.Control
                                        id='attributValue'
                                        aria-describedby="basic-addon1"
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </div>

                        </div>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={confirmCreation}>
                        Créer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AttributDialog;