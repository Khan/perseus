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
    onShowToggle: React.Dispatch<React.SetStateAction<string | undefined>>;
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
        backgroundImage.url?.endsWith("?dark-mode=off") ?? false;

    const imageIsPng = backgroundImage.url?.match(/\.png(\?.*)?$/);

    React.useEffect(() => {
        setShowDarkMode(imageIsPng ? showDarkMode : false);
    }, [imageIsPng, showDarkMode]);

    if (!imageIsPng) {
        onShowToggle(undefined);
        return null;
    }

    const toggleDarkMode = () => {
        onShowToggle(showDarkMode ? undefined : "syl-dark");
        setShowDarkMode(!showDarkMode);
    };
    const toggleSuppressFilter = () => {
        onSuppressToggle({
            backgroundImage: {
                ...backgroundImage,
                url: suppressFilter
                    ? backgroundImage.url?.replace("?dark-mode=off", "") ??
                      backgroundImage.url
                    : backgroundImage.url + "?dark-mode=off",
            },
        });
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
                    disabled={editingDisabled}
                    onChange={toggleSuppressFilter}
                />
                <InfoTip>
                    <p>
                        When the color in the image is important (like in an
                        image of a flag), you can suppress the filter that is
                        used to make images compatible with dark mode.
                    </p>
                </InfoTip>
            </div>
        </div>
    );
}
