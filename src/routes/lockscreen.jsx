import {useState, useEffect, useRef} from "react";
import '../styles/routes/lockscreen.css';

import { Wifi, BatteryCharging } from 'lucide-react';
import {useNavigate} from "react-router";
import * as React from "react";
import { useDateTime } from "../components/DateTime.jsx";

import Desktop from "./desktop.jsx";

import { GridLoader } from "react-spinners";


console.log("Password is: DuckyCelestron76700");

function LockScreen() {
    const [showPin, setShowPin] = useState(false);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && !e.repeat) {
                setShowPin(false);
            }
            if (e.key === "Enter") {
                setShowPin(true);
            }
            if (e.key === " ") {
                setShowPin(true);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            if (password === "DuckyCelestron76700" || password === "42069") {
                confirm("Remember to check README.txt in the desktop");

                const elem = document.documentElement;
                elem.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });

                setIsLoading(true);

                setTimeout(() => {
                    setIsExiting(true);

                    setTimeout(() => {
                        setIsRemoved(true);

                        const startupSound = new Audio("/sounds/startup.mp3");
                        startupSound.volume = Math.min(1.5, 1.0);
                        startupSound.play().catch(e => console.log("Audio play blocked", e));
                            // .then(() => {
                            //     setTimeout(() => {
                            //         alert("Remember to check README.txt in the desktop");
                            //     }, 800);
                            // })
                            //

                        // navigate("/desktop");
                    }, 1000);
                }, 2000);
            }
        }
    }

    const { timeString, monthString, dayString, numericMonthDay } = useDateTime();

    return (
        <div className={"app-viewport"}>
            <div className="background-desktop">
                <Desktop />
            </div>

            {!isRemoved && (<div
                className={`screen ${showPin ? "show-pin" : ""} ${isExiting ? "exit-animation" : ""}`}
                onClick={() => setShowPin(true)}
            >
                    {/*<p>Enter your pin to Sign In</p>*/}
                    <div className={"lock"}>
                        <div className={"datetime-container"}>
                            <div className={"time-clip"}>
                                <p className={"time"} id={"time"}>{timeString}</p>
                            </div>
                            <div className={"day-date-clip"}>
                                <p className={"day-date"}
                                   id={"day-date"}>{dayString}, {monthString} {numericMonthDay}</p>
                            </div>
                        </div>
                    </div>

                    <div className={"pin"}>
                        <div className={"container"}>
                            <div className={"pfp"}/>
                            <p className={"username"}>Rupnil's PC</p>
                            {/*<p className={"enter-pass"}>Enter your password</p>*/}

                            {!isLoading ? (
                                <>
                                    <input
                                        type={"text"}
                                        className={"input"}
                                        id={"password"}
                                        placeholder={"Password"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={handleSubmit}
                                        autoFocus={true}
                                    />
                                    <p className={"hint"}>
                                        Ps: Check the first <a
                                        className={"devlog"}
                                        href={"https://flavortown.hackclub.com/projects/13380"}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Devlogs
                                    </a> or Console!
                                    </p>
                                </>
                            ) : (
                                <div className="loading-container">
                                    <GridLoader
                                        color="#ffffff"
                                        size={8}
                                        margin={4}
                                        speedMultiplier={1}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={"system"}>
                            <div className={"profile"}>
                                <div className={"imgBx"}/>
                                <p className={"profile-username"}>Rupnil Codes</p>
                            </div>
                            <div className={"lockscreen-tray"}>
                                <div className={"item"}>ENG</div>
                                <div className={"item"}>
                                    <Wifi/>
                                </div>
                                <div className={"item"}>
                                    <BatteryCharging/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            )}
        </div>
    )
}

export default LockScreen
