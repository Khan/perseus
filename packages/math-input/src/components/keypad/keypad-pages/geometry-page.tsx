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

    return (
        <>
            {/* Row 1 */}
            <KeypadButton
                keyConfig={Keys.SIN}
                onClickKey={onClickKey}
                coord={[0, 0]}
            />
            <KeypadButton
                keyConfig={Keys.COS}
                onClickKey={onClickKey}
                coord={[1, 0]}
            />
            <KeypadButton
                keyConfig={Keys.TAN}
                onClickKey={onClickKey}
                coord={[2, 0]}
            />
        </>
    );
}
