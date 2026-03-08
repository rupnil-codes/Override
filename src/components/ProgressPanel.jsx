import "../styles/components/ProgressPanel.css";

import {Info} from "lucide-react";
import {useElapsedTime} from "./DateTime.jsx";

import {Accordion, Alert, Button} from "react-windows-ui";

export function ProgressPanel({
     isOpenProgressPanel,
     setIsOpenProgressPanel
}) {

    const timeActive = useElapsedTime();

    return (
        <>
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
                        <div className={"progress-item"}>
                            <Accordion
                                headerTitle="Some Title"
                                headerStyle={{width: "250px"}}>
                                <Accordion.Body>
                                    <p style={{width: "270px"}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </Accordion.Body>
                            </Accordion>
                            <Alert
                                title="Alert"
                                isVisible={true}
                                message="This is alert Box."
                                onBackdropPress={() => {}}>
                                <Alert.Footer>
                                    <Button
                                        type="primary"
                                        value="OK to Close"
                                        onClick={() => {}}
                                    />
                                </Alert.Footer>
                            </Alert>
                        </div>

                        <div className={"progress-item"}>
                            <p>0. Password!</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>1. Decode</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>2. Source Code</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>3. Image CMD</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>4. Video CMD</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>5. SSH</p>
                        </div>
                        <div className={"progress-item"}>
                            <p>6. SSH CMDs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}