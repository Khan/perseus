/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    components,
    Changeable,
    GrapherUtil,
    GrapherWidget,
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
} from "@khanacademy/perseus";
import {
    GrapherUtil as CoreGrapherUtil,
    grapherLogic,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import GraphSettings from "../components/graph-settings";

import type {
    GrapherAnswerTypes,
    GrapherDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {InfoTip, MultiButtonGroup} = components;
const Grapher = GrapherWidget.widget;
const {chooseType, defaultPlotProps, getEquationString, typeToButton} =
    GrapherUtil;

type Props = any;

class GrapherEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "grapher" as const;

    static defaultProps: GrapherDefaultWidgetOptions =
        grapherLogic.defaultWidgetOptions;

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleAvailableTypesChange = (newAvailableTypes: Array<any>) => {
        let correct = this.props.correct;

        // If the currently 'correct' type is removed from the list of types,
        // we need to change it to avoid impossible questions.
        if (!_.contains(newAvailableTypes, this.props.correct.type)) {
            const graph = this.props.graph;
            const newType = chooseType(newAvailableTypes);
            correct = defaultPlotProps(newType, graph);
        }
        this.props.onChange({
            availableTypes: newAvailableTypes,
            correct: correct,
        });
    };

    serialize: () => any = () => {
        return _.chain(this.props)
            .pick("correct", "availableTypes")
            .extend({graph: _.omit(this.props.graph, "box")})
            .value();
    };

    render(): React.ReactNode {
        const sizeClass = containerSizeClass.SMALL;
        let equationString;
        let graph;
        if (this.props.graph.valid === true) {
            const graphProps: Partial<PropsFor<typeof Grapher>> = {
                apiOptions: this.props.apiOptions,
                containerSizeClass: sizeClass,
                graph: this.props.graph,
                userInput: this.props.correct,
                handleUserInput: (userInput, cb) => {
                    let correct = this.props.correct;
                    if (correct.type === userInput?.type) {
                        correct = _.extend({}, correct, userInput);
                    } else {
                        // Clear options from previous graph
                        correct = userInput;
                    }
                    this.props.onChange({correct: correct}, cb);
                },
                availableTypes: this.props.availableTypes,
                trackInteraction: function () {},
            };

            graph = (
                // NOTE(jeremy): This editor doesn't pass in a bunch of
                // standard props that the Renderer provides normally (eg.
                // alignment, findWidgets, etc).
                <Grapher {...(graphProps as PropsFor<typeof Grapher>)} />
            );
            equationString = getEquationString(
                graphProps.userInput as GrapherAnswerTypes,
            );
        } else {
            graph = (
                <div className="perseus-error">{this.props.graph.valid}</div>
            );
        }

        return (
            <div>
                <div>
                    Correct answer{" "}
                    <InfoTip>
                        <p>
                            Graph the correct answer in the graph below and
                            ensure the equation or point coordinates displayed
                            represent the correct answer.
                        </p>
                    </InfoTip>{" "}
                    : {equationString}
                </div>

                <GraphSettings
                    editableSettings={["graph", "snap", "image"]}
                    box={getInteractiveBoxFromSizeClass(sizeClass)}
                    range={this.props.graph.range}
                    labels={this.props.graph.labels}
                    step={this.props.graph.step}
                    gridStep={this.props.graph.gridStep}
                    snapStep={this.props.graph.snapStep}
                    valid={this.props.graph.valid}
                    backgroundImage={this.props.graph.backgroundImage}
                    markings={this.props.graph.markings}
                    rulerLabel={this.props.graph.rulerLabel}
                    rulerTicks={this.props.graph.rulerTicks}
                    showTooltips={this.props.graph.showTooltips}
                    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                    onChange={this.change("graph")}
                />
                <div className="perseus-widget-row">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                    <label>Available functions: </label>
                    <MultiButtonGroup
                        allowEmpty={false}
                        values={this.props.availableTypes}
                        buttons={_.map(CoreGrapherUtil.allTypes, typeToButton)}
                        onChange={this.handleAvailableTypesChange}
                    />
                </div>
                {graph}
            </div>
        );
    }
}

export default GrapherEditor;
