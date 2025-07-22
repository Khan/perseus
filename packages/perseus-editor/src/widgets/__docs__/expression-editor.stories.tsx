import {
    type PerseusRenderer,
    type PerseusExpressionWidgetOptions,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import ExpressionEditor from "../expression-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Expression/Editor Demo",
    component: ExpressionEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an expression widget that allow users to enter mathematical expressions.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

type State = PerseusExpressionWidgetOptions;

class WithDebug extends React.Component<Empty, State> {
    constructor(props) {
        super(props);

        const baseWidget = question.widgets["expression 1"].options;
        this.state = {
            answerForms: baseWidget.answerForms,
            times: baseWidget.times,
            buttonSets: baseWidget.buttonSets,
            functions: baseWidget.functions,
        };
    }

    mergeQuestionWithState() {
        return {
            ...question,
            widgets: {
                ...question.widgets,
                "expression 1": {
                    ...question.widgets["expression 1"],
                    options: {
                        ...question.widgets["expression 1"].options,
                        ...this.state,
                    },
                },
            },
        };
    }

    render(): React.ReactNode {
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.editorWrapper)}>
                    <ExpressionEditor
                        {...this.state}
                        // TODO(LEMS-2656): remove TS suppression
                        onChange={
                            ((props: PerseusExpressionWidgetOptions) => {
                                this.setState({
                                    ...props,
                                });
                            }) as any
                        }
                    />
                </div>
                <ServerItemRendererWithDebugUI
                    item={generateTestPerseusItem({
                        question: this.mergeQuestionWithState(),
                    })}
                    reviewMode={true}
                />
            </div>
        );
    }
}

export const Debug = (args: StoryArgs): React.ReactElement => {
    return <WithDebug />;
};

const question: PerseusRenderer = {
    content:
        "This is a cool expression question\n\n[[\u2603 expression 1]]\n\n",
    images: {},
    widgets: {
        "expression 1": {
            alignment: "default",
            graded: true,
            options: {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        key: "0",
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            static: false,
            type: "expression",
            version: {major: 1, minor: 0},
        },
    },
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 50,
    },
    editorWrapper: {
        paddingBottom: 100,
    },
});
