import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {ModalLauncher} from "@khanacademy/wonder-blocks-modal";
import infoIcon from "@phosphor-icons/core/regular/info.svg";
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
            {/* TODO(LEMS-3439): Remove this `exploreButtonContainer` div
                in order to show the explore button on mobile.  */}
            <div className={styles.exploreButtonContainer}>
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
            </div>

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
    if (hasCaption) {
        return (
            <IconButton
                icon={infoIcon}
                kind="secondary"
                onClick={onClick}
                style={{
                    // Stop the button from getting squished by the caption text.
                    // TODO: Use CSS modules after Wonder Blocks styles
                    // are moved to a different layer.
                    minWidth: "40px",
                }}
            />
        );
    }

    return (
        <Button kind="secondary" startIcon={infoIcon} onClick={onClick}>
            Explore image
        </Button>
    );
}
