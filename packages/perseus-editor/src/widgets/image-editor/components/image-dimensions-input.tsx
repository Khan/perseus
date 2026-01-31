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
    // Auto-populate empty dimensions with the image's natural size.
    // We track in-flight fetches to avoid race conditions when multiple
    // images load simultaneously.
    const fetchingUrlRef = React.useRef<string | null | undefined>(null);

    // Keep a ref to always have the CURRENT backgroundImage value.
    // This is critical because when multiple images fetch simultaneously,
    // their async callbacks complete in a batch. Without this ref, each
    // callback would spread a STALE backgroundImage from when the effect
    // started, causing later updates to overwrite earlier ones.
    const backgroundImageRef = React.useRef(backgroundImage);
    backgroundImageRef.current = backgroundImage;

    const {url, width, height} = backgroundImage;
    const needsDimensions = Boolean(url) && (width == null || height == null);
    const urlShort = url?.slice(-30) ?? "no-url";

    React.useEffect(() => {
        // #region agent log
        debugLog(
            "effect-start",
            "Effect triggered",
            {
                urlShort,
                width,
                height,
                needsDimensions,
                fetchingRef: fetchingUrlRef.current?.slice(-30),
            },
            "A,B",
        );
        // #endregion

        if (!needsDimensions) {
            // #region agent log
            debugLog(
                "early-exit-no-need",
                "Early exit: needsDimensions is false",
                {urlShort, width, height},
                "A",
            );
            // #endregion
            return;
        }

        if (fetchingUrlRef.current === url) {
            // #region agent log
            debugLog(
                "early-exit-already-fetching",
                "Early exit: already fetching this URL",
                {urlShort},
                "B",
            );
            // #endregion
            return;
        }

        fetchingUrlRef.current = url;

        async function populateMissingDimensions() {
            try {
                // #region agent log
                debugLog(
                    "fetch-start",
                    "Starting getImageSizeModern",
                    {urlShort},
                    "D",
                );
                // #endregion

                const naturalSize = await Util.getImageSizeModern(url!);
                const [naturalWidth, naturalHeight] = naturalSize;

                // #region agent log
                debugLog(
                    "fetch-success",
                    "Fetch succeeded, about to call onChange",
                    {
                        urlShort,
                        naturalWidth,
                        naturalHeight,
                        bgUrl: backgroundImage.url?.slice(-30),
                        bgWidth: backgroundImage.width,
                        bgHeight: backgroundImage.height,
                    },
                    "C,E",
                );
                // #endregion

                if (fetchingUrlRef.current === url) {
                    fetchingUrlRef.current = null;
                }

                // Use the REF to get the CURRENT backgroundImage, not the stale
                // closure value. This ensures that when multiple images complete
                // their fetches simultaneously, each uses the latest state.
                const currentBgImage = backgroundImageRef.current;

                // Capture what we're about to send
                const payload = {
                    backgroundImage: {
                        ...currentBgImage,
                        width: naturalWidth,
                        height: naturalHeight,
                    },
                };

                // #region agent log
                debugLog(
                    "onChange-payload",
                    "Payload being sent to onChange (using ref)",
                    {
                        urlShort,
                        payloadUrl: payload.backgroundImage.url?.slice(-30),
                        payloadWidth: payload.backgroundImage.width,
                        payloadHeight: payload.backgroundImage.height,
                        refUrl: currentBgImage.url?.slice(-30),
                    },
                    "E,F",
                );
                // #endregion

                onChange(payload);

                // #region agent log
                debugLog(
                    "onChange-called",
                    "onChange completed",
                    {urlShort, naturalWidth, naturalHeight},
                    "C",
                );
                // #endregion
            } catch (err) {
                // #region agent log
                debugLog(
                    "fetch-error",
                    "Fetch threw an error",
                    {urlShort, error: String(err)},
                    "D",
                );
                // #endregion

                if (fetchingUrlRef.current === url) {
                    fetchingUrlRef.current = null;
                }
            }
        }

        populateMissingDimensions();
    }, [
        needsDimensions,
        url,
        urlShort,
        width,
        height,
        backgroundImage,
        onChange,
    ]);

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
