import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";
import {ProgressBar} from "./components/ProgressBar.jsx";


function App() {

    return (
        <>
            <div className="app">
                <ProgressBar/>

                <Routes>
                    <Route path="/desktop" Component={LockScreen}/>
                    <Route path="/" Component={Desktop}/>
                </Routes>
            </div>
        </>
    )
}

export default App
