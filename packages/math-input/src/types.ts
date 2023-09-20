import type {CursorContext} from "./components/input/cursor-contexts";
import type Key from "./data/keys";
import type {
    BorderDirection,
    EchoAnimationType,
    IconType,
    KeyType,
    KeypadType,
} from "./enums";
import type * as React from "react";
import type ReactDOM from "react-dom";

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
    times?: boolean;
};

export type KeyHandler = (key: Key) => Cursor;

export type Cursor = {
    context: typeof CursorContext[keyof typeof CursorContext];
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

export type ClickKeyCallback = (key: Key, event?: React.SyntheticEvent) => void;

export type KeypadPageType =
    | "Geometry"
    | "Operators"
    | "Numbers"
    | "Fractions"
    | "Extras"
    | "Dismiss";

export interface KeypadAPI {
    activate: () => void;
    dismiss: () => void;
    configure: (configuration: KeypadConfiguration, cb: () => void) => void;
    setCursor: (cursor: Cursor) => void;
    setKeyHandler: (keyHandler: KeyHandler) => void;
    getDOMNode: () => ReturnType<typeof ReactDOM.findDOMNode>;
}
