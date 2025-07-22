import type labelImage from "../../widgets/label-image/label-image";
import type React from "react";

type BaseMarker = {
    label: string;
};

type UserInputMarker = {
    label: string;
    answers?: string[];
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
): LabelImagePromptJSON => {
    const propMarkers = renderProps.markers.map((marker) => {
        const userInputMarker: UserInputMarker = {
            label: marker.label,
        };
        if (marker.answers?.length) {
            userInputMarker.answers = marker.answers;
        }
        return userInputMarker;
    });

    const inputMarkers = renderProps.userInput.markers.map((marker) => {
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
