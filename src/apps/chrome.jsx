import React from 'react';
import "../styles/apps/chrome.css";

function Chrome() {
    const browserUrl = import.meta.env.VITE_BROWSER_URL;

    return (
        <>
            <iframe
                className={"chrome-iframe"}
                src={browserUrl}
                title="Browser Content"
                referrerPolicy="origin"
                allow="accelerometer; autoplay; clipboard-read; clipboard-write; encrypted-media; gyroscope; picture-in-picture; display-capture; camera; microphone; fullscreen"
                allowFullScreen
            />
        </>
    )
}

export default Chrome
