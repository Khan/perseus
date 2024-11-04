import type {PerseusLabelImageUserInput} from "../../validation.types";
import type labelImage from "../../widgets/label-image/label-image";
import type React from "react";

type BaseMarker = {
    label: string;
};

type UserInputMarker = {
    label: string;
    selected?: ReadonlyArray<string>;
};

export type LabelImagePromptJSON = {
    type: "label-image";
    options: {
        choices: ReadonlyArray<string>;
        imageUrl: string;
        imageAlt: string;
        markers: BaseMarker[];
    };
    userInput: {
        markers: UserInputMarker[];
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof labelImage.widget>,
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
