import * as React from "react";

type StorybookViewOptions = {
    // `undefined` defers to the story's own apiOptions, so the toolbar can
    // override mobile stories in either direction.
    isMobile: boolean | undefined;
    isRtl: boolean;
};

const defaultViewOptions: StorybookViewOptions = {
    isMobile: undefined,
    isRtl: false,
};

export const StorybookViewOptionsContext =
    React.createContext<StorybookViewOptions>(defaultViewOptions);
