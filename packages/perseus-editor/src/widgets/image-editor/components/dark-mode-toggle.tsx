import * as React from "react";

import InfoTip from "../../../components/info-tip";
import LabeledSwitch from "../../../components/labeled-switch";

import styles from "./dark-mode-toggle.module.css";

import type {Props as ImageEditorProps} from "../image-editor";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";

interface Props {
    backgroundImage: PerseusImageBackground;
    editingDisabled?: boolean;
    onShowToggle: (theme?: string) => void;
    onSuppressToggle: ImageEditorProps["onChange"];
}

export default function DarkModeToggle({
    backgroundImage,
    onShowToggle,
    onSuppressToggle,
    editingDisabled = false,
}: Props) {
    const [showDarkMode, setShowDarkMode] = React.useState(false);
    // Using `new URL()` instead of `URL.canParse`, because it unavailable
    // before Safari 17 (current minimum is Safari 16.6).
    const imageUrl: URL | null = (() => {
        try {
            return new URL(backgroundImage.url ?? "");
        } catch {
            return null;
        }
    })();
    const suppressFilter = imageUrl?.searchParams.has("dark-mode") ?? false;

    const toggleDarkMode = () => {
        onShowToggle(showDarkMode ? undefined : "syl-dark");
        setShowDarkMode(!showDarkMode);
    };
    const toggleSuppressFilter = () => {
        onSuppressToggle({
            backgroundImage: {
                ...backgroundImage,
                url: setDarkModeOptionInUrl(suppressFilter ? undefined : "off"),
            },
        });
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
            const url = new URL(backgroundImage.url ?? "");
            if (darkModeSetting === "off") {
                url.searchParams.append("dark-mode", "off");
            } else {
                url.searchParams.delete("dark-mode");
            }
            return url.toString();
        } catch {
            return backgroundImage.url ?? "";
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
                    disabled={
                        editingDisabled ||
                        !isGraphicalImage(backgroundImage.url)
                    }
                    onChange={toggleSuppressFilter}
                />
                <InfoTip>
                    When the color in the image is important (like in an image
                    of a flag), you can suppress the filter that is used to make
                    images compatible with dark mode.
                    {!isGraphicalImage(backgroundImage.url) && (
                        <strong>
                            {" "}
                            This option is only available for PNG images!
                        </strong>
                    )}
                </InfoTip>
            </div>
        </div>
    );
}

/**
 * Determines whether an image is a "graphical" type like PNG or SVG, with
 * large flat areas of meaningful color.
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
