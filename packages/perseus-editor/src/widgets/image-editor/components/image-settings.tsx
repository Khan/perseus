import {isFeatureOn} from "@khanacademy/perseus-core";
import Banner from "@khanacademy/wonder-blocks-banner";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Footnote} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ImagePreview from "../../../components/image-preview";
import styles from "../image-editor.module.css";
import {wbFieldStyles, wbFieldStylesWithDescription} from "../utils";

import DecorativeToggle from "./decorative-toggle";
import ImageDimensionsInput from "./image-dimensions-input";
import ImageScaleInput from "./image-scale-input";

import type {Props} from "../image-editor";

const MIN_ALT_TEXT_LENGTH = 8;
const MAX_ALT_TEXT_LENGTH = 125;
const altTextTooLongError =
    "Keep alt succinct at roughly 125 characters in length. Please pair the alt with a long description if you need significantly more text to sufficiently describe the image.";
const altTextTooShortError =
    "Add more detail to describe your image. While alt text should be brief, it must also describe the image well.";

export default function ImageSettings({
    alt,
    backgroundImage,
    scale = 1,
    apiOptions,
    caption,
    decorative,
    longDescription,
    title,
    onChange,
}: Props) {
    const [altFieldWarning, setAltFieldWarning] = React.useState<string | null>(
        null,
    );

    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");

    if (!backgroundImage.url) {
        return null;
    }

    const hasPopulatedFields = Boolean(
        alt || caption || title || longDescription,
    );

    // Show "alt text too long" error on change so the user is notified
    // as they type that they're writing too much.
    function handleAltFieldChange(value: string) {
        if (value.length === 0) {
            // If the user clears the alt text, clear the error
            setAltFieldWarning(null);
        } else if (value.length > MAX_ALT_TEXT_LENGTH) {
            setAltFieldWarning(altTextTooLongError);
        } else if (value.length >= MIN_ALT_TEXT_LENGTH) {
            setAltFieldWarning(null);
        }
        onChange({alt: value});
    }

    // Only show "alt text too short" error on blur - we don't want to show
    // it on change, as that would show the error immediately as the user
    // starts typing, which would be disruptive.
    function handleAltFieldBlur(value: string) {
        if (value.length > 0 && value.length < MIN_ALT_TEXT_LENGTH) {
            setAltFieldWarning(altTextTooShortError);
        }
    }

    return (
        <>
            {/* Preview */}
            <LabeledField
                label="Preview"
                field={
                    <ImagePreview
                        src={backgroundImage.url}
                        alt={`Preview: ${alt || "No alt text"}`}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Dimensions */}
            {scaleFF ? (
                <ImageScaleInput
                    backgroundImage={backgroundImage}
                    scale={scale}
                    onChange={onChange}
                />
            ) : (
                <ImageDimensionsInput
                    backgroundImage={backgroundImage}
                    onChange={onChange}
                />
            )}

            {/* Decorative */}
            <DecorativeToggle
                decorative={decorative}
                hasPopulatedFields={hasPopulatedFields}
                onChange={onChange}
            />

            {/* Properties in DOM order */}

            {/* Title */}
            <LabeledField
                label="Title"
                field={
                    <TextArea
                        value={title ?? ""}
                        onChange={(value) => onChange({title: value})}
                        disabled={decorative}
                        autoResize={true}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Alt text */}
            <div className={styles.altTextFieldContainer}>
                <LabeledField
                    label="Alt text"
                    description="Summarize the image using up to 125 characters."
                    field={
                        <TextArea
                            value={alt ?? ""}
                            onBlur={(e) => handleAltFieldBlur(e.target.value)}
                            onChange={handleAltFieldChange}
                            disabled={decorative}
                            autoResize={true}
                        />
                    }
                    styles={wbFieldStylesWithDescription}
                />
                <Footnote style={wbStyles.characterCounter}>
                    {alt?.length ?? 0} characters
                </Footnote>
            </div>

            {altFieldWarning && (
                <Banner
                    kind="warning"
                    text={altFieldWarning}
                    styles={{root: {marginBottom: sizing.size_080}}}
                />
            )}

            {altFieldWarning && (
                <Banner
                    kind="warning"
                    text={altFieldWarning}
                    styles={{root: {marginBottom: sizing.size_080}}}
                />
            )}

            {/* Long Description */}
            <LabeledField
                label="Long description"
                field={
                    <TextArea
                        value={longDescription ?? ""}
                        onChange={(value) => onChange({longDescription: value})}
                        disabled={decorative}
                        autoResize={true}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Caption */}
            <LabeledField
                label="Caption"
                field={
                    <TextArea
                        value={caption ?? ""}
                        onChange={(value) => onChange({caption: value})}
                        disabled={decorative}
                        autoResize={true}
                    />
                }
                styles={wbFieldStyles}
            />
        </>
    );
}

// TODO(LEMS-3686): Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const wbStyles = StyleSheet.create({
    characterCounter: {
        position: "absolute",
        bottom: 0,
        right: 8,
    },
});
