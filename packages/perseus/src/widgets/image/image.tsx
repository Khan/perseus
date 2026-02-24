import {isFeatureOn} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import {useDependencies} from "../../dependencies";
import Renderer from "../../renderer";

import {ImageInfoArea} from "./components/image-info-area";
import styles from "./image-widget.module.css";
import {isGif} from "./utils";

import type {ImageWidgetProps} from "./image.class";

export const ImageComponent = (props: ImageWidgetProps) => {
    const {
        apiOptions,
        alt,
        backgroundImage,
        scale,
        box,
        caption,
        longDescription,
        decorative,
        linterContext,
        labels,
        range,
        title,
        trackInteraction,
        widgetId,
    } = props;
    const context = React.useContext(PerseusI18nContext);
    const {analytics} = useDependencies();
    const gifControlsFF = isFeatureOn(
        {apiOptions},
        "image-widget-upgrade-gif-controls",
    );

    // Gif should be paused on initial render for a11y.
    const [isGifPlaying, setIsGifPlaying] = React.useState<boolean>(false);

    useOnMountEffect(() => {
        analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "image",
                widgetId: widgetId,
            },
        });
    });

    if (!backgroundImage.url) {
        return null;
    }

    const imageIsGif = isGif(backgroundImage.url);

    const svgImage = (
        <AssetContext.Consumer>
            {({setAssetStatus}) => (
                <SvgImage
                    src={backgroundImage.url!}
                    // Between the original image size and the saved background
                    // image size, use the larger size to determine if the
                    // image is large enough to allow zooming.
                    width={backgroundImage.width}
                    height={backgroundImage.height}
                    scale={scale}
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
                    allowZoom={!decorative}
                    alt={decorative || caption === alt ? "" : alt}
                    setAssetStatus={setAssetStatus}
                />
            )}
        </AssetContext.Consumer>
    );

    const maxWidth = (backgroundImage.width ?? 0) * scale;

    // Early return for decorative images
    if (decorative) {
        return (
            <figure
                className="perseus-image-widget"
                style={{
                    // Set the max width of the image container to the
                    // width saved inside `backgroundImage` - this is the
                    // width intended to be used when rendering the image
                    // within the content item.
                    maxWidth: maxWidth,
                }}
            >
                {svgImage}
            </figure>
        );
    }

    return (
        <figure
            className="perseus-image-widget"
            style={{
                // Set the max width of the image container to the
                // width saved inside `backgroundImage` - this is the
                // width intended to be used when rendering the image
                // within the content item.
                maxWidth: maxWidth,
            }}
        >
            {/* Title */}
            {title && (
                <div className={`perseus-image-title ${styles.titleContainer}`}>
                    {/* The Renderer component is used here so that the title
                        can support Markdown and TeX. */}
                    <Renderer
                        content={title}
                        apiOptions={apiOptions}
                        linterContext={linterContext}
                        strings={context.strings}
                    />
                </div>
            )}

            {/* Image */}
            {svgImage}

            {/* Gif Controls, Description, and Caption */}
            {((gifControlsFF && imageIsGif) || caption || longDescription) && (
                <ImageInfoArea
                    isGifPlaying={isGifPlaying}
                    setIsGifPlaying={setIsGifPlaying}
                    {...props}
                />
            )}
        </figure>
    );
};
