import {mount} from "@cypress/react";
import * as React from "react";

import Keypad from "../components/keypad";

const renderSingleKeypad = () =>
    mount(
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
        />,
    );
export default renderSingleKeypad;
