import {isFeatureOn} from "@khanacademy/perseus-core";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import ExploreImageButton from "./explore-image-button";
import {ExploreImageModal} from "./explore-image-modal";

import type {APIOptions} from "../../../types";
import type {ImageSize} from "../image";
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
    imageSize: ImageSize;
}

export const ImageDescriptionAndCaption = (
    props: ImageDescriptionAndCaptionProps,
) => {
    const {caption, longDescription, apiOptions, linterContext, imageSize} =
        props;

    const context = React.useContext(PerseusI18nContext);
    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    return (
        <div className={styles.descriptionAndCaptionContainer}>
            {/* Description */}
            {imageUpgradeFF && longDescription && (
                <ModalLauncher modal={ExploreImageModal(props)}>
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
                        maxWidth: imageSize.width,
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
