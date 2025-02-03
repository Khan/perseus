import * as axeCore from "axe-core";
import {useEffect} from "react";

const AccessibilityPanel = () => {
    useEffect(() => {
        setTimeout(async () => {
            const results = await axeCore.run();
            console.log(`Results: `, results);
        }, 2000);
    }, []);

    // TODO: Figure out how to know when the preview panel has been updated
    //          Updates should trigger new a11y evaluation
    //       Build UI for panel
    //          Panel should be pre-collapsed, with issue counts & icons in header
    //          List out violations and incompletes as accordion sections (when header accordion is expanded)
    //          Details are listed in accordion panel
    //          Highlight element toggle
    return null;
};

export default AccessibilityPanel;
