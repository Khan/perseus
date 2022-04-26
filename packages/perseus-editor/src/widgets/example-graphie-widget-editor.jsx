// @flow
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

import ExampleGraphie from "./example-graphie-widget.jsx";

const ExampleGraphieWidget = ExampleGraphie.widget;

type Props = $FlowFixMe;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo page. Only the question writer sees this.
 */
class ExampleGraphieWidgetEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName: "example-graphie-widget" = "example-graphie-widget";

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

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleChange: ($FlowFixMe) => void = (newProps) => {
        if (newProps.coord) {
            this.change({
                correct: newProps.coord,
            });
        }
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
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
