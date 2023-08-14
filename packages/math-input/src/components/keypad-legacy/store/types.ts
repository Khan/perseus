import Key from "../../../data/keys";
import {LayoutMode, KeypadType} from "../../../enums";
import GestureManager from "../gesture-manager";

import type {Cursor, KeyHandler, Popover, Echo} from "../../../types";

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

// Handles things like:
// long-press: to open multikey popover
// swipe: for pagination
// press: regular pushing of a button
export interface GestureState {
    // The current multikey popover?
    popover: Popover | null;
    // ?? Maybe which key is currently focused?
    focus: Key | null;
    // Complex object that interprets touches as actions
    gestureManager: GestureManager;
}

// Manages the animations for pressing keys
export interface EchoState {
    // Which echoes are in the process of animating
    echoes: ReadonlyArray<Echo>;
}

export type GridDimensions = {
    numRows: number;
    numColumns: number;
    numMaxVisibleRows: number;
    numPages: number;
};

export type WidthHeight = {
    width: number;
    height: number;
};

// Layout (size, where to put buttons, etc)
export interface LayoutState {
    gridDimensions: GridDimensions;
    buttonDimensions: WidthHeight;
    containerDimensions: WidthHeight;
    pageDimensions: WidthHeight;
    layoutMode: LayoutMode;
    paginationEnabled: boolean;
    navigationPadEnabled: boolean;
}

export interface State {
    input: InputState;
    keypad: KeypadState;
    gestures: GestureState;
    echoes: EchoState;
    layout: LayoutState;
}
