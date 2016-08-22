/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, no-unused-vars, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * This is an example graphie-using widget
 *
 * TODO(jack): Add more comments
 */

var React = require('react');
var _ = require("underscore");

var ApiOptions = require("../perseus-api.jsx").Options;
var Util = require("../util.js");
var Changeable = require("../mixins/changeable.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");

var Graphie = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;

var knumber = require("kmath").number;
var kpoint = require("kmath").point;

/**
 * This is the widget's renderer. It shows up in the right column
 * in the demo, and is what is visible to users, and where
 * users enter their answers.
 */
var ExampleGraphieWidget = React.createClass({
    mixins: [Changeable, WidgetJsonifyDeprecated],

    propTypes: {
        apiOptions: ApiOptions.propTypes,

        graph: React.PropTypes.object.isRequired,
        coord: React.PropTypes.arrayOf(React.PropTypes.number),
    },

    getDefaultProps: function() {
        return {
            // We want to allow our coord to be null to test if the
            // user has interacted with this widget yet when grading it
            coord: null,
            graph: {
                box: [400, 400],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                gridStep: [1, 1],
                valid: true,
                backgroundImage: null,
                markings: "grid",
                showProtractor: false
            }
        };
    },

    render: function() {
        return <Graphie
            ref="graphie"
            box={this.props.graph.box}
            range={this.props.graph.range}
            options={this.props.graph}
            setup={this.setupGraphie}
            setDrawingAreaAvailable={
                this.props.apiOptions.setDrawingAreaAvailable}
        >
            <MovablePoint
                    pointSize={5}
                    coord={this.props.coord || [0, 0]}
                    constraints={[
                        MovablePoint.constraints.snap(),
                        MovablePoint.constraints.bound()
                    ]}
                    onMove={this.movePoint} />
        </Graphie>;
    },

    movePoint: function(newCoord) {
        this.change({
            coord: newCoord
        });
    },

    _getGridConfig: function(options) {
        return _.map(options.step, function(step, i) {
            return Util.gridDimensionConfig(
                    step,
                    options.range[i],
                    options.box[i],
                    options.gridStep[i]);
        });
    },

    setupGraphie: function(graphie, options) {
        var gridConfig = this._getGridConfig(options);
        graphie.graphInit({
            range: options.range,
            scale: _.pluck(gridConfig, "scale"),
            axisArrows: "<->",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            gridStep: options.gridStep,
            tickStep: _.pluck(gridConfig, "tickStep"),
            labelStep: 1,
            unityLabels: _.pluck(gridConfig, "unityLabel")
        });
        graphie.label([0, options.range[1][1]], options.labels[1], "above");
    },

    simpleValidate: function(rubric) {
        return ExampleGraphieWidget.validate(this.getUserInput(), rubric);
    }
});


/**
 * This is the widget's grading function
 */
_.extend(ExampleGraphieWidget, {
    validate: function(state, rubric) {
        if (state.coord == null) {
            return {
                type: "invalid",
                message: null
            };
        } else if (kpoint.equal(state.coord, rubric.correct)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});

/**
 * For this widget to work, we must export it.
 * We also must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "example-graphie-widget",
    displayName: "Example Graphie Widget",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: ExampleGraphieWidget,
};
