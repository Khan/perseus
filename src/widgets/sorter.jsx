/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, one-var, react/forbid-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var Sortable = require("../components/sortable.jsx");

const ApiOptions = require("../perseus-api.jsx").Options;
var shuffle = require("../util.js").shuffle;

var HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

var Sorter = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        correct: React.PropTypes.array,
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
            onChange: function() {}
        };
    },

    render: function() {
        var options = shuffle(
            this.props.correct,
            this.props.problemNum,
            /* ensurePermuted */ true
        );

        const marginPx = this.props.apiOptions.isMobile ? 8 : 5;

        return <div className="perseus-widget-sorter perseus-clearfix">
            <Sortable
                options={options}
                layout={this.props.layout}
                margin={marginPx}
                padding={this.props.padding}
                onChange={this.handleChange}
                ref="sortable"
            />
        </div>;
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
    }
});


_.extend(Sorter, {
    validate: function(state, rubric) {
        var correct = _.isEqual(state.options, rubric.correct);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});

module.exports = {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
};
