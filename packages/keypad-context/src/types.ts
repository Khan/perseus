export type KeypadContextType = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    setKeypadElement: (keypadElement?: any) => void;
    keypadElement: any;
    setRenderer: (renderer?: any) => void;
    renderer: any;
    setScrollableElement: (
        scrollableElement?: HTMLElement | null | undefined,
    ) => void;
    scrollableElement: HTMLElement | null | undefined;
};
