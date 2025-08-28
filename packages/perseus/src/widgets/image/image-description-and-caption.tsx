import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import infoIcon from "@phosphor-icons/core/regular/info.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";

import styles from "./image-widget.module.css";

import type {APIOptions} from "../../types";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

interface Props {
    caption: string;
    longDescription: string;
    backgroundImage: PerseusImageBackground;
    apiOptions: APIOptions;
    linterContext: LinterContextProps;
}

export const ImageDescriptionAndCaption = ({
    caption,
    longDescription,
    backgroundImage,
    apiOptions,
    linterContext,
}: Props) => {
    const context = React.useContext(PerseusI18nContext);
    return (
        <div className={styles.descriptionAndCaptionContainer}>
            {/* Description */}
            {longDescription && !caption && (
                <Button
                    kind="secondary"
                    startIcon={infoIcon}
                    onClick={() => {}}
                >
                    Explore image
                </Button>
            )}

            {longDescription && caption && (
                <IconButton
                    icon={infoIcon}
                    kind="secondary"
                    onClick={() => {}}
                    style={{
                        // Stop the button from getting squished by the caption text.
                        // TODO: Use CSS modules after Wonder Blocks styles
                        // are moved to a different layer.
                        minWidth: "40px",
                    }}
                />
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
