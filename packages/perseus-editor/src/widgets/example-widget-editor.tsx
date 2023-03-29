/* eslint-disable react/sort-comp */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

type Props = any;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo. Only the question writer sees this.
 */
class ExampleWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "example-widget" as const;

    static defaultProps: Props = {
        correct: "",
    };

    handleAnswerChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        event,
    ) => {
        // @ts-expect-error [FEI-5003] - TS2554 - Expected 3 arguments, but got 1.
        this.change({
            correct: event.target.value,
        });
    };

    render(): React.ReactNode {
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

export default ExampleWidgetEditor;
