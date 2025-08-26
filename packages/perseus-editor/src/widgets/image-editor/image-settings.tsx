import {Util, components} from "@khanacademy/perseus";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

import styles from "./image-editor.module.css";

import type {Props} from "./image-editor";

const {InfoTip} = components;

export default function ImageSettings({
    alt,
    backgroundImage,
    caption,
    onChange,
}: Props) {
    const uniqueId = React.useId();
    const altId = `${uniqueId}-alt`;
    const captionId = `${uniqueId}-caption`;

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
            {!Util.isLabeledSVG(backgroundImage.url) && (
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
                    <img
                        alt={`Preview: ${alt ?? "No alt text"}`}
                        src={backgroundImage.url}
                        style={{
                            width: "100%",
                        }}
                    />
                </>
            )}

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
                onChange={(value) =>
                    // Avoid saving empty strings in the content data.
                    onChange({alt: value === "" ? undefined : value})
                }
                style={{
                    // TODO: Use CSS modules after Wonder Blocks styles
                    // are moved to a different layer.
                    marginBlockStart: sizing.size_040,
                    marginBlockEnd: sizing.size_080,
                }}
            />

            {/* Caption */}
            <HeadingXSmall tag="label" htmlFor={captionId}>
                Caption:
            </HeadingXSmall>
            <AutoResizingTextArea
                id={captionId}
                value={caption ?? ""}
                onChange={(value) =>
                    // Avoid saving empty strings in the content data.
                    onChange({caption: value === "" ? undefined : value})
                }
                style={{
                    // TODO: Use CSS modules after Wonder Blocks styles
                    // are moved to a different layer.
                    marginBlockStart: sizing.size_040,
                    marginBlockEnd: sizing.size_080,
                }}
            />
        </>
    );
}
