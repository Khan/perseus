import {
    isFeatureOn,
    type Interval,
    type PerseusImageBackground,
    type PerseusImageLabel,
    type Size,
} from "@khanacademy/perseus-core";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";
import {isGif} from "../utils";

import ExploreImageButton from "./explore-image-button";
import {ExploreImageModal} from "./explore-image-modal";
import {GifControlsIcon} from "./gif-controls-icon";

import type {APIOptions} from "../../../types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

export interface ImageInfoAreaProps {
    backgroundImage: PerseusImageBackground;
    title: string;
    caption: string;
    alt: string;
    longDescription: string;
    box: Size;
    labels: Array<PerseusImageLabel>;
    range: [Interval, Interval];
    linterContext: LinterContextProps;
    apiOptions: APIOptions;
    /**
     * zoomSize represents the larger of the image’s natural size (calculated on load)
     * and the saved backgroundImage size (specified when the content is written). This
     * ensures that zooming is enabled only if the image is sufficiently large.
     * image (calculated on load) and the saved backgroundImage size (specified
     * when the content is written). This larger image size is used to
     * determine if the image is large enough to allow zooming.
     */
    zoomSize: Size;
    isGifPlaying: boolean;
    setIsGifPlaying: (isPaused: boolean) => void;
}

export const ImageInfoArea = (props: ImageInfoAreaProps) => {
    const {
        backgroundImage,
        caption,
        longDescription,
        apiOptions,
        linterContext,
        zoomSize,
        isGifPlaying,
        setIsGifPlaying,
    } = props;

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
                <div className={styles.spacer} />
            )}

            {/* Description */}
            {longDescription && (
                <ModalLauncher modal={<ExploreImageModal {...props} />}>
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
