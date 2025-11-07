/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    components,
    Changeable,
    EditorJsonify,
    withAPIOptions,
    APIOptions,
} from "@khanacademy/perseus";
import {definitionLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

import type {DefinitionDefaultWidgetOptions} from "@khanacademy/perseus-core";

const {TextInput} = components;

type WithAPIOptionsProps = {
    apiOptions: APIOptions;
};

type Props = WithAPIOptionsProps & {
    togglePrompt: string;
    definition: string;
    onChange: (options: any) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an interactive definition widget that allows content
 * editors to embed clickable terms with expandable explanations within content.
 */
class DefinitionEditorClass extends React.Component<Props> {
    static widgetName = "definition" as const;

    static defaultProps: DefinitionDefaultWidgetOptions =
        definitionLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

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
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("togglePrompt")}
                            placeholder="define me"
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <Editor
                        content={this.props.definition}
                        widgetEnabled={false}
                        placeholder="definition goes here"
                        onChange={(props) => {
                            const newProps: Record<string, any> = {};
                            if (_.has(props, "content")) {
                                newProps.definition = props.content;
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

const DefinitionEditor = withAPIOptions(DefinitionEditorClass);
export default DefinitionEditor;
