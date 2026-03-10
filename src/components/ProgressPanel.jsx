import "../styles/components/ProgressPanel.css";

import {Info, Lightbulb} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";
import {useState} from "react";
import {AlertHint} from "./AlertHint.jsx";

import { HINTS_REGISTRY } from "../data/Hints.js";

export function ProgressPanel({
     isOpenProgressPanel,
     setIsOpenProgressPanel
}) {

    const [isHintOpen, setIsHintOpen] = useState(false);
    const [hintText, setHintText] = useState("");

    const timeActive = useElapsedTime();

    return (
        <>
            <AlertHint
                isHintOpen={isHintOpen}
                setIsHintOpen={setIsHintOpen}
                body={hintText}
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
                        <div className={"progress-0-item"}>
                            <p>0. Password</p>
                            <div className={"progress-item-icons-group"}>
                                <div
                                    className={"progress-icon-container"}
                                    onClick={() => {
                                        setHintText("WAIT  HOLD ON IM THINKING (INFO)")
                                        setIsHintOpen(true);
                                    }}
                                >
                                    <Info size={"16"} />
                                </div>
                                <div
                                    className={"progress-icon-container"}
                                    onClick={() => {
                                        setHintText("WAIT  HOLD ON IM THINKING (HINT)")
                                        setIsHintOpen(true);
                                    }}
                                >
                                    <Lightbulb size={"16"} />
                                </div>
                            </div>
                        </div>

                        <div className={`progress-0-sidebar-separator`}>
                            A
                        </div>

                        { Object.keys(HINTS_REGISTRY).map((key) =>
                            (
                                <div key={key} className={"progress-item"}>
                                    <p>{key}. {HINTS_REGISTRY[key].title}</p>
                                    <div className={"progress-item-icons-group"}>
                                        <div
                                            className={"progress-icon-container"}
                                            onClick={() => {
                                                setHintText(HINTS_REGISTRY[key].description)
                                                setIsHintOpen(true);
                                            }}
                                        >
                                            <Info size={"16"} />
                                        </div>
                                        <div
                                            className={"progress-icon-container"}
                                            onClick={() => {
                                                setHintText(HINTS_REGISTRY[key].hint)
                                                setIsHintOpen(true);
                                            }}
                                        >
                                            <Lightbulb size={"16"} />
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}