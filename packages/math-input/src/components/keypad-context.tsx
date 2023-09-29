/**
 * KeypadContext provides a way to the Keypad and (Server)ItemRenderer to
 * communicate.
 *
 * The KeypadContext.Provider wraps the ExerciseFooter while KeypadContext.Consumer
 * wraps each (Server)ItemRenderer render site and the Keypad rendered in the
 * ExerciseFooter.
 */
import * as React from "react";
import {useState} from "react";

import type {KeypadAPI, KeypadContext as KeypadContextType} from "../types";

// @ts-expect-error - TS2322 - Type 'Context<{ setKeypadElement: (keypadElement: HTMLElement | null | undefined) => void; keypadElement: null; setRenderer: (renderer: RendererInterface | null | undefined) => void; renderer: null; setScrollableElement: (scrollableElement: HTMLElement | ... 1 more ... | undefined) => void; scrollableElement: null; }>' is not assignable to type 'Context<KeypadContext>'.
export const keypadContext: React.Context<KeypadContextType> =
    React.createContext({
        setKeypadElement: (keypadElement) => {},
        keypadElement: null,
        setRenderer: (renderer) => {},
        renderer: null,
        setScrollableElement: (scrollableElement) => {},
        scrollableElement: null,
    });

type Props = React.PropsWithChildren<unknown>;

export function StatefulKeypadContextProvider(props: Props) {
    // used to communicate between the keypad and the Renderer
    const [keypadElement, setKeypadElement] = useState<KeypadAPI | null>();
    // this is a KeypadContextRendererInterface from Perseus
    const [renderer, setRenderer] = useState<any>(null);
    const [scrollableElement, setScrollableElement] =
        useState<HTMLElement | null>();

    return (
        <keypadContext.Provider
            value={{
                setKeypadElement,
                keypadElement,
                setRenderer,
                renderer,
                // The scrollableElement options can likely be removed after
                // the exercises-package is officially deprecated. They don't appear
                // to be used anywhere except for the exercises-package and tests.
                setScrollableElement,
                scrollableElement,
            }}
        >
            {props.children}
        </keypadContext.Provider>
    );
}
