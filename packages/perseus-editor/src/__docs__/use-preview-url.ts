import {ThemeSwitcherContext} from "@khanacademy/wonder-blocks-theming";
import * as React from "react";

/**
 * This iframe hosts a separate Storybook story, so it doesn't inherit our
 * theme automatically -- we forward it via the URL. We read it from context
 * rather than useGlobals() since this hook is called from a nested
 * component, not a story's render function directly.
 *
 * TODO(LEMS-4371): The `storyId` parameter exists for the Fill in the Blank
 * editor POC, whose widget is registered from its stories rather than
 * globally. Drop it once that registration moves into `extra-widgets.ts`.
 *
 * @param storyId the preview story the iframe should load. The iframe is a
 * separate Storybook story with its own module graph, so it only knows about
 * the widgets registered *inside* it. A story working with a widget that isn't
 * in the shipped registry needs its own preview story, and passes that story's
 * id here.
 */
export const usePreviewUrl = (storyId = "dev-support-preview--default") => {
    const theme = React.useContext(ThemeSwitcherContext);
    const storybookBaseUrl = React.useMemo(
        () => window.location.pathname.split("/").slice(0, -1).join("/"),
        [],
    );
    const storybookPreviewUrl = React.useMemo(() => {
        const themeParam = theme ? `&globals=theme:${theme}` : "";
        return `${storybookBaseUrl}/iframe.html?id=${storyId}&viewMode=story${themeParam}`;
    }, [storybookBaseUrl, storyId, theme]);

    return storybookPreviewUrl;
};
