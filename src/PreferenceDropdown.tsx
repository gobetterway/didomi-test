// @ts-nocheck
import React from "react";
import {  Select } from 'antd'
import { useMemo, useState, useRef, useEffect } from "react";

export function PreferenceDropdown({ container, entities, purposeId }) {
  const preference = useMemo(() => {
    return entities.purposes
      .find((purpose) => purposeId === purpose.id)
  }, [entities, purposeId]);

  const [preferenceValuesConsentsArray, setPreferenceValuesConsentsArray] =
    useState(() => {
      const preferenceValuesConsents = container.getPreferenceValueById({
        purposeId,
        preferenceId: preference.id,
      });
      return preferenceValuesConsents
        ? preferenceValuesConsents.split(",")
        : [];
    });
  const preferenceRef = useRef(null);

  useEffect(() => {
    const setConsentsSuccessEvent = (event) => {
      console.log("Consent has been saved successfully!", {
        toastId: "consents-success",
      });
    };
    // IMPORTANT: You can also listen to specific consents events (loading, success, error)
    document.addEventListener(
      "didomi:set-consents-success",
      setConsentsSuccessEvent
    );

    return () => {
      document.removeEventListener(
        "didomi:set-consents-success",
        setConsentsSuccessEvent
      );
    };
  });

  const sendPreferenceConsent = (event) => {
    setPreferenceValuesConsentsArray(event.detail);
    // IMPORTANT: Dispatch a 'didomi:set-consents' event with the list of values enabled as a string to save the consent
    const consentToPurpose = new CustomEvent("didomi:set-consents", {
      detail: {
        purposeId,
        preferenceId: preference.id,
        value: event.detail.join(","),
      },
      bubbles: true,
      composed: true,
    });
    preferenceRef?.current.dispatchEvent(consentToPurpose);
  };

  return (
    <div className="Preference" ref={preferenceRef}>
      <Select
        placeholder="Select from the list of values"
        // IMPORTANT: Use 'container.getEntityContentById' to display your entities translated content if you cannot use our custom elements
        label={container.getEntityContentById({
          entityType: "preference",
          entityId: preference.id,
          entityProperty: "name",
          withComponentContent: true,
        })}
        value={preferenceValuesConsentsArray} // preferenceValuesConsentsArray
        onValueChange={sendPreferenceConsent}
        multi={true}
        options={[{label:'yes', value: true}, {label:"no", value:false}]}
      >
      </Select>
    </div>
  );
}

export default PreferenceDropdown;