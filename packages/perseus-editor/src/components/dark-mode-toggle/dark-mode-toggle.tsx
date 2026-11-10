import * as React from "react";

import InfoTip from "../info-tip";
import LabeledSwitch from "../labeled-switch";

import styles from "./dark-mode-toggle.module.css";

interface Props {
    imageUrl: string | null | undefined;
    editingDisabled?: boolean;
    onShowToggle: (theme?: string) => void;
    // Called with the updated image URL. The dark mode filter is suppressed
    // via a query string on the URL, so the URL is the only thing that changes.
    onSuppressToggle: (url: string) => void;
}

export default function DarkModeToggle({
    imageUrl,
    onShowToggle,
    onSuppressToggle,
    editingDisabled = false,
}: Props) {
    const [showDarkMode, setShowDarkMode] = React.useState(false);
    // Using `new URL()` instead of `URL.canParse`, because it unavailable
    // before Safari 17 (current minimum is Safari 16.6).
    const parsedUrl: URL | null = (() => {
        try {
            return new URL(imageUrl ?? "");
        } catch {
            return null;
        }
    })();
    const suppressFilter = parsedUrl?.searchParams.has("dark-mode") ?? false;

    const toggleDarkMode = () => {
        onShowToggle(showDarkMode ? undefined : "syl-dark");
        setShowDarkMode(!showDarkMode);
    };
    const toggleSuppressFilter = () => {
        onSuppressToggle(
            setDarkModeOptionInUrl(suppressFilter ? undefined : "off"),
        );
    };

    /**
     * Adds/Removes a query string to the image URL that causes the CSS style
     * rule to not match, which subsequently affects whether the invert filter
     * gets applied or not.
     * @param darkModeSetting string | undefined
     * The query string is applied to the URL only if the setting value matches
     * "off", otherwise the query string is removed.
     */
    const setDarkModeOptionInUrl = (darkModeSetting?: string): string => {
        try {
            const url = new URL(imageUrl ?? "");
            if (darkModeSetting === "off") {
                url.searchParams.append("dark-mode", "off");
            } else {
                url.searchParams.delete("dark-mode");
            }
            return url.toString();
        } catch {
            return imageUrl ?? "";
        }
    };

    return (
        <div className={styles.darkModeToggleContainer}>
            <LabeledSwitch
                label="Show in Dark Mode"
                checked={showDarkMode}
                disabled={editingDisabled}
                onChange={toggleDarkMode}
            />
            <div className={styles.darkModeSuppressionContainer}>
                <LabeledSwitch
                    label="Suppress Dark Mode Filter"
                    checked={suppressFilter}
                    disabled={editingDisabled || !isGraphicalImage(imageUrl)}
                    onChange={toggleSuppressFilter}
                />
                <InfoTip>
                    When the color in the image is important (like in an image
                    of a flag), you can suppress the filter that is used to make
                    images compatible with dark mode.
                    {!isGraphicalImage(imageUrl) && (
                        <strong>
                            {" "}
                            This option is only available for PNG and SVG
                            images. Other types of images (e.g. JPG, GIF) never
                            change in dark mode.
                        </strong>
                    )}
                </InfoTip>
            </div>
        </div>
    );
}

/**
 * Determines whether an image is a "graphical" type (PNG or SVG) with large
 * flat areas of meaningful color and potentially a transparent background.
 */
// exported for testing
export function isGraphicalImage(url: string | null | undefined): boolean {
    try {
        const {pathname} = new URL(url ?? "");
        return /\.(png|svg)$/.test(pathname);
    } catch {
        return false;
    }
}
