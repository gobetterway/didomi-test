// @ts-nocheck
import React, {useState, useEffect, useContext} from "react";
import {DidomiContext} from "./App";
import {Sections} from './Sections';

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
                    <didomi-container-headless id="WFN4hfn4">
                        <h1>TOTO</h1>
                        {container && (
                            <>
                                {/* IMPORTANT: Add didomi-consent-asked on your page if you want to send an analytics event when displaying your preference center */}
                                <didomi-consent-asked
                                    container-id={container.id}
                                ></didomi-consent-asked>
                        {/*        /!* IMPORTANT: Wrap the content you want to display only when the user is authenticated inside didomi-if-authenticated *!/*/}
                                <didomi-if-authenticated container-id={container.id}>
                                    <p> I am displayed when end-user is authenticated </p>
                        {/*                          /!* IMPORTANT: Wrap your consent form inside didomi-pending-consent-receiver (if using pending consents) */}
                        {/*            <didomi-pending-consent-receiver container-id={container.id}>*/}
                        {/*                {entities && (*/}
                        {/*                    <Sections />*/}
                        {/*                )}*/}
                        {/*            </didomi-pending-consent-receiver>*/}

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
