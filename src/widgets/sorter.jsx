const React = require('react');
const _ = require("underscore");

const Sortable = require("../components/sortable.jsx");

const shuffle = require("../util.js").shuffle;

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const Sorter = React.createClass({
    propTypes: {
        correct: React.PropTypes.arrayOf(React.PropTypes.string),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: React.PropTypes.func,
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            correct: [],
            layout: HORIZONTAL,
            padding: true,
            problemNum: 0,
            onChange: function() {},
        };
    },

    handleChange: function(e) {
        this.props.onChange(e);
        this.props.trackInteraction();
    },

    getUserInput: function() {
        return {options: this.refs.sortable.getOptions()};
    },

    simpleValidate: function(rubric) {
        return Sorter.validate(this.getUserInput(), rubric);
    },

    render: function() {
        const options = shuffle(
            this.props.correct,
            this.props.problemNum,
            /* ensurePermuted */ true
        );

        return <div className="perseus-widget-sorter ui-helper-clearfix">
            <Sortable
                options={options}
                layout={this.props.layout}
                padding={this.props.padding}
                onChange={this.handleChange}
                ref="sortable"
            />
        </div>;
    },
});


_.extend(Sorter, {
    validate: function(state, rubric) {
        const correct = _.isEqual(state.options, rubric.correct);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    },
});

module.exports = {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
};
