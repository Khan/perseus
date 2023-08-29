/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

const {TextInput} = components;

type Props = any;

class DefinitionEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        togglePrompt: PropTypes.string,
        definition: PropTypes.string,
        apiOptions: PropTypes.any,
    };

    static widgetName = "definition" as const;

    static defaultProps: Props = {
        togglePrompt: "",
        definition: "",
    };

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
                        apiOptions={this.props.apiOptions}
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

export default DefinitionEditor;
