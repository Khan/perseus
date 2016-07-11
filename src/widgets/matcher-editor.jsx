/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var InfoTip        = require("../components/info-tip.jsx");
var PropCheckBox   = require("../components/prop-check-box.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

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
            orderMatters: false,
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
            <div className="perseus-clearfix">
                <TextListEditor
                    options={this.props.left}
                    onChange={(options, cb) => {
                        this.props.onChange({left: options}, cb);
                    }}
                    layout="vertical" />
                <TextListEditor
                    options={this.props.right}
                    onChange={(options, cb) => {
                        this.props.onChange({right: options}, cb);
                    }}
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
                    onChange={this.onLabelChange.bind(this, 0)} />
                <input type="text"
                    defaultValue={this.props.labels[1]}
                    onChange={this.onLabelChange.bind(this, 1)} />
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

    getSaveWarnings: function() {
        if (this.props.left.length !== this.props.right.length) {
            return [
                "The two halves of the matcher have different numbers" +
                " of cards."
            ];
        }
        return [];
    },

    serialize: function() {
        return _.pick(this.props,
            "left", "right", "labels", "orderMatters", "padding"
        );
    }
});

module.exports = MatcherEditor;
