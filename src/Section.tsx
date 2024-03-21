import React, {useState, useRef, useContext} from "react";
import {Card, Checkbox,} from "antd";
import {DidomiContext} from "./App";

export const Section: React.FC = () => {
    const didomiObjects: any = useContext(DidomiContext);
    const container = didomiObjects.container;
    const entities = didomiObjects.entities;
    const purpose = entities?.purposes[0]
    const id = purpose.id

    const [purposeEnabled, setPurposeEnabled] = useState(
        container.getPurposeEnabledById(id)
    );
    const sectionRef = useRef(null);

    const sendPurposeConsent = (event:any) => {
        setPurposeEnabled(event.detail);
        // IMPORTANT: Dispatch a 'didomi:set-pending-consents' event with the enabled value of the purpose to store the consent in a pending state
        const consentToPurpose = new CustomEvent("didomi:set-pending-consents", {
            detail: {
                purposeId: id,
                value: event.detail,
            },
            bubbles: true,
            composed: true,
        });
        // @ts-ignore
        sectionRef?.current?.dispatchEvent(consentToPurpose);
    };

    return (
        <div className="Section" ref={sectionRef}>
            <Card>
                {/* IMPORTANT: Use 'didomi-entity-content' to display your entities translated content */}

                <h1>
                    {   /* @ts-ignore*/}
                    <didomi-entity-content
                        entity-id={id}
                        entity-property="name"
                        entity-type="purpose"
                        container-id="WFN4hfn4"
                        with-component-content={true}
                    >{   /* @ts-ignore*/}
                    </didomi-entity-content>
                </h1>


                <div>My custom text</div>
                {   /* @ts-ignore*/}
                <didomi-entity-content
                    entity-id={id}
                    entity-property="description"
                    entity-type="purpose"
                    container-id="WFN4hfn4"
                    with-component-content={true}
                >{   /* @ts-ignore*/}
                </didomi-entity-content>
                <Checkbox
                    checked={purposeEnabled}
                    onChange={sendPurposeConsent}
                >
                </Checkbox>
            </Card>
        </div>
    );
}