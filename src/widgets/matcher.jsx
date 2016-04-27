/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const Renderer       = require("../renderer.jsx");
const Sortable       = require("../components/sortable.jsx");

const shuffle = require("../util.js").shuffle;
const seededRNG = require("../util.js").seededRNG;

const Matcher = React.createClass({
    propTypes: {
        labels: React.PropTypes.arrayOf(React.PropTypes.string),
        left: React.PropTypes.arrayOf(React.PropTypes.string),
        onChange: React.PropTypes.func,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        right: React.PropTypes.arrayOf(React.PropTypes.string),
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            left: [],
            right: [],
            labels: ["", ""],
            orderMatters: false,
            padding: true,
            problemNum: 0,
            onChange: function() {},
        };
    },

    getInitialState: function() {
        return {
            leftHeight: 0,
            rightHeight: 0,
        };
    },

    render: function() {
        // Use the same random() function to shuffle both columns sequentially
        const rng = seededRNG(this.props.problemNum);

        let left;
        if (!this.props.orderMatters) {
            // If the order doesn't matter, don't shuffle the left column
            left = this.props.left;
        } else {
            left = shuffle(this.props.left, rng, /* ensurePermuted */ true);
        }

        const right = shuffle(this.props.right, rng, /* ensurePermuted */ true);

        const showLabels = _.any(this.props.labels);
        const constraints = {height: _.max([this.state.leftHeight,
            this.state.rightHeight])};

        return <div className="perseus-widget-matcher ui-helper-clearfix">
            <div className="column">
                {showLabels && <div className="column-label">
                    <Renderer content={this.props.labels[0] || "..."} />
                </div>}
                <Sortable
                    options={left}
                    layout="vertical"
                    padding={this.props.padding}
                    disabled={!this.props.orderMatters}
                    constraints={constraints}
                    onMeasure={this.onMeasureLeft}
                    onChange={this.changeAndTrack}
                    ref="left"
                />
            </div>
            <div className="column">
                {showLabels && <div className="column-label">
                    <Renderer content={this.props.labels[1] || "..."} />
                </div>}
                <Sortable
                    options={right}
                    layout="vertical"
                    padding={this.props.padding}
                    constraints={constraints}
                    onMeasure={this.onMeasureRight}
                    onChange={this.changeAndTrack}
                    ref="right"
                />
            </div>
        </div>;
    },

    changeAndTrack: function(e) {
        this.props.onChange(e);
        this.props.trackInteraction();
    },

    onMeasureLeft: function(dimensions) {
        const height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    },

    onMeasureRight: function(dimensions) {
        const height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
    },

    getUserInput: function() {
        return {
            left: this.refs.left.getOptions(),
            right: this.refs.right.getOptions(),
        };
    },

    simpleValidate: function(rubric) {
        return Matcher.validate(this.getUserInput(), rubric);
    },
});


_.extend(Matcher, {
    validate: function(state, rubric) {
        const correct = _.isEqual(state.left, rubric.left) &&
                      _.isEqual(state.right, rubric.right);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    },
});

module.exports = {
    name: "matcher",
    displayName: "Two column matcher",
    widget: Matcher,
};
