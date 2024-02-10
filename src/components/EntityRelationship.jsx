import React, { useRef, useEffect } from "react";
import interact from "interactjs";

const EntityRelationship = () => {
    const entity1Ref = useRef(null);
    const entity2Ref = useRef(null);
    const lineRef = useRef(null);
    const entity3Ref = useRef(null);
    const line2Ref = useRef(null);

    useEffect(() => {
        interact(entity1Ref.current).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);

                    updateLinePosition();
                },
            },
        });

        interact(entity2Ref.current).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);

                    updateLinePosition();
                    updateLinePositionSecond();
                },
            },
        });

        interact(entity3Ref.current).draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: "parent",
                    endOnly: true,
                }),
            ],
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);

                    updateLinePositionSecond();
                },
            },
        });

        const updateLinePosition = () => {
            const entity1Rect = entity1Ref.current.getBoundingClientRect();
            const entity2Rect = entity2Ref.current.getBoundingClientRect();
            const line = lineRef.current;

            const entity1CenterX = entity1Rect.left + entity1Rect.width / 2;
            const entity1CenterY = entity1Rect.top + entity1Rect.height / 2;
            const entity2CenterX = entity2Rect.left + entity2Rect.width / 2;
            const entity2CenterY = entity2Rect.top + entity2Rect.height / 2;

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

            line.style.width = `${distance}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.left = `${entity1EdgeX}px`;
            line.style.top = `${entity1EdgeY - 50}px`;
        };

        const updateLinePositionSecond = () => {
            const entity1Rect = entity3Ref.current.getBoundingClientRect();
            const entity2Rect = entity2Ref.current.getBoundingClientRect();
            const line = line2Ref.current;

            const entity1CenterX = entity1Rect.left + entity1Rect.width / 2;
            const entity1CenterY = entity1Rect.top + entity1Rect.height / 2;
            const entity2CenterX = entity2Rect.left + entity2Rect.width / 2;
            const entity2CenterY = entity2Rect.top + entity2Rect.height / 2;

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

            line.style.width = `${distance}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.left = `${entity1EdgeX}px`;
            line.style.top = `${entity1EdgeY - 50}px`;
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

    }, []);

    return (
        <div style={{ position: "relative", height: "300px", width: "500px" }}>
            <div
                ref={entity1Ref}
                data-x={0}
                data-y={0}
                style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "blue",
                    position: "absolute",
                    left: "50px",
                    top: "100px",
                    cursor: "move",
                }}
            ></div>
            <div
                ref={entity2Ref}
                data-x={0}
                data-y={0}
                style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "green",
                    position: "absolute",
                    left: "200px",
                    top: "150px",
                    cursor: "move",
                }}
            ></div>
            <div
                ref={lineRef}
                style={{
                    position: "absolute",
                    height: "2px",
                    backgroundColor: "black",
                    transformOrigin: "left center",
                    zIndex: -1,
                }}
            ></div>

            <div
                ref={entity3Ref}
                data-x={0}
                data-y={0}
                style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "green",
                    position: "absolute",
                    left: "200px",
                    top: "180px",
                    cursor: "move",
                }}
            ></div>
            <div
                ref={line2Ref}
                style={{
                    position: "absolute",
                    height: "2px",
                    backgroundColor: "black",
                    transformOrigin: "left center",
                    zIndex: -1,
                }}
            ></div>
        </div>
    );
};

export default EntityRelationship;
