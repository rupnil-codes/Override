import '../styles/routes/desktop.css';
import { Wifi, Volume2, Bell } from 'lucide-react';

function Desktop() {
    return (
        <div>
            <div className={"desktop"}>
                <div className={"taskbar"}>
                    <div className={"apps"}>
                        <div className={"app-item"}>
                            <div className={"start-menu"} id={"start-menu"}></div>
                        </div>
                        <div className={"app-item"}>
                            <div className={"file-explorer"} id={"file-explorer"}></div>
                        </div>
                        <div className={"app-item"}>
                                <div className={"vs-code"} id={"vs-code"}></div>
                        </div>
                        <div className={"app-item"}>
                            <div className={"settings"} id={"settings"}></div>
                        </div>
                        <div className={"app-item"}>
                            <div className={"chrome"} id={"chrome"}></div>
                        </div>
                        <div className={"app-item"}>
                            <div className={"terminal"} id={"terminal"}></div>
                        </div>
                    </div>
                </div>
                <div className={"tray"}>
                    <div className={"wifisound tray-container"}>
                        <div className={"tray-item"}>
                            <Wifi size={20} />
                        </div>
                        <div className={"tray-item"}>
                            <Volume2 size={20} />
                        </div>
                    </div>
                    <div className={"datetime tray-container"}>
                        <p>16:55</p>
                        <p>18-02-2026</p>
                    </div>
                    <Bell className={"notif tray-item tray-container"} size={20}/>
                </div>
            </div>
        </div>
    )
}

export default Desktop
