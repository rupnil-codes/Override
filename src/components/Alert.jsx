import "../styles/components/Alert.css";

import {useEffect, useState} from "react";

export function Alert({
    Icon,
    title,
    isOpen,
    setIsOpen,
    body,
}) {
    const [isRemoved, setIsRemoved] = useState(true);

    useEffect(() => {
        let timer;

        if (isOpen) {
            setIsRemoved(false);
        }
        else {
            timer = setTimeout(() => {
                setIsRemoved(prev => {
                    if (!prev) {
                        return true;
                    }
                    return prev;
                });
            }, 200);

            return () => clearTimeout(timer);
        }
    },  [isOpen]);

    return (
        <div
            className={`alert-hint-viewport ${ isOpen ? "" : "hidden" } ${ isRemoved ? "removed" : "" }`}
        >
            <div className={"alert-hint-header"}>
                <div className={"header"}>
                    <Icon size={24}/>
                    <p className={"header-text"}>{title}</p>
                </div>
                <div className={"body"}>
                    <p className={"body-text"}>{body}</p>
                </div>
            </div>
            <div className={"alert-hint-footer"}>
                <div
                    className={"button cancel"}
                    onClick={() => {setIsOpen(false)}}
                >
                    Cancel
                </div>
                <div
                    className={"button confirm"}
                    onClick={() => {setIsOpen(false)}}
                >
                    Confirm
                </div>
            </div>
        </div>
    )
}