import {components} from "@khanacademy/perseus";
import * as React from "react";

const {SvgImage} = components;

type ImagePreviewProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

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
