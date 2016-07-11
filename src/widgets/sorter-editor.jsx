/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const InfoTip        = require("../components/info-tip.jsx");
const PropCheckBox   = require("../components/prop-check-box.jsx");
const TextListEditor = require("../components/text-list-editor.jsx");

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

const SorterEditor = React.createClass({
    propTypes: {
        correct: React.PropTypes.array,
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            correct: ["$x$", "$y$", "$z$"],
            layout: HORIZONTAL,
            padding: true
        };
    },

    render: function() {
        var editor = this;

        return <div>
            <div>
                {' '}Correct answer:{' '}
                <InfoTip><p>
                    Enter the correct answer (in the correct order) here. The
                    preview on the right will have the cards in a randomized
                    order, which is how the student will see them.
                </p></InfoTip>
            </div>
            <TextListEditor
                options={this.props.correct}
                onChange={function(options, cb) {
                    editor.props.onChange({correct: options}, cb);
                }}
                layout={this.props.layout} />
            <div>
                <label>
                    {' '}Layout:{' '}
                    <select value={this.props.layout}
                            onChange={this.onLayoutChange}>
                        <option value={HORIZONTAL}>Horizontal</option>
                        <option value={VERTICAL}>Vertical</option>
                    </select>
                </label>
                <InfoTip>
                    <p>Use the horizontal layout for short text and small
                    images. The vertical layout is best for longer text and
                    larger images.</p>
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

    onLayoutChange: function(e) {
        this.props.onChange({layout: e.target.value});
    },

    serialize: function() {
        return _.pick(this.props, "correct", "layout", "padding");
    }
});

module.exports = SorterEditor;
