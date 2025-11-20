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
    onClose: () => void;
};

export const ZoomedImageView = ({
    imgElement,
    width,
    height,
    onClose,
}: Props) => {
    const i18n = usePerseusI18n();

    // Calculate the maximum available space (account for the modal panel padding).
    const maxWidth = window.innerWidth - WB_MODAL_PADDING_TOTAL;
    const maxHeight = window.innerHeight - WB_MODAL_PADDING_TOTAL;

    // Figure out the scale for the width and height, and use it to determine
    // which dimension to use for the final size.
    const scaleWidth = maxWidth / width;
    const scaleHeight = maxHeight / height;
    // Choose the smaller of the two so that the image fits inside
    // the window - no scrolling.
    const scale = Math.min(scaleWidth, scaleHeight, 1);

    // Calculate the final dimensions, constraine by the window size.
    const constrainedWidth = width * scale;
    const constrainedHeight = height * scale;

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
                                >
                                    <FixedToResponsive
                                        className="svg-image"
                                        width={constrainedWidth}
                                        height={constrainedHeight}
                                    >
                                        {imgElement}
                                    </FixedToResponsive>
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
