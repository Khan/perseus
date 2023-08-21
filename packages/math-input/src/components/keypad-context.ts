/**
 * KeypadContext provides a way to the Keypad and (Server)ItemRenderer to
 * communicate.
 *
 * The KeypadContext.Provider wraps the ExerciseFooter while KeypadContext.Consumer
 * wraps each (Server)ItemRenderer render site and the Keypad rendered in the
 * ExerciseFooter.
 */
import * as React from "react";

import type {KeypadAPI} from "../types";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";

type KeypadContext = {
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

// @ts-expect-error - TS2322 - Type 'Context<{ setKeypadElement: (keypadElement: HTMLElement | null | undefined) => void; keypadElement: null; setRenderer: (renderer: RendererInterface | null | undefined) => void; renderer: null; setScrollableElement: (scrollableElement: HTMLElement | ... 1 more ... | undefined) => void; scrollableElement: null; }>' is not assignable to type 'Context<KeypadContext>'.
const context: React.Context<KeypadContext> = React.createContext({
    setKeypadElement: (keypadElement) => {},
    keypadElement: null,
    setRenderer: (renderer) => {},
    renderer: null,
    setScrollableElement: (scrollableElement) => {},
    scrollableElement: null,
});

export default context;
