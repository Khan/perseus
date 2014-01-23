/** @jsx React.DOM */

require("../core.js");
require("../util.js");

var InfoTip     = require("../components/info-tip.jsx");
var NumberInput = require("../components/number-input.jsx");

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
    getInitialState: function() {
        return {
            labelsTextbox: this.props.labels,
            gridStepTextbox: this.props.gridStep,
            stepTextbox: this.props.step,
            rangeTextbox: this.props.range
        };
    },

    getDefaultProps: function() {
        return {
            box: [340, 340],
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            gridStep: [1, 1],
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false
        };
    },

    render: function() {
        return <div>
            <div className="graph-settings">
                <div>x label:
                    <input  type="text"
                            ref="labels-0"
                            onInput={_.bind(this.changeLabel, this, 0)}
                            value={this.state.labelsTextbox[0]} />
                </div>
                <div>y label:
                    <input  type="text"
                            ref="labels-1"
                            onInput={_.bind(this.changeLabel, this, 1)}
                            value={this.state.labelsTextbox[1]} />
                </div>
                <div>x range:
                    <input  type="text"
                            ref="range-0-0"
                            onInput={_.bind(this.changeRange, this, 0, 0)}
                            value={this.state.rangeTextbox[0][0]} />
                    <input  type="text"
                            ref="range-0-1"
                            onInput={_.bind(this.changeRange, this, 0, 1)}
                            value={this.state.rangeTextbox[0][1]} />
                </div>
                <div>
                    y range:
                    <input  type="text"
                            ref="range-1-0"
                            onInput={_.bind(this.changeRange, this, 1, 0)}
                            value={this.state.rangeTextbox[1][0]} />
                    <input  type="text"
                            ref="range-1-1"
                            onInput={_.bind(this.changeRange, this, 1, 1)}
                            value={this.state.rangeTextbox[1][1]} />
                </div>
                <div>
                    Step:
                    <input  type="text"
                            ref="step-0"
                            onInput={_.bind(this.changeStep, this, 0)}
                            value={this.state.stepTextbox[0]} />
                    <input  type="text"
                            ref="step-1"
                            onInput={_.bind(this.changeStep, this, 1)}
                            value={this.state.stepTextbox[1]} />
                </div>
                <div>
                    Grid Step:
                    <NumberInput
                        ref="grid-step-0"
                        onChange={_.bind(this.changeGridStep, this, 0)}
                        value={this.state.gridStepTextbox[0]} />
                    <NumberInput
                        ref="grid-step-1"
                        onChange={_.bind(this.changeGridStep, this, 1)}
                        value={this.state.gridStepTextbox[1]} />
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
                    <InfoTip>
                        <p>Create an image in graphie, or use the "Add image"
                        function to create a background.</p>
                    </InfoTip>
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

    validateStepValue: function(settings) {
        var step = settings.step;
        var range = settings.range;
        var name = settings.name;
        var min = settings.min;
        var max = settings.max;

        if (! _.isFinite(step)) {
            return name + " must be a valid number";
        }
        var nSteps = numSteps(range, step);
        if (nSteps < min) {
            return name + " is too large, there must be at least " +
               min + " ticks.";
        }
        if (nSteps > max) {
            return name + " is too small, there can be at most " +
               max + " ticks.";
        }
        return true;
    },

    validGridStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Grid step",
            min: 3,
            max: 60
        });
    },

    validStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Step",
            min: 3,
            max: 20
        });
    },

    validateGraphSettings: function(range, step, gridStep) {
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
        var goodGridStep = _.every(gridStep, function(gridStep, i) {
            msg = self.validGridStep(gridStep, range[i]);
            return msg === true;
        });
        if (!goodGridStep) {
            return msg;
        }
        return true;
    },

    changeLabel: function(i, e) {
        var val = e.target.value;
        var labels = this.state.labelsTextbox.slice();
        labels[i] = val;
        this.setState({ labelsTextbox: labels }, this.changeGraph);
    },

    changeRange: function(i, j, e) {
        var val = this.refs["range-" + i + "-" + j].getDOMNode().value;
        var ranges = this.state.rangeTextbox.slice();
        var range = ranges[i] = ranges[i].slice();
        range[j] = val;
        var step = this.state.stepTextbox.slice();
        var gridStep = this.state.gridStepTextbox.slice();
        var scale = Perseus.Util.scaleFromExtent(range[i], this.props.box[i]);
        if (this.validRange(range) === true) {
            step[i] = Perseus.Util.tickStepFromExtent(
                    range, this.props.box[i]);
            gridStep[i] = Perseus.Util.gridStepFromTickStep(step[i], scale);
        }
        this.setState({
            stepTextbox: step,
            gridStepTextbox: gridStep,
            rangeTextbox: ranges
        }, this.changeGraph);
    },

    changeStep: function(i, e) {
        var val = this.refs["step-" + i].getDOMNode().value;
        var step = this.state.stepTextbox.slice();
        step[i] = val;
        this.setState({ stepTextbox: step }, this.changeGraph);
    },

    changeGridStep: function(i, e) {
        var val = this.refs["grid-step-" + i].getValue();
        var gridStep = this.state.gridStepTextbox.slice();
        gridStep[i] = val;
        this.setState({ gridStepTextbox: gridStep },
                this.changeGraph);
    },

    changeMarkings: function(e) {
        this.props.onChange({markings: e.target.value});
    },

    changeGraph: function() {
        var labels = this.state.labelsTextbox;
        var range = _.map(this.state.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        var step = _.map(this.state.stepTextbox, Number);
        var gridStep = this.state.gridStepTextbox;
        var valid = this.validateGraphSettings(range, step, gridStep);
        if (valid === true) {
            this.props.onChange({
                valid: true,
                labels: labels,
                range: range,
                step: step,
                gridStep: gridStep
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

