type KeyboardShortcutEvent = {
    key: string;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
};

export const isCtrlOrCmdEnter = (event: KeyboardShortcutEvent): boolean => {
    if (event.key !== "Enter") {
        return false;
    }

    if (event.altKey) {
        return false;
    }

    return event.ctrlKey || event.metaKey;
};
