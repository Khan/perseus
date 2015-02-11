var React = require('react');
var _ = require("underscore");

var Changeable  = require("../mixins/changeable.jsx");

var ButtonGroup = require("react-components/button-group.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var NumberInput = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var RangeInput = require("../components/range-input.jsx");
var TeX = require("react-components/tex.jsx");
var Util = require("../util.js");

var defaultBoxSize = 340;
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var GraphSettings = React.createClass({
    mixins: [Changeable],

    propTypes: {
        editableSettings: React.PropTypes.arrayOf(
            React.PropTypes.oneOf(
                ["canvas", "graph", "snap", "image", "measure"])),
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        labels: React.PropTypes.arrayOf(React.PropTypes.string),
        range: React.PropTypes.arrayOf(React.PropTypes.arrayOf(
            React.PropTypes.number)),
        step: React.PropTypes.arrayOf(React.PropTypes.number),
        gridStep: React.PropTypes.arrayOf(React.PropTypes.number),
        snapStep: React.PropTypes.arrayOf(React.PropTypes.number),
        valid: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string
        ]),
        backgroundImage: React.PropTypes.object,
        markings: React.PropTypes.oneOf(["graph", "grid", "none"]),
        showProtractor: React.PropTypes.bool,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number
    },

    getInitialState: function() {
        return {
            labelsTextbox: this.props.labels,
            gridStepTextbox: this.props.gridStep,
            snapStepTextbox: this.props.snapStep,
            stepTextbox: this.props.step,
            rangeTextbox: this.props.range,
            backgroundImage: _.clone(this.props.backgroundImage)
        };
    },

    getDefaultProps: function() {
        return {
            editableSettings: ["graph", "snap", "image", "measure"],
            box: [defaultBoxSize, defaultBoxSize],
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            gridStep: [1, 1],
            snapStep: [1, 1],
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
        var scale = [
            KhanUtil.roundTo(2,
                Util.scaleFromExtent(this.props.range[0], this.props.box[0])),
            KhanUtil.roundTo(2,
                Util.scaleFromExtent(this.props.range[1], this.props.box[1]))];

        return <div>
            {_.contains(this.props.editableSettings, "canvas") &&
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Canvas size (x,y pixels)
                    <RangeInput
                        value={this.props.box}
                        onChange={(box) => { this.change({box: box}); }} />
                </div>
                <div className="perseus-widget-row">
                    Scale (px per div): <TeX>{"(" + scale[0] + ", " +
                        scale[1] + ")"}</TeX>
                </div>
            </div>}

            {_.contains(this.props.editableSettings, "graph") &&
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col"> x Label
                        <input  type="text"
                                className="graph-settings-axis-label"
                                ref="labels-0"
                                onChange={(e) => this.changeLabel(0, e)}
                                value={this.state.labelsTextbox[0]} />
                    </div>
                    <div className="perseus-widget-right-col">y Label
                        <input  type="text"
                                className="graph-settings-axis-label"
                                ref="labels-1"
                                onChange={(e) => this.changeLabel(1, e)}
                                value={this.state.labelsTextbox[1]} />
                    </div>
                </div>

                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        x Range
                        <RangeInput
                            value={this.state.rangeTextbox[0]}
                            onChange={(vals) => this.changeRange(0, vals)} />
                    </div>
                    <div className="perseus-widget-right-col">
                        y Range
                        <RangeInput
                            value={this.state.rangeTextbox[1]}
                            onChange={(vals) => this.changeRange(1, vals)} />
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
                {_.contains(this.props.editableSettings, "snap") &&
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Snap Step
                        <RangeInput value= {this.state.snapStepTextbox}
                                    onChange = {this.changeSnapStep} />
                    </div>
                </div>}
                <div className="perseus-widget-row">
                    <label>Markings:{' '} </label>
                    <ButtonGroup value={this.props.markings}
                        allowEmpty={false}
                        buttons={[
                            {value: "graph", content: "Graph"},
                            {value: "grid", content: "Grid"},
                            {value: "none", content: "None"}]}
                        onChange={this.change("markings")} />
                </div>
            </div>}

            {_.contains(this.props.editableSettings, "image") &&
            <div className="image-settings">
                <div>Background image:</div>
                <div>Url:{' '}
                    <input type="text"
                            className="graph-settings-background-url"
                            ref="bg-url"
                            defaultValue={this.state.backgroundImage.url}
                            onKeyPress={this.changeBackgroundUrl}
                            onBlur={this.changeBackgroundUrl} />
                    <InfoTip>
                        <p>Create an image in graphie, or use the "Add image"
                        function to create a background.</p>
                    </InfoTip>
                </div>
            </div>}

            {_.contains(this.props.editableSettings, "measure") &&
            <div className="misc-settings">
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        <PropCheckBox label="Show ruler"
                            showRuler={this.props.showRuler}
                            onChange={this.change} />
                    </div>
                    <div className="perseus-widget-right-col">
                        <PropCheckBox label="Show protractor"
                            showProtractor={this.props.showProtractor}
                            onChange={this.change} />
                    </div>
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
            </div>}
        </div>;
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            return <option value={nameAndValue[1]}>{nameAndValue[0]}</option>;
        });
    },

    componentDidMount: function() {
        this.changeGraph = _.debounce(this.changeGraph, 300);
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
        var { step, range, name, minTicks, maxTicks } = settings;

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

    validBackgroundImageSize: function(image) {
        // Ignore empty images
        if (!image.url) {
            return true;
        }

        var validSize = image.width <= 450 && image.height <= 450;

        if (!validSize) {
            return "Image must be smaller than 450px x 450px.";
        }
        return true;
    },

    validateGraphSettings: function(range, step, gridStep, snapStep, image) {
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
        var goodImageSize = this.validBackgroundImageSize(image);
        if (goodImageSize !== true) {
            msg = goodImageSize;
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
        var image = this.state.backgroundImage;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(aria): Refactor this to not be confusing
        var validationResult = this.validateGraphSettings(range, step,
                gridStep, snapStep, image);

        if (validationResult === true) {  // either true or a string
            this.change({
                valid: true,
                labels: labels,
                range: range,
                step: step,
                gridStep: gridStep,
                snapStep: snapStep,
                backgroundImage: image
            });
        } else {
            this.change({
                valid: validationResult  // a string message, not false
            });
        }
    },

    changeBackgroundUrl: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.key !== "Enter") {
            return;
        }

        var setUrl = (url, width, height) => {
            var image = _.clone(this.props.backgroundImage);
            image.url = url;
            image.width = width;
            image.height = height;
            this.setState({
                backgroundImage: image
            }, this.changeGraph);
        };

        var url = this.refs["bg-url"].getDOMNode().value;
        if (url) {
            Util.getImageSize(url, (width, height) => {
                setUrl(url, width, height);
            });
        } else {
            setUrl(null, 0, 0);
        }
    },

    // TODO(aria): Make either a wrapper for standard events to work
    // with this.change, or make these use some TextInput/NumberInput box
    changeRulerLabel: function(e) {
        this.change({rulerLabel: e.target.value});
    },

    changeRulerTicks: function(e) {
        this.change({rulerTicks: +e.target.value});
    }
});

module.exports = GraphSettings;
