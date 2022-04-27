// @flow
/**
 * KeypadContext provides a way to the Keypad and (Server)ItemRenderer to
 * communicate.
 *
 * The KeypadContext.Provider wraps the ExerciseFooter while KeypadContext.Consumer
 * wraps each (Server)ItemRenderer render site and the Keypad rendered in the
 * ExerciseFooter.
 */
import * as React from "react";

import type {RendererInterface} from "./types.js";

type KeypadContext = {
    setKeypadElement: (keypadElement: ?HTMLElement) => void,
    keypadElement: ?HTMLElement,
    setRenderer: (renderer: ?RendererInterface) => void,
    renderer: ?RendererInterface,
    setScrollableElement: (scrollableElement: ?HTMLElement) => void,
    scrollableElement: ?HTMLElement,
    ...
};

const context: React.Context<KeypadContext> = React.createContext({
    setKeypadElement: (keypadElement) => {},
    keypadElement: null,
    setRenderer: (renderer) => {},
    renderer: null,
    setScrollableElement: (scrollableElement) => {},
    scrollableElement: null,
});

export default context;
