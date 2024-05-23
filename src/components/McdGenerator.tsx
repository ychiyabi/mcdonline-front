import axios from "axios";
import { useState, useEffect } from "react";
import interact from 'interactjs';
import Entity from "./mcdElements/Entity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject, faFileCirclePlus, faFolderPlus, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import RelationDialog from "./Dialogs/RelationDialog";
import EntityDialog from "./Dialogs/EntityDialog";
import McdDialog from "./Dialogs/McdDialog";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import LoadingDialog from "./Dialogs/LoadingDialog";

function McdGenerator({ updator, statesended }) {


    const [mcd_name, setMcdName] = useState("");
    const [relation_name, setRelationName] = useState("");
    const [mcd_uid, setMcdUid] = useState("");
    const [entity_name, setEntityName] = useState("");
    const [entity_id, setEntityId] = useState("");
    const position = { x: 0, y: 0 }
    const [entites, setEntites] = useState([]);
    const [updateParent, setUpdateParent] = useState(false);



    const downloadPDF = async () => {
        handleLoadingDialogShow();
        const content = document.getElementById('mcdContainer');

        if (!content) {
            console.error('Content not found!');
            return;
        }

        const canvas = await html2canvas(content, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Calculate the coordinates to center the image
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('download.pdf');
        handleLoadingDialogClose();

    }

    const changeUpdateParent = () => {
        setUpdateParent(!updateParent);
    }

    const generateMcd = (mcd_nom) => {
        setMcdName(mcd_nom);
        var data = new FormData();
        data.append('mcd_name', mcd_nom);
        var sessionid = localStorage.getItem("session_mcd_online")
        axios.post(process.env.NEXT_PUBLIC_API_URI + "/generateMcd", data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((res) => {
            console.log(res.data);
            setMcdUid(res.data);
            localStorage.setItem('mcd_uid', res.data);
            getEntitesByMcd();
        }).catch(error => {

        })
    }

    const createEntity = (entity) => {
        // Perform localStorage action
        const mcd = localStorage.getItem("mcd_uid");
        var data = new FormData();
        data.append("entity", entity);
        data.append("mcd", mcd);
        axios.post(process.env.NEXT_PUBLIC_API_URI + "/insertEntity", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }).then(res => {
            console.log(res.data);
            getEntitesByMcd();
        })
    }

    const createRelation = (name: string, entity_one: string, entity_two: string, card_one: string, card_two: string) => {
        var data = new FormData();
        const mcd = localStorage.getItem("mcd_uid");
        data.append('mcd_uid', mcd);
        data.append('name', name);
        data.append('entity_one', entity_one);
        data.append('entity_two', entity_two);
        data.append('car_one', card_one);
        data.append('car_two', card_two);
        axios.post(process.env.NEXT_PUBLIC_API_URI + "/insertRelation", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }).then(res => {
            getEntitesByMcd();
            console.log(res.data);
        })
    }

    //ANCHOR - Dialog Relation :smile:
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    //ANCHOR - Entity Dialog
    const [showEntityDialog, setShowEntityDialog] = useState(false);
    const handleEntityDialogClose = () => setShowEntityDialog(false);
    const handleEntityDialogShow = () => setShowEntityDialog(true);

    //ANCHOR - mcd Dialog
    const [showMcdDialog, setShowMcdDialog] = useState(false);
    const handleMcdDialogClose = () => setShowMcdDialog(false);
    const handleMcdDialogShow = () => setShowMcdDialog(true);

    //ANCHOR - Loading DIALOG
    const [showLoadingDialog, setShowLoadingialog] = useState(false);
    const handleLoadingDialogClose = () => setShowLoadingialog(false);
    const handleLoadingDialogShow = () => setShowLoadingialog(true);

    const getEntitesByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get(process.env.NEXT_PUBLIC_API_URI + "/getEntitesByMcd?mcd_uid=" + mcd, { withCredentials: true, }).then(res => {

            setEntites(res.data);
            console.log(entites);
            updator();

        })
    }




    useEffect(() => {
        interact('.draggableEntity').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                start(event) {

                    console.log(event.type, event.target)
                    console.log(event.target.style.transform);
                    const matrix = new DOMMatrix(event.target.style.transform);
                    position.x = matrix.m41;
                    position.y = matrix.m42;

                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);

                    var myentity = target;
                    var selectortwo = `[data-entityone="${target.getAttribute('data-myid')}"]`;
                    var selectorone = `[data-entitytwo="${target.getAttribute('data-myid')}"]`;
                    var elems = new Set([
                        ...document.querySelectorAll(selectorone),
                        ...document.querySelectorAll(selectortwo)
                    ]);

                    elems.forEach(element => {
                        var myrelation = element;
                        console.log(myrelation);
                        var myline = document.getElementById('line-' + target.getAttribute('data-myid') + "-" + myrelation.getAttribute("data-relation"));
                        var mycardinality = document.getElementById('cardinality-' + target.getAttribute("data-myid") + "-" + myrelation.getAttribute("data-relation"));
                        updateLinePosition(myentity, myrelation, myline, mycardinality);
                    });






                },
                onend: () => {

                },
            }
        });

        interact('.draggableRelation').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                start(event) {

                    console.log(event.type, event.target)
                    console.log(event.target.style.transform);
                    const matrix = new DOMMatrix(event.target.style.transform);
                    position.x = matrix.m41;
                    position.y = matrix.m42;

                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                    var myrelation = target;
                    var myentity1 = document.getElementById('entity-' + target.getAttribute("data-entityone"));
                    var myentity2 = document.getElementById('entity-' + target.getAttribute("data-entitytwo"));
                    var myline1 = document.getElementById('line-' + target.getAttribute("data-entityone") + "-" + target.getAttribute("data-relation"));
                    var myline2 = document.getElementById('line-' + target.getAttribute("data-entitytwo") + "-" + target.getAttribute("data-relation"));
                    var mycardinality1 = document.getElementById('cardinality-' + target.getAttribute("data-entityone") + "-" + target.getAttribute("data-relation"));
                    var mycardinality2 = document.getElementById('cardinality-' + target.getAttribute("data-entitytwo") + "-" + target.getAttribute("data-relation"));
                    updateLinePosition(myentity2, myrelation, myline2, mycardinality2);
                    updateLinePosition(myentity1, myrelation, myline1, mycardinality1);



                },
                onend: () => {

                },
            }
        });

        const updateLinePosition = (entity, relation, lineRelated, cardinality) => {
            const entity1Rect = relation.getBoundingClientRect();
            const entity2Rect = entity.getBoundingClientRect();
            const line = lineRelated;
            const cardinal = cardinality;

            const entity1CenterX = entity1Rect.left + window.scrollX + entity1Rect.width / 2;
            const entity1CenterY = entity1Rect.top + window.scrollY + entity1Rect.height / 2;
            const entity2CenterX = entity2Rect.left + window.scrollX + entity2Rect.width / 2;
            const entity2CenterY = entity2Rect.top + window.scrollY + entity2Rect.height / 2;

            const dx = entity2CenterX - entity1CenterX;
            const dy = entity2CenterY - entity1CenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            // Adjust the line position to touch the edges of the entities
            let entity1EdgeX = entity1CenterX;
            let entity1EdgeY = entity1CenterY;
            let entity2EdgeX = entity2CenterX;
            let entity2EdgeY = entity2CenterY;

            // Check if the line touches both entities
            const lineTouchesEntity1 = isLineTouchingEntity(entity1CenterX, entity1CenterY, entity1Rect.width, entity1Rect.height, entity2CenterX, entity2CenterY, line);
            const lineTouchesEntity2 = isLineTouchingEntity(entity2CenterX, entity2CenterY, entity2Rect.width, entity2Rect.height, entity1CenterX, entity1CenterY, line);

            if (!lineTouchesEntity1 && !lineTouchesEntity2) {
                // Move the entities closer together
                const newDistance = Math.min(entity1Rect.width / 2 + entity2Rect.width / 2, entity1Rect.height / 2 + entity2Rect.height / 2);
                const newDx = dx * newDistance / distance;
                const newDy = dy * newDistance / distance;
                entity1EdgeX += newDx / 2;
                entity1EdgeY += newDy / 2;
                entity2EdgeX -= newDx / 2;
                entity2EdgeY -= newDy / 2;
            }


            var ongle = 0;
            if (angle < 180 && angle > 90) {
                ongle = 180;
            }
            if (angle < 90) {
                ongle = 360;
            }

            if (angle < 0) {
                ongle = 360;
            }

            if (angle > -180 && angle < -90) {
                ongle = 180;
            }

            const zoom = (window.outerWidth - 10) / window.innerWidth

            line.style.width = `${distance}px`;
            line.style.transform = `rotate(${angle}deg)`;
            cardinal.style.transform = `rotate(${ongle}deg)`;
            line.style.left = `${entity1CenterX - (230 + (100 * zoom))}px`;
            line.style.top = `${entity1CenterY - 160}px`;
            console.log(zoom);

        };

        const isLineTouchingEntity = (entityCenterX, entityCenterY, entityWidth, entityHeight, lineX, lineY, line) => {
            const entityLeft = entityCenterX - entityWidth / 2;
            const entityRight = entityCenterX + entityWidth / 2;
            const entityTop = entityCenterY - entityHeight / 2;
            const entityBottom = entityCenterY + entityHeight / 2;

            const lineLeft = Math.min(entityLeft, entityRight);
            const lineRight = Math.max(entityLeft, entityRight);
            const lineTop = Math.min(entityTop, entityBottom);
            const lineBottom = Math.max(entityTop, entityBottom);

            return lineX >= lineLeft && lineX <= lineRight && lineY >= lineTop && lineY <= lineBottom;
        };

        getEntitesByMcd();

    }, [statesended, updateParent]);


    return (
        <>
            <RelationDialog show={show} entites={entites} onConfirm={createRelation} handleClose={handleClose} updator={getEntitesByMcd} />
            <EntityDialog show={showEntityDialog} onConfirm={createEntity} handleClose={handleEntityDialogClose} />
            <McdDialog show={showMcdDialog} onConfirm={generateMcd} handleClose={handleMcdDialogClose} />
            <LoadingDialog show={showLoadingDialog} handleClose={handleLoadingDialogClose} />
            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row">
                        <a href="#" className="btn btn-warning  btn-lg mx-2 " onClick={handleMcdDialogShow}><FontAwesomeIcon className="mx-2" icon={faFolderPlus} />Nouveau modéle conceptuel de données</a>
                        <a href="#" className="btn btn-success btn-lg mx-2" onClick={handleEntityDialogShow}><FontAwesomeIcon className="mx-2" icon={faFileCirclePlus} />Ajouter une entité </a>
                        <a href="#" className="btn btn-secondary  btn-lg mx-2" onClick={handleShow}><FontAwesomeIcon className="mx-2" icon={faDiagramProject} />Ajouter une association </a>
                        <a href="#" className="btn btn-info  btn-lg mx-2" onClick={downloadPDF}><FontAwesomeIcon className="mx-2" icon={faFilePdf} />Télécharger le MCD</a>
                        <h5 className="card-title">{mcd_name}</h5>
                    </div>
                </div>




                <div style={{
                    position: "relative"
                    , backgroundImage: "url('paper_mcd.png')",
                    backgroundRepeat: "repeat",
                    height: "100%"

                    , zIndex: 1
                }} id="mcdContainer">

                    {entites.map((item) => (
                        <>
                            {console.log(item.relations.name)}

                            <div className="draggableEntity class-diagram" key={item.id} id={'entity-' + item.id}
                                data-myid={item.id}
                            >
                                <Entity name={item.name} id={item.id} attributs={item.attributs} updator={updator} updatemyaprent={changeUpdateParent} />
                            </div>
                            {item.relations.map((relationship) => (
                                <>
                                    <div className="draggableRelation d-flex align-items-center justify-content-center" data-entitytwo={relationship.idEntityTwo} data-entityone={relationship.idEntityOne} key={relationship.id} data-relation={relationship.id} data-entity={item.id} id={'relation-' + item.id}

                                    >
                                        <div className="h5">{relationship.name}</div>

                                    </div >

                                    <div
                                        id={"line-" + relationship.idEntityOne + "-" + relationship.id}

                                        style={{
                                            position: "absolute",
                                            height: "2px",
                                            backgroundColor: "black",
                                            transformOrigin: "left center",
                                            zIndex: 2,
                                        }}
                                    >
                                        <div
                                            id={"cardinality-" + relationship.idEntityOne + "-" + relationship.id}
                                            className="d-flex justify-content-center h5">{relationship.cardinality_one}</div>
                                    </div>
                                    <div
                                        id={"line-" + relationship.idEntityTwo + "-" + relationship.id}

                                        style={{
                                            position: "absolute",
                                            height: "2px",
                                            backgroundColor: "black",
                                            transformOrigin: "left center",
                                            zIndex: 2,
                                        }}
                                    >
                                        <div
                                            id={"cardinality-" + relationship.idEntityTwo + "-" + relationship.id}
                                            className="d-flex justify-content-center h5">{relationship.cardinality_two}</div>

                                    </div >
                                </>
                            ))}

                        </>
                    ))}

                </div>


            </div >


        </>
    )
}
export default McdGenerator;