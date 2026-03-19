import Clickable from "@khanacademy/wonder-blocks-clickable";
import {ModalDialog, ModalPanel} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {usePerseusI18n} from "./i18n-context";
import SvgImage from "./svg-image";
import styles from "./zoomed-image-view.module.css";

import type {Props as SvgImageProps} from "./svg-image";

interface Props extends SvgImageProps {
    onClose: () => void;
}

export const ZoomedImageView = (props: Props) => {
    const i18n = usePerseusI18n();

    const {onClose, ...svgProps} = props;
    const width = props.width;

    // Don't use a scale less than 1 for the zoomed image.
    const largerScale = Math.max(svgProps.scale, 1);

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
                                // This wrapper's explicit width tells
                                // the image how big it should be.
                                // Without it, the auto-width modal
                                // causes the image to collapse to its
                                // natural pixel size, ignoring scale.
                                <div
                                    className={styles.imageContainer}
                                    style={{
                                        width: width
                                            ? width * largerScale
                                            : undefined,
                                    }}
                                >
                                    <div
                                        // We need to include the framework-perseus
                                        // class here to ensure that the image is
                                        // styled correctly. Otherwise the Graphie
                                        // labels may not be in the correct positions.
                                        className="framework-perseus"
                                    >
                                        <SvgImage
                                            {...svgProps}
                                            // Don't allow zooming inside the
                                            // zoom view.
                                            allowZoom={false}
                                            scale={largerScale}
                                        />
                                    </div>
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
        // Add margin so that the image doesn't touch the edges
        // of the screen on desktop.
        margin: sizing.size_320,

        // Allow the image to touch the edges of the screen on mobile.
        "@media (max-width: 767px)": {
            margin: 0,
        },
    },
});
