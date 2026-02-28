import "../styles/apps/readme_txt.css"
import {Heading1, Bold, Italic, Underline, Settings, Strikethrough} from "lucide-react";
import React from "react";

function Readme_txt() {

    const handleMouseDown = (e) => {
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);
        e.stopPropagation();
    };

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        checkStyles();
    }

    const [activeStyles, setActiveStyles] = React.useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });
    const checkStyles = () => {
        setActiveStyles({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikethrough: document.queryCommandState("strikethrough"),
        })
    }

    return (
        <div className={"readme-app"}>
            <div className={"readme-ribbon"}>
                <div className={"readme-file-edit-view"}>
                    <div className={"readme-file-edit-view-container"}>
                        <p>File</p>
                    </div>
                    <div className={"readme-file-edit-view-container"}>
                        <p>Edit</p>
                    </div>
                    <div className={"readme-file-edit-view-container"}>
                        <p>View</p>
                    </div>
                </div>
                <div className={"readme-functions"}>
                    {/*<div*/}
                    {/*    className={"readme-settings-container"}*/}
                    {/*    onMouseDown={(e) => { e.preventDefault(); applyStyle('formatBlock', 'H1'); }}*/}
                    {/*>*/}
                    {/*    <Heading1 size={18} strokeWidth={1.5} />*/}
                    {/*</div>*/}
                    <div
                        className={`readme-button-container ${ activeStyles.bold ? "active-style" : "" }`}
                        onMouseDown={(e) => {
                            e.preventDefault(); applyStyle('bold');
                        }}
                    >
                        <Bold size={18} strokeWidth={1.5} />
                    </div>
                    <div
                        className={`readme-button-container ${ activeStyles.italic ? "active-style" : "" }`}
                        onMouseDown={(e) => {
                            e.preventDefault(); applyStyle('italic');
                        }}
                    >
                        <Italic size={18} strokeWidth={1.5} />
                    </div>
                    <div
                        className={`readme-button-container ${ activeStyles.underline ? "active-style" : "" }`}
                        onMouseDown={(e) => {
                            e.preventDefault(); applyStyle('underline');
                        }}
                    >
                        <Underline size={18} strokeWidth={1.5} />
                    </div>
                    <div
                        className={`readme-button-container ${ activeStyles.strikethrough ? "active-style" : "" }`}
                        onMouseDown={(e) => {
                            e.preventDefault(); applyStyle('strikethrough');
                        }}
                    >
                        <Strikethrough size={18} strokeWidth={1.5} />
                    </div>
                </div>
                <div className={"readme-settings"}>
                    <div className={"readme-button-container"}>
                        <Settings size={18} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
            <div
                className="readme-body"
                contentEditable={true}
                onPointerDown={handleMouseDown}
                onMouseUp={checkStyles}
                onKeyUp={checkStyles}
                style={{ userSelect: 'text' }}
            >
                Hello this is content editable btw
            </div>
        </div>
    )
}

export default Readme_txt
