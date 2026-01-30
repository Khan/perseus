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
    // Track the URL we're currently fetching to prevent stale updates
    const fetchingUrlRef = React.useRef<string | null>(null);

    // If backgroundImage has no width or height on load,
    // set the width and height to the natural image size.
    React.useEffect(() => {
        async function setNaturalSize(url: string) {
            console.log(`[${url}] Starting fetch for natural size`);
            fetchingUrlRef.current = url;

            const naturalSize = await Util.getImageSizeModern(url);
            const [naturalWidth, naturalHeight] = naturalSize;

            console.log(
                `[${url}] Fetch complete: ${naturalWidth}x${naturalHeight}`,
                `Current URL: ${backgroundImage.url}`,
                `Ref URL: ${fetchingUrlRef.current}`,
            );

            // Only update if this is still the current URL being displayed
            if (fetchingUrlRef.current === url && backgroundImage.url === url) {
                console.log(`[${url}] Calling onChange with dimensions`);
                onChange({
                    backgroundImage: {
                        ...backgroundImage,
                        width: naturalWidth,
                        height: naturalHeight,
                    },
                });
            } else {
                console.log(`[${url}] Skipping onChange (stale)`);
            }
        }

        if (
            backgroundImage.url &&
            (!backgroundImage.width || !backgroundImage.height)
        ) {
            console.log(
                `[${backgroundImage.url}] Effect triggered, dimensions missing`,
            );
            setNaturalSize(backgroundImage.url);
        }
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
