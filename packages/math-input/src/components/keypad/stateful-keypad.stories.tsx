import * as React from "react";

import StatefulKeypad from "./stateful-keypad";

export default {
    title: "Stateful v2 Keypad",
};

function KeypadContainer({children}) {
    return (
        <div
            style={{
                width: "400px",
                margin: "5em",
            }}
        >
            {children}
        </div>
    );
}

export function Base() {
    return (
        <KeypadContainer>
            <StatefulKeypad />
        </KeypadContainer>
    );
}
