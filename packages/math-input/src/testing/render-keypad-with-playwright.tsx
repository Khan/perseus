import * as React from "react";

import {MathInputI18nContextProvider} from "../components/i18n-context";
import Keypad from "../components/keypad";
import {mockStrings} from "../strings";

/**
 * Renders a fully-featured keypad for Playwright component tests. All of the
 * event handlers are supplied here so the test only needs to mount the
 * component with no props (functions can't be passed across the Node/browser
 * boundary).
 */
export function KeypadForTesting(): React.ReactElement {
    return (
        <MathInputI18nContextProvider locale="en" strings={mockStrings}>
            <Keypad
                extraKeys={["a", "b", "c", "PI"]}
                onClickKey={() => {}}
                advancedRelations
                basicRelations
                divisionKey
                logarithms
                convertDotToTimes
                preAlgebra
                trigonometry
                onAnalyticsEvent={async () => {
                    /* no-op */
                }}
            />
        </MathInputI18nContextProvider>
    );
}
