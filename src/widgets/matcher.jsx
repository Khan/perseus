var React = require('react');
var InfoTip        = require("react-components/info-tip");
var PropCheckBox   = require("../components/prop-check-box.jsx");
var Renderer       = require("../renderer.jsx");
var Sortable       = require("../components/sortable.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var shuffle = require("../util.js").shuffle;
var seededRNG = require("../util.js").seededRNG;

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
                    onMeasure={this.onMeasureRight}
                    onChange={this.props.onChange}
                    ref="right" />
            </div>
        </div>;
    },

    onMeasureLeft: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    },

    onMeasureRight: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
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

    statics: {
        displayMode: "block"
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
                {' '}正確答案:{' '}
                <InfoTip>
                    <p>在此輸入配對題組的正確答案。當題目顯示時，會隨機排序卡片的順序。</p>
                </InfoTip>
            </div>
            <div className="ui-helper-clearfix">
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
                {' '}標籤:{' '}
                <InfoTip>
                    <p>此欄位非必填。</p>
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
                    label="第一欄的欄位順序可重新調整:"
                    orderMatters={this.props.orderMatters}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>當此功能開啟時，第一欄欄位的順序必須完成符合。</p>
                    <p>此功能適合使用在證明題的論證步驟與其理由的配對。</p>
                    <p>當此功能關閉時，第一欄的欄位會固定下來，只讓使用者調整第二欄欄位的順序。</p>
                </InfoTip>
            </div>
            <div>
                <PropCheckBox
                    label="留白:"
                    padding={this.props.padding}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>建議在文字時加入「留白」，圖片模式不要加入。</p>
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

module.exports = {
    name: "matcher",
    displayName: "Two column matcher/配對題",
    widget: Matcher,
    editor: MatcherEditor,
    hidden: false
};
