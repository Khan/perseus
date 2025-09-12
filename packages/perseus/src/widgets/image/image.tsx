import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import Renderer from "../../renderer";

import {ImageDescriptionAndCaption} from "./components/image-description-and-caption";
import styles from "./image-widget.module.css";

import type {ImageWidgetProps} from "./image.class";

export const ImageComponent = (props: ImageWidgetProps) => {
    const {
        apiOptions,
        alt,
        backgroundImage,
        box,
        caption,
        longDescription,
        linterContext,
        labels,
        range,
        title,
        trackInteraction,
    } = props;
    const context = React.useContext(PerseusI18nContext);

    if (!backgroundImage.url) {
        return null;
    }

    return (
        <figure
            className="perseus-image-widget"
            style={{
                maxWidth: backgroundImage.width,
            }}
        >
            {/* Title */}
            {title && (
                <div className={`perseus-image-title ${styles.titleContainer}`}>
                    {/* The Renderer component is used here so that the title
                        can support markdown and TeX. */}
                    <Renderer
                        content={title}
                        apiOptions={apiOptions}
                        linterContext={linterContext}
                        strings={context.strings}
                    />
                </div>
            )}

            {/* Image */}
            <AssetContext.Consumer>
                {({setAssetStatus}) => (
                    <SvgImage
                        src={backgroundImage.url!}
                        alt={caption === alt ? "" : alt}
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        preloader={apiOptions.imagePreloader}
                        extraGraphie={{
                            box: box,
                            range: range,
                            labels: labels,
                        }}
                        trackInteraction={trackInteraction}
                        zoomToFullSizeOnMobile={apiOptions.isMobile}
                        constrainHeight={apiOptions.isMobile}
                        allowFullBleed={apiOptions.isMobile}
                        setAssetStatus={setAssetStatus}
                        withinImageWidget={true}
                    />
                )}
            </AssetContext.Consumer>

            {/* Description & Caption */}
            {(caption || longDescription) && (
                <ImageDescriptionAndCaption {...props} />
            )}
        </figure>
    );
};
