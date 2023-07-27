import {StyleType} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {MobileKeypad} from "./keypad";
import LegacyKeypad from "./keypad-legacy";

type Props = {
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => void;
    style?: StyleType;

    useV2Keypad?: boolean;
};

function KeypadSwitch(props: Props) {
    const {useV2Keypad = false, ...rest} = props;

    const KeypadComponent = useV2Keypad ? MobileKeypad : LegacyKeypad;

    return <KeypadComponent {...rest} />;
}

export default KeypadSwitch;
