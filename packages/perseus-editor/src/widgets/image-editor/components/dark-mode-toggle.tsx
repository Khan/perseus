import {components} from "@khanacademy/perseus";
import * as React from "react";

import LabeledSwitch from "../../../components/labeled-switch";

import styles from "./dark-mode-toggle.module.css";

import type {Props as ImageEditorProps} from "../image-editor";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";

const {InfoTip} = components;

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
    const suppressFilter =
        new URL(backgroundImage.url ?? "").searchParams.keys().toArray().includes("dark-mode");

    // Determine if the image is a PNG, regardless of any possible query string.
    const imageIsPng = /\.png(\?.*)?$/.test(backgroundImage.url ?? "");

    const toggleDarkMode = () => {
        onShowToggle(showDarkMode ? undefined : "syl-dark");
        setShowDarkMode(!showDarkMode);
    };
    const toggleSuppressFilter = () => {
        onSuppressToggle({
            backgroundImage: {
                ...backgroundImage,
                url: setDarkModeOptionInUrl(suppressFilter ? undefined : "off")
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
            const url = new URL(backgroundImage.url);
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
                    disabled={editingDisabled || !imageIsPng}
                    onChange={toggleSuppressFilter}
                />
                <InfoTip>
                    When the color in the image is important (like in an
                    image of a flag), you can suppress the filter that is
                    used to make images compatible with dark mode.
                    {!imageIsPng && (
                        <strong> This option is only available for PNG images!</strong>
                    )}
                </InfoTip>
            </div>
        </div>
    );
}
