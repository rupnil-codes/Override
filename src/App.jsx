import {Routes, Route} from "react-router";

import './styles/App.css'
import './styles/variables.css'

import LockScreen from "./routes/lockscreen.jsx";
import Desktop from "./routes/desktop.jsx";
import {Info} from "lucide-react";
import {useState} from "react";


function App() {

    const [isOpenProgressBar, setIsOpenProgressBar] = useState(false);

    return (
        <>
            <div className="app">
                <div className={"progress-container"}>
                    <div
                        className={`progress-button ${ isOpenProgressBar ? "progress-button-active" : "" }`}
                         onClick={() => setIsOpenProgressBar(!isOpenProgressBar)}
                    >
                        <Info size={"16"} />
                        <p style={{marginBottom: "0.2rem"}}>Progress</p>
                    </div>

                    <div className={`progress-sidebar ${isOpenProgressBar ? "progress-active" : "progress-hidden"}`}>

                    </div>
                </div>

                <Routes>
                    <Route path="/desktop" Component={LockScreen}/>
                    <Route path="/" Component={Desktop}/>
                </Routes>
            </div>
        </>
    )
}

export default App
