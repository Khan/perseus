import * as React from "react";
import {useReducer, useRef} from "react";

import {createItemFlipbookModel} from "./item-flipbook-model";

import {ItemFlipbookView} from "./item-flipbook-view";

export function ItemFlipbook() {
    const model = useModel(createItemFlipbookModel);

    return <ItemFlipbookView viewModel={model.present()} />;
}

function useModel<T>(constructor: (observer: () => void) => T): T {
    const rerender = useRerender();
    const modelRef = useRef<T | null>(null);
    modelRef.current ??= constructor(rerender);
    return modelRef.current;
}

function useRerender(): () => void {
    const [_, dispatch] = useReducer((n) => n + 1, 0);
    return dispatch;
}
