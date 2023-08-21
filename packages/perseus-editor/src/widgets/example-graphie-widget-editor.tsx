import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

import ExampleGraphie from "./example-graphie-widget";

const ExampleGraphieWidget = ExampleGraphie.widget;

type Props = any;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo page. Only the question writer sees this.
 */
class ExampleGraphieWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "example-graphie-widget" as const;

    static defaultProps: Props = {
        correct: [4, 4],
        graph: {
            box: [340, 340],
            labels: ["x", "y"],
            range: [
                [-10, 10],
                [-10, 10],
            ],
            step: [1, 1],
            gridStep: [1, 1],
            valid: true,
            backgroundImage: null,
            markings: "grid",
            showProtractor: false,
        },
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleChange: (arg1: any) => void = (newProps) => {
        if (newProps.coord) {
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
            this.change({
                correct: newProps.coord,
            });
        }
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <ExampleGraphieWidget
                    graph={this.props.graph}
                    coord={this.props.correct}
                    onChange={this.handleChange}
                    apiOptions={this.props.apiOptions}
                />
            </div>
        );
    }
}

export default ExampleGraphieWidgetEditor;
