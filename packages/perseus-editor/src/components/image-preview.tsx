import {components} from "@khanacademy/perseus";
import * as React from "react";

const {SvgImage} = components;

interface ImagePreviewProps {
    /**
     * The URL of the image to display.
     * Can be a regular image URL or a web+graphie URL.
     */
    src: string;

    /**
     * Alternative text for the image.
     * Used for accessibility and shown when the image fails to load.
     */
    alt: string;

    /**
     * The width of the image in pixels.
     * When provided with height, enables responsive rendering with proper aspect ratio.
     * If not provided, the image will render at its natural size.
     */
    width?: number;

    /**
     * The height of the image in pixels.
     * When provided with width, enables responsive rendering with proper aspect ratio.
     * If not provided, the image will render at its natural size.
     */
    height?: number;
}

/**
 * Shared component for previewing images in editors.
 * Displays an SvgImage with proper containment to prevent overflow.
 */
export default function ImagePreview({
    src,
    alt,
    width,
    height,
}: ImagePreviewProps): React.ReactElement {
    return (
        <div className="perseus-image-preview-container">
            <SvgImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                // No need to allow zooming within the editor.
                allowZoom={false}
            />
        </div>
    );
}
