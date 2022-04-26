/* eslint-disable react/sort-comp */
// @flow
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

type Props = $FlowFixMe;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
class ExampleWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName: "example-widget" = "example-widget";

    static defaultProps: Props = {
        correct: "",
    };

    handleAnswerChange: (SyntheticInputEvent<>) => void = (event) => {
        this.change({
            correct: event.target.value,
        });
    };

    render(): React.Node {
        return (
            <div>
                <label>
                    Correct answer:
                    <input
                        value={this.props.correct}
                        onChange={this.handleAnswerChange}
                        // eslint-disable-next-line react/no-string-refs
                        ref="input"
                    />
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

export default ExampleWidgetEditor;
