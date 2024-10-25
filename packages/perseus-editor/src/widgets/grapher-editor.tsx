/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    components,
    Changeable,
    GrapherWidget,
    SizingUtils,
    DEFAULT_GRAPHER_PROPS,
    chooseType,
    defaultPlotProps,
    getEquationString,
    allTypes,
    typeToButton,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import GraphSettings from "../components/graph-settings";

const {InfoTip, MultiButtonGroup} = components;
const {containerSizeClass, getInteractiveBoxFromSizeClass} = SizingUtils;
const Grapher = GrapherWidget.widget;

type Props = any;

class GrapherEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "grapher" as const;

    static defaultProps: Props = {
        correct: DEFAULT_GRAPHER_PROPS.plot,
        graph: DEFAULT_GRAPHER_PROPS.graph,
        availableTypes: DEFAULT_GRAPHER_PROPS.availableTypes,
    };

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
            const graphProps = {
                graph: this.props.graph,
                plot: this.props.correct,
                availableTypes: this.props.availableTypes,
                onChange: (newProps, cb) => {
                    let correct = this.props.correct;
                    if (correct.type === newProps.plot?.type) {
                        correct = _.extend({}, correct, newProps.plot);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.plot;
                    }
                    this.props.onChange({correct: correct}, cb);
                },
                trackInteraction: function () {},
            } as const;

            graph = (
                // NOTE(jeremy): This editor doesn't pass in a bunch of
                // standard props that the Renderer provides normally (eg.
                // alignment, findWidgets, etc).
                // @ts-expect-error - TS2769 - No overload matches this call.
                <Grapher
                    {...graphProps}
                    apiOptions={this.props.apiOptions}
                    containerSizeClass={sizeClass}
                />
            );
            equationString = getEquationString(graphProps);
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
                    <label>Available functions: </label>
                    <MultiButtonGroup
                        allowEmpty={false}
                        values={this.props.availableTypes}
                        buttons={_.map(allTypes, typeToButton)}
                        onChange={this.handleAvailableTypesChange}
                    />
                </div>
                {graph}
            </div>
        );
    }
}

export default GrapherEditor;
