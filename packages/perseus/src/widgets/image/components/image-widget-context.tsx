import * as React from "react";

import {ApiOptions} from "../../../perseus-api";

import type {APIOptions} from "../../../types";
import type {
    Interval,
    PerseusImageBackground,
    PerseusImageLabel,
    Size,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

export interface ImageWidgetContextType {
    backgroundImage: PerseusImageBackground;
    scale: number;
    title?: string;
    caption?: string;
    alt: string;
    longDescription?: string;
    box: Size;
    labels?: Array<PerseusImageLabel>;
    range: [Interval, Interval];
    linterContext?: LinterContextProps;
    apiOptions: APIOptions;
    // Extra props determined by the ImageWidget component
    zoomSize: Size;
    isGifPlaying: boolean;
    setIsGifPlaying: (isPlaying: boolean) => void;
}

const defaultImageWidgetProps: ImageWidgetContextType = {
    backgroundImage: {
        url: null,
        width: 0,
        height: 0,
    },
    scale: 1,
    alt: "",
    box: [400, 400],
    range: [
        [0, 10],
        [0, 10],
    ],
    apiOptions: ApiOptions.defaults,
    zoomSize: [0, 0],
    isGifPlaying: false,
    setIsGifPlaying: () => {},
};

export const ImageWidgetContext = React.createContext<ImageWidgetContextType>(
    defaultImageWidgetProps,
);

export function useImageWidgetContext(): ImageWidgetContextType {
    const context = React.useContext(ImageWidgetContext);
    if (context === null) {
        throw new Error(
            "useImageWidgetContext must be used within an ImageWidgetContextProvider",
        );
    }
    return context;
}
