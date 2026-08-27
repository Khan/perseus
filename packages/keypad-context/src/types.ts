import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";

export type KeypadContextType = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    setKeypadElement: (keypadElement?: any) => void;
    keypadElement: any;
    /**
     * Attaches the renderer the keypad should act on. Safe to call from a ref
     * callback: it writes to a ref, so it never triggers a render.
     */
    setRenderer: (
        renderer?: KeypadContextRendererInterface | null | undefined,
    ) => void;
    /**
     * Blurs the currently attached renderer, if there is one. Stable across
     * renders, so it's safe to use in dependency arrays.
     */
    blurRenderer: () => void;
    setScrollableElement: (
        scrollableElement?: HTMLElement | null | undefined,
    ) => void;
    scrollableElement: HTMLElement | null | undefined;
};
