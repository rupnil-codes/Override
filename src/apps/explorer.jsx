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
            <div className="explorer-app">
                <div className="explorer-navigation">
                    <div className="explorer-navigation-bar">
                        <div className={"explorer-navigation-icons"}>
                            <div className={"explorer-navigation-icons-container"}>
                                <MoveLeft size={18} strokeWidth={1.5} />
                            </div>
                            <div className={"explorer-navigation-icons-container"}>
                                <MoveRight size={18} strokeWidth={1.5} />
                            </div>
                            <div className={"explorer-navigation-icons-container"}>
                                <MoveUp size={18} strokeWidth={1.5} />
                            </div>
                            <div className={"explorer-navigation-icons-container"}>
                                <RotateCw size={18} strokeWidth={1.5} />
                            </div>
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
                        <div className={"explorer-sidebar-container explorer-sidebar-selected"}>
                            <div className={"explorer-sidebar-icon-container sidebar-home-icon "}>
                                <p className={"explorer-sidebar-text"}>Home</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-onedrive-icon"}>
                                <p className={"explorer-sidebar-text"}>OneDrive</p>
                            </div>
                        </div>

                        <div className={"explorer-sidebar-separator"}><p>‎</p></div>

                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-desktop-icon"}>
                                <p className={"explorer-sidebar-text"}>Desktop</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-downloads-icon"}>
                                <p className={"explorer-sidebar-text"}>Downloads</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-documents-icon"}>
                                <p className={"explorer-sidebar-text"}>Documents</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-music-icon"}>
                                <p className={"explorer-sidebar-text"}>Music</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-pictures-icon"}>
                                <p className={"explorer-sidebar-text"}>Pictures</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-videos-icon"}>
                                <p className={"explorer-sidebar-text"}>Videos</p>
                            </div>
                        </div>

                        <div className={"explorer-sidebar-separator"}><p>‎</p></div>

                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-this-pc-icon"}>
                                <p className={"explorer-sidebar-text"}>This PC</p>
                            </div>
                        </div>
                        <div className={"explorer-sidebar-container"}>
                            <div className={"explorer-sidebar-icon-container sidebar-network-icon"}>
                                <p className={"explorer-sidebar-text"}>Network</p>
                            </div>
                        </div>

                    </div>
                    <div className="explorer-main">
                        <div className={"explorer-grid"}>

                        </div>
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
