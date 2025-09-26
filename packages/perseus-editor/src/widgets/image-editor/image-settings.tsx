import {components} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

import DecorativeToggle from "./components/decorative-toggle";
import styles from "./image-editor.module.css";

import type {Props} from "./image-editor";

const {SvgImage} = components;

const MIN_ALT_TEXT_LENGTH = 8;
const MAX_ALT_TEXT_LENGTH = 150;
const altTextTooLongError =
    "Alt text should not exceed 150 characters. Please pair your alt with a long description below if you need significantly more text to sufficiently describe the image.";
const altTextTooShortError =
    "Add more detail to describe your image. While alt text should be brief, it must also describe the image well.";

export default function ImageSettings({
    alt,
    backgroundImage,
    apiOptions,
    caption,
    decorative,
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

    // Show "alt text too long" error on change so the user is notified
    // as they type that they're writing too much.
    function handleAltFieldChange(value: string) {
        if (value.length === 0) {
            // If the user clears the alt text, clear the error
            setAltFieldError(null);
        } else if (imageUpgradeFF && value.length > MAX_ALT_TEXT_LENGTH) {
            setAltFieldError(altTextTooLongError);
        } else if (value.length >= MIN_ALT_TEXT_LENGTH) {
            setAltFieldError(null);
        }
        onChange({alt: value});
    }

    // Only show "alt text too short" error on blur - we don't want to show
    // it on change, as that would show the error immediately as the user
    // starts typing, which would be disruptive.
    function handleAltFieldBlur(value: string) {
        if (value.length > 0 && value.length < MIN_ALT_TEXT_LENGTH) {
            setAltFieldError(altTextTooShortError);
        }
    }

    return (
        <>
            {/* Preview */}
            <LabeledField
                label="Preview"
                field={
                    <SvgImage
                        src={backgroundImage.url}
                        alt={`Preview: ${alt || "No alt text"}`}
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

            {/* Decorative */}
            {imageUpgradeFF && (
                <DecorativeToggle
                    decorative={decorative}
                    hasPopulatedFields={Boolean(
                        alt || caption || title || longDescription,
                    )}
                    onChange={onChange}
                />
            )}

            {/* Alt text */}
            <LabeledField
                label="Alt text"
                description="Summarize the image using up to 150 characters."
                field={
                    <AutoResizingTextArea
                        value={alt ?? ""}
                        onBlur={(e) => handleAltFieldBlur(e.target.value)}
                        onChange={handleAltFieldChange}
                        disabled={decorative}
                    />
                }
                errorMessage={altFieldError}
                styles={wbFieldStylesWithDescription}
            />

            {/* Long Description */}
            {imageUpgradeFF && (
                <LabeledField
                    label="Long description"
                    field={
                        <AutoResizingTextArea
                            value={longDescription ?? ""}
                            onChange={(value) =>
                                onChange({longDescription: value})
                            }
                            disabled={decorative}
                        />
                    }
                    styles={wbFieldStyles}
                />
            )}

            {/* Title */}
            <LabeledField
                label="Title"
                field={
                    <AutoResizingTextArea
                        value={title ?? ""}
                        onChange={(value) => onChange({title: value})}
                        disabled={decorative}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Caption */}
            <LabeledField
                label="Caption"
                field={
                    <AutoResizingTextArea
                        value={caption ?? ""}
                        onChange={(value) => onChange({caption: value})}
                        disabled={decorative}
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
        fontWeight: "bold",
        paddingBlockEnd: sizing.size_040,
    },
};

// Exporting so this can be used in image-url-input.tsx.
export const wbFieldStylesWithDescription = {
    ...wbFieldStyles,
    label: {
        ...wbFieldStyles.label,
        paddingBlockEnd: 0,
    },
    description: {
        paddingBlockStart: 0,
        paddingBlockEnd: sizing.size_040,
    },
};
