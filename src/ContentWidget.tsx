// @ts-nocheck
import React, {useState, useContext} from "react";
import {DidomiContext} from "./App";
import {ConsentForm} from './ConsentForm';

export const ConsentWidget: React.FC = () => {
    const [display, setDisplay] = useState(false)
    const didomiObjects = useContext(DidomiContext)
    const container = didomiObjects.container
    const entities = didomiObjects.entities

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
                        {container && (
                            <>
                                {/* IMPORTANT: Add didomi-consent-asked on your page if you want to send an analytics event when displaying your preference center */}
                                <didomi-consent-asked
                                    container-id={container.id}
                                ></didomi-consent-asked>
                        {/*        /!* IMPORTANT: Wrap the content you want to display only when the user is authenticated inside didomi-if-authenticated *!/*/}
                                <didomi-if-authenticated container-id={container.id}>
                        {/*                          /!* IMPORTANT: Wrap your consent form inside didomi-pending-consent-receiver (if using pending consents) */}
                                    <didomi-pending-consent-receiver container-id={container.id}>
                                        {entities && (
                                            <ConsentForm />
                                        )}
                                    </didomi-pending-consent-receiver>

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
