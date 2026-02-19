import '../styles/routes/desktop.css';
import {Wifi, Volume2, Bell} from 'lucide-react';
import AppWindow, {INITIAL_Z, getNextZ} from '../core/WindowManager.jsx';
import {useRef, useState} from "react";
import {APP_REGISTRY} from "../core/Apps.js";

function Desktop() {
    const [apps, setApps] = useState({
        explorer: {isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0, data: null},
        vscode: {isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0, data: null},
        settings: {isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0, data: null},
        chrome: {isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0, data: null},
        terminal: {isOpen: false, minimized: true, fullscreen: false, zIndex: INITIAL_Z, initialX: 0, initialY: 0, data: null},
    });

    const [focussed, setFocussed] = useState(null)

    const lastPos = useRef({x: 100, y: 100});
    const OFFSET = 20;

    function openApp(name) {
        const openApps = Object.values(apps).filter(
            app => app.isOpen
        );

        let newX, newY;

        if (openApps.length === 0) {
            newX = (window.innerWidth / 2) - 300;
            newY = (window.innerHeight / 2) - 250;
            lastPos.current = {x: newX, y: newY};

        } else {
            newX = lastPos.current.x + OFFSET;
            newY = lastPos.current.y + OFFSET;

            if (newY > window.innerHeight - 500) newY = 100;
            if (newX > window.innerWidth - 700) newX = 100;

            lastPos.current = {x: newX, y: newY};
        }

        if (focussed === name) {
            setApps(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isOpen: true,
                    fullscreen: false,
                    minimized: !prev[name].minimized,
                    zIndex: getNextZ()
                }
            }));
        }
        else {
            focusApp(name);
            setApps(prev => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    isOpen: true,
                    minimized: false,
                    fullscreen: false,
                    zIndex: getNextZ(),
                    initialX: lastPos.current.x,
                    initialY: lastPos.current.y,
                }
            }));
        }

    }

    function focusApp(name) {
        setFocussed(name)

        setApps(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                zIndex: getNextZ(),
            }
        }));
    }

    function closeApp(name) {
        setFocussed(null)
        setApps(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                isOpen: false,
                minimized: true
            }
        }));
    }

    function minimizeApp(name) {
        setApps(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                minimized: true,
                isOpen: true,
            }
        }))
    }

    function toggleFullscreen(name) {
        setApps(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                fullscreen: !prev[name].fullscreen,
                zIndex: getNextZ()
            }
        }));
    }

    return (
        <div>
            <div className={"desktop"}>
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
                <div className={"taskbar"}>
                    <div className={"apps"}>
                        <div className={"app-item"}>
                            <div className={"start-menu"} id={"start-menu"}></div>
                        </div>
                        <div
                            className={`app-item ${
                                !apps.explorer.isOpen
                                    ? ""
                                    : (focussed === "explorer" && !apps.explorer.minimized)
                                        ? "open focussed active"
                                        : "open"
                            }`}
                            onClick={() => openApp("explorer")}
                        >
                            <div
                                className={"file-explorer"}
                                id={"file-explorer"}
                            ></div>
                        </div>
                        <div
                            className={`app-item ${
                                !apps.vscode.isOpen
                                    ? ""
                                    : (focussed === "vscode" && !apps.vscode.minimized)
                                        ? "open focussed active"
                                        : "open"
                            }`}
                            onClick={() => openApp("vscode")}
                        >
                            <div
                                className={"vs-code"}
                                id={"vs-code"}
                            ></div>
                        </div>
                        <div
                            className={`app-item ${
                                !apps.settings.isOpen
                                    ? ""
                                    : (focussed === "settings" && !apps.settings.minimized)
                                        ? "open focussed active"
                                        : "open"
                            }`}
                            onClick={() => openApp("settings")}
                        >
                            <div className={"settings"} id={"settings"}></div>
                        </div>
                        <div
                            className={`app-item ${
                                !apps.chrome.isOpen
                                    ? ""
                                    : (focussed === "chrome" && !apps.chrome.minimized)
                                        ? "open focussed active"
                                        : "open"
                            }`}
                            onClick={() => openApp("chrome")}
                        >
                            <div className={"chrome"} id={"chrome"}></div>
                        </div>
                        <div
                            className={`app-item ${
                                !apps.terminal.isOpen
                                    ? ""
                                    : (focussed === "terminal" && !apps.terminal.minimized)
                                        ? "open focussed active"
                                        : "open"
                            }`}
                            onClick={() => openApp("terminal")}
                        >
                            <div className={"terminal"} id={"terminal"}></div>
                        </div>
                    </div>
                    <div className={"tray"}>
                        <div className={"wifisound tray-container"}>
                            <div className={"tray-item"}>
                                <Wifi size={18}/>
                            </div>
                            <div className={"tray-item"}>
                                <Volume2 size={18}/>
                            </div>
                        </div>
                        <div className={"datetime tray-container"}>
                            <p>16:55</p>
                            <p>18-02-2026</p>
                        </div>
                        <Bell className={"notif tray-item tray-container"} size={18}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Desktop