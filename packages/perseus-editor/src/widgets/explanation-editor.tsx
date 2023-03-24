/* eslint-disable react/forbid-prop-types */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from '../editor';

const {TextInput} = components;

const defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
} as const;

type Props = any;
type State = any;

class ExplanationEditor extends React.Component<Props, State> {
    static propTypes = {
        ...Changeable.propTypes,
        showPrompt: PropTypes.string,
        hidePrompt: PropTypes.string,
        explanation: PropTypes.string,
        widgets: PropTypes.object,
        apiOptions: PropTypes.any,
    };

    static widgetName: 'explanation' = "explanation";
    static defaultProps: Props = defaultExplanationProps;
    state: State = {};

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactElement {
        return (
            <div className="perseus-widget-explanation-editor">
                <div className="perseus-widget-row">
                    <label>
                        Prompt to show explanation:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TextInput' cannot be used as a JSX component. */}
                        <TextInput
                            value={this.props.showPrompt}
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("showPrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Prompt to hide explanation:{" "}
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'TextInput' cannot be used as a JSX component. */}
                        <TextInput
                            value={this.props.hidePrompt}
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("hidePrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
{ /* @ts-expect-error [FEI-5003] - TS2786 - 'Editor' cannot be used as a JSX component. */}
                    <Editor
                        apiOptions={this.props.apiOptions}
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
// @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ExplanationEditor;
