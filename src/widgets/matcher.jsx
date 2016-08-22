/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/forbid-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var Renderer       = require("../renderer.jsx");
var Sortable       = require("../components/sortable.jsx");

const ApiOptions = require("../perseus-api.jsx").Options;
var shuffle = require("../util.js").shuffle;
var seededRNG = require("../util.js").seededRNG;

var Matcher = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        labels: React.PropTypes.array,
        left: React.PropTypes.array,
        onChange: React.PropTypes.func,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        right: React.PropTypes.array,
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
            onChange: function() {}
        };
    },

    getInitialState: function() {
        return {
            leftHeight: 0,
            rightHeight: 0
        };
    },

    render: function() {
        // Use the same random() function to shuffle both columns sequentially
        var rng = seededRNG(this.props.problemNum);

        var left;
        if (!this.props.orderMatters) {
            // If the order doesn't matter, don't shuffle the left column
            left = this.props.left;
        } else {
            left = shuffle(this.props.left, rng, /* ensurePermuted */ true);
        }

        var right = shuffle(this.props.right, rng, /* ensurePermuted */ true);

        var showLabels = _.any(this.props.labels);
        var constraints = {height: _.max([this.state.leftHeight,
            this.state.rightHeight])};

        const cellMarginPx = this.props.apiOptions.isMobile ? 8 : 5;

        return <div className="perseus-widget-matcher">
            {showLabels &&
                <div className="perseus-clearfix">
                    <div className="column">
                        <div className="column-label">
                            <Renderer
                                content={this.props.labels[0] || "..."}
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="column-label">
                            <Renderer
                                content={this.props.labels[1] || "..."}
                            />
                        </div>
                    </div>
                </div>
            }
            <div className="perseus-clearfix">
                <div className="column">
                    <Sortable
                        options={left}
                        layout="vertical"
                        padding={this.props.padding}
                        disabled={!this.props.orderMatters}
                        constraints={constraints}
                        onMeasure={this.onMeasureLeft}
                        onChange={this.changeAndTrack}
                        margin={cellMarginPx}
                        ref="left"
                    />
                </div>
                <div className="column">
                    <Sortable
                        options={right}
                        layout="vertical"
                        padding={this.props.padding}
                        constraints={constraints}
                        onMeasure={this.onMeasureRight}
                        onChange={this.changeAndTrack}
                        margin={cellMarginPx}
                        ref="right"
                    />
                </div>
            </div>
        </div>;
    },

    changeAndTrack: function(e) {
        this.props.onChange(e);
        this.props.trackInteraction();
    },

    onMeasureLeft: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    },

    onMeasureRight: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
    },

    getUserInput: function() {
        return {
            left: this.refs.left.getOptions(),
            right: this.refs.right.getOptions()
        };
    },

    simpleValidate: function(rubric) {
        return Matcher.validate(this.getUserInput(), rubric);
    }
});


_.extend(Matcher, {
    validate: function(state, rubric) {
        var correct = _.isEqual(state.left, rubric.left) &&
                      _.isEqual(state.right, rubric.right);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});

module.exports = {
    name: "matcher",
    displayName: "Two column matcher",
    widget: Matcher,
};
