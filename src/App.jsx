import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";
import {ProgressPanel} from "./components/ProgressPanel.jsx";


function App() {

    return (
        <>
            <div className="app">
                <ProgressPanel/>

                <Routes>
                    <Route path="/desktop" Component={LockScreen}/>
                    <Route path="/" Component={Desktop}/>
                </Routes>
            </div>
        </>
    )
}

export default App
