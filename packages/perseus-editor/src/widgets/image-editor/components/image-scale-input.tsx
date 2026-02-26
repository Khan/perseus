import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import * as React from "react";

import ScrolllessNumberTextField from "../../../components/scrollless-number-text-field";
import styles from "../image-editor.module.css";
import {wbFieldStyles} from "../utils";

import type {Props as ImageEditorProps} from "../image-editor";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";

interface Props {
    backgroundImage: PerseusImageBackground;
    scale: number;
    onChange: ImageEditorProps["onChange"];
}

export default function ImageScaleInput({
    backgroundImage,
    scale,
    onChange,
}: Props) {
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

    return (
        <div className={styles.dimensionsContainer}>
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

            <div className={styles.horizontalLine} />

            <LabeledField
                label="Scale"
                description="Use a scale of 1 to display image at original size."
                field={
                    <ScrolllessNumberTextField
                        value={scale > 0 ? scale.toString() : "1"}
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
                            onChange={handleScaledHeightChange}
                        />
                    }
                    styles={wbFieldStyles}
                />
            </div>
        </div>
    );
}
