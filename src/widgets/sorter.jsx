var React          = require('react');
var InfoTip        = require("react-components/info-tip.jsx");
var _ = require("underscore");

var PropCheckBox   = require("../components/prop-check-box.jsx");
var Sortable       = require("../components/sortable.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var shuffle = require("../util.js").shuffle;

var HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

var Sorter = React.createClass({
    propTypes: {
        correct: React.PropTypes.array,
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        onChange: React.PropTypes.func
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

        return <div className="perseus-widget-sorter ui-helper-clearfix">
            <Sortable
                options={options}
                layout={this.props.layout}
                padding={this.props.padding}
                onChange={this.props.onChange}
                ref="sortable" />
        </div>;
    },

    getUserInput: function() {
        return {options: this.refs.sortable.getOptions()};
    },

    simpleValidate: function(rubric) {
        return Sorter.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
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


var SorterEditor = React.createClass({
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

module.exports = {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
    editor: SorterEditor
};
