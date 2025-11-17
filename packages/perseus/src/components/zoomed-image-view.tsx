import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalDialog, ModalPanel} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import FixedToResponsive from "./fixed-to-responsive";
import {usePerseusI18n} from "./i18n-context";
import styles from "./zoomed-image-view.module.css";

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
                                        width={width}
                                        height={height}
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
