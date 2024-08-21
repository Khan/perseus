import * as React from "react";

import KeyConfigs from "../../../data/key-configs";
import {useMathInputI18n} from "../../i18n-context";
import {KeypadButton} from "../keypad-button";

import type {ClickKeyCallback} from "../../../types";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default function GeometryPage(props: Props) {
    const {onClickKey} = props;
    const {strings} = useMathInputI18n();
    const Keys = KeyConfigs(strings);

    function handleclick(...rest) {
        console.log("geometry-page.tsx");
        console.log(rest);
        onClickKey(...rest);
    }

    return (
        <>
            {/* Row 1 */}
            <KeypadButton
                keyConfig={Keys.SIN}
                onClickKey={handleclick}
                coord={[0, 0]}
            />
            <KeypadButton
                keyConfig={Keys.COS}
                onClickKey={handleclick}
                coord={[1, 0]}
            />
            <KeypadButton
                keyConfig={Keys.TAN}
                onClickKey={handleclick}
                coord={[2, 0]}
            />
        </>
    );
}
