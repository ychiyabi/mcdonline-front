import React, { useRef, useEffect, useState } from 'react';
import interact from 'interactjs';

const FlexibleLine = ({ onPositionChange }) => {
    const lineRef = useRef(null);
    const [linePosition, setLinePosition] = useState({ x: 0, y: 0 });
    const [lineRotation, setLineRotation] = useState(0);

    useEffect(() => {
        const interactInstance = interact(lineRef.current)
            .draggable({
                listeners: {
                    move(event) {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        target.style.transform = `translate(${x}px, ${y}px) rotate(${target.getAttribute('data-rotation') || 0}deg)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);

                        setLinePosition({ x, y });
                        onPositionChange({ x, y });
                    }
                }
            })
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move(event) {
                        const target = event.target;
                        const x = parseFloat(target.getAttribute('data-x')) || 0;
                        const y = parseFloat(target.getAttribute('data-y')) || 0;

                        target.style.width = event.rect.width + 'px';
                        target.style.height = event.rect.height + 'px';

                        const newX = x + event.deltaRect.left;
                        const newY = y + event.deltaRect.top;

                        target.style.transform = `translate(${newX}px, ${newY}px) rotate(${target.getAttribute('data-rotation') || 0}deg)`;

                        target.setAttribute('data-x', newX);
                        target.setAttribute('data-y', newY);

                        setLinePosition({ x: newX, y: newY });
                        onPositionChange({ x: newX, y: newY });
                    }
                }
            })
            .gesturable({
                onmove(event) {
                    const target = event.target;
                    const rotation = parseFloat(target.getAttribute('data-rotation')) || 0;
                    const newRotation = rotation + event.da;

                    target.style.transform = `translate(${linePosition.x}px, ${linePosition.y}px) rotate(${newRotation}deg)`;
                    target.setAttribute('data-rotation', newRotation);

                    setLineRotation(newRotation);
                }
            });

        interactInstance.on('resizemove', (event) => {
            const target = event.target;
            const x = parseFloat(target.getAttribute('data-x')) || 0;
            const y = parseFloat(target.getAttribute('data-y')) || 0;

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            const newX = x + event.deltaRect.left;
            const newY = y + event.deltaRect.top;

            target.style.transform = `translate(${newX}px, ${newY}px) rotate(${target.getAttribute('data-rotation') || 0}deg)`;

            target.setAttribute('data-x', newX);
            target.setAttribute('data-y', newY);

            setLinePosition({ x: newX, y: newY });
            onPositionChange({ x: newX, y: newY });
        });

        return () => {
            interactInstance.unset();
        };
    }, []);

    return (
        <div
            ref={lineRef}
            className="flexible-line"
        />
    );
};

export default FlexibleLine;
