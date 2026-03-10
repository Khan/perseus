import {Util} from "@khanacademy/perseus";
import Banner from "@khanacademy/wonder-blocks-banner";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
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

// TODO(LEMS-3912): Remove this component in favor of ImageScaleInput
// when the image-widget-upgrade-scale feature flag is removed.
export default function ImageDimensionsInput({
    backgroundImage,
    onChange,
}: Props) {
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
            <Banner
                kind="warning"
                text="Sizing is temporarily disabled due to detected issues."
                styles={{root: {marginBottom: sizing.size_080}}}
            />
            <div className={styles.dimensionsFieldContainer}>
                <LabeledField
                    label="Width"
                    field={
                        <ScrolllessNumberTextField
                            // Temporarily disabled to prevent content authors
                            // from changing the dimensions until we can fix
                            // issues we've been having with sizing.
                            disabled={true}
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
                            // Temporarily disabled to prevent content authors
                            // from changing the dimensions until we can fix
                            // issues we've been having with sizing.
                            disabled={true}
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
