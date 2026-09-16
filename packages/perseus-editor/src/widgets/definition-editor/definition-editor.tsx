import {components} from "@khanacademy/perseus";
import {definitionLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {InitializeWidgetOptionsParams} from "../../editor";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {PerseusDefinitionWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props extends PerseusDefinitionWidgetOptions {
    apiOptions?: APIOptionsWithDefaults;
    onChange: (options: PerseusDefinitionWidgetOptions) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an interactive definition widget that allows content
 * editors to embed clickable terms with expandable explanations within content.
 */
class DefinitionEditor extends React.Component<Props> {
    static defaultProps: PerseusDefinitionWidgetOptions =
        definitionLogic.defaultWidgetOptions;

    static initializeWidgetOptions(
        params: InitializeWidgetOptionsParams,
    ): PerseusDefinitionWidgetOptions {
        const defaultWidgetOptions = {
            ...definitionLogic.defaultWidgetOptions,
        };

        if (params.selectedText) {
            defaultWidgetOptions.togglePrompt = params.selectedText;
        }

        return defaultWidgetOptions;
    }

    handleChange(changed: Partial<PerseusDefinitionWidgetOptions>) {
        this.props.onChange({
            togglePrompt: this.props.togglePrompt,
            definition: this.props.definition,
            ...changed,
        });
    }

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-widget-definition-editor">
                <a
                    href="https://docs.google.com/document/d/1udaPef4imOfTMhmLDlWq4SM0mxL0r3YHFZE-5J1uGfo"
                    target="_blank"
                    rel="noreferrer"
                >
                    Definition style guide
                </a>
                <div className="perseus-widget-row">
                    <label>
                        Word to be defined:{" "}
                        <TextInput
                            value={this.props.togglePrompt}
                            onChange={(togglePrompt) =>
                                this.handleChange({togglePrompt})
                            }
                            placeholder="define me"
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={this.props.definition}
                        widgetEnabled={false}
                        placeholder="definition goes here"
                        onChange={(props) => {
                            const newProps: Record<string, any> = {};
                            // TODO(LEMS-4610): remove this _.has check once
                            // the editor passes the entire Renderer to
                            // onChange.
                            if (_.has(props, "content")) {
                                newProps.definition = props.content;
                            }
                            this.handleChange(newProps);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default DefinitionEditor;
