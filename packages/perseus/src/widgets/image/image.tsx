import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import Renderer from "../../renderer";
import Util from "../../util";

import {ImageDescriptionAndCaption} from "./components/image-description-and-caption";
import styles from "./image-widget.module.css";

import type {ImageWidgetProps} from "./image.class";

export type ImageSize = {width: number; height: number};

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
    } = props;
    const context = React.useContext(PerseusI18nContext);
    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    const [largerImageSize, setLargerImageSize] = React.useState<ImageSize>({
        width: backgroundImage.width || 0,
        height: backgroundImage.height || 0,
    });

    React.useEffect(() => {
        // Wait to figure out what the original size of the image is.
        // Use whichever is larger between the original image size and the
        // saved background image size for zooming.
        Util.getImageSizeModern(backgroundImage.url!).then((naturalSize) => {
            if (naturalSize[0] > (backgroundImage.width || 0)) {
                setLargerImageSize({
                    width: naturalSize[0],
                    height: naturalSize[1],
                });
            }
        });
    }, [backgroundImage]);

    if (!backgroundImage.url) {
        return null;
    }

    const svgImage = (
        <AssetContext.Consumer>
            {({setAssetStatus}) => (
                <SvgImage
                    src={backgroundImage.url!}
                    // Between the original image size and the saved background
                    // image size, use the larger size.
                    width={largerImageSize.width}
                    height={largerImageSize.height}
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
                    renderSpacer={false}
                    alt={decorative || caption === alt ? "" : alt}
                    setAssetStatus={setAssetStatus}
                />
            )}
        </AssetContext.Consumer>
    );

    // Early return for decorative images
    if (imageUpgradeFF && decorative) {
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
            {(caption || (imageUpgradeFF && longDescription)) && (
                <ImageDescriptionAndCaption
                    zoomSize={largerImageSize}
                    {...props}
                />
            )}
        </figure>
    );
};
