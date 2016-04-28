/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const ExampleGraphieWidget = require("./example-graphie-widget.jsx").widget;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo page. Only the question writer sees this.
 */
const ExampleGraphieWidgetEditor = React.createClass({
    mixins: [Changeable, EditorJsonify],

    propTypes: {
        correct: React.PropTypes.arrayOf(React.PropTypes.number),
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        graph: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            correct: [4, 4],
            graph: {
                box: [340, 340],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                gridStep: [1, 1],
                valid: true,
                backgroundImage: null,
                markings: "grid",
                showProtractor: false,
            },
        };
    },

    render: function() {
        return <div>
            <ExampleGraphieWidget
                graph={this.props.graph}
                coord={this.props.correct}
                onChange={this.handleChange}
            />
        </div>;
    },

    handleChange: function(newProps) {
        if (newProps.coord) {
            this.change({
                correct: newProps.coord,
            });
        }
    },
});

module.exports = ExampleGraphieWidgetEditor;
