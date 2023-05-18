import Key from "./data/keys";
import {
    BorderDirection,
    EchoAnimationType,
    IconType,
    KeyType,
    KeypadType,
} from "./enums";

import type {CursorContext} from "./components/input/cursor-contexts";

export interface MathQuillInterface {
    // Write LaTeX
    // https://docs.mathquill.com/en/latest/Api_Methods/#writelatex_string
    write: (input: string) => void;
    // Enter a LaTeX command
    // https://docs.mathquill.com/en/latest/Api_Methods/#cmdlatex_string
    cmd: (input: string) => void;
    // Simulates keystrokes given a string like "Ctrl-Home Del"
    // https://docs.mathquill.com/en/latest/Api_Methods/#keystrokekeys
    keystroke: (input: string) => void;
    // Simulates typing text, one character at a time
    // https://docs.mathquill.com/en/latest/Api_Methods/#typedtexttext
    typedText: (input: string) => void;
    // Returns the contents as LaTeX
    // https://docs.mathquill.com/en/latest/Api_Methods/#latex
    latex: () => string;
}

export type Border = Partial<ReadonlyArray<BorderDirection>>;

export interface Bound {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
}

export type Popover = {
    parentId: Key;
    bounds: Partial<Bound>;
    childKeyIds: Array<Key>;
};

export type Echo = {
    animationId: string;
    animationType: EchoAnimationType;
    id: Key;
    initialBounds: Bound;
};

export type IconConfig = {
    type: IconType;
    data: string;
};

export type NonManyKeyConfig = {
    id: Key;
    type: Exclude<KeyType, "MANY">;
    icon: IconConfig;
    ariaLabel: string;
};

export type ManyKeyConfig = Omit<NonManyKeyConfig, "type"> & {
    type: Extract<KeyType, "MANY">;
    childKeyIds: ReadonlyArray<string>;
};

export type KeyConfig = NonManyKeyConfig | ManyKeyConfig;

export type KeypadConfiguration = {
    keypadType: KeypadType;
    extraKeys?: ReadonlyArray<Key>;
};

export type KeyHandler = (key: Key) => Cursor;

export type Cursor = {
    context: CursorContext;
};

export type KeypadLayout = {
    rows: number;
    columns: number;
    numPages: number;
    // Since we include a two-key popover in the top-right, when the popover
    // is visible, the keypad will expand to fill the equivalent of five
    // rows vertically.
    maxVisibleRows: number;
};

type ActiveNodesObjPopover = {
    parentId: string;
    childIds: ReadonlyArray<string>;
};

export type ActiveNodesObj = {
    popover: ActiveNodesObjPopover | null;
    focus: string | null;
};

export type LayoutProps = {initialBounds: Bound};
