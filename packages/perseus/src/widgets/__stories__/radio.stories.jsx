// @flow

import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {
    questionWithPassage,
    multiChoiceQuestion,
} from "../__testdata__/radio_testdata.js";

import type {PerseusRenderer} from "../../perseus-types.js";
import type {APIOptions} from "../../types.js";

type StoryArgs = {|
    // Radio Options
    static: boolean,

    // API Options
    satStyling: boolean,
    crossOutEnabled: boolean,

    // Renderer Options
    reviewMode: boolean,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio",
    args: {
        static: false,
        satStyling: false,
        crossOutEnabled: false,
        reviewMode: false,
    },
}: Story);

const applyStoryArgs = (
    question: PerseusRenderer,
    args: StoryArgs,
): PerseusRenderer => {
    const q = {
        ...question,
        widgets: {},
    };

    for (const [widgetId, widget] of Object.entries(question.widgets)) {
        q.widgets[widgetId] = {...widget, static: args.static};
    }

    return q;
};

const buildApiOptions = (args: StoryArgs): APIOptions => {
    return {
        satStyling: args.satStyling,
        crossOutEnabled: args.crossOutEnabled,
    };
};

export const SingleSelect = (args: StoryArgs): React.Node => {
    return (
        <RendererWithDebugUI
            question={applyStoryArgs(questionWithPassage, args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
        />
    );
};

export const MultiSelect = (args: StoryArgs): React.Node => {
    return (
        <RendererWithDebugUI
            question={applyStoryArgs(multiChoiceQuestion, args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
        />
    );
};
