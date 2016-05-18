const React = require('react');

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const ExampleGraphieWidget = require("./example-graphie-widget.jsx").widget;

/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in the demo page. Only the question writer sees this.
 */
const ExampleGraphieWidgetEditor = React.createClass({
    propTypes: {
        correct: React.PropTypes.arrayOf(React.PropTypes.number),
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        graph: React.PropTypes.any,
    },

    mixins: [Changeable, EditorJsonify],

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

    handleChange: function(newProps) {
        if (newProps.coord) {
            this.change({
                correct: newProps.coord,
            });
        }
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
});

module.exports = ExampleGraphieWidgetEditor;
