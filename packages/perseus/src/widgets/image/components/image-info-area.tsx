import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import {useDependencies} from "../../../dependencies";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import ExploreImageButton from "./explore-image-button";
import {ExploreImageModal} from "./explore-image-modal";
import {GifControlsIcon} from "./gif-controls-icon";

import type {APIOptions} from "../../../types";
import type {PerseusImageWidgetOptions} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import {CommonImageProps} from "./common-image-props";

export interface GifProps {
    isGifPlaying: boolean;
    setIsGifPlaying: (isPaused: boolean) => void;
}

interface Props extends CommonImageProps {
    isAnimatedGif: boolean;
}

/**
 * The ImageInfoArea component includes the GIF controls, description modal
 * launcher, and caption for the image. This is displayed underneath the image
 * in the Image widget.
 */
export const ImageInfoArea = (props: Props) => {
    const {
        options,
        apiOptions,
        linterContext,
        isGifPlaying,
        setIsGifPlaying,
        isAnimatedGif,
        widgetId,
    } = props;
    const {backgroundImage, caption, longDescription} = options;

    const context = React.useContext(PerseusI18nContext);
    const {analytics} = useDependencies();

    if (!backgroundImage.url) {
        return null;
    }

    return (
        <div className={styles.infoAreaContainer}>
            {/* GIF controls */}
            {isAnimatedGif && (
                <GifControlsIcon
                    isPlaying={isGifPlaying}
                    onToggle={() => setIsGifPlaying(!isGifPlaying)}
                />
            )}

            {/* Spacer if both GIF controls and description are shown */}
            {isAnimatedGif && longDescription && (
                <div className={styles.spacerHorizontal} />
            )}

            {/* Description */}
            {longDescription && (
                <ModalLauncher modal={<ExploreImageModal {...props} />}>
                    {({openModal}) => (
                        <ExploreImageButton
                            hasCaption={!!caption}
                            onClick={() => {
                                analytics.onAnalyticsEvent({
                                    type: "perseus:image:explore-modal-opened:ti",
                                    payload: {
                                        // No SubType exists yet
                                        widgetSubType: "null",
                                        widgetId,
                                    },
                                });
                                openModal();
                            }}
                        />
                    )}
                </ModalLauncher>
            )}

            {/* Caption */}
            {caption && (
                <figcaption className="perseus-image-caption">
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
