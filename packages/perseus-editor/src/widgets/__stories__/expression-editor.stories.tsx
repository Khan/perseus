import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import EditorStoryWrapper from "../../editor-story-wrapper";
import ExpressionEditor from "../expression-editor";

import type {
    PerseusRenderer,
    APIOptions,
    PerseusExpressionWidgetOptions,
} from "@khanacademy/perseus";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Expression Editor",
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
        const apiOptions: APIOptions = Object.freeze({});

        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.editorWrapper)}>
                    <EditorStoryWrapper>
                        <ExpressionEditor
                            {...this.state}
                            onChange={(
                                props: PerseusExpressionWidgetOptions,
                            ) => {
                                this.setState({
                                    ...props,
                                });
                            }}
                        />
                    </EditorStoryWrapper>
                </div>
                <RendererWithDebugUI
                    question={this.mergeQuestionWithState()}
                    apiOptions={apiOptions}
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
