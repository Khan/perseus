import {isFeatureOn} from "@khanacademy/perseus-core";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {ModalDialog, ModalPanel} from "@khanacademy/wonder-blocks-modal";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import closeIcon from "@phosphor-icons/core/bold/x-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {isSvg} from "../widgets/image/utils";

import {usePerseusI18n} from "./i18n-context";
import SvgImage from "./svg-image";
import styles from "./zoomed-image-view.module.css";

import type {Props as SvgImageProps} from "./svg-image";

interface Props extends SvgImageProps {
    onClose: () => void;
}

export const ZoomedImageView = (props: Props) => {
    const i18n = usePerseusI18n();
    const scaleFF = isFeatureOn(
        {apiOptions: props.apiOptions},
        "image-widget-upgrade-scale",
    );

    const {onClose, ...svgProps} = props;
    const width = props.width;
    const contentScale = props.scale;

    const imageIsSvg = isSvg(props.src);

    // Use larger sizes for the zoomed image view:
    // - For SVG images, use 2x or greater for the scale since they can
    //   be expanded without losing quality.
    // - For regular non-SVG images, use 1 (original size). Or use the
    //   saved scale if it's greater than 1, so that the zoomed image view
    //   won't be smaller than the original.
    const scale = imageIsSvg
        ? Math.max(contentScale, 2)
        : Math.max(contentScale, 1);

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
                            style={wbStyles.closeButtonContainer}
                            className={styles.closeButtonWrapper}
                            aria-label={i18n.strings.imageResetZoomAriaLabel}
                        >
                            {() => (
                                <div className={styles.closeButtonIcon}>
                                    <PhosphorIcon
                                        icon={closeIcon}
                                        size="medium"
                                        color={
                                            semanticColor.core.foreground
                                                .instructive.default
                                        }
                                    />
                                </div>
                            )}
                        </Clickable>
                        <div
                            className={styles.imageContainer}
                            // This wrapper's explicit width tells
                            // the image how big it should be.
                            // Without it, the auto-width modal
                            // causes the image to collapse to its
                            // natural pixel size, ignoring scale.
                            style={{
                                width:
                                    width && scaleFF
                                        ? width * scale
                                        : undefined,
                            }}
                        >
                            <div
                                // We need to include the framework-perseus
                                // class here to ensure that the image is
                                // styled correctly. Otherwise the Graphie
                                // labels may not be in the correct positions.
                                className="framework-perseus"
                                // tabIndex={0} makes this a focus target so that:
                                // 1. ModalLauncher's initialFocusId can focus it on
                                //    open, keeping the close button hidden initially.
                                // 2. Tab can move focus here from the close button,
                                //    causing the button to hide without closing the
                                //    modal.
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                                tabIndex={0}
                                id="zoomed-image-container"
                            >
                                <SvgImage
                                    {...svgProps}
                                    // Don't allow zooming inside the
                                    // zoom view.
                                    allowZoom={false}
                                    scale={scaleFF ? scale : 1}
                                />
                            </div>
                        </div>
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
    closeButtonContainer: {
        position: "absolute",
        // Slight offset for the close button outline to be visible.
        top: border.width.medium,
        right: border.width.medium,
        height: sizing.size_400,
        width: sizing.size_400,
        zIndex: 1,
    },
});
