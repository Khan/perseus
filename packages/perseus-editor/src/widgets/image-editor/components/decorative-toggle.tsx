import {components} from "@khanacademy/perseus";
import * as React from "react";

import LabeledSwitch from "../../../components/labeled-switch";

import styles from "./decorative-toggle.module.css";

import type {Props as ImageEditorProps} from "../image-editor";

const {InfoTip} = components;

interface Props {
    decorative?: boolean;
    hasPopulatedFields?: boolean;
    onChange: ImageEditorProps["onChange"];
}

export default function DecorativeToggle({
    decorative,
    hasPopulatedFields,
    onChange,
}: Props) {
    function handleDecorativeToggle(newValue: boolean) {
        if (!newValue) {
            // If toggling off decorative, set decorative to false
            onChange({decorative: false});
            return;
        }

        if (!hasPopulatedFields) {
            onChange({decorative: true});
            return;
        }

        // eslint-disable-next-line no-alert
        const shouldReset = window.confirm(
            "Setting this image as decorative will automatically reset all other fields (title, caption, alt text, and long description). Do you want to continue?",
        );

        if (shouldReset) {
            onChange({
                decorative: true,
                alt: undefined,
                caption: undefined,
                title: undefined,
                longDescription: undefined,
            });
        }
    }

    return (
        <div className={styles.decorativeToggleContainer}>
            <div className={styles.flexRow}>
                <LabeledSwitch
                    label="Decorative"
                    checked={decorative ?? false}
                    onChange={handleDecorativeToggle}
                />
                <InfoTip>
                    <p>
                        Mark this image as decorative and it will not have any
                        alt text, description, title, or caption.
                    </p>
                </InfoTip>
            </div>
        </div>
    );
}
