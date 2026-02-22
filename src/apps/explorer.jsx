import "../styles/apps/explorer.css"

import {
    MoveLeft,
    MoveRight,
    MoveUp,
    RotateCw,
    House,
    ChevronRight,
    Search,

} from "lucide-react"

function Explorer() {

    return (
        <>
            <div className="explorer">
                <div className="explorer-navigation">
                    <div className="explorer-navigation-bar">
                        <div className={"explorer-navigation-icons"}>
                            <MoveLeft size={18} strokeWidth={1.5} />
                            <MoveRight size={18} strokeWidth={1.5} />
                            <MoveUp size={18} strokeWidth={1.5} />
                            <RotateCw size={18} strokeWidth={1.5} />
                        </div>
                        <div className={"explorer-navigation-search"}>
                            <div className={"explorer-dir"}>
                                <House size={18} strokeWidth={1.5} />
                                <ChevronRight size={18} strokeWidth={1.5} />
                                <p>Home</p>
                                <ChevronRight size={18} strokeWidth={1.5} />
                            </div>
                            <input
                                className={"explorer-dir explorer-search"}
                                placeholder={"Search"}
                            />
                        </div>
                    </div>
                </div>
                <div className="explorer-content">
                    <div className="explorer-sidebar">
                        <p>Sidebar</p>
                    </div>
                    <div className="explorer-main">
                        <p>Main files bruv</p>
                    </div>
                    <div className="explorer-details">
                        <p>Details</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explorer
