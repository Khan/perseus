import {Util} from "@khanacademy/perseus";
import {
    isFeatureOn,
    type PerseusImageBackground,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import * as React from "react";

import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";
import styles from "../image-editor.module.css";
import {wbFieldStyles} from "../utils";

import type {Props as ImageEditorProps} from "../image-editor";
import type {APIOptions} from "@khanacademy/perseus";

interface Props {
    apiOptions: APIOptions;
    backgroundImage: PerseusImageBackground;
    scale: number;
    onChange: ImageEditorProps["onChange"];
}

export default function ImageScaleInput({
    apiOptions,
    backgroundImage,
    scale,
    onChange,
}: Props) {
    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");
    const width = backgroundImage.width ?? 0;
    const height = backgroundImage.height ?? 0;

    function handleScaleChange(newScale: string) {
        const scaleNum = Number(newScale);

        // Scale needs to be a positive number.
        if (isNaN(scaleNum) || scaleNum <= 0) {
            return;
        }

        onChange({
            scale: scaleNum,
        });
    }

    function handleScaledWidthChange(newScaledWidth: string) {
        const newScaledWidthNum = Number(newScaledWidth);

        // Width needs to be a positive number.
        if (isNaN(newScaledWidthNum) || newScaledWidthNum <= 0) {
            return;
        }

        const newScale = newScaledWidthNum / width;

        onChange({
            scale: newScale,
        });
    }

    function handleScaledHeightChange(newScaledHeight: string) {
        const newScaledHeightNum = Number(newScaledHeight);

        // Height needs to be a positive number.
        if (isNaN(newScaledHeightNum) || newScaledHeightNum <= 0) {
            return;
        }

        const newScale = newScaledHeightNum / height;

        onChange({
            scale: newScale,
        });
    }

    async function handleResetToOriginalSize() {
        if (!backgroundImage.url) {
            return;
        }

        const naturalSize = await Util.getImageSizeModern(backgroundImage.url);
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

    const originalDimensionsArea = (
        <>
            <BodyMonospace>
                Dimensions: {width} x {height}
            </BodyMonospace>
            <Button
                kind="tertiary"
                size="small"
                startIcon={arrowCounterClockwise}
                onClick={handleResetToOriginalSize}
            >
                Recalculate original size
            </Button>
        </>
    );

    if (!scaleFF) {
        return (
            <div className={styles.dimensionsContainer}>
                {originalDimensionsArea}
            </div>
        );
    }

    return (
        <div className={styles.dimensionsContainer}>
            {originalDimensionsArea}

            <div className={styles.horizontalLine} />

            <LabeledField
                label="Scale"
                description="Use 1 to display image at original size."
                field={
                    <ScrolllessNumberTextField
                        value={scale.toString()}
                        min={0}
                        onChange={handleScaleChange}
                    />
                }
                styles={wbFieldStyles}
            />
            <div className={styles.dimensionsFieldContainer}>
                <LabeledField
                    label="Scaled Width"
                    field={
                        <ScrolllessNumberTextField
                            value={(width * scale).toString()}
                            min={0}
                            onChange={handleScaledWidthChange}
                        />
                    }
                    styles={wbFieldStyles}
                />
                <span className={styles.xSpan}>x</span>
                <LabeledField
                    label="Scaled Height"
                    field={
                        <ScrolllessNumberTextField
                            value={(height * scale).toString()}
                            min={0}
                            onChange={handleScaledHeightChange}
                        />
                    }
                    styles={wbFieldStyles}
                />
            </div>
        </div>
    );
}
