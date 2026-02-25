import "../styles/apps/readme_txt.css"
import { Heading1, Bold, Italic, Link2, Settings } from "lucide-react";

function Readme_txt() {

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
                    <div className={"readme-settings-container"}>
                        <Heading1 size={18} strokeWidth={1.5} />
                    </div>
                    <div className={"readme-settings-container"}>
                        <Bold size={18} strokeWidth={1.5} />
                    </div>
                    <div className={"readme-settings-container"}>
                        <Italic size={18} strokeWidth={1.5} />
                    </div>
                    <div className={"readme-settings-container"}>
                        <Link2 size={18} strokeWidth={1.5} />
                    </div>
                </div>
                <div className={"readme-settings"}>
                    <div className={"readme-settings-container"}>
                        <Settings size={18} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
            <div className={"readme-body"} contentEditable={true}>
                Hello this is content editable btw
            </div>
        </div>
    )
}

export default Readme_txt
