import {components} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

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
    const [altFieldError, setAltFieldError] = React.useState<string | null>(
        null,
    );

    if (!backgroundImage.url) {
        return null;
    }

    const dimensions = `${backgroundImage.width} x ${backgroundImage.height}`;
    const dimensionString =
        backgroundImage.width && backgroundImage.height
            ? dimensions
            : "unknown";

    function handleAltFieldChange(value: string) {
        if (value.length < 8) {
            setAltFieldError(
                "While alt text should be brief, it should still be descriptive.",
            );
        } else if (value.length > 150) {
            setAltFieldError(
                `Alt text must be less than 150 characters. Please use the "Long description" field below for a longer description.`,
            );
        } else {
            setAltFieldError(null);
        }

        onChange({alt: value});
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
                <HeadingXSmall
                    style={{
                        // TODO: Use CSS modules after Wonder Blocks styles
                        // are moved to a different layer.
                        padding: 0, // reset default padding
                        marginInlineEnd: sizing.size_080,
                        color: "var(--wb-semanticColor-core-foreground-neutral-strong)",
                    }}
                >
                    Dimensions:
                </HeadingXSmall>
                {dimensionString}
            </div>

            {/* Alt text */}
            <LabeledField
                label="Alt text:"
                field={
                    <AutoResizingTextArea
                        value={alt ?? ""}
                        onChange={handleAltFieldChange}
                    />
                }
                errorMessage={altFieldError}
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
