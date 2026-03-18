import {isFeatureOn} from "@khanacademy/perseus-core";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";
import {isGif} from "../utils";

import ExploreImageButton from "./explore-image-button";
import {ExploreImageModal} from "./explore-image-modal";
import {GifControlsIcon} from "./gif-controls-icon";
import {useImageWidgetContext} from "./image-widget-context";

/**
 * The ImageInfoArea component includes the GIF controls, description modal
 * launcher, and caption for the image. This is displayed underneath the image
 * in the Image widget.
 */
export const ImageInfoArea = () => {
    const {
        backgroundImage,
        caption,
        longDescription,
        apiOptions,
        linterContext,
        zoomSize,
        isGifPlaying,
        setIsGifPlaying,
    } = useImageWidgetContext();

    const [zoomWidth, _] = zoomSize;

    const context = React.useContext(PerseusI18nContext);

    const gifControlsFF = isFeatureOn(
        {apiOptions},
        "image-widget-upgrade-gif-controls",
    );

    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");

    if (!backgroundImage.url) {
        return null;
    }

    const imageIsGif = isGif(backgroundImage.url);

    return (
        <div className={styles.infoAreaContainer}>
            {/* GIF controls */}
            {gifControlsFF && imageIsGif && (
                <GifControlsIcon
                    isPlaying={isGifPlaying}
                    onToggle={() => setIsGifPlaying(!isGifPlaying)}
                />
            )}

            {/* Spacer if both GIF controls and description are shown */}
            {gifControlsFF && imageIsGif && longDescription && (
                <div className={styles.spacerHorizontal} />
            )}

            {/* Description */}
            {longDescription && (
                <ModalLauncher modal={<ExploreImageModal />}>
                    {({openModal}) => (
                        <ExploreImageButton
                            hasCaption={!!caption}
                            onClick={openModal}
                        />
                    )}
                </ModalLauncher>
            )}

            {/* Caption */}
            {caption && (
                <figcaption
                    className="perseus-image-caption"
                    style={{
                        maxWidth: scaleFF ? backgroundImage.width : zoomWidth,
                    }}
                >
                    {/* The Renderer component is used here so that the caption
                        can support markdown and TeX. */}
                    <Renderer
                        content={caption}
                        apiOptions={apiOptions}
                        linterContext={linterContext}
                        strings={context.strings}
                    />
                </figcaption>
            )}
        </div>
    );
};
