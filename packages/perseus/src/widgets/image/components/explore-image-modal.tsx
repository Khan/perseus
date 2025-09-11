import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import ExploreImageModalContent from "./explore-image-modal-content";

import type {Props as ImageDescriptionProps} from "./image-description-and-caption";

type Props = ImageDescriptionProps;

export const ExploreImageModal = (props: Props) => {
    const context = React.useContext(PerseusI18nContext);

    const titleText = props.title || context.strings.imageAlternativeTitle;
    const title = (
        <h1
            className={`perseus-image-modal-title ${styles.modalTitleContainer}`}
        >
            {/* Use Renderer so that the title can support markdown and TeX. */}
            <Renderer
                content={titleText}
                apiOptions={props.apiOptions}
                linterContext={props.linterContext}
                strings={context.strings}
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

// TODO: Use CSS modules after Wonder Blocks styles
// are moved to a different layer.
const wbStyles = {
    root: {
        borderRadius: sizing.size_120,
        maxWidth: "100%",
    },
};
