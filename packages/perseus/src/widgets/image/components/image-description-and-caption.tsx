import {isFeatureOn} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import infoIconBold from "@phosphor-icons/core/bold/info-bold.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import {ImageExplorationModal} from "./image-exploration-modal";

import type {APIOptions} from "../../../types";
import type {
    Interval,
    PerseusImageBackground,
    PerseusImageLabel,
    Size,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

export interface Props {
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
}

export const ImageDescriptionAndCaption = (props: Props) => {
    const {
        caption,
        longDescription,
        backgroundImage,
        apiOptions,
        linterContext,
    } = props;

    const context = React.useContext(PerseusI18nContext);
    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    return (
        <div className={styles.descriptionAndCaptionContainer}>
            {/* Description */}
            {imageUpgradeFF && longDescription && (
                // TODO(LEMS-3439): Remove this `exploreButtonContainer` div
                // in order to show the explore button on mobile.
                <div className={styles.exploreButtonContainer}>
                    <ModalLauncher modal={ImageExplorationModal(props)}>
                        {({openModal}) => (
                            <ExploreImageButton
                                hasCaption={!!caption}
                                onClick={openModal}
                            />
                        )}
                    </ModalLauncher>
                </div>
            )}

            {/* Caption */}
            {caption && (
                <figcaption
                    className="perseus-image-caption"
                    style={{
                        maxWidth: backgroundImage.width,
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

function ExploreImageButton({
    hasCaption,
    onClick,
}: {
    hasCaption: boolean;
    onClick: () => void;
}) {
    const context = React.useContext(PerseusI18nContext);
    if (!hasCaption) {
        return (
            <Button kind="secondary" startIcon={infoIconBold} onClick={onClick}>
                {context.strings.imageExploreButton}
            </Button>
        );
    }

    return (
        <IconButton
            aria-label={context.strings.imageExploreButton}
            icon={infoIconBold}
            kind="secondary"
            onClick={onClick}
        />
    );
}
