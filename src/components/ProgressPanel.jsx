import "../styles/components/ProgressPanel.css";

import {Info, Lightbulb} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";
import {useState} from "react";
import {Alert} from "./Alert.jsx";

import { HINTS_REGISTRY } from "../data/Hints.js";

export function ProgressPanel({
     isOpenProgressPanel,
     setIsOpenProgressPanel
}) {

    const [isHintOpen, setIsHintOpen] = useState(false);
    const [hintText, setHintText] = useState("");

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [infoText, setInfoText] = useState("");

    const timeActive = useElapsedTime();

    return (
        <>
            <Alert
                Icon={Lightbulb}
                title={"Hint"}
                isOpen={isHintOpen}
                setIsOpen={setIsHintOpen}
                body={hintText}
            />
            <Alert
                Icon={Info}
                title={"Info"}
                isOpen={isInfoOpen}
                setIsOpen={setIsInfoOpen}
                body={infoText}
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
                                        setInfoText("Use your exploratory or webdev skills.")
                                        setIsInfoOpen(true);
                                    }}
                                >
                                    <Info size={"16"} />
                                </div>
                                <div
                                    className={"progress-icon-container"}
                                    onClick={() => {
                                        setHintText("Check out the 2nd oldest devlog or use Devtools (usually F12) to check the console.")
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
                                                setInfoText(HINTS_REGISTRY[key].info)
                                                setIsInfoOpen(true);
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