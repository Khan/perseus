import {
    BorderDirection,
    EchoAnimationTypes,
    IconType,
    KeyType,
    KeypadType,
} from "./consts";
import Keys from "./data/keys";

import type {CursorContext} from "./components/input/cursor-contexts";

export type Border = Partial<ReadonlyArray<BorderDirection>>;

export type Bound = {
    top: number;
    right: number;
    bottom: number;
    left: number;
    height: number;
    width: number;
};

export type Popover = {
    parentId: Keys;
    bounds: Partial<Bound>;
    childKeyIds: Array<Keys>;
};

export type Echo = {
    animationId: string;
    animationType: keyof typeof EchoAnimationTypes;
    borders: Border;
    id: Keys;
    initialBounds: DOMRect;
};

export type IconConfig = {
    type: IconType;
    data: string;
};

export type KeyConfig = {
    ariaLabel: string;
    id: Keys;
    type: KeyType;
    childKeyIds: Array<Keys>;
    icon: IconConfig;
};

export type KeypadConfiguration = {
    keypadType: KeypadType;
    extraKeys?: ReadonlyArray<Keys>;
};

export type KeyHandler = (key: Keys) => Cursor;

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

export type LayoutProps = {initialBounds: DOMRect; borders: Border};
