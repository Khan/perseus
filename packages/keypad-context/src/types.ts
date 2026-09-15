import type {KeypadContextRendererInterface} from "@khanacademy/perseus-core";

export type KeypadContextType = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    setKeypadElement: (keypadElement?: any) => void;
    keypadElement: any;
    /**
     * Attaches the renderer the keypad should act on
     */
    setRenderer: (
        renderer?: KeypadContextRendererInterface | null | undefined,
    ) => void;
    /**
     * Blurs the currently attached renderer, if there is one
     */
    blurRenderer: () => void;
    setScrollableElement: (
        scrollableElement?: HTMLElement | null | undefined,
    ) => void;
    scrollableElement: HTMLElement | null | undefined;
};
