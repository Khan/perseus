import type image from "./image";
import type {PerseusImageBackground} from "../../perseus-types";
import type {WidgetType} from "../../prompt-types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof image.widget>;

export type ImagePromptJSON = {
    type: WidgetType;
    options: {
        altText: WidgetProps["alt"];
        title: WidgetProps["title"];
        caption: WidgetProps["caption"];
        imageUrl: PerseusImageBackground["url"];
    };
};

export const getPromptJSON = (renderProps: WidgetProps): ImagePromptJSON => {
    return {
        type: "image",
        options: {
            altText: renderProps.alt,
            title: renderProps.title,
            caption: renderProps.caption,
            imageUrl: renderProps.backgroundImage?.url,
        },
    };
};
