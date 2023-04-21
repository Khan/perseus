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

export const DismissKeypadActionType = "DismissKeypad";

export type DismissKeypadAction = {
    type: typeof DismissKeypadActionType;
};

export const dismissKeypad = (): DismissKeypadAction => {
    return {
        type: DismissKeypadActionType,
    };
};

export const ActivateKeypadActionType = "ActivateKeypad";

export type ActivateKeypadAction = {
    type: typeof ActivateKeypadActionType;
};

export const activateKeypad = (): ActivateKeypadAction => {
    return {
        type: ActivateKeypadActionType,
    };
};

/**
 * Configure the keypad with the provided configuration parameters.
 */
export const ConfigureKeypadActionType = "ConfigureKeypad";

export type ConfigureKeypadAction = {
    type: typeof ConfigureKeypadActionType;
    configuration: KeypadConfiguration;
};

export const configureKeypad = (
    configuration: KeypadConfiguration,
): ConfigureKeypadAction => {
    return {
        type: ConfigureKeypadActionType,
        configuration,
    };
};

export const SetPageSizeActionType = "SetPageSize";

export type SetPageSizeAction = {
    type: typeof SetPageSizeActionType;
    pageWidthPx: number;
    pageHeightPx: number;
};

export const setPageSize = (
    pageWidthPx: number,
    pageHeightPx: number,
): SetPageSizeAction => {
    return {
        type: SetPageSizeActionType,
        pageWidthPx,
        pageHeightPx,
    };
};

export const RemoveEchoActionType = "RemoveEcho";

export type RemoveEchoAction = {
    type: typeof RemoveEchoActionType;
    animationId: string;
};

export const removeEcho = (animationId: string): RemoveEchoAction => {
    return {
        type: RemoveEchoActionType,
        animationId,
    };
};

// Input-related actions.
export const SetKeyHandlerActionType = "SetKeyHandler";

export type SetKeyHandlerAction = {
    type: typeof SetKeyHandlerActionType;
    keyHandler: KeyHandler;
};

export const setKeyHandler = (keyHandler: KeyHandler): SetKeyHandlerAction => {
    return {
        type: SetKeyHandlerActionType,
        keyHandler,
    };
};

export const SetCursorActionType = "SetCursor";

export type SetCursorAction = {
    type: typeof SetCursorActionType;
    cursor: Cursor;
};

export const setCursor = (cursor: Cursor): SetCursorAction => {
    return {
        type: SetCursorActionType,
        cursor,
    };
};

// Gesture actions
export const OnSwipeChangeActionType = "OnSwipeChange";

export type OnSwipeChangeAction = {
    type: typeof OnSwipeChangeActionType;
    dx: number;
};

export const onSwipeChange = (dx: number): OnSwipeChangeAction => {
    return {
        type: OnSwipeChangeActionType,
        dx,
    };
};

export const OnSwipeEndActionType = "OnSwipeEnd";

export type OnSwipeEndAction = {
    type: typeof OnSwipeEndActionType;
    dx: number;
};

export const onSwipeEnd = (dx: number): OnSwipeEndAction => {
    return {
        type: OnSwipeEndActionType,
        dx,
    };
};

export const SetActiveNodesActionType = "SetActiveNodes";

export type SetActiveNodesAction = {
    type: typeof SetActiveNodesActionType;
    activeNodes: any;
};

export const setActiveNodes = (
    activeNodes: ActiveNodesObj,
): SetActiveNodesAction => {
    return {
        type: SetActiveNodesActionType,
        activeNodes,
    };
};

export const PressKeyActionType = "PressKey";

export type PressKeyAction = {
    type: typeof PressKeyActionType;
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
        type: PressKeyActionType,
        key,
        borders,
        initialBounds,
        inPopover,
    };
};
