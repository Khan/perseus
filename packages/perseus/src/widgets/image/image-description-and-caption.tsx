import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";

import styles from "./image-widget.module.css";

import type {APIOptions} from "../../types";
import type {PerseusImageBackground} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

interface Props {
    caption: string;
    backgroundImage: PerseusImageBackground;
    apiOptions: APIOptions;
    linterContext: LinterContextProps;
}

export const ImageDescriptionAndCaption = ({
    caption,
    backgroundImage,
    apiOptions,
    linterContext,
}: Props) => {
    const context = React.useContext(PerseusI18nContext);
    return (
        <div className={styles.descriptionAndCaptionContainer}>
            {/* Description code will go here */}

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
