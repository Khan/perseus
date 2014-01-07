/** @jsx React.DOM */

require("../core.js");
require("../util.js");

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var GraphSettings = React.createClass({
    getDefaultProps: function() {
        var range = this.props.range || [[-10, 10], [-10, 10]];
        var step = this.props.step || [1, 1];
        return {
            box: [340, 340],
            range: range,
            rangeTextbox: range,
            step: step,
            stepTextbox: step,
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false
        };
    },

    render: function() {
        return <div>
            <div className="graph-settings">
                <div>x range:
                    <input  type="text"
                            ref="range-0-0"
                            onInput={_.bind(this.changeRange, this, 0, 0)}
                            value={this.props.rangeTextbox[0][0]} />
                    <input  type="text"
                            ref="range-0-1"
                            onInput={_.bind(this.changeRange, this, 0, 1)}
                            value={this.props.rangeTextbox[0][1]} />
                </div>
                <div>
                    y range:
                    <input  type="text"
                            ref="range-1-0"
                            onInput={_.bind(this.changeRange, this, 1, 0)}
                            value={this.props.rangeTextbox[1][0]} />
                    <input  type="text"
                            ref="range-1-1"
                            onInput={_.bind(this.changeRange, this, 1, 1)}
                            value={this.props.rangeTextbox[1][1]} />
                </div>
                <div>
                    Step:
                    <input  type="text"
                            ref="step-0"
                            onInput={_.bind(this.changeStep, this, 0)}
                            value={this.props.stepTextbox[0]} />
                    <input  type="text"
                            ref="step-1"
                            onInput={_.bind(this.changeStep, this, 1)}
                            value={this.props.stepTextbox[1]} />
                </div>
                <div>
                    <label>Markings:
                        <select value={this.props.markings}
                                onChange={this.changeMarkings}>
                            <option value="graph">Graph (axes + grid)</option>
                            <option value="grid">Grid only</option>
                            <option value="none">None</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="image-settings">
                <div>Background image:</div>
                <div>Url:
                    <input type="text"
                            className="graph-settings-background-url"
                            ref="bg-url"
                            defaultValue={this.props.backgroundImage.url}
                            onKeyPress={this.changeBackgroundUrl}
                            onBlur={this.changeBackgroundUrl} />
                </div>
                {this.props.backgroundImage.url && <div>
                    <div>Pixels from left:
                        <input type="text"
                                ref="bg-left"
                                value={this.props.backgroundImage.left}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "left")} />
                    </div>
                    <div>Pixels from bottom:
                        <input type="text"
                                ref="bg-bottom"
                                value={this.props.backgroundImage.bottom}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "bottom")} />
                    </div>
                    <div>Image scale:
                        <input type="text"
                                ref="bg-scale"
                                value={this.props.backgroundImage.scale}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "scale")} />
                    </div>
                </div>}
            </div>
            <div className="misc-settings">
                <label>
                    Show protractor:
                    <input type="checkbox"
                        checked={this.props.showProtractor}
                        onClick={this.toggleShowProtractor} />
                </label>
            </div>
        </div>;
    },

    componentDidMount: function() {
        var changeGraph = this.changeGraph;
        this.changeGraph = _.debounce(_.bind(changeGraph, this), 300);
    },


    validRange: function(range) {
        var numbers = _.every(range, function(num) {
            return _.isFinite(num);
        });
        if (! numbers) {
            return "Range must be a valid number";
        }
        if (range[0] >= range[1]) {
            return "Range must have a higher number on the right";
        }
        return true;
    },

    validStep: function(step, range) {
        if (! _.isFinite(step)) {
            return "Step must be a valid number";
        }
        var nSteps = numSteps(range, step);
        if (nSteps < 3) {
            return "Step must be smaller to have at least 3 ticks";
        }
        if (nSteps > 20) {
            return "Step must be larger to have at most 20 ticks";
        }
        return true;
    },

    valid: function(range, step) {
        var self = this;
        var msg;
        var goodRange = _.every(range, function(range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        var goodStep = _.every(step, function(step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        return true;
    },

    changeRange: function(i, j, e) {
        var val = this.refs["range-" + i + "-" + j].getDOMNode().value;
        var ranges = this.props.rangeTextbox.slice();
        var range = ranges[i] = ranges[i].slice();
        range[j] = val;
        var step = this.props.stepTextbox.slice();
        if (this.validRange(range) === true) {
            step[i] = Perseus.Util.tickStepFromExtent(
                    range, this.props.box[i]);
        }
        this.props.onChange({ rangeTextbox: ranges, stepTextbox: step },
                this.changeGraph);
    },

    changeStep: function(i, e) {
        var val = this.refs["step-" + i].getDOMNode().value;
        var step = this.props.stepTextbox.slice();
        step[i] = val;
        this.props.onChange({ stepTextbox: step },
                this.changeGraph);
    },

    changeMarkings: function(e) {
        this.props.onChange({markings: e.target.value});
    },

    changeGraph: function() {
        var range = this.props.rangeTextbox;
        var step = this.props.stepTextbox;
        var range = _.map(this.props.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        var step = _.map(this.props.stepTextbox, Number);
        var valid = this.valid(range, step);
        if (valid === true) {
            this.props.onChange({
                valid: true,
                range: range,
                step: step
            });
        } else {
            this.props.onChange({
                valid: valid
            });
        }
    },

    changeBackgroundUrl: function(e) {
        var self = this;

        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        var url = self.refs["bg-url"].getDOMNode().value;
        var setUrl = function() {
            var image = _.clone(self.props.backgroundImage);
            image.url = url;
            image.width = img.width;
            image.height = img.height;
            self.props.onChange({
                backgroundImage: image,
                markings: url ? "none" : "graph"
            });
        };
        if (url) {
            var img = new Image();
            img.onload = setUrl;
            img.src = url;
        } else {
            var img = {
                url: url,
                width: 0,
                height: 0
            };
            setUrl();
        }
    },

    changeBackgroundSetting: function(type, e) {
        var image = _.clone(this.props.backgroundImage);
        image[type] = e.target.value;
        this.props.onChange({ backgroundImage: image });
    },

    toggleShowProtractor: function() {
        this.props.onChange({showProtractor: !this.props.showProtractor});
    }

});

module.exports = GraphSettings;

