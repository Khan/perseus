import {
    BorderDirections,
    EchoAnimationTypes,
    KeyTypes,
    IconTypes,
} from "./consts";

import type {CursorContext} from "./components/input/cursor-contexts";
import type {KeypadType} from "./consts";
import type {Key} from "./data/keys";

export type Border = Partial<Array<keyof typeof BorderDirections>>;

export type Bound = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
};

export type Popover = {
    parentId: Key;
    bounds: Partial<Bound>;
    childKeyIds: Array<Key>;
};

export type Echo = {
    animationId: string;
    animationType: keyof typeof EchoAnimationTypes;
    borders: Border;
    id: Key;
    initialBounds: DOMRect;
};

export type Icon = {
    type: keyof typeof IconTypes;
    data: string;
};

export type KeyConfig = {
    ariaLabel: string;
    id: Key;
    type: keyof typeof KeyTypes;
    childKeyIds: Array<Key>;
    icon: Icon;
};

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
