var React          = require('react');
var InfoTip        = require("react-components/js/info-tip.jsx");
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

    toJSON: function(skipValidation) {
        return {options: this.refs.sortable.getOptions()};
    },

    simpleValidate: function(rubric) {
        return Sorter.validate(this.toJSON(), rubric);
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
                {' '}正確答案:{' '}
                <InfoTip><p>
                    在這邊輸入正確的排序，右邊的預覽畫面會是隨機的排序，也就是學生會看到的畫面。
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
                    {' '}顯示方式:{' '}
                    <select value={this.props.layout}
                            onChange={this.onLayoutChange}>
                        <option value={HORIZONTAL}>水平方式</option>
                        <option value={VERTICAL}>垂直方式</option>
                    </select>
                </label>
                <InfoTip>
                    <p>當卡片中的文字較短或是圖形較小時，建議可選用水平方式顯示，垂直
                        方式較適用於較長的文字敘述 (如：證明) 或較大的圖形。</p>
                </InfoTip>
            </div>
            <div>
                <PropCheckBox
                    label="留白:"
                    padding={this.props.padding}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>留白適合用在文字，若為圖片則不需要。</p>
                </InfoTip>
            </div>
        </div>;
    },

    onLayoutChange: function(e) {
        this.props.onChange({layout: e.target.value});
    },

    toJSON: function(skipValidation) {
        return _.pick(this.props, "correct", "layout", "padding");
    }
});

module.exports = {
    name: "sorter",
    displayName: "Sorter/排序",
    widget: Sorter,
    editor: SorterEditor,
    hidden: false
};
