import '../styles/routes/desktop.css';
import { Wifi, Volume2, Bell } from 'lucide-react';
import AppWindow, { INITIAL_Z, getNextZ } from '../core/WindowManager.jsx';
import { createRef, useRef, useState, useMemo } from "react";
import { APP_REGISTRY } from "../core/Apps.js";
import Draggable from 'react-draggable';

function Desktop() {
    const [iconPositions, setIconPositions] = useState({
        explorer: { col: 1, row: 1 },
        vscode: { col: 1, row: 2 },
        settings: { col: 1, row: 3 },
        chrome: { col: 2, row: 1 },
        terminal: { col: 2, row: 2 },
    });

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [focussed, setFocussed] = useState(null);
    const [apps, setApps] = useState({
        explorer: { isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0 },
        vscode: { isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0 },
        settings: { isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0 },
        chrome: { isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0 },
        terminal: { isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0 },
    });

    const lastPos = useRef({ x: 100, y: 100 });
    const OFFSET = 20;

    const nodeRefs = useMemo(() => ({
        explorer: createRef(),
        vscode: createRef(),
        settings: createRef(),
        chrome: createRef(),
        terminal: createRef(),
    }), []);

    const handleIconStop = (e, data, id) => {
        const gridX = 5.35 * 16;
        const gridY = 6 * 16;

        const newCol = Math.max(1, Math.round(data.x / gridX) + iconPositions[id].col) ;
        const newRow = Math.max(1, Math.round(data.y / gridY) + iconPositions[id].row);

        const isOccupied = Object.entries(iconPositions).some(([appId, pos]) => {
            return appId !== id && pos.col === newCol && pos.row === newRow;
        });

        if (isOccupied) {
            return;
        }
        setIconPositions(prev => ({
            ...prev,
            [id]: { col: newCol, row: newRow }
        }));
    };

    function openApp(name) {
        const openApps = Object.values(apps).filter(app => app.isOpen);
        let newX, newY;

        if (!apps[name].isOpen) {
            if (openApps.length === 0) {
                newX = (window.innerWidth / 2) - 300;
                newY = (window.innerHeight / 2) - 250;
            } else {
                newX = lastPos.current.x + OFFSET;
                newY = lastPos.current.y + OFFSET;
                if (newY > window.innerHeight - 500) newY = 100;
                if (newX > window.innerWidth - 700) newX = 100;
            }
            lastPos.current = { x: newX, y: newY };
        }

        if (focussed === name) {
            setApps(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isOpen: true,
                    fullscreen: false,
                    minimized: !prev[name].minimized,
                    zIndex: getNextZ() }
            }));
        } else {
            focusApp(name);
            setApps(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isOpen: true,
                    fullscreen: false,
                    minimized: false,
                    zIndex: getNextZ(),
                    initialX: lastPos.current.x,
                    initialY: lastPos.current.y,
                }
            }));
        }
    }

    const isAnyFullScreen = useMemo(() => {
        return Object.values(apps).some(app => app.isOpen && app.fullscreen && !app.minimized);
    }, [apps]);

    function focusApp(name) {
        setFocussed(name);
        setApps(prev => ({
            ...prev,
            [name]: { ...prev[name], zIndex: getNextZ() }
        }));
    }

    function closeApp(name) {
        setFocussed(null);
        setApps(prev => ({
            ...prev,
            [name]: { ...prev[name], isOpen: false, minimized: true }
        }));
    }

    function minimizeApp(name) {
        setApps(prev => ({
            ...prev,
            [name]: { ...prev[name], minimized: true }
        }));
    }

    function toggleFullscreen(name) {
        setApps(prev => ({
            ...prev,
            [name]: { ...prev[name], fullscreen: !prev[name].fullscreen, zIndex: getNextZ() }
        }));
    }

    return (
        <div className="desktop" onMouseDown={() => setSelectedIcon(null)}>
            <div className="desktop-grid" style={{ position: 'absolute', inset: 0, display: 'grid', zIndex: 1 }}>
                {Object.keys(iconPositions).map((id) => (
                    <Draggable
                        key={id}
                        nodeRef={nodeRefs[id]}
                        position={{ x: 0, y: 0 }}
                        grid={[window.innerWidth / 14, (window.innerHeight - 48) / 6]}
                        onStart={(e) => {
                            e.stopPropagation();
                            setSelectedIcon(id);
                        }}
                        onStop={(e, data) => handleIconStop(e, data, id)}
                        cancel=".icon, p"
                    >
                        <div
                            ref={nodeRefs[id]}
                            className={`grid-app-item ${selectedIcon === id ? 'selected' : ''}`}
                            onMouseDown={(e) => {
                                e.stopPropagation()
                                setSelectedIcon(id);
                            }}
                            onDoubleClick={() => openApp(id)}
                            style={{
                                gridColumn: iconPositions[id].col,
                                gridRow: iconPositions[id].row,
                            }}
                        >
                            <img className="app-icon" src={APP_REGISTRY[id].imgSrc} draggable="false" alt="icon" />
                            <p className={"app-name"} style={{ pointerEvents: 'none' }}>{APP_REGISTRY[id].title}</p>
                        </div>
                    </Draggable>
                ))}
            </div>

            {Object.entries(apps).map(([name, app]) =>
                app.isOpen ? (
                    <AppWindow
                        key={name}
                        title={APP_REGISTRY[name].title}
                        src={APP_REGISTRY[name].src}
                        imgSrc={APP_REGISTRY[name].imgSrc}
                        zIndex={app.zIndex}
                        fullscreen={app.fullscreen}
                        minimized={app.minimized}
                        onFocus={() => focusApp(name)}
                        onMinimize={() => minimizeApp(name)}
                        onClose={() => closeApp(name)}
                        onFullscreen={() => toggleFullscreen(name)}
                        posX={app.initialX}
                        posY={app.initialY}
                    />
                ) : null
            )}

            <div className={`taskbar ${ isAnyFullScreen ? 'is-fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="apps">
                    <div className="app-item">
                        <div className="start-menu" id="start-menu"></div>
                    </div>
                    {['explorer', 'vscode', 'settings', 'chrome', 'terminal'].map(id => (
                        <div
                            key={id}
                            className={`app-item ${!apps[id].isOpen ? "" : (focussed === id && !apps[id].minimized) ? "open focussed active" : "open"}`}
                            onClick={() => openApp(id)}
                        >
                            <div className={id === 'explorer' ? 'file-explorer' : id === 'vscode' ? 'vs-code' : id} id={id}></div>
                        </div>
                    ))}
                </div>
                <div className="tray">
                    <div className="wifisound tray-container">
                        <div className="tray-item"><Wifi size={18} /></div>
                        <div className="tray-item"><Volume2 size={18} /></div>
                    </div>
                    <div className="datetime tray-container">
                        <p>16:55</p>
                        <p>18-02-2026</p>
                    </div>
                    <Bell className="notif tray-item tray-container" size={18} />
                </div>
            </div>
        </div>
    );
}

export default Desktop;