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

    // If the backgroundImage.url changes (likely in the editor preview)
    // we will stop any gif from playing.
    React.useEffect(() => {
        setIsGifPlaying(false);
    }, [backgroundImage.url]);

    if (!backgroundImage.url) {
        return null;
    }

    const imageIsGif = isGif(backgroundImage.url);

    let scale = props.scale;
    // Set the scale to 1 if the scale is invalid.
    if (scale <= 0 || scale === Infinity || scale === -Infinity) {
        scale = 1;
    }

    const svgImage = (
        <AssetContext.Consumer>
            {({setAssetStatus}) => (
                <SvgImage
                    src={backgroundImage.url!}
                    apiOptions={apiOptions}
                    // Between the original image size and the saved background
                    // image size, use the larger size to determine if the
                    // image is large enough to allow zooming.
                    width={backgroundImage.width}
                    height={backgroundImage.height}
                    scale={scale}
                    extraGraphie={{
                        box: box,
                        range: range,
                        labels: labels,
                    }}
                    trackInteraction={trackInteraction}
                    zoomToFullSizeOnMobile={apiOptions.isMobile}
                    constrainHeight={apiOptions.isMobile}
                    allowFullBleed={apiOptions.isMobile}
                    // Only allow zooming if the image is not decorative and not a GIF.
                    allowZoom={!decorative && !imageIsGif}
                    alt={decorative || caption === alt ? "" : alt}
                    setAssetStatus={setAssetStatus}
                    isGifPlaying={imageIsGif ? isGifPlaying : undefined}
                    onGifLoop={
                        imageIsGif ? () => setIsGifPlaying(false) : undefined
                    }
                />
            )}
        </AssetContext.Consumer>
    );

    // Set the max width of the image container to the width saved inside
    // `backgroundImage` (if it is set at all) - this is the width intended
    // to be used when rendering the image within the content item.
    const maxWidth = backgroundImage.width
        ? backgroundImage.width * scale
        : undefined;
    // Only set the width if we're not setting maxWidth.
    // We need `width: fit-content` to handle the case where background.width
    // and background.height are undefined, so that the container sets the
    // bounds based on the natural image size, and the caption aligns
    // properly with the image.
    const width = maxWidth ? undefined : "fit-content";

    // Early return for decorative images
    if (decorative) {
        return (
            <figure
                className="perseus-image-widget"
                style={{
                    maxWidth: maxWidth,
                    width: width,
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
                maxWidth: maxWidth,
                width: width,
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
            {(imageIsGif || caption || longDescription) && (
                <ImageInfoArea
                    isGifPlaying={isGifPlaying}
                    setIsGifPlaying={setIsGifPlaying}
                    {...props}
                />
            )}
        </figure>
    );
};
