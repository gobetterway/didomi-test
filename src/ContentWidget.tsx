// @ts-nocheck
import PreferenceDropdown from "PreferenceDropdown";
import React, {useState, useEffect, useContext} from "react";
import {DidomiContext} from "./App";


export const ConsentWidget: React.FC = () => {
    const [display, setDisplay] = useState(false)
    const didomiObjects = useContext(DidomiContext)
    const container = didomiObjects.container
    const entities = didomiObjects.entities
    console.log(didomiObjects)
    const displayConsent = () => setDisplay(!display)
    // @ts-ignore
    return (
        <div>
            <button onClick={displayConsent}>Display consent</button>
            {display ? (
                <>
                    <b>Consent : </b>
                    {/* IMPORTANT: Wrap all your widget related elements in didomi-container-headless */}
                    <didomi-container-headless id={container.id}>
                        <didomi-if-not-authenticated container-id={container.id}>
                            <p> I am displayed when end-user is not authenticated </p>
                        </didomi-if-not-authenticated>
                        {container && (
                            <>
                                {/* IMPORTANT: Add didomi-consent-asked on your page if you want to send an analytics event when displaying your preference center */}
                                <didomi-consent-asked
                                    container-id={container.id}
                                ></didomi-consent-asked>
                                <h1>My Headless Widget Demo</h1>

                        {/*        /!* IMPORTANT: Wrap the content you want to display only when the user is authenticated inside didomi-if-authenticated *!/*/}
                                <didomi-if-authenticated container-id={container.id}>
                                    <p> I am displayed when end-user is authenticated </p>
                        {/*            /!* IMPORTANT: Wrap your consent form inside didomi-consent-receiver (if using onclick consents) *!/*/}


                                    {/*            /!* IMPORTANT: Wrap your consent form inside didomi-pending-consent-receiver (if using pending consents) *!/*/}
                        {/*            /!*<didomi-pending-consent-receiver container-id={container.id}>*!/*/}
                        {/*            /!*    {entities[purposes].map(el=> {<>{el}</>})}*!/*/}
                        {/*            /!*</didomi-pending-consent-receiver>*!/*/}

                                </didomi-if-authenticated>
                            </>
                        )}
                    </didomi-container-headless>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
