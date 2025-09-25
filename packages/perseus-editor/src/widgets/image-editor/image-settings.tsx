import {components} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";
import ScrolllessNumberTextField from "../../components/scrollless-number-text-field";
import {getOtherSideLengthWithPreservedAspectRatio} from "../radio/utils";

import styles from "./image-editor.module.css";

import type {Props} from "./image-editor";

const {SvgImage} = components;

export default function ImageSettings({
    alt,
    backgroundImage,
    apiOptions,
    caption,
    longDescription,
    title,
    onChange,
}: Props) {
    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    if (
        !backgroundImage.url ||
        !backgroundImage.width ||
        !backgroundImage.height
    ) {
        return null;
    }

    function handleWidthChange(newWidth: string) {
        const newHeight = getOtherSideLengthWithPreservedAspectRatio(
            backgroundImage.width!, // current side (width)
            backgroundImage.height!, // other side (height)
            Number(newWidth), // new side (width)
        );

        if (isNaN(newHeight)) {
            return;
        }

        onChange({
            backgroundImage: {
                ...backgroundImage,
                width: Number(newWidth),
                height: newHeight,
            },
        });
    }

    function handleHeightChange(newHeight: string) {
        const newWidth = getOtherSideLengthWithPreservedAspectRatio(
            backgroundImage.height!, // current side (height)
            backgroundImage.width!, // other side (width)
            Number(newHeight), // new side (height)
        );

        if (isNaN(newWidth)) {
            return;
        }

        onChange({
            backgroundImage: {
                ...backgroundImage,
                height: Number(newHeight),
                width: newWidth,
            },
        });
    }

    return (
        <>
            {/* Preview */}
            <LabeledField
                label="Preview:"
                field={
                    <SvgImage
                        src={backgroundImage.url}
                        alt={`Preview: ${alt ?? "No alt text"}`}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Dimensions */}
            <div className={styles.dimensionsContainer}>
                <LabeledField
                    label="Width"
                    field={
                        <ScrolllessNumberTextField
                            value={backgroundImage.width?.toString() ?? ""}
                            onChange={handleWidthChange}
                        />
                    }
                    styles={wbFieldStyles}
                />
                <span className={styles.xSpan}>x</span>
                <LabeledField
                    label="Height"
                    field={
                        <ScrolllessNumberTextField
                            value={backgroundImage.height?.toString() ?? ""}
                            onChange={handleHeightChange}
                        />
                    }
                    styles={wbFieldStyles}
                />
            </div>

            {/* Alt text */}
            <LabeledField
                label="Alt text:"
                field={
                    <AutoResizingTextArea
                        value={alt ?? ""}
                        onChange={(value) => onChange({alt: value})}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Long Description */}
            {imageUpgradeFF && (
                <LabeledField
                    label="Long description:"
                    field={
                        <AutoResizingTextArea
                            value={longDescription ?? ""}
                            onChange={(value) =>
                                onChange({longDescription: value})
                            }
                        />
                    }
                    styles={wbFieldStyles}
                />
            )}

            {/* Title */}
            <LabeledField
                label="Title:"
                field={
                    <AutoResizingTextArea
                        value={title ?? ""}
                        onChange={(value) => onChange({title: value})}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Caption */}
            <LabeledField
                label="Caption:"
                field={
                    <AutoResizingTextArea
                        value={caption ?? ""}
                        onChange={(value) => onChange({caption: value})}
                    />
                }
                styles={wbFieldStyles}
            />
        </>
    );
}

// TODO: Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const wbFieldStyles = {
    root: {
        marginBlockEnd: sizing.size_080,
    },
    label: {
        paddingBlockEnd: sizing.size_040,
    },
};
