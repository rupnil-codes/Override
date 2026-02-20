import './styles/DesktopApps.css'
import './styles/variables.css'

import { Routes, Route } from "react-router-dom";

import Chrome from "./apps/chrome.jsx";
import Explorer from "./apps/explorer.jsx";
import Settings from "./apps/settings.jsx";
import VSCode from "./apps/vscode.jsx";
import Terminal from "./apps/terminal.jsx";
import Readme_txt from "./apps/README.txt.jsx";

function DesktopApps() {
    return (
        <div className="app-window">
            <Routes>
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/vscode" element={<VSCode />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chrome" element={<Chrome />} />
                <Route path="/terminal" element={<Terminal />} />

                <Route path={"/readme_txt"} element={<Readme_txt />} />
            </Routes>
        </div>
    );
}

export default DesktopApps
