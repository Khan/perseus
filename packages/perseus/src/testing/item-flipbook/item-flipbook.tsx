import * as React from "react";
import {useReducer, useRef} from "react";

import {createItemFlipbookModel} from "./item-flipbook-model";
import {ItemFlipbookView} from "./item-flipbook-view";

export function ItemFlipbook() {
    const model = useModel(createItemFlipbookModel);

    return <ItemFlipbookView viewModel={model.present()} />;
}

/**
 * App-agnostic hook. Calls the given `constructor` function to create a value
 * of type T. When the `observer` function passed to `constructor` is called,
 * the UI re-renders.
 */
function useModel<T>(constructor: (observer: () => void) => T): T {
    const rerender = useRerender();
    const modelRef = useRef<T | null>(null);
    modelRef.current ??= constructor(rerender);
    return modelRef.current;
}

/**
 * App-agnostic hook. Returns a function that requests a re-render of the UI.
 */
function useRerender(): () => void {
    const [_, dispatch] = useReducer((n) => n + 1, 0);
    return dispatch;
}
