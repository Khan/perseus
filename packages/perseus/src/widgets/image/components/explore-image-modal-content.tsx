import {isFeatureOn} from "@khanacademy/perseus-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import AssetContext from "../../../asset-context";
import {SvgImage} from "../../../components";
import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";
import {isGif, isSvg} from "../utils";

import {GifControlsButton} from "./gif-controls-button";

import type {CommonImageProps, ZoomProps, GifProps} from "./image-info-area";

const MODAL_HEIGHT = 568;

type Props = CommonImageProps & ZoomProps & GifProps;

export default function ExploreImageModalContent({
    backgroundImage,
    scale: contentScale,
    caption,
    alt,
    longDescription,
    linterContext,
    apiOptions,
    box,
    labels,
    range,
    zoomSize,
    isGifPlaying,
    setIsGifPlaying,
}: Props) {
    const context = React.useContext(PerseusI18nContext);

    if (!backgroundImage.url) {
        return null;
    }

    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");
    const gifControlsFF = isFeatureOn(
        {apiOptions},
        "image-widget-upgrade-gif-controls",
    );

    const [zoomWidth, zoomHeight] = zoomSize;

    const imageIsGif = isGif(backgroundImage.url);
    const imageIsSvg = isSvg(backgroundImage.url);

    // Use larger sizes for the "explore image" modal:
    // - For SVG images, use 2x or greater for the scale since they can
    //   be expanded without losing quality.
    // - For regular non-SVG images, use 1 (original size). Use the
    //   saved scale if it's greater than 1, so that the exploration
    //   modal won't have a smaller image than the original.
    const scale = imageIsSvg
        ? Math.max(contentScale, 2)
        : Math.max(contentScale, 1);

    // Note: backgroundImage.height and backgroundImage.width may be undefined.
    let height: number | undefined = backgroundImage.height;
    let width: number | undefined = backgroundImage.width;

    // Contain the image to the modal dimensions:
    // - Shrink image to the modal height if it's taller than the modal.
    // - Keep image its original size if it's shorter than the modal.
    // - Maintain the image's aspect ratio.
    height = Math.min(MODAL_HEIGHT, zoomHeight);
    // bgWidth / bgHeight = X / height
    // => X = (bgWidth / bgHeight) * height
    width = (zoomWidth / zoomHeight) * height;

    if (scaleFF) {
        // If we know what the original image size is, use it to compute the
        // image size for the modal with the scale applied.
        if (backgroundImage.height && backgroundImage.width) {
            // SvgImage will multiply the dimensions we pass by `scale`,
            // so we work in unscaled space here. We cap the unscaled
            // height at MODAL_HEIGHT / scale so the final displayed
            // height (after SvgImage applies `scale`) won't exceed
            // MODAL_HEIGHT, and we also cap at the image's natural
            // height to avoid upscaling beyond the original.
            height = Math.min(MODAL_HEIGHT / scale, backgroundImage.height);
            // bgWidth / bgHeight = X / height
            // => X = (bgWidth / bgHeight) * height
            width = (backgroundImage.width / backgroundImage.height) * height;
        }
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
                            height={height}
                            scale={scaleFF ? scale : 1}
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
                            isGifPlaying={
                                gifControlsFF && imageIsGif
                                    ? isGifPlaying
                                    : undefined
                            }
                            onGifLoop={
                                gifControlsFF && imageIsGif
                                    ? () => {
                                          // Pause the GIF at the end of each loop
                                          setIsGifPlaying(false);
                                      }
                                    : undefined
                            }
                        />
                    )}
                </AssetContext.Consumer>
            </div>
            <div
                className={`perseus-image-modal-description ${styles.modalDescriptionContainer}`}
            >
                {gifControlsFF && imageIsGif && (
                    <>
                        <GifControlsButton
                            isPlaying={isGifPlaying}
                            onToggle={() => setIsGifPlaying(!isGifPlaying)}
                        />
                        <div className={styles.spacerVertical} />
                    </>
                )}

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
