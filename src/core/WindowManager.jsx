import {useEffect, useRef, useState} from "react";
import { Rnd } from "react-rnd";


export let INITIAL_Z = 1000;

export function getNextZ() {
    INITIAL_Z += 1;
    return INITIAL_Z;
}

export default function AppWindow({
    title,
    src,
    zIndex,
    fullscreen = false,
    minimized = false,
    onFocus,
    onMinimize,
    onClose,
    onFullscreen,
}) {
    const [state, setState] = useState({
        x: 200,
        y: 100,
    });
    const [isInteracting, setIsInteracting] = useState(false);

    const [opening, setOpening] = useState(true);

    useEffect(() => {
        requestAnimationFrame(() => setOpening(false));
    }, []);


    return (
        <Rnd
            size={fullscreen ? { width: "100vw", height: window.innerHeight - 48 } : { width: state.width, height: state.height }}
            position={fullscreen ? { x: 0, y: 0 } : { x: state.x, y: state.y }}

            disableDragging={fullscreen}
            enableResizing={!fullscreen}

            onDragStop={(e, d) => {
                setState(prev => ({ ...prev, x: d.x, y: d.y }));
                setIsInteracting(false);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setState({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    ...position,
                });
                setIsInteracting(false);
            }}
            onDragStart={() => { onFocus(); setIsInteracting(true); }}
            onResizeStart={() => setIsInteracting(true)}
            onDrag={() => setIsInteracting(true)}

            dragHandleClassName="titlebar"
            style={
            {
                zIndex, position: fullscreen ? "fixed" : "absolute",
                pointerEvents: minimized ? "none" : "auto",
            }
        }
            minWidth={200}
            minHeight={150}
        >
            <div
                style={{
                    opacity: minimized ? 0 : 1,
                    transition: isInteracting ? "none" : "transform 0.5s ease, opacity 0.5s ease",
                    transform: minimized
                        ? "translateY(200%)"
                        : opening
                            ? "translateY(200%)"
                            : "translateY(0)",
                    height: "100%",
                    border: "1px solid gray",
                    display: "flex",
                    flexDirection: "column",
                    background: "#111"
                }}
            >
                <div
                    className="titlebar"
                    style={{
                        cursor: "default",
                        background: "#222",
                        padding: "6px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>{title}</span>

                    <div>
                        <button onClick={onMinimize}>_</button>
                        <button onClick={onFullscreen}>
                            {fullscreen ? "❐" : "□"}
                        </button>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>

                <iframe
                    src={src}
                    style={{
                        flex: 1,
                        border: "none",
                        width: "100%",
                        height: "100%",
                        pointerEvents: isInteracting ? "none" : "auto"
                    }}
                    title={title}
                />
            </div>
        </Rnd>
    );
}