var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");

var InfoTip      = require("react-components/js/info-tip.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Util         = require("../util.js");

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

var reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt"
};

var toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le"
};

function formatImproper(n, d) {
    if (d === 1) {
        return "" + n;
    } else {
        return n + "/" + d;
    }
}

function formatMixed(n, d) {
    if (n < 0) {
        return "-" + formatMixed(-n, d);
    }
    var w = Math.floor(n / d);
    if (w === 0) {
        return formatImproper(n, d);
    } else if (n - w * d === 0) {
        return "" + w;
    } else {
        return w + "\\:" + formatImproper(n - w * d, d);
    }
}

var InteractiveNumberLine = React.createClass({
    getDefaultProps: function() {
        return {
            labelStyle: "decimal",
            labelTicks: false,
            isInequality: false,
            pointX: 0,
            rel: "ge"
        };
    },

    isValid: function() {
        return this.props.range[0] < this.props.range[1] &&
                0 < this.props.tickStep &&
                0 < this.props.snapDivisions;
    },

    render: function() {
        var inequalityControls;
        if (this.props.isInequality) {
            inequalityControls = <div>
                <input type="button" value="換方向"
                    onClick={this.handleReverse} />
                <input type="button"
                    value={
                        this.props.rel === "le" || this.props.rel === "ge" ?
                            "改為空心圓" :
                            "改為實心圓"
                        }
                    onClick={this.handleToggleStrict} />
            </div>;
        }

        var valid = this.isValid();
        return <div className={"perseus-widget " +
                "perseus-widget-interactive-number-line"}>
            <div style={{display: valid ? "" : "none"}}
                    className="graphie above-scratchpad" ref="graphieDiv" />
            <div style={{display: valid ? "none" : ""}}>
                {' '}invalid number line configuration{' '}
            </div>
            {inequalityControls}
        </div>;
    },

    handleReverse: function() {
        this.props.onChange({rel: reverseRel[this.props.rel]});
    },

    handleToggleStrict: function() {
        this.props.onChange({rel: toggleStrictRel[this.props.rel]});
    },

    componentDidMount: function() {
        this.addGraphie();
    },

    componentDidUpdate: function() {
        // Use jQuery to remove so event handlers don't leak
        var node = ReactDOM.findDOMNode(this.refs.graphieDiv);
        $(node).children().remove();

        this.addGraphie();
    },

    _label: function(value) {
        var graphie = this.graphie;
        var labelStyle = this.props.labelStyle;

        // TODO(jack): Find out if any exercises have "decimal ticks" set,
        // and if so, re-save them and remove this check.
        if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
            graphie.label([value, -0.53], value, "center");
        } else if (labelStyle === "improper") {
            var frac = KhanUtil.toFraction(value);
            graphie.label([value, -0.53],
                    formatImproper(frac[0], frac[1]), "center");
        } else if (labelStyle === "mixed") {
            var frac = KhanUtil.toFraction(value);
            graphie.label([value, -0.53],
                    formatMixed(frac[0], frac[1]), "center");
        }
    },

    addGraphie: function() {
        var self = this;
        var graphie = this.graphie = KhanUtil.createGraphie(
                ReactDOM.findDOMNode(this.refs.graphieDiv));
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {
            return;
        }

        var range = this.props.range;
        var tickStep = this.props.tickStep;
        var scale = 400 / (range[1] - range[0]);

        graphie.init({
            range: [[range[0] - 30 / scale,
                     range[1] + 30 / scale],
                    [-1, 1]],
            scale: [scale, 40]
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        // Line

        graphie.line([range[0] - (25 / scale), 0],
             [range[1] + (25 / scale), 0], {
            arrows: "->"
        });
        graphie.line([range[1] + (25 / scale), 0],
             [range[0] - (25 / scale), 0], {
            arrows: "->"
        });

        // Ticks
        var labelStyle = this.props.labelStyle;
        for (var x = Math.ceil(range[0] / tickStep) * tickStep; x <= range[1];
                x += tickStep) {
            graphie.line([x, -0.2], [x, 0.2]);

            // TODO(jack): Find out if any exercises have "decimal ticks" set,
            // and if so, re-save them and remove this check.
            if (this.props.labelTicks || labelStyle === "decimal ticks") {
                this._label(x);
            }
        }

        graphie.style({
            stroke: KhanUtil.INTERACTIVE,
            strokeWidth: 3.5
        }, function() {
            graphie.line([range[0], -0.2], [range[0], 0.2]);
            graphie.line([range[1], -0.2], [range[1], 0.2]);
            if (range[0] < 0 && 0 < range[1]) {
                graphie.line([0, -0.2], [0, 0.2]);
            }
        });

        graphie.style({color: KhanUtil.INTERACTIVE}, function() {
            self._label(range[0]);
            self._label(range[1]);
            if (range[0] < 0 && 0 < range[1] && !self.props.labelTicks) {
                    graphie.label([0, -0.53], "0", "center");
            }
        });

        // Point

        var isInequality = this.props.isInequality;
        var rel = this.props.rel;

        var pointSize;
        var pointStyle;
        var highlightStyle;
        if (isInequality && (rel === "lt" || rel === "gt")) {
            pointSize = 5;
            pointStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil._BACKGROUND,
                "stroke-width": 3
            };
            highlightStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil._BACKGROUND,
                "stroke-width": 4
            };
        } else {
            pointSize = 4;
            pointStyle = highlightStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil.INTERACTING
            };
        }

        var x = Math.min(Math.max(range[0], this.props.pointX), range[1]);
        var point = this.point = graphie.addMovablePoint({
            pointSize: pointSize,
            coord: [x, 0],
            snapX: this.props.tickStep / this.props.snapDivisions,
            constraints: {
                constrainY: true
            },
            normalStyle: pointStyle,
            highlightStyle: highlightStyle
        });
        point.onMove = function(x, y) {
            x = Math.min(Math.max(range[0], x), range[1]);
            updateInequality(x, y);
            return [x, y];
        };
        point.onMoveEnd = (x, y) => {
            this.props.onChange({pointX: x});
        };

        // Inequality line

        var inequalityLine;
        updateInequality(x, 0);

        function updateInequality(px, py) {
            if (inequalityLine) {
                inequalityLine.remove();
                inequalityLine = null;
            }
            if (isInequality) {
                var end;
                if (rel === "ge" || rel === "gt") {
                    end = [range[1] + (26 / scale), 0];
                } else {
                    end = [range[0] - (26 / scale), 0];
                }
                inequalityLine = graphie.line(
                    [px, py],
                    end,
                    {
                        arrows: "->",
                        stroke: KhanUtil.INTERACTIVE,
                        strokeWidth: 3.5
                    }
                );
                point.toFront();
            }
        }
    },

    setAnswerFromJSON: function(answerData) {
        if (answerData === undefined) {
            answerData = this.getDefaultProps();
        }
        if (answerData.rel === "eq") {
            answerData.rel = "ge";
            answerData.isInequality = false;
        }
        this.props.onChange(answerData);
    },

    toJSON: function() {
        return {
            pointX: this.props.pointX,
            rel: this.props.isInequality ? this.props.rel : "eq"
        };
    },

    simpleValidate: function(rubric) {
        return InteractiveNumberLine.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(InteractiveNumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = Math.min(Math.max(range[0], 0), range[1]);
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";

        if (eq(state.pointX, rubric.correctX || 0) &&
                correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (state.pointX === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var InteractiveNumberLineEditor = React.createClass({
    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelStyle: "decimal",
            labelTicks: false,
            tickStep: 1,
            snapDivisions: 4,
            correctRel: "eq",
            correctX: 0
        };
    },

    render: function() {
        return <div>
            <label>
                {' '}最小 x: <input defaultValue={'' + this.props.range[0]}
                    onBlur={this.onRangeBlur.bind(this, 0)} />
            </label><br />
            <label>
                {' '}最大 x: <input defaultValue={'' + this.props.range[1]}
                    onBlur={this.onRangeBlur.bind(this, 1)} />
            </label>
            <InfoTip>
                <p>利用下方的「標籤格式」來改變最大與最小 x 的標籤顯示格式。</p>
            </InfoTip><br />
            <span>
                {' '}正確答案:{' '}
                <select value={this.props.correctRel}
                        onChange={this.onChange.bind(this, "correctRel")}>
                    <optgroup label="等式">
                        <option value="eq">x =</option>
                    </optgroup>
                    <optgroup label="不等式">
                        <option value="lt">x &lt;</option>
                        <option value="gt">x &gt;</option>
                        <option value="le">x &le;</option>
                        <option value="ge">x &ge;</option>
                    </optgroup>
                </select>
                <input defaultValue={'' + this.props.correctX}
                    onBlur={this.onNumBlur.bind(this, "correctX")} />
            </span><br /><br />
            <label>
                {' '}標籤格式:{' '}
                <select value={this.props.labelStyle}
                        onChange={this.onChange.bind(this, "labelStyle")}>
                    <option value="decimal">小數</option>
                    <option value="improper">假分數</option>
                    <option value="mixed">帶分數</option>
                </select>
                <PropCheckBox
                    label="顯示刻度代表的數字"
                    labelTicks={this.props.labelTicks}
                    onChange={this.props.onChange} />
            </label><br />
            <label>
                {' '}每一刻度之間距離: <input defaultValue={'' + this.props.tickStep}
                    onBlur={this.onNumBlur.bind(this, "tickStep")} />
            </label>
            <InfoTip>
                <p>每一個刻度都會標上刻度線。</p>
            </InfoTip><br />
            <label>
                {' '}刻度之間的分割數量:{' '}
                <input defaultValue={'' + this.props.snapDivisions}
                    onBlur={this.onNumBlur.bind(this, "snapDivisions")} />
            </label>
            <InfoTip>
                <p>確保分割數量足夠讓使用者回答問題，即答案會落在某分割的位置。</p>
            </InfoTip>
        </div>;
    },

    onRangeBlur: function(i, e) {
        var x = Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var range = this.props.range.slice();
        range[i] = x;
        this.props.onChange({range: range});
    },

    onChange: function(key, e) {
        var opts = {};
        opts[key] = e.target.value;
        this.props.onChange(opts);
    },

    onNumBlur: function(key, e) {
        var x = Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var opts = {};
        opts[key] = x;
        this.props.onChange(opts);
    },

    toJSON: function() {
        return {
            range: this.props.range,
            labelStyle: this.props.labelStyle,
            labelTicks: this.props.labelTicks,
            tickStep: this.props.tickStep,
            snapDivisions: this.props.snapDivisions,
            correctRel: this.props.correctRel,
            isInequality: this.props.correctRel !== "eq",
            correctX: this.props.correctX
        };
    }
});

module.exports = {
    name: "interactive-number-line",
    displayName: "Interactive-number-line/互動式數線",
    hidden: false,
    widget: InteractiveNumberLine,
    editor: InteractiveNumberLineEditor
};
