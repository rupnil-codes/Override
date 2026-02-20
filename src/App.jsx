import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";

import DesktopApps from "./DesktopApps.jsx";


function App() {
    return (
        <>
            <div className="app">
                <Routes>
                    <Route path="/desktop" Component={LockScreen}/>
                    <Route path="/" Component={Desktop}/>

                    <Route path="/apps/*" element={<DesktopApps />} />
                </Routes>
            </div>
        </>
    )
}

export default App
