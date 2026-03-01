import "../styles/components/ProgressPanel.css";

import {Info} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";
import {useState} from "react";

export function ProgressPanel() {

    const [isOpenProgressPanel, setIsOpenProgressPanel] = useState(false);
    const timeActive = useElapsedTime();

    return (
        <>
            <div
                className={`progress-button ${ isOpenProgressPanel ? "progress-button-active" : "" }`}
                onClick={() => setIsOpenProgressPanel(!isOpenProgressPanel)}
            >
                <Info size={"16"} />
                <p style={{marginBottom: "0.2rem"}}>Progress</p>
            </div>
            <div
                className={"progress-container"}
                style={{
                    zIndex: isOpenProgressPanel ? 90 : 0,
                }}
            >
                <div className={`progress-sidebar ${isOpenProgressPanel ? "progress-active" : "progress-hidden"}`}>
                    <p>Elapsed time:</p>
                    <p className={"elapsed-time"}>{ timeActive }</p>
                    <div className={`progress-sidebar-separator`}/>
                    <div className={"progress-item-container"}>
                        <div className={"progress-item"}>
                            <p>Puzzle 1</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>Puzzle 2</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>Puzzle 3</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>Puzzle 3</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>Puzzle 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}