import GestureManager from "../components/gesture-manager";
import VelocityTracker from "../components/velocity-tracker";
import {LayoutModes} from "../consts";

import type {Key} from "../data/keys";
import type {Cursor, KeyHandler, Popover, Echo} from "../types";

export interface InputState {
    keyHandler: KeyHandler | null;
    cursor: Cursor | undefined;
}

export interface KeypadState {
    extraKeys: ReadonlyArray<string>;
    keypadType: any;
    active: boolean;
}

export interface PagerState {
    animateToPosition: boolean;
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
