import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";
import React from "react";

import AssetContext from "../../asset-context";
import {SvgImage} from "../../components";
import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";

import styles from "./image-widget.module.css";

import type {Props as ImageProps} from "./image.class";

const MODAL_HEIGHT = 568;

interface Props extends ImageProps {
    longDescription: string; // required
}

export const ImageExplorationModal = (props: Props) => {
    const context = React.useContext(PerseusI18nContext);
    return (
        <div
            // We need to manually add the `framework-perseus` class so that
            // the modal can have the correct styling, even when the portal
            // makes it render outside the normal `framework-perseus` container.
            className={`framework-perseus ${styles.modalContainer}`}
        >
            <FlexibleDialog
                title={
                    <h1
                        className={`perseus-image-modal-title ${styles.modalTitleContainer}`}
                    >
                        {/* Use Renderer so that the title can support markdown and TeX. */}
                        <Renderer
                            content={
                                props.title
                                    ? props.title
                                    : context.strings.imageAlternativeTitle
                            }
                            apiOptions={props.apiOptions}
                            linterContext={props.linterContext}
                            strings={context.strings}
                        />
                    </h1>
                }
                content={<ImageExplorationModalContent {...props} />}
                styles={{
                    root: wbStyles.root,
                }}
            />
        </div>
    );
};

const ImageExplorationModalContent = (props: Props) => {
    const {
        backgroundImage,
        caption,
        alt,
        longDescription,
        linterContext,
        apiOptions,
        box,
        labels,
        range,
        trackInteraction,
    } = props;
    const context = React.useContext(PerseusI18nContext);

    if (!backgroundImage.height || !backgroundImage.width) {
        return null;
    }

    // Contain the image to the modal dimensions:
    // - Shrink image to the modal height if it's taller than the modal.
    // - Keep image its original size if it's shorter than the modal.
    // - Maintain the image's aspect ratio.
    const modalImageHeight = Math.min(MODAL_HEIGHT, backgroundImage.height);
    // bgWidth / bgHeight = X / modalImageHeight
    // => X = (bgWidth / bgHeight) * modalImageHeight
    const width =
        (backgroundImage.width / backgroundImage.height) * modalImageHeight;

    return (
        <div className={styles.modalPanelContainer}>
            <div className={styles.modalImageContainer}>
                {/* Need to use SvgImage in order to load Graphie images */}
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
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
                            trackInteraction={trackInteraction}
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
                    Description
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
};

const wbStyles = {
    root: {
        borderRadius: sizing.size_120,
        maxWidth: "100%",
    },
    descriptionHeading: {
        marginBlockEnd: sizing.size_160,
    },
};
