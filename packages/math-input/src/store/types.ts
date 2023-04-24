import GestureManager from "../components/gesture-manager";
import VelocityTracker from "../components/velocity-tracker";
import {LayoutModes} from "../consts";

import type {KeypadType} from "../consts";
import type {Key} from "../data/keys";
import type {Cursor, KeyHandler, Popover, Echo} from "../types";

// Interaction between keypad and input
export interface InputState {
    // This is the callback to tell the input
    // that a key was pressed. It returns information
    // about where the cursor is
    keyHandler: KeyHandler | null;
    // Information about where the cursor is, which we use to
    // conditionally render buttons to help navigate
    // where the cursor should go next
    cursor: Cursor | undefined;
}

// Managing high-level keypad state
export interface KeypadState {
    // Additional symbols that get grouped in a
    // ManyKeypadButton; for variables and
    // special symbols (pi)
    extraKeys: ReadonlyArray<string>;
    // Keypad variations (Fraction vs Expression)
    keypadType: KeypadType;
    // Whether or not to show the keypad
    active: boolean;
}

// Pagination for keypad types with multiple pages
export interface PagerState {
    animateToPosition: boolean;
    // On keypad types with multiple pages
    // which page we are on
    currentPage: number;
    dx: number;
    numPages: number;
    pageWidthPx: number;
    velocityTracker: VelocityTracker;
}

export interface GestureState {
    popover: Popover | null;
    focus: Key | null;
    gestureManager: GestureManager;
}

export interface EchoState {
    echoes: ReadonlyArray<Echo>;
}

export interface LayoutState {
    gridDimensions: {
        numRows: number;
        numColumns: number;
        numMaxVisibleRows: number;
        numPages: number;
    };
    buttonDimensions: {
        widthPx: number;
        heightPx: number;
    };
    pageDimensions: {
        pageWidthPx: number;
        pageHeightPx: number;
    };
    layoutMode: keyof typeof LayoutModes;
    paginationEnabled: boolean;
    navigationPadEnabled: boolean;
}

export interface State {
    input: InputState;
    keypad: KeypadState;
    pager: PagerState;
    gestures: GestureState;
    echoes: EchoState;
    layout: LayoutState;
}
