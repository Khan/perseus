import * as React from "react";

import {KeypadContext} from "../keypad-context";

import MobileKeypadInternals from "./mobile-keypad-internals";

type Props = Omit<
    React.ComponentProps<typeof MobileKeypadInternals>,
    "keypadActive" | "setKeypadActive"
>;

export function MobileKeypad(props: Props) {
    return (
        <KeypadContext.Consumer>
            {({keypadActive, setKeypadActive}) => (
                <MobileKeypadInternals
                    {...props}
                    keypadActive={keypadActive}
                    setKeypadActive={setKeypadActive}
                />
            )}
        </KeypadContext.Consumer>
    );
}
