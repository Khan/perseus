import type image from "../../widgets/image/image.class";
import type React from "react";

/**
 * JSON describing an image widget. Intended for consumption by AI tools.
 */
export type ImagePromptJSON = {
    type: "image";

    /** Configuration set by the content creator. */
    options: {
        /**
         * Text displayed to screenreaders and browsers without graphical
         * capabilities
         */
        altText: string;

        /**
         * Displayed above the image. May contain Markdown formatting, and TeX
         * delimited by dollar signs, e.g. `$\dfrac{1}{2}$`.
         */
        title: string;

        /**
         * Displayed below the image. May contain Markdown formatting, and TeX
         * delimited by dollar signs, e.g. `$\dfrac{1}{2}$`.
         */
        caption: string;

        imageUrl: string | null | undefined;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof image.widget>,
): ImagePromptJSON => {
    return {
        type: "image",
        options: {
            altText: widgetData.alt,
            title: widgetData.title,
            caption: widgetData.caption,
            imageUrl: widgetData.backgroundImage.url,
        },
    };
};
