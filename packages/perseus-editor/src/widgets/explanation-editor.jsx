/* eslint-disable react/forbid-prop-types, static-service/require-fixture */
// @flow
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor.jsx";

const {TextInput} = components;

const defaultExplanationProps = {
    showPrompt: "Explain",
    hidePrompt: "Hide explanation",
    explanation: "explanation goes here\n\nmore explanation",
    widgets: {},
};

type Props = $FlowFixMe;
type State = $FlowFixMe;

class ExplanationEditor extends React.Component<Props, State> {
    static propTypes = {
        ...Changeable.propTypes,
        showPrompt: PropTypes.string,
        hidePrompt: PropTypes.string,
        explanation: PropTypes.string,
        widgets: PropTypes.object,
        apiOptions: PropTypes.any,
    };

    static widgetName: "explanation" = "explanation";
    static defaultProps: Props = defaultExplanationProps;
    state: State = {};

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
        return (
            <div className="perseus-widget-explanation-editor">
                <div className="perseus-widget-row">
                    <label>
                        Prompt to show explanation:{" "}
                        <TextInput
                            value={this.props.showPrompt}
                            onChange={this.change("showPrompt")}
                        />
                    </label>
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Prompt to hide explanation:{" "}
                        <TextInput
                            value={this.props.hidePrompt}
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
                        immutableWidgets={false}
                        onChange={(props) => {
                            const newProps = {};
                            if (_.has(props, "content")) {
                                newProps.explanation = props.content;
                            }
                            if (_.has(props, "widgets")) {
                                newProps.widgets = props.widgets;
                            }
                            this.change(newProps);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ExplanationEditor;
