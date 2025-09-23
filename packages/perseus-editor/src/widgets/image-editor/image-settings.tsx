import {components} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

import styles from "./image-editor.module.css";

import type {Props} from "./image-editor";

const {InfoTip, SvgImage} = components;

export default function ImageSettings({
    alt,
    backgroundImage,
    apiOptions,
    caption,
    longDescription,
    title,
    onChange,
}: Props) {
    const uniqueId = React.useId();
    const altId = `${uniqueId}-alt`;
    const titleId = `${uniqueId}-title`;
    const captionId = `${uniqueId}-caption`;
    const longDescriptionId = `${uniqueId}-long-description`;

    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    if (!backgroundImage.url) {
        return null;
    }

    const dimensions = `${backgroundImage.width} x ${backgroundImage.height}`;
    const dimensionString =
        backgroundImage.width && backgroundImage.height
            ? dimensions
            : "unknown";

    return (
        <>
            <HeadingXSmall
                style={{
                    // TODO: Use CSS modules after Wonder Blocks styles
                    // are moved to a different layer.
                    paddingBlockStart: 0, // reset default padding
                    marginBlockStart: sizing.size_120,
                    marginBlockEnd: sizing.size_040,
                    color: "var(--wb-semanticColor-core-foreground-neutral-strong)",
                }}
            >
                Preview:
            </HeadingXSmall>
            <SvgImage
                src={backgroundImage.url}
                alt={`Preview: ${alt ?? "No alt text"}`}
                width={backgroundImage.width}
                height={backgroundImage.height}
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
            <div className={styles.labelWithInfoTip}>
                <HeadingXSmall tag="label" htmlFor={altId}>
                    Alt text:
                </HeadingXSmall>
                <InfoTip>
                    This is important for screenreaders. The content of this alt
                    text will be formatted as markdown (tables, emphasis, etc.
                    are supported).
                </InfoTip>
            </div>
            <AutoResizingTextArea
                id={altId}
                value={alt ?? ""}
                onChange={(value) => onChange({alt: value})}
                style={textAreaStyle}
            />
            {imageUpgradeFF && (
                <>
                    {/* Long Description */}
                    <HeadingXSmall tag="label" htmlFor={longDescriptionId}>
                        Long Description:
                    </HeadingXSmall>
                    <AutoResizingTextArea
                        id={longDescriptionId}
                        value={longDescription ?? ""}
                        onChange={(value) => onChange({longDescription: value})}
                        style={textAreaStyle}
                    />
                </>
            )}
            {/* Title */}
            <HeadingXSmall tag="label" htmlFor={titleId}>
                Title:
            </HeadingXSmall>
            <AutoResizingTextArea
                id={titleId}
                value={title ?? ""}
                onChange={(value) => onChange({title: value})}
                style={textAreaStyle}
            />
            {/* Caption */}
            <HeadingXSmall tag="label" htmlFor={captionId}>
                Caption:
            </HeadingXSmall>
            <AutoResizingTextArea
                id={captionId}
                value={caption ?? ""}
                onChange={(value) => onChange({caption: value})}
                style={textAreaStyle}
            />
        </>
    );
}

// TODO: Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const textAreaStyle = {
    marginBlockStart: sizing.size_040,
    marginBlockEnd: sizing.size_120,
};
