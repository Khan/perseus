import {isFeatureOn, type Size} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import {useDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import Util from "../../util";

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
    const gifControlsFF = isFeatureOn(
        {apiOptions},
        "image-widget-upgrade-gif-controls",
    );
    const scaleFF = isFeatureOn({apiOptions}, "image-widget-upgrade-scale");

    const [zoomSize, setZoomSize] = React.useState<Size>([
        backgroundImage.width || 0,
        backgroundImage.height || 0,
    ]);

    // Gif should be paused on initial render for a11y.
    const [isGifPlaying, setIsGifPlaying] = React.useState<boolean>(false);

    const [zoomWidth, zoomHeight] = zoomSize;

    // Use ref to track if we should ignore async results
    const ignoreResultsRef = React.useRef(false);

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

    // TODO(LEMS-3912): Remove this effect afte we turn on and remove the
    // image-widget-upgrade-scale feature flag.
    React.useEffect(() => {
        // Reset the flag for this effect run
        ignoreResultsRef.current = false;

        // Wait to figure out what the original size of the image is.
        // Use whichever is larger between the original image size and the
        // saved background image size for zooming.
        Util.getImageSizeModern(backgroundImage.url!).then((naturalSize) => {
            // Ignore results if effect has been cleaned up
            // This prevents updates after component unmounts or dependencies change
            if (ignoreResultsRef.current) {
                return;
            }

            const [naturalWidth, naturalHeight] = naturalSize;
            const [savedWidth, savedHeight] = [
                backgroundImage.width || 0,
                backgroundImage.height || 0,
            ];
            // Only update if the new size is larger
            // This prevents unnecessary updates and infinite loops
            if (naturalWidth > savedWidth) {
                setZoomSize([naturalWidth, naturalHeight]);
            } else {
                // Set the zoom size to the saved background image size.
                // We need to do this here in the useEffect to make sure
                // the size properly updates in the editor preview.
                setZoomSize([savedWidth, savedHeight]);
            }
        });

        return () => {
            // Mark results as stale when dependencies change or component unmounts
            ignoreResultsRef.current = true;
        };
    }, [backgroundImage.url, backgroundImage.width, backgroundImage.height]);

    if (!backgroundImage.url) {
        return null;
    }

    const imageIsGif = isGif(backgroundImage.url);

    let scale = props.scale;
    // Set the scale to 1 if the scale flag is disabled or the scale is invalid.
    if (!scaleFF || scale <= 0 || scale === Infinity || scale === -Infinity) {
        scale = 1;
    }

    const svgImage = (
        <AssetContext.Consumer>
            {({setAssetStatus}) => (
                <SvgImage
                    src={backgroundImage.url!}
                    // Between the original image size and the saved background
                    // image size, use the larger size to determine if the
                    // image is large enough to allow zooming.
                    width={scaleFF ? backgroundImage.width : zoomWidth}
                    height={scaleFF ? backgroundImage.height : zoomHeight}
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

            {/* Description & Caption */}
            {((gifControlsFF && imageIsGif) || caption || longDescription) && (
                <ImageInfoArea
                    zoomSize={zoomSize}
                    isGifPlaying={isGifPlaying}
                    setIsGifPlaying={setIsGifPlaying}
                    {...props}
                />
            )}
        </figure>
    );
};
