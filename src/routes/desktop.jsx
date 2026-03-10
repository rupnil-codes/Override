import '../styles/routes/desktop.css';

import { Search } from 'lucide-react';
import {createRef, useRef, useState, useMemo, useEffect} from "react";

import {APP_REGISTRY, INITIAL_Z, getNextZ, WINDOW_DEFAULTS} from "../data/Apps.js";
import AppWindow from "../core/WindowManager.jsx";

import Draggable from 'react-draggable';
import { motion, AnimatePresence } from "framer-motion";

import SystemTray from "../components/SystemTray.jsx";
import {ProgressPanel} from "../components/ProgressPanel.jsx";
import * as React from "react";


function Desktop() {
    const [isOpenProgressPanel, setIsOpenProgressPanel] = useState(false);
    const [isStartMenuActive, setIsStartMenuActive] = useState(false);

    const startMenuRef = useRef(null);
    const menuActiveRef = useRef(isStartMenuActive);
    useEffect(() => {
        menuActiveRef.current = isStartMenuActive;
    }, [isStartMenuActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isStartMenuActive && startMenuRef.current && !startMenuRef.current.contains(event.target)) {
                if (!event.target.closest('#start-menu-icon')) {
                    setIsStartMenuActive(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isStartMenuActive]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.metaKey) {
                e.preventDefault();
                setIsStartMenuActive(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const [iconPositions, setIconPositions] = useState({
        explorer: { col: 1, row: 1 },
        vscode: { col: 1, row: 2 },
        settings: { col: 1, row: 3 },
        chrome: { col: 2, row: 1 },
        terminal: { col: 2, row: 2 },
        readme_txt: { col: 3, row: 3 },
        minecraft: { col: 3, row: 4 },
        forlorn: { col: 3, row: 5 },
    });

    const [selectedIcon, setSelectedIcon] = useState(null);
    const [focussed, setFocussed] = useState(null);
    const [apps, setApps] = useState(() => {
        return Object.keys(APP_REGISTRY).reduce((acc, key) => {
            acc[key] = {
                isOpen: false,
                minimized: true,
                fullscreen: false,
                zIndex: INITIAL_Z,
                initialX: 0,
                initialY: 0
            };
            return acc;
        }, {});
    });

    const lastPos = useRef({ x: 100, y: 100 });
    const OFFSET = 20;

    const nodeRefs = useMemo(() => {
        return Object.keys(APP_REGISTRY).reduce((acc, key) => {
            acc[key] = createRef();
            return acc;
        }, {});
    }, []);

    const taskbarApps = useMemo(() => {
        const pinned = ['explorer', 'vscode', 'settings', 'chrome', 'terminal'];
        const openAppKeys = Object.keys(apps).filter(key => apps[key].isOpen);
        return Array.from(new Set([...pinned, ...openAppKeys]));
    }, [apps]);

    const [draggingIcon, setDraggingIcon] = useState(null);

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
                newX = (window.innerWidth / 2) - (WINDOW_DEFAULTS.WIDTH / 2);
                newY = (window.innerHeight / 2) - (WINDOW_DEFAULTS.HEIGHT / 2) - (WINDOW_DEFAULTS.TASKBAR_HEIGHT);
            } else {
                newX = lastPos.current.x + WINDOW_DEFAULTS.OFFSET;
                newY = lastPos.current.y + WINDOW_DEFAULTS.OFFSET;
                if (newY > window.innerHeight - WINDOW_DEFAULTS.HEIGHT) newY = 100;
                if (newX > window.innerWidth - WINDOW_DEFAULTS.WIDTH) newX = 100;
            }
            lastPos.current = { x: newX, y: newY };
        }

        if (focussed === name) {
            setApps(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isOpen: true,
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
            [name]: {
                ...prev[name],
                isOpen: false,
                fullscreen: false,
                minimized: true
            }
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
        <div className="desktop" onMouseDown={() => {
            setSelectedIcon(null);
        }}>
            <ProgressPanel
                isOpenProgressPanel={isOpenProgressPanel}
                setIsOpenProgressPanel={setIsOpenProgressPanel}
            />
            <div
                className="desktop-grid"
                style={{ position: 'absolute', inset: 0, display: 'grid', zIndex: 1 }}
            >
                {Object.keys(iconPositions).map((id) => (
                    <Draggable
                        key={id}
                        nodeRef={nodeRefs[id]}
                        position={{ x: 0, y: 0 }}
                        grid={[window.innerWidth / 14, (window.innerHeight - 48) / 6]}
                        onStart={(e) => {
                            e.stopPropagation();
                            setSelectedIcon(id);
                            setDraggingIcon(id);
                        }}
                        onStop={(e, data) => {
                            setDraggingIcon(null);
                            handleIconStop(e, data, id)
                    }}
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

                                zIndex: draggingIcon === id ? 99999 : 1,
                                opacity: draggingIcon === id ? 1 : undefined,
                                position: 'relative'
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
                        AppComponent={APP_REGISTRY[name].component}
                        imgSrc={APP_REGISTRY[name].imgSrc}
                        tabs={APP_REGISTRY[name].tabs}
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

            <div
                ref={startMenuRef}
                className={`start-menu ${ isStartMenuActive ? "active" : ""}`}
            >
                <div className={"start-search"}>
                    <Search className={"start-search-icon"} />
                    <input className={"start-search-bar"} type={"text"}/>
                </div>
            </div>

            <div className={`taskbar ${ isAnyFullScreen ? 'is-fullscreen' : ''}`}>
                <div className="apps">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            initial={{ opacity: 0, width: 0, scale: 0.5 }}
                            animate={{ opacity: 1, width: 24, scale: 1 }}
                            exit={{ opacity: 0, width: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`app-item ${isStartMenuActive ? "focussed" : ""}`}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setIsStartMenuActive(prev => !prev);
                            }}
                        >
                            <div className={"taskbar-app"} id="start-menu-icon">
                                <img className={"taskbar-app-icon"} src={"/assets/icons/Windows.svg"} draggable="false" alt="icon" />
                            </div>
                        </motion.div>

                        {taskbarApps.map(id => (
                            <motion.div
                                key={id}
                                layout
                                initial={{ opacity: 0, width: 0, scale: 0.5 }}
                                animate={{ opacity: 1, width: 24, scale: 1 }}
                                exit={{ opacity: 0, width: 0, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`app-item ${!apps[id].isOpen ? "" : (focussed === id && !apps[id].minimized) ? "open focussed active" : "open"}`}
                                onClick={() => openApp(id)}
                            >
                                <div className={`taskbar-app ${id}`} id={id}>
                                    <img className={"taskbar-app-icon"} src={APP_REGISTRY[id].imgSrc} draggable="false" alt="icon" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                < SystemTray />

            </div>
        </div>
    );
}

export default Desktop;