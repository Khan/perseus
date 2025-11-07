import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import React from "react";

import {usePerseusI18n} from "../../../components/i18n-context";
import RendererWithAPIOptions from "../../../renderer-with-api-options";
import styles from "../image-widget.module.css";

import ExploreImageModalContent from "./explore-image-modal-content";

import type {ImageDescriptionAndCaptionProps} from "./image-description-and-caption";

export const ExploreImageModal = (props: ImageDescriptionAndCaptionProps) => {
    const i18n = usePerseusI18n();

    const titleText = props.title || i18n.strings.imageAlternativeTitle;
    const title = (
        <h1
            className={`perseus-image-modal-title ${styles.modalTitleContainer}`}
        >
            {/* Use Renderer so that the title can support markdown and TeX. */}
            <RendererWithAPIOptions
                content={titleText}
                linterContext={props.linterContext}
                strings={i18n.strings}
            />
        </h1>
    );

    return (
        <div
            // We need to manually add the `framework-perseus` class so that
            // the modal can have the correct styling, even when the portal
            // makes it render outside the normal `framework-perseus` container.
            className={`framework-perseus ${styles.modalContainer}`}
        >
            <FlexibleDialog
                title={title}
                content={<ExploreImageModalContent {...props} />}
                styles={{
                    root: wbStyles.root,
                }}
            />
        </div>
    );
};

// TODO(LEMS-3686): Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const wbStyles = {
    root: {
        borderRadius: sizing.size_120,
        maxWidth: "100%",
    },
};
