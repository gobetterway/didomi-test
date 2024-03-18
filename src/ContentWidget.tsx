// @ts-nocheck
import React, {useState} from "react";

export const ConsentWidget: React.FC = () => {
    const [display, setDisplay] = useState(false)

    const displayConsent = () => setDisplay(!display)

    // @ts-ignore
    return (
        <div>
            <button onClick={displayConsent}>Display consent</button>
            {display ? (
                <>
                    <b>Consent : </b>
                    <didomi-container id="enzLbVW3"></didomi-container>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}
