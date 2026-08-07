import * as React from "react";

// The preview renders in its own iframe, hosting a separate Storybook story
// with its own globals -- it doesn't inherit the outer story's theme
// automatically, so we have to forward the current "Theme" toolbar
// selection into its URL ourselves. We read it straight from the current
// page's URL (where Storybook persists globals) rather than a
// storybook/preview-api hook like useGlobals(), because those hooks are
// only safe to call directly inside a story's own render function --
// calling them from a nested component (like this hook is, in most
// editor stories) throws "Rendered more hooks than during the previous
// render." Reading the URL works because Storybook already re-renders the
// whole story tree whenever globals change, so this stays in sync.
function getCurrentTheme(): string | undefined {
    return new URLSearchParams(window.location.search)
        .get("globals")
        ?.split(";")
        .find((entry) => entry.startsWith("theme:"))
        ?.slice("theme:".length);
}

export const usePreviewUrl = () => {
    const storybookBaseUrl = React.useMemo(
        () => window.location.pathname.split("/").slice(0, -1).join("/"),
        [],
    );
    const theme = getCurrentTheme();
    const storybookPreviewUrl = React.useMemo(() => {
        const themeParam = theme ? `&globals=theme:${theme}` : "";
        return `${storybookBaseUrl}/iframe.html?id=dev-support-preview--default&viewMode=story${themeParam}`;
    }, [storybookBaseUrl, theme]);

    return storybookPreviewUrl;
};
