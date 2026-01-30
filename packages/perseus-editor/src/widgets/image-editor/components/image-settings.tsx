import {isFeatureOn} from "@khanacademy/perseus-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import ImagePreview from "../../../components/image-preview";
import {wbFieldStyles, wbFieldStylesWithDescription} from "../utils";

import DecorativeToggle from "./decorative-toggle";
import ImageDimensionsInput from "./image-dimensions-input";

import type {Props} from "../image-editor";

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

    const [width, setWidth] = React.useState<number>(
        backgroundImage.width || 0,
    );
    const [height, setHeight] = React.useState<number>(
        backgroundImage.height || 0,
    );

    // Sync local state with incoming props to prevent stale state
    // within the editor preview.
    React.useEffect(() => {
        setWidth(backgroundImage.width || 0);
        setHeight(backgroundImage.height || 0);
    }, [backgroundImage.width, backgroundImage.height]);

    console.log("backgroundImage URL", backgroundImage.url);
    console.log("backgroundImage width", backgroundImage.width);
    console.log("width", width);
    console.log("backgroundImage height", backgroundImage.height);
    console.log("height", height);

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
                    <ImagePreview
                        src={backgroundImage.url}
                        alt={`Preview: ${alt || "No alt text"}`}
                        width={width}
                        height={height}
                    />
                }
                styles={wbFieldStyles}
            />

            {/* Dimensions */}
            <ImageDimensionsInput
                backgroundImage={backgroundImage}
                onChange={onChange}
            />

            {/* Decorative */}
            {imageUpgradeFF && (
                <DecorativeToggle
                    decorative={decorative}
                    hasPopulatedFields={hasPopulatedFields}
                    onChange={onChange}
                />
            )}

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
            <LabeledField
                label="Alt text"
                description="Summarize the image using up to 150 characters."
                field={
                    <TextArea
                        value={alt ?? ""}
                        onBlur={(e) => handleAltFieldBlur(e.target.value)}
                        onChange={handleAltFieldChange}
                        disabled={decorative}
                        autoResize={true}
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
                        <TextArea
                            value={longDescription ?? ""}
                            onChange={(value) =>
                                onChange({longDescription: value})
                            }
                            disabled={decorative}
                            autoResize={true}
                        />
                    }
                    styles={wbFieldStyles}
                />
            )}

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
