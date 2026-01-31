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

// #region agent log helper
const DEBUG_ENDPOINT =
    "http://127.0.0.1:7242/ingest/c63c859e-8e78-46f2-8afd-b67d4321b942";
function debugLog(
    location: string,
    message: string,
    data: object,
    hypothesisId: string,
) {
    fetch(DEBUG_ENDPOINT, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            location,
            message,
            data,
            timestamp: Date.now(),
            sessionId: "debug-session",
            hypothesisId,
        }),
    }).catch(() => {});
}
// #endregion

export default function ImageDimensionsInput({
    backgroundImage,
    onChange,
}: Props) {
    // Store fetched dimensions in local state. This ensures each widget's
    // onChange is called in its OWN render cycle, not batched with others.
    const [fetchedDimensions, setFetchedDimensions] = React.useState<{
        url: string;
        width: number;
        height: number;
    } | null>(null);

    const {url, width, height} = backgroundImage;
    const needsDimensions = Boolean(url) && (width == null || height == null);
    const urlShort = url?.slice(-30) ?? "no-url";

    // Effect 1: Fetch dimensions and store in local state
    React.useEffect(() => {
        // #region agent log
        debugLog(
            "fetch-effect",
            "Fetch effect triggered",
            {urlShort, width, height, needsDimensions},
            "A,G",
        );
        // #endregion

        if (!needsDimensions || !url) {
            return;
        }

        let cancelled = false;

        async function fetchDimensions() {
            try {
                // #region agent log
                debugLog("fetch-start", "Starting fetch", {urlShort}, "D");
                // #endregion

                const naturalSize = await Util.getImageSizeModern(url!);
                const [naturalWidth, naturalHeight] = naturalSize;

                if (cancelled) {
                    // #region agent log
                    debugLog("fetch-cancelled", "Cancelled", {urlShort}, "G");
                    // #endregion
                    return;
                }

                // #region agent log
                debugLog(
                    "fetch-success",
                    "Storing in local state",
                    {urlShort, naturalWidth, naturalHeight},
                    "G",
                );
                // #endregion

                setFetchedDimensions({
                    url: url!,
                    width: naturalWidth,
                    height: naturalHeight,
                });
            } catch (err) {
                // #region agent log
                debugLog(
                    "fetch-error",
                    "Error",
                    {urlShort, err: String(err)},
                    "D",
                );
                // #endregion
            }
        }

        fetchDimensions();

        return () => {
            cancelled = true;
        };
    }, [needsDimensions, url, urlShort, width, height]);

    // Effect 2: When we have fetched dimensions, call onChange
    // This runs in a SEPARATE render cycle from other widgets
    React.useEffect(() => {
        if (!fetchedDimensions) {
            return;
        }

        // Only apply if the URL still matches and dimensions are still missing
        if (
            fetchedDimensions.url !== backgroundImage.url ||
            backgroundImage.width != null ||
            backgroundImage.height != null
        ) {
            // #region agent log
            debugLog(
                "onChange-skipped",
                "Skipping - URL changed or dims set",
                {
                    urlShort,
                    fetchedUrl: fetchedDimensions.url?.slice(-30),
                    bgWidth: backgroundImage.width,
                },
                "G",
            );
            // #endregion
            setFetchedDimensions(null);
            return;
        }

        // #region agent log
        debugLog(
            "onChange-calling",
            "Calling onChange",
            {urlShort, w: fetchedDimensions.width, h: fetchedDimensions.height},
            "G",
        );
        // #endregion

        onChange({
            backgroundImage: {
                ...backgroundImage,
                width: fetchedDimensions.width,
                height: fetchedDimensions.height,
            },
        });

        setFetchedDimensions(null);

        // #region agent log
        debugLog("onChange-done", "onChange completed", {urlShort}, "G");
        // #endregion
    }, [fetchedDimensions, backgroundImage, onChange, urlShort]);

    function handleWidthChange(newWidth: string) {
        const newHeight = getOtherSideLengthWithPreservedAspectRatio(
            backgroundImage.width!,
            backgroundImage.height!,
            Number(newWidth),
        );

        if (isNaN(newHeight)) {
            return;
        }

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
            backgroundImage.height!,
            backgroundImage.width!,
            Number(newHeight),
        );

        if (isNaN(newWidth)) {
            return;
        }

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
