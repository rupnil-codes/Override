import './styles/DesktopApps.css'
import './styles/variables.css'

import { Routes, Route } from "react-router-dom";

import Chrome from "./apps/chrome.jsx";
import Explorer from "./apps/explorer.jsx";
import Settings from "./apps/settings.jsx";
import VSCode from "./apps/vscode.jsx";
import Terminal from "./apps/terminal.jsx";

function DesktopApps() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/vscode" element={<VSCode />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chrome" element={<Chrome />} />
                <Route path="/terminal" element={<Terminal />} />
            </Routes>
        </div>
    );
}

export default DesktopApps
