import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalDialog, ModalPanel} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import FixedToResponsive from "./fixed-to-responsive";
import {usePerseusI18n} from "./i18n-context";
import styles from "./zoomed-image-view.module.css";

// 32px on each side of the modal panel
const WB_MODAL_PADDING_TOTAL = 64;

type Props = {
    imgElement: React.ReactNode;
    width: number;
    height: number;
    /**
     * When true, scale up to fill viewport (SVGs/Graphies).
     * When false, only scale to their original size.
     */
    allowScaleUp?: boolean;
    onClose: () => void;
};

export const ZoomedImageView = ({
    imgElement,
    width,
    height,
    allowScaleUp = false,
    onClose,
}: Props) => {
    const i18n = usePerseusI18n();

    // Calculate the maximum available space (account for the modal panel padding).
    const maxWidth = window.innerWidth - WB_MODAL_PADDING_TOTAL;
    const maxHeight = window.innerHeight - WB_MODAL_PADDING_TOTAL;

    const scaleWidth = maxWidth / width;
    const scaleHeight = maxHeight / height;
    // When allowScaleUp is false (e.g. photos), cap at 1 so we never scale up.
    const scale = allowScaleUp
        ? Math.min(scaleWidth, scaleHeight)
        : Math.min(scaleWidth, scaleHeight, 1);

    const displayWidth = width * scale;
    const displayHeight = height * scale;

    return (
        <ModalDialog
            // aria-labelledby is a required prop for ModalDialog, but there
            // is no title for the modal. Since there is no element within
            // this modal for it to be labeled by, we pass an empty string.
            aria-labelledby=""
            style={wbStyles.dialog}
        >
            <ModalPanel
                closeButtonVisible={false}
                content={
                    <div className={styles.contentWrapper}>
                        <Clickable
                            onClick={onClose}
                            aria-label={i18n.strings.imageResetZoomAriaLabel}
                            style={{
                                cursor: "zoom-out",
                            }}
                        >
                            {() => (
                                <div
                                    // We need to include the framework-perseus
                                    // class here to ensure that the image is
                                    // styled correctly. Otherwise the Graphie
                                    // labels may not be in the correct positions.
                                    className="framework-perseus"
                                    style={{
                                        width: displayWidth,
                                        height: displayHeight,
                                    }}
                                >
                                    {allowScaleUp ? (
                                        <div
                                            style={{
                                                width,
                                                height,
                                                /**
                                                 * Use CSS transform to scale
                                                 * the whole box, so that
                                                 * Graphie + labels scale together.
                                                 */
                                                transform: `scale(${scale}, ${scale})`,
                                                transformOrigin: "top left",
                                            }}
                                        >
                                            <FixedToResponsive
                                                className="svg-image"
                                                width={width}
                                                height={height}
                                            >
                                                {imgElement}
                                            </FixedToResponsive>
                                        </div>
                                    ) : (
                                        <FixedToResponsive
                                            className="svg-image"
                                            width={displayWidth}
                                            height={displayHeight}
                                        >
                                            {imgElement}
                                        </FixedToResponsive>
                                    )}
                                </div>
                            )}
                        </Clickable>
                    </div>
                }
            />
        </ModalDialog>
    );
};

// TODO(LEMS-3686): Use CSS modules after Wonder Blocks
// supports it instead of inline styles.
const wbStyles = StyleSheet.create({
    dialog: {
        width: "auto",
        height: "auto",
        // Add padding so that the image doesn't touch the edges
        // of the screen on desktop.
        padding: sizing.size_320,

        // Allow the image to touch the edges of the screen on mobile.
        "@media (max-width: 767px)": {
            padding: 0,
        },
    },
});
