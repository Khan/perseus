import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question, questionWithZoom} from "./image.testdata";

import type {APIOptions} from "../../types";

type StoryArgs = {
    isMobile: boolean;
    title: string;
    caption: string;
};

type ImageStory = {
    title: string;
    args: StoryArgs;
};

export const Question1 = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };
    const imageOptions = question.widgets["image 1"].options;

    const questionWithArgs = {
        ...question,
        widgets: {
            ...question.widgets,
            "image 1": {
                ...question.widgets["image 1"],
                options: {
                    ...imageOptions,
                    title: args.title,
                    caption: args.caption,
                },
            },
        },
    } as const;

    return (
        <RendererWithDebugUI
            question={questionWithArgs}
            apiOptions={apiOptions}
        />
    );
};

export const Question2 = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };
    const imageOptions = question.widgets["image 1"].options;

    const questionWithCaptionAndArgs = {
        ...question,
        widgets: {
            ...question.widgets,
            "image 1": {
                ...question.widgets["image 1"],
                options: {
                    ...imageOptions,
                    alignment: "full-width",
                    title: args.title,
                    caption:
                        "There is neither happiness nor unhappiness in this world; there is only the comparison of one state with another. Only a man who has felt ultimate despair is capable of feeling ultimate bliss. It is necessary to have wished for death in order to know how good it is to live.....the sum of all human wisdom will be contained in these two words: Wait and Hope",
                },
            },
        },
    } as const;
    return (
        <RendererWithDebugUI
            question={questionWithCaptionAndArgs}
            apiOptions={apiOptions}
        />
    );
};

export const ImageWithZoom = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };
    const imageOptions = questionWithZoom.widgets["image 1"].options;

    const questionWithCaptionAndArgs = {
        ...questionWithZoom,
        widgets: {
            ...questionWithZoom.widgets,
            "image 1": {
                ...questionWithZoom.widgets["image 1"],
                options: {
                    ...imageOptions,
                    alignment: "full-width",
                    title: args.title,
                    caption:
                        "There is neither happiness nor unhappiness in this world; there is only the comparison of one state with another. Only a man who has felt ultimate despair is capable of feeling ultimate bliss. It is necessary to have wished for death in order to know how good it is to live.....the sum of all human wisdom will be contained in these two words: Wait and Hope",
                },
            },
        },
    } as const;
    return (
        <div style={{width: "50%", margin: "0 auto"}}>
            <RendererWithDebugUI
                question={questionWithCaptionAndArgs}
                apiOptions={apiOptions}
            />
        </div>
    );
};

export default {
    title: "Perseus/Widgets/Image",
    args: {
        isMobile: false,
        title: "",
        caption: "",
    },
} as ImageStory;
