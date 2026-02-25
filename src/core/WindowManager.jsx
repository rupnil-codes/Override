import {useEffect, useState} from "react";
import { Rnd } from "react-rnd";
import "../styles/core/WindowManager.css"
import {X, Square, Copy, Minus, Plus} from 'lucide-react';

export default function AppWindow({
    title,
    AppComponent,
    imgSrc,
    tabs,
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
    const PADDING = 36;

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

    const handleDrag = (e, d) => {
        setState(prev => ({ ...prev, x: d.x, y: d.y }));
        setIsInteracting(true);
    };

    const handleDragStop = (e, d) => {
        let newX = d.x;
        let newY = d.y;

        if (newX > window.innerWidth - PADDING) {
            newX = window.innerWidth - PADDING;
        }
        if (newX < -state.width + PADDING) {
            newX = -state.width + PADDING;
        }
        if (newY > window.innerHeight - TASKBAR_HEIGHT - PADDING) {
            newY = window.innerHeight - TASKBAR_HEIGHT - PADDING;
        }

        if (newY < 0) {
            newY = 0;
        }

        setState(prev => ({ ...prev, x: newX, y: newY }));
        setIsInteracting(false);
    };


    return (
        <Rnd
            cancel=".readme-body"
            resizeHandleStyles={{
                top: { cursor: 'ns-resize' },
                bottom: { cursor: 'ns-resize' },
                left: { cursor: 'ew-resize' },
                right: { cursor: 'ew-resize' },
                topRight: { cursor: 'nesw-resize' },
                bottomRight: { cursor: 'nwse-resize' },
                bottomLeft: { cursor: 'nesw-resize' },
                topLeft: { cursor: 'nwse-resize' },
            }}

            bounds=""
            dragGrid={[1, 1]}
            size={fullscreen ? { width: "100vw", height: window.innerHeight - 48 } : { width: state.width, height: state.height }}
            position={fullscreen ? { x: 0, y: 0 } : { x: state.x, y: state.y }}

            disableDragging={fullscreen}
            enableResizing={!fullscreen}

            onDrag={handleDrag}
            onDragStop={handleDragStop}

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

            dragHandleClassName="titlebar"
            style={
            {
                zIndex, position: fullscreen ? "fixed" : "absolute",
                pointerEvents: minimized ? "none" : "auto",
            }
        }
            minWidth={450}
            minHeight={300}

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
                    borderRadius: fullscreen ? 0 : 8,
                }}
            >
                { tabs ?
                    <div
                        className="titlebar"
                        style={{
                        borderRadius: fullscreen ? 0 : "8px 8px 0 0",
                    }}
                >
                    <div className={"title-tabs"}>
                        <div className="title-name-icon">
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.75rem",
                            }}>
                                <img className={"icon"} src={ imgSrc } alt={"icon"}/>
                                <span>{title}</span>
                            </div>
                            <div className={"tabs-container"}>
                                < X className={"tabs"} size={14} />
                            </div>
                        </div>
                        <div className={"add-tabs"}>
                            <Plus size={14}></Plus>
                        </div>
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
                                borderRadius: fullscreen ? 0 : "0 7px 0 0",
                            }}
                            className={"control-item close"} onClick={onClose}>
                            <X size={15}/>
                        </button>
                    </div>
                </div> :
                    <div
                        className="titlebar"
                        style={{
                            borderRadius: fullscreen ? 0 : "8px 8px 0 0",
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
                                    borderRadius: fullscreen ? 0 : "0 7px 0 0",
                                }}
                                className={"control-item close"} onClick={onClose}>
                                <X size={15}/>
                            </button>
                        </div>
                    </div>   }

                < AppComponent />
            </div>
        </Rnd>
    );
}