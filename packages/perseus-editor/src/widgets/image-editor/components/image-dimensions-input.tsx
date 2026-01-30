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
    // Auto-populate empty dimensions with the image's natural size
    const {url, width, height} = backgroundImage;
    React.useEffect(() => {
        // Only proceed if we have an image URL but missing dimensions
        if (!url || (width != null && height != null)) {
            return;
        }

        let cancelled = false;

        async function populateMissingDimensions() {
            try {
                // url is guaranteed to be defined here due to the check above
                const naturalSize = await Util.getImageSizeModern(url!);
                const [naturalWidth, naturalHeight] = naturalSize;

                // Don't update if this effect has been superseded
                if (cancelled) {
                    return;
                }

                onChange({
                    backgroundImage: {
                        ...backgroundImage,
                        width: naturalWidth,
                        height: naturalHeight,
                    },
                });
            } catch (e) {
                // Image failed to load - silently ignore
            }
        }

        populateMissingDimensions();

        return () => {
            cancelled = true;
        };
    }, [url, width, height, backgroundImage, onChange]);

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
