import * as React from "react";

export const usePreviewUrl = () => {
    const storybookBaseUrl = React.useMemo(
        () => window.location.pathname.split("/").slice(0, -1).join("/"),
        [],
    );
    const storybookPreviewUrl = React.useMemo(() => {
        return `${storybookBaseUrl}/iframe.html?id=dev-support-preview--default&viewMode=story`;
    }, [storybookBaseUrl]);

    return storybookPreviewUrl;
};

export const getPreviewUrl = () => {
    const storybookBaseUrl = window.location.pathname
        .split("/")
        .slice(0, -1)
        .join("/");
    const storybookPreviewUrl = `${storybookBaseUrl}/iframe.html?id=dev-support-preview--default&viewMode=story`;

    return storybookPreviewUrl;
};
