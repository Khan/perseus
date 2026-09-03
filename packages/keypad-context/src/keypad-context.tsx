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
import {useCallback, useRef, useState, useMemo} from "react";

import type {KeypadContextType} from "./types";
import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";

export const KeypadContext: React.Context<KeypadContextType> =
    React.createContext<KeypadContextType>({
        setKeypadActive: (keypadActive) => {},
        keypadActive: false,
        setKeypadElement: (keypadElement) => {},
        keypadElement: null,
        setRenderer: (renderer) => {},
        blurRenderer: () => {},
        setScrollableElement: (scrollableElement) => {},
        scrollableElement: null,
    });

type Props = React.PropsWithChildren<unknown>;

export function StatefulKeypadContextProvider(props: Props) {
    // whether or not to display the keypad
    const [keypadActive, setKeypadActive] = useState<boolean>(false);
    // used to communicate between the keypad and the Renderer
    const [keypadElement, setKeypadElement] = useState<any>();
    const [scrollableElement, setScrollableElement] =
        useState<HTMLElement | null>();

    const rendererRef = useRef<KeypadContextRendererInterface | null>(null);

    // useCallback is to keep useMemo stable
    const setRenderer = useCallback<KeypadContextType["setRenderer"]>(
        (renderer) => {
            rendererRef.current = renderer ?? null;
        },
        [],
    );

    // useCallback is to keep useMemo stable
    const blurRenderer = useCallback(() => {
        rendererRef.current?.blur();
    }, []);

    // the context is wrapped around most of Khan Academy frontend code
    // without memoization, we were rerendering the entire application
    // which affected redirects negatively.
    const memoizedValue = useMemo(
        () => ({
            keypadActive,
            setKeypadActive,
            keypadElement,
            setKeypadElement,
            setRenderer,
            blurRenderer,
            scrollableElement,
            setScrollableElement,
        }),
        [
            keypadActive,
            keypadElement,
            setRenderer,
            blurRenderer,
            scrollableElement,
        ],
    );

    return (
        <KeypadContext.Provider value={memoizedValue}>
            {props.children}
        </KeypadContext.Provider>
    );
}
