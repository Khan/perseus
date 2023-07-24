import * as React from "react";

import {CursorContext, KeyHandler, KeypadConfiguration} from "./types";

export type VisibilityCallback = (visible: boolean) => void;

type KeypadContext = {
    cursorContext: CursorContext | null;
    setCursorContext: (cursor: CursorContext) => void;
    keyHandler: KeyHandler | null;
    setKeyHandler: (handler: KeyHandler) => void;
    config: KeypadConfiguration | null;
    setConfig: (config: KeypadConfiguration) => void;
    showKeypadCallback: VisibilityCallback;
    setShowKeypadCallback: (cb: VisibilityCallback) => void;
};

const keypadContext: React.Context<KeypadContext> = React.createContext({
    cursorContext: null,
    setCursorContext: (cursor) => {},
    keyHandler: null,
    setKeyHandler: (handler) => {},
    config: null,
    setConfig: (config) => {},
    showKeypadCallback: (visible) => {},
    setShowKeypadCallback: (callback) => {},
});

export default keypadContext;
