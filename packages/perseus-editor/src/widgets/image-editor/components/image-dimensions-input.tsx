import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import * as React from "react";

import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";
import styles from "../image-editor.module.css";
import {
    wbFieldStyles,
    getOtherSideLengthWithPreservedAspectRatio,
} from "../utils";

import type {Props as ImageEditorProps} from "../image-editor";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";

interface Props {
    backgroundImage: PerseusImageBackground;
    onChange: ImageEditorProps["onChange"];
}

export default function ImageDimensionsInput({
    backgroundImage,
    onChange,
}: Props) {
    console.log(
        `[${backgroundImage.url}] Component render - width: ${backgroundImage.width}, height: ${backgroundImage.height}`,
    );

    // Track the URL we're currently fetching to prevent stale updates
    const fetchingUrlRef = React.useRef<string | null>(null);
    // Keep a ref to the latest backgroundImage to avoid stale closures
    const backgroundImageRef = React.useRef(backgroundImage);
    backgroundImageRef.current = backgroundImage;

    // If backgroundImage has no width or height on load,
    // set the width and height to the natural image size.
    React.useEffect(() => {
        // Skip if no URL
        if (!backgroundImage.url) {
            return;
        }

        // Skip if dimensions are already set
        if (backgroundImage.width && backgroundImage.height) {
            return;
        }

        async function setNaturalSize(url: string) {
            console.log(`[${url}] Starting fetch for natural size`);
            fetchingUrlRef.current = url;

            try {
                const naturalSize = await Util.getImageSizeModern(url);
                const [naturalWidth, naturalHeight] = naturalSize;

                console.log(
                    `[${url}] Fetch complete: ${naturalWidth}x${naturalHeight}`,
                );

                // Only update if this is still the current URL being displayed
                if (fetchingUrlRef.current === url) {
                    // Use the ref to get the latest backgroundImage value
                    // to avoid stale closure issues
                    const latestBg = backgroundImageRef.current;

                    // Skip if dimensions were set by another update
                    if (latestBg.width && latestBg.height) {
                        console.log(
                            `[${url}] Skipping onChange (dimensions already set by another update)`,
                        );
                        return;
                    }

                    console.log(`[${url}] Calling onChange with dimensions`);
                    // Spread backgroundImage to preserve any existing properties
                    // like scale, top, left, etc. that might have been set
                    onChange({
                        backgroundImage: {
                            ...latestBg,
                            width: naturalWidth,
                            height: naturalHeight,
                        },
                    });
                } else {
                    console.log(`[${url}] Skipping onChange (URL changed)`);
                }
            } catch (error) {
                console.error(`[${url}] Error fetching image size:`, error);
            }
        }

        console.log(
            `[${backgroundImage.url}] Effect triggered, dimensions missing`,
        );
        setNaturalSize(backgroundImage.url);
        // We ONLY want to run this effect if the URL, width, or height changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backgroundImage.url, backgroundImage.width, backgroundImage.height]);

    function handleWidthChange(newWidth: string) {
        const newHeight = getOtherSideLengthWithPreservedAspectRatio(
            backgroundImage.width!, // current side (width)
            backgroundImage.height!, // other side (height)
            Number(newWidth), // new side (width)
        );

        if (isNaN(newHeight)) {
            return;
        }

        // Prevent unnecessary updates if values haven't changed
        const newWidthNumber = Number(newWidth);
        if (
            newWidthNumber === backgroundImage.width &&
            newHeight === backgroundImage.height
        ) {
            return;
        }

        onChange({
            backgroundImage: {
                ...backgroundImage,
                width: newWidthNumber,
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

        // Prevent unnecessary updates if values haven't changed
        const newHeightNumber = Number(newHeight);
        if (
            newWidth === backgroundImage.width &&
            newHeightNumber === backgroundImage.height
        ) {
            return;
        }

        onChange({
            backgroundImage: {
                ...backgroundImage,
                height: newHeightNumber,
                width: newWidth,
            },
        });
    }

    async function handleResetToOriginalSize() {
        const naturalSize = await Util.getImageSizeModern(backgroundImage.url!);
        const [naturalWidth, naturalHeight] = naturalSize;

        if (
            naturalWidth === backgroundImage.width &&
            naturalHeight === backgroundImage.height
        ) {
            return;
        }

        onChange({
            backgroundImage: {
                ...backgroundImage,
                width: naturalWidth,
                height: naturalHeight,
            },
        });
    }

    return (
        <div className={styles.dimensionsContainer}>
            <div className={styles.dimensionsFieldContainer}>
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
            <Button
                kind="tertiary"
                size="small"
                startIcon={arrowCounterClockwise}
                onClick={handleResetToOriginalSize}
            >
                Reset to original size
            </Button>
        </div>
    );
}
