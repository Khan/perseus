import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import Renderer from "../../renderer";

import type {ImageProps} from "./image.class";

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
}: ImageProps) => {
    const context = React.useContext(PerseusI18nContext);

    return (
        <figure
            className="perseus-image-widget"
            style={{
                maxWidth: backgroundImage.width,
            }}
        >
            {title && (
                <div className="perseus-image-title">
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
            {backgroundImage.url && (
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={backgroundImage.url ?? undefined}
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
        </figure>
    );
};
