import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import infoIconBold from "@phosphor-icons/core/bold/info-bold.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";

import {ImageExplorationModal} from "./image-exploration-modal";
import styles from "./image-widget.module.css";

import type {Props} from "./image.class";

export const ImageDescriptionAndCaption = (props: Props) => {
    const {
        caption,
        longDescription,
        backgroundImage,
        apiOptions,
        linterContext,
    } = props;

    const context = React.useContext(PerseusI18nContext);
    return (
        <div className={styles.descriptionAndCaptionContainer}>
            {/* Description */}
            {longDescription && (
                <ModalLauncher modal={ImageExplorationModal(props)}>
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
            style={{flexShrink: 0}}
        />
    );
}
