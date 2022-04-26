/* eslint-disable react/sort-comp, static-service/require-fixture */
// @flow
/**
 * This is the editor for the simple-markdown-tester widget. This is what shows
 * up on the left side of the screen in the demo. Only the question writer
 * sees this.
 */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

type TextAreaProps = $FlowFixMe;

class TextArea extends React.Component<TextAreaProps> {
    render(): React.Node {
        return (
            <textarea
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                value={this.props.value || ""}
                onChange={this.changeValue}
            />
        );
    }

    focus = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
        return true;
    };

    changeValue = (e) => {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    };
}

type SimpleMarkdownTesterEditorProps = $FlowFixMe;

class SimpleMarkdownTesterEditor extends React.Component<SimpleMarkdownTesterEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName: "simple-markdown-tester" = "simple-markdown-tester";

    static defaultProps: SimpleMarkdownTesterEditorProps = {
        value: "",
    };

    render(): React.Node {
        return (
            <div>
                <label>
                    <div>Simple markdown contents:</div>
                    <div>
                        <TextArea
                            value={this.props.value}
                            onChange={this.change("value")}
                            // eslint-disable-next-line react/no-string-refs
                            ref="input"
                        />
                    </div>
                </label>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.input.focus();
        return true;
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default SimpleMarkdownTesterEditor;
