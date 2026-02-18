import {useState, useEffect} from "react";
import '../styles/routes/lockscreen.css';

import { Wifi, BatteryCharging } from 'lucide-react';
import {useNavigate} from "react-router";
import * as React from "react";

function LockScreen() {
    const [showPin, setShowPin] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !e.repeat) {
                setShowPin(false);
            }
            if (e.key == "Enter") {
                setShowPin(true);
            }
            if (e.key == " ") {
                setShowPin(true);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (password === "DuckyCelestron76700") {
                navigate("/desktop");
            }
        }
    }

    return (
        <div
            className={`screen ${showPin ? "show-pin" : ""}`}
            onClick={() => setShowPin(true)}
        >
            <div className={"screen"}>
                {/*<p>Enter your pin to Sign In</p>*/}
                <div className={"lock"}>
                    <div className={"datetime-container"}>
                        <div className={"time-clip"}>
                            <p className={"time"} id={"time"}>11:33</p>
                        </div>
                        <div className={"day-date-clip"}>
                            <p className={"day-date"} id={"day-date"}>Wednesday, February 18</p>
                        </div>
                    </div>
                </div>

                <div className={"pin"}>
                    <div className={"container"}>
                        <div className={"pfp"}/>
                        <p className={"username"}>Rupnil's PC</p>
                        <p className={"enter-pass"}>Enter your password</p>
                        <input
                            type={"text"}
                            className={"input"}
                            id={"password"}
                            placeholder={"PASSWORD"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            onKeyDown={handleSubmit}
                            autoFocus={true}
                        />
                        <p className={"hint"}>HINT: I love making <a className={"devlog"} href={"https://flavortown.hackclub.com/projects/13380"}>Devlogs!</a></p>
                        {/*<p className={"hint"}>HINT: Check the oldest <a className={"devlog"} href={"https://flavortown.hackclub.com/projects/13380"}>Devlogs!</a></p>*/}
                    </div>
                    <div className={"system"}>
                        <div className={"profile"}>
                            <div className={"imgBx"}/>
                            <p className={"profile-username"}>Rupnil Codes</p>
                        </div>
                        <div className={"lockscreen-tray"}>
                            <div className={"item"}>ENG</div>
                            <div className={"item"}>
                                <Wifi />
                            </div>
                            <div className={"item"}>
                                <BatteryCharging />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockScreen
