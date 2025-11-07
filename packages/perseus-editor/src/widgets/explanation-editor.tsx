/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {
    components,
    Changeable,
    EditorJsonify,
    withAPIOptions,
    APIOptions,
} from "@khanacademy/perseus";
import {explanationLogic} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

import type {ExplanationDefaultWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

type WithAPIOptionsProps = {
    apiOptions: APIOptions;
};

type Props = WithAPIOptionsProps & {
    showPrompt: string;
    hidePrompt: string;
    explanation: string;
    widgets: any;
    onChange: (options: any) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an explanation widget that provides supplementary information to users.
 */
class ExplanationEditorClass extends React.Component<Props> {
    static widgetName = "explanation" as const;

    static defaultProps: ExplanationDefaultWidgetOptions =
        explanationLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-widget-explanation-editor">
                <div className="perseus-widget-row">
                    <label>
                        Prompt to show explanation:{" "}
                        <TextInput
                            value={this.props.showPrompt}
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("showPrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Prompt to hide explanation:{" "}
                        <TextInput
                            value={this.props.hidePrompt}
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("hidePrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        content={this.props.explanation}
                        widgets={this.props.widgets}
                        widgetEnabled={true}
                        immutableWidgets={false}
                        onChange={(props) => {
                            const newProps: Record<string, any> = {};
                            if (_.has(props, "content")) {
                                newProps.explanation = props.content;
                            }
                            if (_.has(props, "widgets")) {
                                newProps.widgets = props.widgets;
                            }
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    }
}

const ExplanationEditor = withAPIOptions(ExplanationEditorClass);
export default ExplanationEditor;
