import type {Key} from "../data/keys";
import type {
    KeypadConfiguration,
    KeyHandler,
    Cursor,
    ActiveNodesObj,
    Border,
} from "../types";

// naming convention: verb + noun
// the noun should be one of the other properties in the object that's
// being dispatched

export type DismissKeypadAction = {
    type: "DismissKeypad";
};

export const dismissKeypad = (): DismissKeypadAction => {
    return {
        type: "DismissKeypad",
    };
};

export type ActivateKeypadAction = {
    type: "ActivateKeypad";
};

export const activateKeypad = (): ActivateKeypadAction => {
    return {
        type: "ActivateKeypad",
    };
};

/**
 * Configure the keypad with the provided configuration parameters.
 */
export type ConfigureKeypadAction = {
    type: "ConfigureKeypad";
    configuration: KeypadConfiguration;
};

export const configureKeypad = (
    configuration: KeypadConfiguration,
): ConfigureKeypadAction => {
    return {
        type: "ConfigureKeypad",
        configuration,
    };
};

export type SetPageSizeAction = {
    type: "SetPageSize";
    pageWidthPx: number;
    pageHeightPx: number;
};

export const setPageSize = (
    pageWidthPx: number,
    pageHeightPx: number,
): SetPageSizeAction => {
    return {
        type: "SetPageSize",
        pageWidthPx,
        pageHeightPx,
    };
};

export type RemoveEchoAction = {
    type: "RemoveEcho";
    animationId: string;
};

export const removeEcho = (animationId: string): RemoveEchoAction => {
    return {
        type: "RemoveEcho",
        animationId,
    };
};

// Input-related actions.
export type SetKeyHandlerAction = {
    type: "SetKeyHandler";
    keyHandler: KeyHandler;
};

export const setKeyHandler = (keyHandler: KeyHandler): SetKeyHandlerAction => {
    return {
        type: "SetKeyHandler",
        keyHandler,
    };
};

export type SetCursorAction = {
    type: "SetCursor";
    cursor: Cursor;
};

export const setCursor = (cursor: Cursor): SetCursorAction => {
    return {
        type: "SetCursor",
        cursor,
    };
};

// Gesture actions
export type OnSwipeChangeAction = {
    type: "OnSwipeChange";
    dx: number;
};

export const onSwipeChange = (dx: number): OnSwipeChangeAction => {
    return {
        type: "OnSwipeChange",
        dx,
    };
};

export type OnSwipeEndAction = {
    type: "OnSwipeEnd";
    dx: number;
};

export const onSwipeEnd = (dx: number): OnSwipeEndAction => {
    return {
        type: "OnSwipeEnd",
        dx,
    };
};

export type SetActiveNodesAction = {
    type: "SetActiveNodes";
    activeNodes: ActiveNodesObj;
};

export const setActiveNodes = (
    activeNodes: ActiveNodesObj,
): SetActiveNodesAction => {
    return {
        type: "SetActiveNodes",
        activeNodes,
    };
};

export type PressKeyAction = {
    type: "PressKey";
    key: Key;
    borders: Border;
    initialBounds: DOMRect;
    inPopover: boolean;
};

export const pressKey = (
    key: Key,
    borders: Border,
    initialBounds: DOMRect,
    inPopover: any,
): PressKeyAction => {
    return {
        type: "PressKey",
        key,
        borders,
        initialBounds,
        inPopover,
    };
};
