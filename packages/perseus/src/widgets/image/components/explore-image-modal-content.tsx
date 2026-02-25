import {isFeatureOn} from "@khanacademy/perseus-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import AssetContext from "../../../asset-context";
import {SvgImage} from "../../../components";
import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import type {ImageInfoAreaProps} from "./image-info-area";

const MODAL_HEIGHT = 568;

export default function ExploreImageModalContent({
    backgroundImage,
    caption,
    alt,
    longDescription,
    linterContext,
    apiOptions,
    box,
    labels,
    range,
    zoomSize,
}: ImageInfoAreaProps) {
    const context = React.useContext(PerseusI18nContext);
    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");

    const [zoomWidth, zoomHeight] = zoomSize;

    if (
        !backgroundImage.height ||
        !backgroundImage.width ||
        !backgroundImage.url
    ) {
        return null;
    }

    // Contain the image to the modal dimensions:
    // - Shrink image to the modal height if it's taller than the modal.
    // - Keep image its original size if it's shorter than the modal.
    // - Maintain the image's aspect ratio.
    let modalImageHeight = Math.min(MODAL_HEIGHT, zoomHeight);
    // bgWidth / bgHeight = X / modalImageHeight
    // => X = (bgWidth / bgHeight) * modalImageHeight
    let width = (zoomWidth / zoomHeight) * modalImageHeight;

    if (scaleFF) {
        // Contain the image to the modal dimensions:
        // - Shrink image to the modal height if it's taller than the modal.
        // - Keep image its original size if it's shorter than the modal.
        // - Maintain the image's aspect ratio.
        modalImageHeight = Math.min(MODAL_HEIGHT, backgroundImage.height);
        // bgWidth / bgHeight = X / modalImageHeight
        // => X = (bgWidth / bgHeight) * modalImageHeight
        width =
            (backgroundImage.width / backgroundImage.height) * modalImageHeight;
    }

    return (
        <div className={styles.modalPanelContainer}>
            <div className={styles.modalImageContainer}>
                {/* Need to use SvgImage in order to load Graphie images */}
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={backgroundImage.url!}
                            // Don't allow opening a modal within a modal.
                            allowZoom={false}
                            alt={caption === alt ? "" : alt}
                            width={width}
                            height={modalImageHeight}
                            preloader={apiOptions.imagePreloader}
                            extraGraphie={{
                                box: box,
                                range: range,
                                labels: labels ?? [],
                            }}
                            zoomToFullSizeOnMobile={apiOptions.isMobile}
                            constrainHeight={apiOptions.isMobile}
                            allowFullBleed={apiOptions.isMobile}
                            setAssetStatus={setAssetStatus}
                        />
                    )}
                </AssetContext.Consumer>
            </div>
            <div
                className={`perseus-image-modal-description ${styles.modalDescriptionContainer}`}
            >
                {caption && (
                    <div className={styles.modalCaptionContainer}>
                        {/* Use Renderer so that the caption can support markdown and TeX. */}
                        <Renderer
                            content={caption}
                            apiOptions={apiOptions}
                            linterContext={linterContext}
                            strings={context.strings}
                        />
                    </div>
                )}
                <HeadingMedium tag="h2" style={wbStyles.descriptionHeading}>
                    {context.strings.imageDescriptionLabel}
                </HeadingMedium>
                {/* Use Renderer so that the description can support markdown and TeX. */}
                <Renderer
                    content={longDescription}
                    apiOptions={apiOptions}
                    linterContext={linterContext}
                    strings={context.strings}
                />
            </div>
        </div>
    );
}

// TODO(LEMS-3686): Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const wbStyles = {
    descriptionHeading: {
        marginBlockEnd: sizing.size_160,
    },
};
