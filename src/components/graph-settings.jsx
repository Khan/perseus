/** @jsx React.DOM */

require("../core.js");
var Util = require("../util.js");

var Changeable  = require("../mixins/changeable.jsx");
var InfoTip     = require("../components/info-tip.jsx");
var NumberInput = require("../components/number-input.jsx");
var RangeInput = require("../components/range-input.jsx");
var ButtonGroup = require("../components/button-group.jsx");

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

    mixins: [Changeable],

    getInitialState: function() {
        return {
            labelsTextbox: this.props.labels,
            gridStepTextbox: this.props.gridStep,
            snapStepTextbox: this.props.snapStep,
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
            snapStep: Util.snapStepFromGridStep(
                this.props.gridStep || [1, 1]),
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10
        };
    },

    render: function() {
        return <div>
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col"> x Label
                        <input  type="text"
                                className="graph-settings-axis-label"
                                ref="labels-0"
                                onChange={_.bind(this.changeLabel, this, 0)}
                                value={this.state.labelsTextbox[0]} />
                    </div>
                    <div className="perseus-widget-right-col">y Label
                        <input  type="text"
                                className="graph-settings-axis-label"
                                ref="labels-1"
                                onChange={_.bind(this.changeLabel, this, 1)}
                                value={this.state.labelsTextbox[1]} />
                    </div>
                </div>

                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        x Range
                        <RangeInput value= {this.state.rangeTextbox[0]}
                            onChange = {_.bind(this.changeRange, this, 0)} />
                    </div>
                    <div className="perseus-widget-right-col">
                        y Range
                        <RangeInput value= {this.state.rangeTextbox[1]}
                            onChange = {_.bind(this.changeRange, this, 1)} />
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Tick Step
                        <RangeInput value= {this.state.stepTextbox}
                                    onChange = {this.changeStep} />
                    </div>
                    <div className="perseus-widget-right-col">
                        Grid Step
                        <RangeInput value= {this.state.gridStepTextbox}
                                    onChange = {this.changeGridStep} />
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Snap Step
                        <RangeInput value= {this.state.snapStepTextbox}
                                    onChange = {this.changeSnapStep} />
                    </div>
                </div>
                <div className="perseus-widget-row">
                    <label>Markings:{' '} </label>
                    <ButtonGroup value={this.props.markings}
                        buttons={[
                            {value: "graph", text: "Graph"},
                            {value: "grid", text: "Grid"},
                            {value: "none", text: "None"}]}
                        onChange={this.change("markings")} />
                </div>
            </div>
            <div className="image-settings">
                <div>Background image:</div>
                <div>Url:{' '}
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
                    <div>Pixels from left:{' '}
                        <input type="text"
                                ref="bg-left"
                                value={this.props.backgroundImage.left}
                                onChange={
                        _.partial(this.changeBackgroundSetting, "left")} />
                    </div>
                    <div>Pixels from bottom:{' '}
                        <input type="text"
                                ref="bg-bottom"
                                value={this.props.backgroundImage.bottom}
                                onChange={
                        _.partial(this.changeBackgroundSetting, "bottom")} />
                    </div>
                    <div>Image scale:{' '}
                        <input type="text"
                                ref="bg-scale"
                                value={this.props.backgroundImage.scale}
                                onChange={
                        _.partial(this.changeBackgroundSetting, "scale")} />
                    </div>
                </div>}
            </div>
            <div className="misc-settings">
                <div>
                    <label>
                        {' '}Show protractor:{' '}
                        <input type="checkbox"
                            checked={this.props.showProtractor}
                            onChange={this.toggleShowProtractor} />
                    </label>
                </div>
                <div>
                    <label>
                        {' '}Show ruler:{' '}
                        <input type="checkbox"
                            checked={this.props.showRuler}
                            onChange={this.toggleShowRuler} />
                    </label>
                </div>
                {this.props.showRuler && <div>
                    <div>
                        <label>
                            {' '}Ruler label:{' '}
                            <select
                                onChange={this.changeRulerLabel}
                                value={this.props.rulerLabel} >
                                    <option value="">None</option>
                                    <optgroup label="Metric">
                                        {this.renderLabelChoices([
                                            ["milimeters", "mm"],
                                            ["centimeters", "cm"],
                                            ["meters", "m"],
                                            ["kilometers", "km"]
                                        ])}
                                    </optgroup>
                                    <optgroup label="Imperial">
                                        {this.renderLabelChoices([
                                            ["inches", "in"],
                                            ["feet", "ft"],
                                            ["yards", "yd"],
                                            ["miles", "mi"]
                                        ])}
                                    </optgroup>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            {' '}Ruler ticks:{' '}
                            <select
                                onChange={this.changeRulerTicks}
                                value={this.props.rulerTicks} >
                                    {_.map([1, 2, 4, 8, 10, 16], function(n) {
                                        return <option value={n}>{n}</option>;
                                    })}
                            </select>
                        </label>
                    </div>
                </div>}
            </div>
        </div>;
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            return <option value={nameAndValue[1]}>{nameAndValue[0]}</option>;
        });
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
        var minTicks = settings.minTicks;
        var maxTicks = settings.maxTicks;

        if (! _.isFinite(step)) {
            return name + " must be a valid number";
        }
        var nSteps = numSteps(range, step);
        if (nSteps < minTicks) {
            return name + " is too large, there must be at least " +
               minTicks + " ticks.";
        }
        if (nSteps > maxTicks) {
            return name + " is too small, there can be at most " +
               maxTicks + " ticks.";
        }
        return true;
    },

    validSnapStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Snap step",
            minTicks: 5,
            maxTicks: 60
        });
    },

    validGridStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Grid step",
            minTicks: 3,
            maxTicks: 60
        });
    },

    validStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Step",
            minTicks: 3,
            maxTicks: 20
        });
    },

    validateGraphSettings: function(range, step, gridStep, snapStep) {
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
        var goodSnapStep = _.every(snapStep, function(snapStep, i) {
            msg = self.validSnapStep(snapStep, range[i]);
            return msg === true;
        });
        if (!goodSnapStep) {
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

    changeRange: function(i, values) {
        var ranges = this.state.rangeTextbox.slice();
        ranges[i] = values;
        var step = this.state.stepTextbox.slice();
        var gridStep = this.state.gridStepTextbox.slice();
        var snapStep = this.state.snapStepTextbox.slice();
        var scale = Util.scaleFromExtent(ranges[i], this.props.box[i]);
        if (this.validRange(ranges[i]) === true) {
            step[i] = Util.tickStepFromExtent(
                    ranges[i], this.props.box[i]);
            gridStep[i] = Util.gridStepFromTickStep(step[i], scale);
            snapStep[i] = gridStep[i] / 2;
        }
        this.setState({
            stepTextbox: step,
            gridStepTextbox: gridStep,
            snapStepTextbox: snapStep,
            rangeTextbox: ranges
        }, this.changeGraph);
    },

    changeStep: function(step) {
        this.setState({ stepTextbox: step }, this.changeGraph);
    },

    changeSnapStep: function(snapStep) {
        this.setState({ snapStepTextbox: snapStep },
                this.changeGraph);
    },

    changeGridStep: function(gridStep) {
        this.setState({
            gridStepTextbox: gridStep,
            snapStepTextbox: _.map(gridStep, function(step) {
                return step / 2;
            })
        }, this.changeGraph);
    },

    changeGraph: function() {
        var labels = this.state.labelsTextbox;
        var range = _.map(this.state.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        var step = _.map(this.state.stepTextbox, Number);
        var gridStep = this.state.gridStepTextbox;
        var snapStep = this.state.snapStepTextbox;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(jack): Refactor this to not be confusing
        var validationResult = this.validateGraphSettings(range, step,
                gridStep, snapStep);

        if (validationResult === true) {  // either true or a string
            this.change({
                valid: true,
                labels: labels,
                range: range,
                step: step,
                gridStep: gridStep,
                snapStep: snapStep
            });
        } else {
            this.change({
                valid: validationResult  // a string message, not false
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
        this.change({ backgroundImage: image });
    },

    // TODO(jack): Make these PropCheckboxes or something
    toggleShowProtractor: function() {
        this.change({showProtractor: !this.props.showProtractor});
    },

    toggleShowRuler: function() {
        this.change({showRuler: !this.props.showRuler});
    },

    // TODO(jack): Make either a wrapper for standard events to work
    // with this.change, or make these use some TextInput/NumberInput box
    changeRulerLabel: function(e) {
        this.change({rulerLabel: e.target.value});
    },

    changeRulerTicks: function(e) {
        this.change({rulerTicks: +e.target.value});
    }
});

module.exports = GraphSettings;

