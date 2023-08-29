/* eslint-disable @typescript-eslint/no-unused-vars, react/forbid-prop-types, react/sort-comp */
/**
 * This is an example graphie-using widget
 *
 * TODO(jack): Add more comments
 */

import {number as knumber, point as kpoint} from "@khanacademy/kmath";
import {
    components,
    ApiOptions,
    Changeable,
    Util,
    WidgetJsonifyDeprecated,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import type {Coord, WidgetExports} from "@khanacademy/perseus";

const {Graphie} = components;

// @ts-expect-error - TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'.
const MovablePoint = Graphie.MovablePoint;

type Props = any;

/**
 * This is the widget's renderer. It shows up in the right column
 * in the demo, and is what is visible to users, and where
 * users enter their answers.
 */
class ExampleGraphieWidget extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,

        graph: PropTypes.object.isRequired,
        coord: PropTypes.arrayOf(PropTypes.number),
    };

    static defaultProps: Props = {
        // We want to allow our coord to be null to test if the
        // user has interacted with this widget yet when grading it
        coord: null,
        graph: {
            box: [400, 400],
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

    /**
     * This is the widget's grading function
     */
    static validate(state: any, rubric: any): any {
        if (state.coord == null) {
            return {
                type: "invalid",
                message: null,
            };
        }
        if (kpoint.equal(state.coord, rubric.correct)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    getUserInput: () => any = () => {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    };

    render(): React.ReactNode {
        return (
            <Graphie
                // eslint-disable-next-line react/no-string-refs
                ref="graphie"
                box={this.props.graph.box}
                range={this.props.graph.range}
                options={this.props.graph}
                setup={this.setupGraphie}
                setDrawingAreaAvailable={
                    this.props.apiOptions.setDrawingAreaAvailable
                }
            >
                <MovablePoint
                    pointSize={5}
                    coord={this.props.coord || [0, 0]}
                    constraints={[
                        MovablePoint.constraints.snap(),
                        MovablePoint.constraints.bound(),
                    ]}
                    onMove={this.movePoint}
                />
            </Graphie>
        );
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    movePoint: (arg1: Coord) => void = (newCoord) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({
            coord: newCoord,
        });
    };

    _getGridConfig: (arg1: any) => any = (options) => {
        return _.map(options.step, function (step, i) {
            return Util.gridDimensionConfig(
                step,
                options.range[i],
                options.box[i],
                options.gridStep[i],
            );
        });
    };

    setupGraphie: (arg1: any, arg2: any) => any = (graphie, options) => {
        const gridConfig = this._getGridConfig(options);
        graphie.graphInit({
            range: options.range,
            scale: _.pluck(gridConfig, "scale"),
            axisArrows: "<->",
            labelFormat: function (s) {
                return "\\small{" + s + "}";
            },
            gridStep: options.gridStep,
            tickStep: _.pluck(gridConfig, "tickStep"),
            labelStep: 1,
            unityLabels: _.pluck(gridConfig, "unityLabel"),
        });
        graphie.label([0, options.range[1][1]], options.labels[1], "above");
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        return ExampleGraphieWidget.validate(this.getUserInput(), rubric);
    };
}

/**
 * For this widget to work, we must export it.
 * We also must import this file in src/all-widgets.js
 */
export default {
    name: "example-graphie-widget",
    displayName: "Example Graphie Widget",
    hidden: true, // Hides this widget from the Perseus.Editor widget select
    widget: ExampleGraphieWidget,
} as WidgetExports<typeof ExampleGraphieWidget>;
