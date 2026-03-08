import "../styles/components/ProgressPanel.css";

import {Info, Spotlight} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";
import {useState} from "react";
import {AlertHint} from "./AlertHint.jsx";

export function ProgressPanel({
     isOpenProgressPanel,
     setIsOpenProgressPanel
}) {

    const [isHintOpen, setIsHintOpen] = useState(false);

    const timeActive = useElapsedTime();

    return (
        <>
            <AlertHint
                isHintOpen={isHintOpen}
                setIsHintOpen={setIsHintOpen}
                body={"uhh lemme think for now"}
            />
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
                        <div
                            className={"progress-item"}
                            onClick={() => setIsHintOpen(true)}
                        >
                            <p>0. Password!</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>1. Decode</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>2. Source Code</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>3. Image CMD</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>4. Video CMD</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>5. SSH</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>6. SSH CMDs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}