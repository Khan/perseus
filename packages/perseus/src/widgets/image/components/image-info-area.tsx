import {
    type Interval,
    type PerseusImageBackground,
    type PerseusImageLabel,
    type Size,
} from "@khanacademy/perseus-core";
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
import type {LinterContextProps} from "@khanacademy/perseus-linter";

export interface GifProps {
    isGifPlaying: boolean;
    setIsGifPlaying: (isPaused: boolean) => void;
}

export interface CommonImageProps {
    backgroundImage: PerseusImageBackground;
    scale: number;
    title: string;
    caption: string;
    alt: string;
    longDescription: string;
    box: Size;
    labels: Array<PerseusImageLabel>;
    range: [Interval, Interval];
    linterContext: LinterContextProps;
    apiOptions: APIOptions;
    widgetId: string;
}

type Props = GifProps & CommonImageProps & {isAnimatedGif: boolean};

/**
 * The ImageInfoArea component includes the GIF controls, description modal
 * launcher, and caption for the image. This is displayed underneath the image
 * in the Image widget.
 */
export const ImageInfoArea = (props: Props) => {
    const {
        backgroundImage,
        caption,
        longDescription,
        apiOptions,
        linterContext,
        isGifPlaying,
        setIsGifPlaying,
        isAnimatedGif,
        widgetId,
    } = props;

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
