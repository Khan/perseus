/**
 * KeypadContext provides a way to the Keypad and Perseus Renderers to
 * communicate.
 *
 * The StatefulKeypadContextProvider wraps the application
 * while KeypadContext.Consumer wraps things that need this state:
 * - mobile keypad usages
 * - Perseus Renderers (Server/Item/Article)
 */
import * as React from "react";
import {useState, useMemo} from "react";

import type {KeypadContextType} from "./types";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";

// @ts-expect-error - TS2322 - Type 'Context<{ setKeypadElement: (keypadElement: HTMLElement | null | undefined) => void; keypadElement: null; setRenderer: (renderer: RendererInterface | null | undefined) => void; renderer: null; setScrollableElement: (scrollableElement: HTMLElement | ... 1 more ... | undefined) => void; scrollableElement: null; }>' is not assignable to type 'Context<KeypadContext>'.
export const KeypadContext: React.Context<KeypadContextType> =
    React.createContext({
        setKeypadActive: (keypadActive) => {},
        keypadActive: false,
        setKeypadElement: (keypadElement) => {},
        keypadElement: null,
        setRenderer: (renderer) => {},
        renderer: null,
        setScrollableElement: (scrollableElement) => {},
        scrollableElement: null,
    });

type Props = React.PropsWithChildren<unknown>;

export function StatefulKeypadContextProvider(props: Props) {
    // whether or not to display the keypad
    const [keypadActive, setKeypadActive] = useState<boolean>(false);
    // used to communicate between the keypad and the Renderer
    const [keypadElement, setKeypadElement] = useState<any>();
    // this is a KeypadContextRendererInterface from Perseus
    const [renderer, setRenderer] =
        useState<KeypadContextRendererInterface | null>();
    const [scrollableElement, setScrollableElement] =
        useState<HTMLElement | null>();

    const memoizedValue = useMemo(
        () => ({
            keypadActive,
            setKeypadActive,
            keypadElement,
            setKeypadElement,
            renderer,
            setRenderer,
            scrollableElement,
            setScrollableElement,
        }),
        [
            keypadActive,
            setKeypadActive,
            keypadElement,
            setKeypadElement,
            renderer,
            setRenderer,
            scrollableElement,
            setScrollableElement,
        ],
    );

    return (
        <KeypadContext.Provider value={memoizedValue}>
            {props.children}
        </KeypadContext.Provider>
    );
}
