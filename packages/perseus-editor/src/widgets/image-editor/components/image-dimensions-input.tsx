import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {Body, BodyMonospace} from "@khanacademy/wonder-blocks-typography";
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

export default function ImageDimensionsInput({
    backgroundImage,
    scale,
    onChange,
}: Props) {
    const width = backgroundImage.width ?? 0;
    const height = backgroundImage.height ?? 0;

    function handleScaleChange(value: string) {
        const newScale = parseFloat(value);
        onChange({
            scale: newScale,
        });
    }

    function handleScaledWidthChange(value: string) {
        const newWidth = parseFloat(value);
        const scale = newWidth / width;

        onChange({
            scale: scale,
        });
    }

    function handleScaledHeightChange(value: string) {
        const newHeight = parseFloat(value);
        const scale = newHeight / height;

        onChange({
            scale: scale,
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
            <BodyMonospace>
                Original dimensions: {backgroundImage.width} x{" "}
                {backgroundImage.height}
            </BodyMonospace>
            <Button
                kind="tertiary"
                size="small"
                startIcon={arrowCounterClockwise}
                onClick={handleResetToOriginalSize}
            >
                Recalculate original size
            </Button>
            <div
                style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "lightgray",
                    marginTop: 8,
                    marginBottom: 8,
                }}
            />
            <Body>Scale</Body>
            <ScrolllessNumberTextField
                value={scale.toString()}
                onChange={handleScaleChange}
            />
            <div className={styles.dimensionsFieldContainer}>
                <LabeledField
                    label="Scaled width"
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
                    label="Scaled height"
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
