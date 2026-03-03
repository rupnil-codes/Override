import "../styles/apps/chrome.css"

function Chrome() {

    return (
        <>
            <iframe
                className={"chrome-iframe"}
                src={"https://wikipedia.com"}
                allow="camera; microphone; display-capture; clipboard-read; clipboard-write; self"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-downloads"
            />
        </>
    )
}

export default Chrome
