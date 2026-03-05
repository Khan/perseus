import {Util} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import arrowCounterClockwise from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import * as React from "react";

import styles from "../image-editor.module.css";

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
                Dimensions: {backgroundImage.width} x {backgroundImage.height}
            </BodyMonospace>
            <Button
                kind="tertiary"
                size="small"
                startIcon={arrowCounterClockwise}
                onClick={handleResetToOriginalSize}
            >
                Recalculate original size
            </Button>
        </div>
    );
}
