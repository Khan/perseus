import * as React from "react";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

import type {MathInputStrings, ClickKeyCallback} from "../../../types";

type Props = {
    onClickKey: ClickKeyCallback;
    strings: MathInputStrings;
    locale: string;
};

export default function GeometryPage(props: Props) {
    const {onClickKey, strings, locale} = props;
    return (
        <>
            {/* Row 1 */}
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).SIN}
                onClickKey={onClickKey}
                coord={[0, 0]}
            />
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).COS}
                onClickKey={onClickKey}
                coord={[1, 0]}
            />
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).TAN}
                onClickKey={onClickKey}
                coord={[2, 0]}
            />
        </>
    );
}
