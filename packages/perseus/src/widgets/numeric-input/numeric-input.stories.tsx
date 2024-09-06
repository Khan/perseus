import {action} from "@storybook/addon-actions";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {NumericInput} from "./numeric-input";
import {question1} from "./numeric-input.testdata";

type StoryArgs = {
    coefficient: boolean;
    currentValue: string;
    rightAlign: boolean;
    size: "normal" | "small";
};

function generateProps(overwrite) {
    const base = {
        alignment: "",
        answers: [],
        containerSizeClass: "medium",
        isLastUsedWidget: true,
        coefficient: false,
        currentValue: "",
        problemNum: 0,
        reviewModeRubric: {
            answers: [],
            labelText: "",
            size: "medium",
            coefficient: false,
            static: false,
        },
        rightAlign: false,
        size: "normal",
        static: false,
        widgetId: "widgetId",
        findWidgets: action("findWidgets"),
        onBlur: action("onBlur"),
        onChange: action("onChange"),
        onFocus: action("onFocus"),
        trackInteraction: action("trackInteraction"),
    } as const;

    return {...base, ...overwrite};
}

export default {
    title: "Perseus/Widgets/NumericInput",
    args: {
        coefficient: false,
        currentValue: "8675309",
        rightAlign: false,
    },
    argTypes: {
        size: {
            options: ["normal", "small"],
            control: {type: "radio"},
            defaultValue: "normal",
        },
    },
};

export const Question1 = (): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const Interactive = (args: StoryArgs): React.ReactElement => {
    const props = generateProps(args);

    return <NumericInput {...props} />;
};

export const Sizes = (args: StoryArgs): React.ReactElement => {
    const smallProps = generateProps({...args, size: "small"});
    const normalProps = generateProps({...args, size: "normal"});

    return (
        <div>
            <label>
                Small:
                <NumericInput {...smallProps} />
            </label>
            <label>
                Normal:
                <NumericInput {...normalProps} />
            </label>
        </div>
    );
};

export const TextAlignment = (args: StoryArgs): React.ReactElement => {
    const leftProps = generateProps({...args, rightAlign: false});
    const rightProps = generateProps({...args, rightAlign: true});

    return (
        <div>
            <label>
                Left:
                <NumericInput {...leftProps} />
            </label>
            <label>
                Right:
                <NumericInput {...rightProps} />
            </label>
        </div>
    );
};
