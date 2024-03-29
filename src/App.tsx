import React, {useState} from 'react'
import {DidomiSDK} from '@didomi/react'
import {ConsentWidget} from "./ContentWidget";

declare global {
    interface Window { didomiWidgetsOnReady: any; }
}

export const App: React.FC = ({children}) => {
    const [lang, setLang] = useState('fr')

    const toogleLanguage = () => {
        if (lang === 'fr') setLang('en')
        else setLang('fr')
    }


    window.didomiWidgetsOnReady = window.didomiWidgetsOnReady || [];
    // @ts-ignore
    window.didomiWidgetsOnReady.push(async (DidomiWidgets) => {
        const container = await DidomiWidgets.getContainerById("enzLbVW3");
        container.setWidgetLocale(lang);
    })

    const didomiConfig = {
        apiKey: '4783d326-7837-4548-aa35-69967e034881',
        app: {apiKey: '4783d326-7837-4548-aa35-69967e034881'},
        components: {version: 2, helpersEnabled: true, componentsEnabled: true},
        user: {
            shouldReadTokenFromLocalStorage: true,
        },
        widgets: [],
    }


    return (<>
        <DidomiSDK
            apiKey='4783d326-7837-4548-aa35-69967e034881'
            iabVersion={2} // If you want to support the TCF v1∏, don't forget to change this value, even if you selected the TCF v2 in the console. This parameter will load the correct stub in the React Component
            gdprAppliesGlobally={true}
            noticeId='JpDFLYBe'
            sdkPath='https://sdk.privacy-center.org/'
            embedTCFStub={true}
            config={didomiConfig}
            onReady={(didomi) =>
                console.log('Didomi SDK is loaded and ready', didomi)
            }
            onConsentChanged={(cwtToken) =>
                console.log('A consent has been given/withdrawn', cwtToken)
            }
            onNoticeShown={() => console.log('Didomi Notice Shown')}
            onNoticeHidden={() => console.log('Didomi Notice Hidden')}
            onNoticeBackdropclick={() =>
                console.log('Didomi Notice Backdrop Click')
            }
            onNoticeClickAgree={() => console.log('Didomi Notice Click Agree')}
            onNoticeClickMoreInfo={() =>
                console.log('Didomi Notice Click More Info')
            }
            onPreferencesClickAgreeToAll={() =>
                console.log('Didomi Preferences Click Agree to All')
            }
            onPreferencesClickDisagreeToAll={() =>
                console.log('Didomi Preferences Click Disagree to All')
            }
            onPreferencesClickPurposeAgree={(purposeId) =>
                console.log('Didomi Preferences Click Purpose Agree', purposeId)
            }
            onPreferencesClickPurposeDisagree={(purposeId) =>
                console.log('Didomi Preferences Click Purpose Disagree', purposeId)
            }
            onPreferencesClickViewVendors={() =>
                console.log('Didomi Preferences Click View Vendors')
            }
            onPreferencesClickSaveChoices={() =>
                console.log('Didomi Preferences Click Save Choices')
            }
            onPreferencesClickVendorAgree={(vendorId) =>
                console.log('Didomi Preferences Click Vendor Agree', vendorId)
            }
            onPreferencesClickVendorDisagree={(vendorId) =>
                console.log('Didomi Preferences Click Vendor Disagree', vendorId)
            }
            onPreferencesClickVendorSaveChoices={() =>
                console.log('Didomi Preferences Click Vendor Save Choices')
            }
        />
        <div>
            <button onClick={toogleLanguage}>Language:</button>
            <span> {lang}</span>
        </div>

        <ConsentWidget/>
    </>)
}
