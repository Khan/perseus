/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import {explanationLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {ExplanationDefaultWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props
    extends ExplanationDefaultWidgetOptions,
        Changeable.ChangeableProps {
    apiOptions?: APIOptionsWithDefaults;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an explanation widget that provides supplementary information to users.
 */
class ExplanationEditor extends React.Component<Props> {
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
                        apiOptions={this.props.apiOptions}
                        content={this.props.explanation}
                        widgets={this.props.widgets}
                        widgetEnabled={true}
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

export default ExplanationEditor;
