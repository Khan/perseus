import * as React from "react";

import {MobileKeypad} from "./keypad";
import {keypadContext} from "./keypad-context";
import LegacyKeypad from "./keypad-legacy";

import type {AnalyticsEventHandlerFn} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => void;
    style?: StyleType;

    useV2Keypad?: boolean;
    onAnalyticsEvent: AnalyticsEventHandlerFn;
};

function KeypadSwitch(props: Props) {
    const {useV2Keypad = false, ...rest} = props;

    const KeypadComponent = useV2Keypad ? MobileKeypad : LegacyKeypad;

    // Note: Although we pass the "onAnalyticsEvent" to both keypad components,
    // only the current one uses it. There's no point in instrumenting the
    // legacy keypad given that it's on its way out the door.
    return (
        <keypadContext.Consumer>
            {({setKeypadActive, keypadActive}) => {
                return (
                    <KeypadComponent
                        {...rest}
                        keypadActive={keypadActive}
                        setKeypadActive={setKeypadActive}
                    />
                );
            }}
        </keypadContext.Consumer>
    );
}

export default KeypadSwitch;
