import {components} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import {AutoResizingTextArea} from "../../../components/auto-resizing-text-area";
import {wbFieldStyles} from "../utils";

import ImageDimensionsInput from "./image-dimensions-input";

import type {Props} from "../image-editor";

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
            <ImageDimensionsInput
                backgroundImage={backgroundImage}
                onChange={onChange}
            />

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
