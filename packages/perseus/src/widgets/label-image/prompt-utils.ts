import type labelImage from "./label-image";
import type {WidgetType} from "../../prompt-types";
import type {PerseusLabelImageUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof labelImage.widget>;

type BaseMarker = {
    label: WidgetProps["markers"][0]["label"];
};

type UserInputMarker = {
    label: PerseusLabelImageUserInput["markers"][0]["label"];
    selected: PerseusLabelImageUserInput["markers"][0]["selected"];
};

export type LabelImagePromptJSON = {
    type: WidgetType;
    options: {
        choices: WidgetProps["choices"];
        imageUrl: WidgetProps["imageUrl"];
        imageAlt: WidgetProps["imageAlt"];
        markers: BaseMarker[];
    };
    userInput: {
        markers: UserInputMarker[];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusLabelImageUserInput,
): LabelImagePromptJSON => {
    const propMarkers = renderProps.markers.map((marker) => {
        return {
            label: marker.label,
        };
    });

    const inputMarkers = userInput.markers.map((marker) => {
        return {
            label: marker.label,
            selected: marker.selected,
        };
    });

    return {
        type: "label-image",
        options: {
            choices: renderProps.choices,
            imageUrl: renderProps.imageUrl,
            imageAlt: renderProps.imageAlt,
            markers: propMarkers,
        },
        userInput: {
            markers: inputMarkers,
        },
    };
};
