import {useEffect, useRef, useState} from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";


export let INITIAL_Z = 1000;

export function getNextZ() {
    INITIAL_Z += 1;
    return INITIAL_Z;
}

export default function AppWindow({
    title,
    src,
    zIndex,
    width = 600,
    height = 400,
    fullscreen = false,
    minimized = false,
    onFocus,
    onMinimize,
    onClose,
    onFullscreen,
}) {
    const nodeRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const [opening, setOpening] = useState(true);

    useEffect(() => {
        requestAnimationFrame(() => setOpening(false));
    }, []);


    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".titlebar"
            disabled={fullscreen}
            position={fullscreen ? { x: 0, y: 0 } : pos}
            onDrag={(e, data) => setPos({ x: data.x, y: data.y })}
            onStart={onFocus}
        >
            <div
                ref={nodeRef}
                onMouseDownCapture={onFocus}
                style={{
                    position: fullscreen ? "fixed" : "absolute",
                    zIndex,
                    top: fullscreen ? 0 : undefined,
                    left: fullscreen ? 0 : undefined,
                    width: fullscreen ? "100vw" : undefined,
                    height: fullscreen ? "calc(100vh - 48px)" : undefined,
                    transform: fullscreen ? "none" : undefined,
                    pointerEvents: minimized ? "none" : "auto",
                }}
            >
                <ResizableBox
                    width={fullscreen ? window.innerWidth : width}
                    height={fullscreen ? window.innerHeight - 48 : height}
                    resizeHandles={fullscreen ? [] : undefined}
                >
                    <div
                        style={{
                            opacity: minimized ? 0 : 1,
                            transition: "transform 0.5s ease, opacity 0.5s ease",
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
                                cursor: "move",
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
                                    height: "100%"
                                }}
                                title={title}
                            />
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
}