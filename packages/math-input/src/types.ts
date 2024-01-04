import type {CursorContext} from "./components/input/cursor-contexts";
import type Key from "./data/keys";
import type {KeyType, KeypadType} from "./enums";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";
import type * as React from "react";
import type ReactDOM from "react-dom";

export type IconConfig = {
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

export type KeypadContextType = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    setKeypadElement: (keypadElement?: KeypadAPI) => void;
    keypadElement: KeypadAPI | null | undefined;
    setRenderer: (
        renderer?: KeypadContextRendererInterface | null | undefined,
    ) => void;
    renderer: KeypadContextRendererInterface | null | undefined;
    setScrollableElement: (
        scrollableElement?: HTMLElement | null | undefined,
    ) => void;
    scrollableElement: HTMLElement | null | undefined;
};
