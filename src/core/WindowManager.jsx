import {useEffect, useState} from "react";
import { Rnd } from "react-rnd";
import "../styles/core/WindowManager.css"
import { X, Square, Copy, Minus } from 'lucide-react';

export let INITIAL_Z = 1000;

export function getNextZ() {
    INITIAL_Z += 1;
    return INITIAL_Z;
}

export default function AppWindow({
    title,
    src,
    imgSrc,
    zIndex,
    fullscreen = false,
    minimized = false,
    onFocus,
    onMinimize,
    onClose,
    onFullscreen,
    posX,
    posY
}) {
    const DEFAULT_WIDTH = 600;
    const DEFAULT_HEIGHT = 400;
    const TASKBAR_HEIGHT = 48;

    const [state, setState] = useState({
        x: posX,
        y: posY,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    });
    const [isInteracting, setIsInteracting] = useState(false);

    const [opening, setOpening] = useState(true);

    useEffect(() => {
        requestAnimationFrame(() => setOpening(false));
    }, []);


    return (
        <Rnd
            bounds="parent"
            dragGrid={[1, 1]}
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
            minWidth={300}
            minHeight={200}
            maxHeight={window.innerHeight - TASKBAR_HEIGHT}
            maxWidth={window.innerWidth}
        >
            <div
                className={"window"}
                style={{
                    opacity: minimized ? 0 : 1,
                    transition: isInteracting ? "none" : "transform 0.5s ease, opacity 0.5s ease",
                    transform: minimized
                        ? "translateY(200%)"
                        : opening
                            ? "translateY(200%)"
                            : "translateY(0)",
                    borderRadius: fullscreen ? 0 : 10,
                }}
            >
                <div
                    className="titlebar"
                    style={{
                        borderRadius: fullscreen ? 0 : "10px 10px 0 0",
                    }}
                >
                    <div className="title">
                        <img className={"icon"} src={ imgSrc } alt={"icon"}/>
                        <span>{title}</span>
                    </div>
                    <div className={"controls"}>
                        <button className={"control-item minimize"} onClick={onMinimize}>
                            <Minus size={15}/>
                        </button>
                        <button className={"control-item fullscreen"} onClick={onFullscreen}>
                            {fullscreen ? <Copy size={12} style={{transform: "scaleX(-1)"}}/> : <Square size={11}/>}
                        </button>
                        <button
                            style={{
                                borderRadius: fullscreen ? 0 : "0 9px 0 0",
                            }}
                            className={"control-item close"} onClick={onClose}>
                            <X size={15}/>
                        </button>
                    </div>
                </div>

                <iframe
                    className={"window-obj"}
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