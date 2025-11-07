import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import AssetContext from "../../../asset-context";
import {SvgImage} from "../../../components";
import {usePerseusI18n} from "../../../components/i18n-context";
import styles from "../image-widget.module.css";

import type {ImageDescriptionAndCaptionProps} from "./image-description-and-caption";
import RendererWithAPIOptions from "../../../renderer-with-api-options";

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
}: ImageDescriptionAndCaptionProps) {
    const i18n = usePerseusI18n();
    const assetContext = React.useContext(AssetContext);

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
    const modalImageHeight = Math.min(MODAL_HEIGHT, zoomHeight);
    // bgWidth / bgHeight = X / modalImageHeight
    // => X = (bgWidth / bgHeight) * modalImageHeight
    const width = (zoomWidth / zoomHeight) * modalImageHeight;

    return (
        <div className={styles.modalPanelContainer}>
            <div className={styles.modalImageContainer}>
                {/* Need to use SvgImage in order to load Graphie images */}
                <SvgImage
                    src={backgroundImage.url!}
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
                    setAssetStatus={assetContext.setAssetStatus}
                />
            </div>
            <div
                className={`perseus-image-modal-description ${styles.modalDescriptionContainer}`}
            >
                {caption && (
                    <div className={styles.modalCaptionContainer}>
                        {/* Use Renderer so that the caption can support markdown and TeX. */}
                        <RendererWithAPIOptions
                            content={caption}
                            linterContext={linterContext}
                            strings={i18n.strings}
                        />
                    </div>
                )}
                <HeadingMedium tag="h2" style={wbStyles.descriptionHeading}>
                    {i18n.strings.imageDescriptionLabel}
                </HeadingMedium>
                {/* Use Renderer so that the description can support markdown and TeX. */}
                <RendererWithAPIOptions
                    content={longDescription}
                    linterContext={linterContext}
                    strings={i18n.strings}
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
