/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import RadioEditor from "../radio/editor";

import type {
    PerseusRadioWidgetOptions,
    PerseusRenderer,
    APIOptions,
} from "@khanacademy/perseus";

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
type Empty = Record<string, never>;

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Widgets/Radio Editor",
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

const question: PerseusRenderer = {
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                displayCount: null,
                onePerLine: false,
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        clue: "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        clue: "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        content: "$8$",
                        correct: true,
                        isNoneOfTheAbove: false,
                        clue: "$8$ is the positive square root of $64$.",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        isNoneOfTheAbove: false,
                        clue: "$8$ satisfies the equation.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        },
    },
};

class WithState extends React.Component<Empty, PerseusRadioWidgetOptions> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property '_widget' has no initializer and is not definitely assigned in the constructor.
    _widget: RadioEditor;

    //$FlowIgnore
    // @ts-expect-error [FEI-5003] - TS2416 - Property 'state' in type 'WithState' is not assignable to the same property in base type 'Component<Empty, PerseusRadioWidgetOptions, any>'.
    state = question.widgets["radio 1"];

    apiOptions: APIOptions = Object.freeze({});

    render(): React.ReactNode {
        return (
            <div className={css(styles.wrapper)}>
                <RadioEditor
                    {...this.state}
                    apiOptions={this.apiOptions}
                    onChange={(props) => {
                        this.setState({
                            ...this._widget.serialize(),
                            ...props,
                        });
                    }}
                    // @ts-expect-error [FEI-5003] - TS2322 - Type 'RadioEditor | null' is not assignable to type 'RadioEditor'.
                    ref={(widget) => (this._widget = widget)}
                />
            </div>
        );
    }
}

export const Default = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
