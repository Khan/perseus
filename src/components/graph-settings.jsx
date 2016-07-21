/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp, space-unary-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const Changeable  = require("../mixins/changeable.jsx");

const ButtonGroup = require("react-components/button-group.jsx");
const InfoTip = require("../components/info-tip.jsx");
const PropCheckBox = require("../components/prop-check-box.jsx");
const RangeInput = require("../components/range-input.jsx");
const TeX = require("react-components/tex.jsx");
const Util = require("../util.js");
const KhanMath = require("../util/math.js");
const { interactiveSizes } = require("../styles/constants.js");

const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

const GraphSettings = React.createClass({
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
        showTooltips: React.PropTypes.bool,
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
            box: [
                interactiveSizes.defaultBoxSizeSmall,
                interactiveSizes.defaultBoxSizeSmall,
            ],
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
            showTooltips: false,
            rulerLabel: "",
            rulerTicks: 10
        };
    },

    render: function() {
        const scale = [
            KhanMath.roundTo(2,
                Util.scaleFromExtent(this.props.range[0], this.props.box[0])),
            KhanMath.roundTo(2,
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
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="Show tooltips"
                                  showTooltips={this.props.showTooltips}
                                  onChange={this.change} />
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
        const numbers = _.every(range, function(num) {
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
        const { step, range, name, minTicks, maxTicks } = settings;

        if (! _.isFinite(step)) {
            return name + " must be a valid number";
        }
        const nSteps = numSteps(range, step);
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

        const validSize = image.width <= 450 && image.height <= 450;

        if (!validSize) {
            return "Image must be smaller than 450px x 450px.";
        }
        return true;
    },

    validateGraphSettings: function(range, step, gridStep, snapStep, image) {
        const self = this;
        let msg;
        const goodRange = _.every(range, function(range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        const goodStep = _.every(step, function(step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        const goodGridStep = _.every(gridStep, function(gridStep, i) {
            msg = self.validGridStep(gridStep, range[i]);
            return msg === true;
        });
        if (!goodGridStep) {
            return msg;
        }
        const goodSnapStep = _.every(snapStep, function(snapStep, i) {
            msg = self.validSnapStep(snapStep, range[i]);
            return msg === true;
        });
        if (!goodSnapStep) {
            return msg;
        }
        const goodImageSize = this.validBackgroundImageSize(image);
        if (goodImageSize !== true) {
            msg = goodImageSize;
            return msg;
        }
        return true;
    },

    changeLabel: function(i, e) {
        const val = e.target.value;
        const labels = this.state.labelsTextbox.slice();
        labels[i] = val;
        this.setState({ labelsTextbox: labels }, this.changeGraph);
    },

    changeRange: function(i, values) {
        const ranges = this.state.rangeTextbox.slice();
        ranges[i] = values;
        const step = this.state.stepTextbox.slice();
        const gridStep = this.state.gridStepTextbox.slice();
        const snapStep = this.state.snapStepTextbox.slice();
        const scale = Util.scaleFromExtent(ranges[i], this.props.box[i]);
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
        const labels = this.state.labelsTextbox;
        const range = _.map(this.state.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        const step = _.map(this.state.stepTextbox, Number);
        const gridStep = this.state.gridStepTextbox;
        const snapStep = this.state.snapStepTextbox;
        const image = this.state.backgroundImage;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(aria): Refactor this to not be confusing
        const validationResult = this.validateGraphSettings(range, step,
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

        const setUrl = (url, width, height) => {
            const image = _.clone(this.props.backgroundImage);
            image.url = url;
            image.width = width;
            image.height = height;
            this.setState({
                backgroundImage: image
            }, this.changeGraph);
        };

        const url = ReactDOM.findDOMNode(this.refs["bg-url"]).value;
        if (url) {
            Util.getImageSize(url, (width, height) => {
                if (this.isMounted()) {
                    setUrl(url, width, height);
                }
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
