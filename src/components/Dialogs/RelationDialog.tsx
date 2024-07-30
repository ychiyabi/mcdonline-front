import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function RelationDialog({ entites, onConfirm, updator, handleClose, show }) {

    const onRelationCreate = () => {
        var relation = document.getElementById('relationName').value;
        var entity_one = document.getElementById('entiteOne').value;
        var entity_two = document.getElementById('entiteTwo').value;
        var card_one = document.getElementById('cardOne').value;
        var card_two = document.getElementById('cardTwo').value;
        onConfirm(relation, entity_one, entity_two, card_one, card_two);
        updator();
        handleClose();
    }

    return (
        <>



            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Création Association</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="d-flex flex-row w-50 my-4 mx-auto">
                        <label className="w-50 mt-2">Nom de la relation</label>
                        <input type="text" className="form-control w-50" id="relationName" />
                    </div>
                    <div className="row my-4">
                        <div className="col"><label className="mt-2">Cardinalité Entité une</label></div>
                        <div className="col"><select id="cardOne" className="form-select"><option value="1,1">1,1</option><option>1,n</option><option>0,n</option></select></div>
                        <div className="col"><label className="mt-2">Enité une</label></div>
                        <div className="col"><select id="entiteOne" className="form-select">{entites.map(function (data) {
                            return (<option value={data.id}>{data.name}</option>)
                        })}</select></div>
                    </div>
                    <div className="row my-4">
                        <div className="col"><label className="mt-2">Cardinalité Entité deux</label></div>
                        <div className="col"><select id="cardTwo" className="form-select"><option value="1,1">1,1</option><option>1,n</option><option>0,n</option></select></div>
                        <div className="col"><label className="mt-2">Enité deux</label></div>
                        <div className="col"><select id="entiteTwo" className="form-select">{entites.map(function (data) {
                            return (<option value={data.id}>{data.name}</option>)
                        })}</select></div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={onRelationCreate}>
                        Créer
                    </Button>
                </Modal.Footer>
            </Modal>



        </>
    )
}
export default RelationDialog;