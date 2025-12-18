import * as React from "react";

export const KeypadIdContext = React.createContext<string>(
    "non-unique-keypad-id",
);

export function useKeypadIdContext(): string {
    return React.useContext(KeypadIdContext);
}
