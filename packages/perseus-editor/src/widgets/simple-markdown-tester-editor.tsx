/* eslint-disable react/sort-comp */
/**
 * This is the editor for the simple-markdown-tester widget. This is what shows
 * up on the left side of the screen in the demo. Only the question writer
 * sees this.
 */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

type TextAreaProps = any;

class TextArea extends React.Component<TextAreaProps> {
    render(): React.ReactElement {
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
// @ts-expect-error [FEI-5003] - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
        return true;
    };

    changeValue = (e: any) => {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    };
}

type SimpleMarkdownTesterEditorProps = any;

class SimpleMarkdownTesterEditor extends React.Component<SimpleMarkdownTesterEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName: 'simple-markdown-tester' = "simple-markdown-tester";

    static defaultProps: SimpleMarkdownTesterEditorProps = {
        value: "",
    };

    render(): React.ReactElement {
        return (
            <div>
                <label>
                    <div>Simple markdown contents:</div>
                    <div>
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TextArea' cannot be used as a JSX component. */}
                        <TextArea
                            value={this.props.value}
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("value")}
                            // eslint-disable-next-line react/no-string-refs
                            ref="input"
                        />
                    </div>
                </label>
            </div>
        );
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
// @ts-expect-error [FEI-5003] - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus();
        return true;
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default SimpleMarkdownTesterEditor;
