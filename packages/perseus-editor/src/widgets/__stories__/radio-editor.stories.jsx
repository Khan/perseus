// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import RadioEditor from "../radio/editor.jsx";

import type {
    PerseusRadioWidgetOptions,
    PerseusRenderer,
    APIOptions,
} from "@khanacademy/perseus";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Editor/Widgets/Radio Editor",
}: Story);

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
    _widget: RadioEditor;

    //$FlowIgnore
    state = question.widgets["radio 1"];

    apiOptions: APIOptions = {
        styling: {
            primaryProductColor: "red",
        },
    };

    render(): React.Node {
        return (
            <div className={css(styles.wrapper)}>
                <RadioEditor
                    {...this.state}
                    apiOptions={this.apiOptions}
                    onChange={(props) =>
                        this.setState({
                            ...this._widget.serialize(),
                            ...props,
                        })
                    }
                    // $FlowFixMe[incompatible-type] - can be null
                    ref={(widget) => (this._widget = widget)}
                />
            </div>
        );
    }
}

export const Default = (args: StoryArgs): React.Node => {
    return <WithState />;
};
