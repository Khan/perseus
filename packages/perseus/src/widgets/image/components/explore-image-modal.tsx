import {FlexibleDialog} from "@khanacademy/wonder-blocks-modal";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import React from "react";

import {PerseusI18nContext} from "../../../components/i18n-context";
import {useDependencies} from "../../../dependencies";
import Renderer from "../../../renderer";
import styles from "../image-widget.module.css";

import ExploreImageModalContent from "./explore-image-modal-content";
import {CommonImageProps} from "./common-image-props";

export const ExploreImageModal = (props: CommonImageProps) => {
    const context = React.useContext(PerseusI18nContext);
    const uniqueId = React.useId();
    const captionId = `${uniqueId}-caption`;
    const longDescId = `${uniqueId}-long-desc`;
    const {analytics} = useDependencies();

    React.useEffect(() => {
        const openedAt = Date.now();
        return () => {
            analytics.onAnalyticsEvent({
                type: "perseus:image:explore-modal-closed:ti",
                payload: {
                    // No SubType exists yet
                    widgetSubType: "null",
                    widgetId: props.widgetId,
                    durationMs: Date.now() - openedAt,
                },
            });
        };
        // We have an empty dependency array to prevent rerenders, so that return only runs on cleanup (when modal closes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const titleText =
        props.options.title || context.strings.imageAlternativeTitle;
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
                content={
                    <ExploreImageModalContent
                        {...props}
                        captionId={captionId}
                        longDescId={longDescId}
                    />
                }
                aria-describedby={
                    props.options.caption
                        ? `${captionId} ${longDescId}`
                        : longDescId
                }
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
