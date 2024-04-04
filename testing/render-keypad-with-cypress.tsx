import {mount} from "@cypress/react";
import * as React from "react";

import Keypad from "../packages/math-input/src/components/keypad";

import {strings} from "./mock-strings";

const renderSingleKeypad = () =>
    mount(
        <Keypad
            strings={strings}
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
