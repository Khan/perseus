import {components} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor";

import type {InitializeWidgetOptionsParams} from "../../editor";
import type {WidgetEditorProps} from "../widget-editor-props";
import type {PerseusDefinitionWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

type Props = WidgetEditorProps<PerseusDefinitionWidgetOptions>;

/**
 * An editor for adding an interactive definition widget that allows content
 * editors to embed clickable terms with expandable explanations within content.
 */
class DefinitionEditor extends React.Component<Props> {
    static initializeWidgetOptions(
        defaults: PerseusDefinitionWidgetOptions,
        params: InitializeWidgetOptionsParams,
    ): PerseusDefinitionWidgetOptions {
        if (params.selectedText) {
            return {...defaults, togglePrompt: params.selectedText};
        }
        return defaults;
    }

    handleChange(changed: Partial<PerseusDefinitionWidgetOptions>) {
        this.props.onChange({
            togglePrompt: this.props.togglePrompt,
            definition: this.props.definition,
            ...changed,
        });
    }

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
