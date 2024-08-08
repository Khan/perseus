import * as React from "react";

// @ts-expect-error it can't find type declaration
// eslint-disable-next-line monorepo/no-internal-import
import {KeypadContext} from "@khanacademy/math-input/keypad-context";

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
