/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");
require("../renderer.jsx");
var Util = require("../util.js");

var shuffle = Util.shuffle;
var seededRNG = Util.seededRNG;

var InfoTip        = require("../components/info-tip.jsx");
var PropCheckBox   = require("../components/prop-check-box.jsx");
var Renderer       = Perseus.Renderer;
var Sortable       = require("../components/sortable.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var Widgets        = require("../widgets.js");


var Matcher = React.createClass({
    propTypes: {
        left: React.PropTypes.array,
        right: React.PropTypes.array,
        labels: React.PropTypes.array,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            left: [],
            right: [],
            labels: ["", ""],
            orderMatters: true,
            padding: true,
            problemNum: 0,
            onChange: function() {}
        };
    },

    getInitialState: function() {
        return {
            heights: {left: 0, right: 0}
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
        var constraints = {height: _.max(this.state.heights)};

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
                    onMeasure={_.partial(this.onMeasure, "left")}
                    onChange={this.props.onChange}
                    ref="left" />
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
                    onMeasure={_.partial(this.onMeasure, "right")}
                    onChange={this.props.onChange}
                    ref="right" />
            </div>
        </div>;
    },

    onMeasure: function(side, dimensions) {
        var heights = _.clone(this.state.heights);
        heights[side] = _.max(dimensions.heights);
        this.setState({heights: heights});
    },

    toJSON: function(skipValidation) {
        return {
            left: this.refs.left.getOptions(),
            right: this.refs.right.getOptions()
        };
    },

    simpleValidate: function(rubric) {
        return Matcher.validate(this.toJSON(), rubric);
    },
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


var MatcherEditor = React.createClass({
    propTypes: {
        left: React.PropTypes.array,
        right: React.PropTypes.array,
        labels: React.PropTypes.array,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            left: ["$x$", "$y$", "$z$"],
            right: ["$1$", "$2$", "$3$"],
            labels: ["test", "label"],
            orderMatters: true,
            padding: true
        };
    },

    render: function() {
        return <div className="perseus-matcher-editor">
            <div>
                {' '}Correct answer:{' '}
                <InfoTip>
                    <p>Enter the correct answers here. The preview on the right
                    will show the cards in a randomized order, which is how the
                    student will see them.</p>
                </InfoTip>
            </div>
            <div className="ui-helper-clearfix">
                <TextListEditor
                    options={this.props.left}
                    onChange={function(options, cb) {
                        this.props.onChange({left: options}, cb);
                    }.bind(this)}
                    layout="vertical" />
                <TextListEditor
                    options={this.props.right}
                    onChange={function(options, cb) {
                        this.props.onChange({right: options}, cb);
                    }.bind(this)}
                    layout="vertical" />
            </div>
            <span>
                {' '}Labels:{' '}
                <InfoTip>
                    <p>These are entirely optional.</p>
                </InfoTip>
            </span>
            <div>
                <input type="text"
                    defaultValue={this.props.labels[0]}
                    onChange={_.bind(this.onLabelChange, this, 0)} />
                <input type="text"
                    defaultValue={this.props.labels[1]}
                    onChange={_.bind(this.onLabelChange, this, 1)} />
            </div>
            <div>
                <PropCheckBox
                    label="Order of the matched pairs matters:"
                    orderMatters={this.props.orderMatters}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>With this option enabled, only the order provided above
                    will be treated as correct. This is useful when ordering is
                    significant, such as in the context of a proof.</p>
                    <p>If disabled, pairwise matching is sufficient. To make
                    this clear, the left column becomes fixed in the provided
                    order and only the cards in the right column can be
                    moved.</p>
                </InfoTip>
            </div>
            <div>
                <PropCheckBox
                    label="Padding:"
                    padding={this.props.padding}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>Padding is good for text, but not needed for images.</p>
                </InfoTip>
            </div>
        </div>;
    },

    onLabelChange: function(index, e) {
        var labels = _.clone(this.props.labels);
        labels[index] = e.target.value;
        this.props.onChange({labels: labels});
    },

    toJSON: function(skipValidation) {
        if (!skipValidation) {
            if (this.props.left.length !== this.props.right.length) {
                alert("Warning: The two halves of the matcher have different" +
                    " numbers of cards.");
            }
        }

        return _.pick(this.props,
            "left", "right", "labels", "orderMatters", "padding"
        );
    }
});

Widgets.register("matcher", Matcher);
Widgets.register("matcher-editor", MatcherEditor);

})(Perseus);
