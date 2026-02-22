import "../styles/components/SystemTray.css"

import {useDateTime} from "./DateTime.jsx";
import { Wifi, Volume2, Bell, ChevronUp } from 'lucide-react';

function SystemTray() {

    const { timeString, dateString } = useDateTime();

    return (
        <div className="tray">
            <div className="wifisound tray-container">
                <div className="tray-item"><ChevronUp size={17} /></div>
            </div>
            <div className="language tray-container">
                <div className="system-language-container">
                    <p>ENG</p>
                    <p>US</p>
                </div>
            </div>
            <div className="wifisound tray-container">
                <div className="tray-item"><Wifi size={17} /></div>
                <div className="tray-item"><Volume2 size={17} /></div>
            </div>
            <div className="datetime tray-container">
                <div className="system-datetime-container">
                    <p>{timeString}</p>
                    <p>{dateString}</p>
                </div>
                <Bell className="notif" size={17} />
            </div>
        </div>
    );
}

export default SystemTray;