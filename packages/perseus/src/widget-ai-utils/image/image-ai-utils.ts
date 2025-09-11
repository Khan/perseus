import type image from "../../widgets/image/image.class";
import type React from "react";

export type ImagePromptJSON = {
    type: "image";
    options: {
        altText: string;
        title: string;
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
