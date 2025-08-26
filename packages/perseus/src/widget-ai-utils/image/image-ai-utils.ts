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
    renderProps: React.ComponentProps<typeof image.widget>,
): ImagePromptJSON => {
    return {
        type: "image",
        options: {
            altText: renderProps.alt,
            title: renderProps.title,
            caption: renderProps.caption,
            imageUrl: renderProps.backgroundImage.url,
        },
    };
};
