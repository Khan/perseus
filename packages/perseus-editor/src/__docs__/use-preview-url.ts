import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import * as React from "react";

// This iframe hosts a separate Storybook story, so it doesn't inherit our
// theme automatically -- we forward it via the URL. We read it from context
// rather than useGlobals() since this hook is called from a nested
// component, not a story's render function directly.
export const usePreviewUrl = () => {
    const theme = React.useContext(ThemeSwitcherContext);
    const storybookBaseUrl = React.useMemo(
        () => window.location.pathname.split("/").slice(0, -1).join("/"),
        [],
    );
    const storybookPreviewUrl = React.useMemo(() => {
        const themeParam = theme ? `&globals=theme:${theme}` : "";
        return `${storybookBaseUrl}/iframe.html?id=dev-support-preview--default&viewMode=story${themeParam}`;
    }, [storybookBaseUrl, theme]);

    return storybookPreviewUrl;
};
