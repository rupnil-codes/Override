import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";
import {ProgressPanel} from "./components/ProgressPanel.jsx";

import { Analytics } from "@vercel/analytics/react";

function App() {

    return (
        <>
            <div className="app">
                <ProgressPanel/>

                <Routes>
                    <Route path="/" Component={LockScreen}/>
                    <Route path="/desktop" Component={Desktop}/>
                </Routes>

                <Analytics />
            </div>
        </>
    )
}

export default App
