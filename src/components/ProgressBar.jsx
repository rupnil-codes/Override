import "../styles/components/ProgressBar.css";

import {Info} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";
import {useState} from "react";

export function ProgressBar() {

    const [isOpenProgressBar, setIsOpenProgressBar] = useState(false);
    const timeActive = useElapsedTime();

    return (
        <>
            <div
                className={`progress-button ${ isOpenProgressBar ? "progress-button-active" : "" }`}
                onClick={() => setIsOpenProgressBar(!isOpenProgressBar)}
            >
                <Info size={"16"} />
                <p style={{marginBottom: "0.2rem"}}>Progress</p>
            </div>
            <div
                className={"progress-container"}
                style={{
                    zIndex: isOpenProgressBar ? 90 : -1,
                }}
            >
                <div className={`progress-sidebar ${isOpenProgressBar ? "progress-active" : "progress-hidden"}`}>
                    <p>Elapsed time:</p>
                    <p className={"elapsed-time"}>{ timeActive }</p>
                </div>
            </div>
        </>
    )
}