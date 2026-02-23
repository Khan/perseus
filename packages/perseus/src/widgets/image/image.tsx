import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import {useDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import Util from "../../util";

import {ImageDescriptionAndCaption} from "./components/image-description-and-caption";
import styles from "./image-widget.module.css";

import type {ImageWidgetProps} from "./image.class";
import type {Size} from "@khanacademy/perseus-core";

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

    const [zoomSize, setZoomSize] = React.useState<Size>([
        backgroundImage.width || 0,
        backgroundImage.height || 0,
    ]);

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

    const svgImage = (
        <AssetContext.Consumer>
            {({setAssetStatus}) => (
                <SvgImage
                    src={backgroundImage.url!}
                    // Between the original image size and the saved background
                    // image size, use the larger size to determine if the
                    // image is large enough to allow zooming.
                    width={zoomWidth}
                    height={zoomHeight}
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
                    maxWidth: backgroundImage.width,
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
                maxWidth: backgroundImage.width,
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
            {(caption || longDescription) && (
                <ImageDescriptionAndCaption zoomSize={zoomSize} {...props} />
            )}
        </figure>
    );
};
