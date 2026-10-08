import {components} from "@khanacademy/perseus";
import {explanationLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props extends PerseusExplanationWidgetOptions {
    apiOptions?: APIOptionsWithDefaults;
    onChange: (options: PerseusExplanationWidgetOptions) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an explanation widget that provides supplementary information to users.
 */
class ExplanationEditor extends React.Component<Props> {
    static defaultProps: PerseusExplanationWidgetOptions =
        explanationLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusExplanationWidgetOptions>) {
        this.props.onChange({
            showPrompt: this.props.showPrompt,
            hidePrompt: this.props.hidePrompt,
            explanation: this.props.explanation,
            widgets: this.props.widgets,
            ...changes,
        });
    }

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
                            onChange={(showPrompt) =>
                                this.handleChange({showPrompt})
                            }
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Prompt to hide explanation:{" "}
                        <TextInput
                            value={this.props.hidePrompt}
                            onChange={(hidePrompt) =>
                                this.handleChange({hidePrompt})
                            }
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
                            this.handleChange(newProps);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ExplanationEditor;
