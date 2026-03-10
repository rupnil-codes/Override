import "../styles/components/AlertHint.css";

import { Lightbulb } from "lucide-react";

export function AlertHint({
    isHintOpen,
    setIsHintOpen,
    body,
}) {

    return (
        <div className={`alert-hint-viewport ${ isHintOpen ? "" : "hidden" }`}>
            <div className={"alert-hint-header"}>
                <div className={"header"}>
                    <Lightbulb size={24} />
                    <p className={"header-text"}>HINT</p>
                </div>
                <div className={"body"}>
                    <p className={"body-text"}>{body}</p>
                </div>
            </div>
            <div className={"alert-hint-footer"}>
                <div
                    className={"button cancel"}
                    onClick={() => {setIsHintOpen(false)}}
                >
                    Cancel
                </div>
                <div
                    className={"button confirm"}
                    onClick={() => {setIsHintOpen(false)}}
                >
                    Confirm
                </div>
            </div>
        </div>
    )
}