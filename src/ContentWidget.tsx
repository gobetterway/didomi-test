// @ts-nocheck
import PreferenceDropdown from "PreferenceDropdown";
import React, {useState, useEffect} from "react";

export const ConsentWidget: React.FC = () => {
    const [display, setDisplay] = useState(false)

    const displayConsent = () => setDisplay(!display)
    const [container, setContainer] = useState(null);
    const [entities, setEntities] = useState({
        purposes: [],
    });


    useEffect(() => {
        // IMPORTANT: Wait for the SDK to be ready before getting the container information
        window.didomiWidgetsOnReady = window.didomiWidgetsOnReady || [];
        window.didomiWidgetsOnReady.push(async (DidomiWidgets) => {
            const container = await DidomiWidgets.getContainerById("WFN4hfn4");
            const entities = await container.getEntities();
            setContainer(container);
            setEntities(entities);
            console.log(entities)
        });
    }, []);

    // @ts-ignore
    return (
        <div>
            <button onClick={displayConsent}>Display consent</button>
            {display ? (
                <>
                    <b>Consent : </b>
                    {/* IMPORTANT: Wrap all your widget related elements in didomi-container-headless */}
                    <didomi-container-headless id="WFN4hfn4">
                        {container && (
                            <>
                                {/* IMPORTANT: Add didomi-consent-asked on your page if you want to send an analytics event when displaying your preference center */}
                                <didomi-consent-asked
                                    container-id={container.id}
                                ></didomi-consent-asked>
                                <h1>My Headless Widget Demo</h1>

                                {/* IMPORTANT: Wrap the content you want to display only when the user is authenticated inside didomi-if-authenticated */}
                                <didomi-if-authenticated container-id={container.id}>
                                    {/* IMPORTANT: Wrap your consent form inside didomi-consent-receiver (if using onclick consents) */}
                                    <didomi-consent-receiver container-id={container.id}>
                                        {entities && (
                                            <PreferenceDropdown
                                                container={container}
                                                entities={entities}
                                                purposeId={"serviced-cknNcAbq"}
                                            ></PreferenceDropdown>
                                        )}
                                    </didomi-consent-receiver>

                                    {/* IMPORTANT: Wrap your consent form inside didomi-pending-consent-receiver (if using pending consents) */}
                                    <didomi-pending-consent-receiver container-id={container.id}>
                                        {entities }
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
