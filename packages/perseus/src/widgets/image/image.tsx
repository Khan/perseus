import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import Renderer from "../../renderer";

import styles from "./image-widget.module.css";

import type {Props} from "./image.class";

export const ImageComponent = ({
    apiOptions,
    alt,
    backgroundImage,
    box,
    caption,
    linterContext,
    labels,
    range,
    title,
    trackInteraction,
}: Props) => {
    const context = React.useContext(PerseusI18nContext);

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
            {backgroundImage.url && (
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
                        />
                    )}
                </AssetContext.Consumer>
            )}

            {/* Caption */}
            {caption && (
                <figcaption
                    className={`perseus-image-caption ${styles.captionContainer}`}
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
        </figure>
    );
};
