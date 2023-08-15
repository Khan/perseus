import * as React from "react";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

import type {ClickKeyCallback} from "../../../types";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default function GeometryPage(props: Props) {
    const {onClickKey} = props;
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
