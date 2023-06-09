import * as React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {KeypadButton} from "../keypad-button";

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
                secondary
            />
            <KeypadButton
                keyConfig={Keys.COS}
                onClickKey={onClickKey}
                coord={[1, 0]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.TAN}
                onClickKey={onClickKey}
                coord={[2, 0]}
                secondary
            />
        </>
    );
}
