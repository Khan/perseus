import * as React from "react";
import {useGlobals} from "storybook/preview-api";

export const usePreviewUrl = () => {
    // The preview renders in its own iframe, hosting a separate Storybook
    // story with its own globals -- it doesn't inherit the outer story's
    // theme automatically, so we have to forward the current "Theme"
    // toolbar selection into its URL ourselves.
    const [globals] = useGlobals();
    const storybookBaseUrl = React.useMemo(
        () => window.location.pathname.split("/").slice(0, -1).join("/"),
        [],
    );
    const storybookPreviewUrl = React.useMemo(() => {
        const themeParam = globals.theme
            ? `&globals=theme:${globals.theme}`
            : "";
        return `${storybookBaseUrl}/iframe.html?id=dev-support-preview--default&viewMode=story${themeParam}`;
    }, [storybookBaseUrl, globals.theme]);

    return storybookPreviewUrl;
};
