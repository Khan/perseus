import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import ExploreImageButton from "./explore-image-button";
import {ExploreImageModal} from "./explore-image-modal";

import type {APIOptions} from "../../../types";
import type {
    Interval,
    PerseusImageBackground,
    PerseusImageLabel,
    Size,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

export interface ImageDescriptionAndCaptionProps {
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
}

export const ImageDescriptionAndCaption = (
    props: ImageDescriptionAndCaptionProps,
) => {
    const {caption, longDescription, apiOptions, linterContext, zoomSize} =
        props;

    const [zoomWidth, _] = zoomSize;

    const context = React.useContext(PerseusI18nContext);

    return (
        <div className={styles.descriptionAndCaptionContainer}>
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
                        maxWidth: zoomWidth,
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
