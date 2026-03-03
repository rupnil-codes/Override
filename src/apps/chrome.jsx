import "../styles/apps/chrome.css"

function Chrome() {

    return (
        <>
            <iframe
                className={"chrome-iframe"}
                src={"https://5.39.47.103/#/connect/kasm/e9f227e2-e7db-4323-b65c-d5edb667437f/9d99d7d09ed24346af42eb14607f08d2/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX3Rva2VuX2lkIjoiOTI5NTMwMjAtZjU3YS00NzI5LTg0MjItODNmZDY1NjE3OTc1IiwiYXV0aG9yaXphdGlvbnMiOlsxMDBdLCJleHAiOjE3NzI4MDAzMzl9.PnMpM-5RA_9oHZdBuK5dp-drY5hHKSPyxR39p2nDAF5NgpJ93XM7P3cDHPTHK-1V6lqQaaDrUe0hqtPeznB-J9E0-A7qx-gdpfG12ziisJSALVjMrqM1O_7pjaLHITb243NQ-RWi6O-HjLnancGUEayXgejqxGR6BqsIqwCK7P3l4Jpw60AovtENlkG874SWlJ_Dkkh1RxcR7DaSLAMxx-O8kxW47WEo7kEUsDC0UUIAvH51m0uSAdbduoTwDh_pG4GScxIoxdu5oFTst00fYDw9aa4AozjG-_rRhKeGE7SGER8g9mm8-KzVBKzW1Pox_Z1Gw-abgSzkjhvJ9JP0BA"}
                allow="camera; microphone; display-capture; clipboard-read; clipboard-write; self"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-downloads"
            />
        </>
    )
}

export default Chrome
