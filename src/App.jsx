import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";


function App() {

    return (
        <>
            <div className="app">
                <Routes>
                    <Route path="/" Component={LockScreen}/>
                    <Route path="/desktop" Component={Desktop}/>
                </Routes>
            </div>
        </>
    )
}

export default App
