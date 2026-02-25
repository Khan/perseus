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
        if (isNaN(scaleNum) || scaleNum <= 0) {
            return;
        }

        onChange({
            scale: scaleNum,
        });
    }

    function handleScaledWidthChange(newWidth: string) {
        const widthNum = Number(newWidth);
        if (isNaN(widthNum) || widthNum <= 0) {
            return;
        }

        const newScale = widthNum / width;

        onChange({
            scale: newScale,
        });
    }

    function handleScaledHeightChange(newHeight: string) {
        const heightNum = Number(newHeight);
        if (isNaN(heightNum) || heightNum <= 0) {
            return;
        }

        const newScale = heightNum / height;

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
