/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const Util          = require("../util.js");

const DeprecationMixin = Util.DeprecationMixin;

const GraphSettings = require("../components/graph-settings.jsx");
const InfoTip       = require("../components/info-tip.jsx");

const InteractiveGraph = require("./interactive-graph.jsx").widget;
const { interactiveSizes } = require("../styles/constants.js");
const {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
} = require("../util/sizing-utils.js");

const defaultBackgroundImage = {
    url: null
};

var deprecatedProps = {
    showGraph: function(props) {
        return {markings: props.showGraph ? "graph" : "none"};
    }
};

const InteractiveGraphEditor = React.createClass({
    className: "perseus-widget-interactive-graph",

    getDefaultProps: function() {
        return {
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            showTooltips: false,
            rulerLabel: "",
            rulerTicks: 10,
            correct: {
                type: "linear",
                coords: null
            }
        };
    },

    // TODO(jack): Use versioning instead of DeprecationMixin
    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    render: function() {
        var graph;
        var equationString;

        var gridStep = this.props.gridStep || Util.getGridStep(
                this.props.range,
                this.props.step,
                interactiveSizes.defaultBoxSize
        );
        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(
            gridStep
        );

        const sizeClass = containerSizeClass.SMALL;
        if (this.props.valid === true) {
            // TODO(aria): send these down all at once
            var graphProps = {
                ref: "graph",
                box: this.props.box,
                range: this.props.range,
                labels: this.props.labels,
                step: this.props.step,
                gridStep: gridStep,
                snapStep: snapStep,
                graph: this.props.correct,
                backgroundImage: this.props.backgroundImage,
                markings: this.props.markings,
                showProtractor: this.props.showProtractor,
                showRuler: this.props.showRuler,
                rulerLabel: this.props.rulerLabel,
                rulerTicks: this.props.rulerTicks,
                trackInteraction: function() {},
                flexibleType: true,
                onChange: (newProps) => {
                    var correct = this.props.correct;
                    if (correct.type === newProps.graph.type) {
                        correct = _.extend({}, correct, newProps.graph);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.graph;
                    }
                    this.props.onChange({correct: correct});
                }
            };
            graph = <InteractiveGraph
                {...graphProps}
                containerSizeClass={sizeClass}
                apiOptions={{
                    ...this.props.apiOptions,
                    isMobile: false,
                }}
            />;
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">{this.props.valid}</div>;
        }

        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer{' '}
                <InfoTip>
                    <p>Graph the correct answer in the graph below and ensure
                    the equation or point coordinates displayed represent the
                    correct answer.</p>
                </InfoTip>
                {' '}: {equationString}</div>


            <GraphSettings
                box={getInteractiveBoxFromSizeClass(sizeClass)}
                range={this.props.range}
                labels={this.props.labels}
                step={this.props.step}
                gridStep={gridStep}
                snapStep={snapStep}
                valid={this.props.valid}
                backgroundImage={this.props.backgroundImage}
                markings={this.props.markings}
                showProtractor={this.props.showProtractor}
                showRuler={this.props.showRuler}
                showTooltips={this.props.showTooltips}
                rulerLabel={this.props.rulerLabel}
                rulerTicks={this.props.rulerTicks}
                onChange={this.props.onChange} />


            {this.props.correct.type === "polygon" &&
            <div className="type-settings">
                <label>
                    {' '}Student answer must{' '}
                    <select
                            value={this.props.correct.match}
                            onChange={this.changeMatchType}>
                        <option value="exact">match exactly</option>
                        <option value="congruent">be congruent</option>
                        <option value="approx">
                            be approximately congruent</option>
                        <option value="similar">be similar</option>
                    </select>
                </label>
                <InfoTip>
                    <ul>
                        <li>
                            <p><b>Match Exactly:</b> Match exactly in size,
                            orientation, and location on the grid even if it is
                            not shown in the background.</p>
                        </li>
                        <li>
                            <p><b>Be Congruent:</b> Be congruent in size and
                            shape, but can be located anywhere on the grid.</p>
                        </li>
                        <li>
                            <p>
                                <b>Be Approximately Congruent:</b> Be exactly
                                similar, and congruent in size and shape to
                                within 0.1 units, but can be located anywhere
                                on the grid. <em>Use this with snapping to
                                angle measure.</em>
                            </p>
                        </li>
                        <li>
                            <p><b>Be Similar:</b> Be similar with matching
                            interior angles, and side measures that are
                            matching or a multiple of the correct side
                            measures. The figure can be located anywhere on the
                            grid.</p>
                        </li>
                    </ul>
                </InfoTip>
            </div>}
            {this.props.correct.type === "angle" &&
            <div className="type-settings">
                <div>
                    <label>
                        {' '}Student answer must{' '}
                        <select
                                value={this.props.correct.match}
                                onChange={this.changeMatchType}>
                            <option value="exact">match exactly</option>
                            <option value="congruent">be congruent</option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>Congruency requires only that the angle measures are
                        the same. An exact match implies congruency, but also
                        requires that the angles have the same orientation and
                        that the vertices are in the same position.</p>
                    </InfoTip>
                </div>
            </div>}
            {graph}
        </div>;
    },

    changeMatchType: function(e) {
        var correct = _.extend({}, this.props.correct, {
            match: e.target.value
        });
        this.props.onChange({correct: correct});
    },

    serialize: function() {
        var json = _.pick(this.props, "step", "backgroundImage", "markings",
            "labels", "showProtractor", "showRuler", "showTooltips",
            "rulerLabel", "rulerTicks", "range", "gridStep", "snapStep");

        var graph = this.refs.graph;
        if (graph) {
            var correct = graph && graph.getUserInput();
            _.extend(json, {
                // TODO(alpert): Allow specifying flexibleType (whether the
                // graph type should be a choice or not)
                graph: {type: correct.type},
                correct: correct
            });

            _.each(["allowReflexAngles", "angleOffsetDeg", "numPoints",
                        "numSides", "numSegments", "showAngles", "showSides",
                        "snapTo", "snapDegrees"],
                    function(key) {
                        if (_.has(correct, key)) {
                            json.graph[key] = correct[key];
                        }
                    });
        }
        return json;
    }
});

module.exports = InteractiveGraphEditor;
