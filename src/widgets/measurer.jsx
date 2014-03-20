/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");

var InfoTip =       require("../components/info-tip.jsx");
var NumberInput =   require("../components/number-input.jsx");
var Widgets =       require("../widgets.js");

var Measurer = React.createClass({
    getDefaultProps: function() {
        return {
            width: 480,
            height: 480,
            imageUrl: null,
            imageTop: 0,
            imageLeft: 0,
            showProtractor: true,
            protractorX: 7.5,
            protractorY: 0.5,
            showRuler: false,
            rulerX: 6.0,
            rulerY: 6.0,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10
        };
    },

    getInitialState: function() {
        return {};
    },

    render: function() {
        return <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad"
                }
                style={{width: this.props.width, height: this.props.height}}>
            {this.props.imageUrl &&
                <img
                    src={this.props.imageUrl}
                    style={{
                        top: this.props.imageTop + "px",
                        left: this.props.imageLeft + "px"
                    }} />
            }
            <div className="graphie" ref="graphieDiv" />
        </div>;
    },

    componentDidMount: function() {
        this.setupGraphie();
    },

    componentDidUpdate: function(prevProps) {
        var shouldSetupGraphie = _.any([
                "showProtractor", "showRuler", "rulerLabel", "rulerTicks",
                "rulerPixels", "rulerLength"
            ],
            function(prop) {
                return prevProps[prop] !== this.props[prop];
            },
            this
        );

        if (shouldSetupGraphie) {
            this.setupGraphie();
        }
    },

    setupGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = this.graphie = KhanUtil.createGraphie(graphieDiv);

        graphie.init({
            range: [[0, this.props.width / 40], [0, this.props.height / 40]]
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            this.protractor = graphie.protractor([
                this.props.protractorX,
                this.props.protractorY
            ]);
        }

        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            this.ruler = graphie.ruler({
                center: [
                    this.props.rulerX,
                    this.props.rulerY
                ],
                label: this.props.rulerLabel,
                pixelsPerUnit: this.props.rulerPixels,
                ticksPerUnit: this.props.rulerTicks,
                units: this.props.rulerLength
            });
        }
    },

    toJSON: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Measurer.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(Measurer, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null
        };
    }
});


var MeasurerEditor = React.createClass({
    className: "perseus-widget-measurer",

    getDefaultProps: function() {
        return {
            imageUrl: null,
            imageTop: 0,
            imageLeft: 0,
            showProtractor: true,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10
        };
    },

    render: function() {
        return <div className="perseus-widget-measurer">
            <div>Image displayed under protractor and/or ruler:</div>
            <div>URL:{' '}
                <input type="text"
                        className="perseus-widget-measurer-url"
                        ref="image-url"
                        defaultValue={this.props.imageUrl}
                        onKeyPress={this.changeImageUrl}
                        onBlur={this.changeImageUrl} />
            <InfoTip>
                <p>Create an image in graphie, or use the "Add image" function
                to create a background.</p>
            </InfoTip>
            </div>
            {this.props.imageUrl && <div>
                <div>Pixels from top:{' '}
                    <NumberInput
                        allowEmpty={false}
                        onChange={_.partial(this.changeSetting, "imageTop")}
                        value={this.props.imageTop} />
                </div>
                <div>Pixels from left:{' '}
                    <NumberInput
                        allowEmpty={false}
                        onChange={_.partial(this.changeSetting, "imageLeft")}
                        value={this.props.imageLeft} />
                </div>
            </div>}
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
                        onChange={_.partial(this.changeSetting, "rulerTicks")}
                        value={this.props.rulerTicks} >
                            {_.map([1, 2, 4, 8, 10, 16], function(n) {
                                return <option value={n}>{n}</option>;
                            })}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    {' '}Ruler pixels per unit:{' '}
                    <NumberInput
                        allowEmpty={false}
                        onChange={_.partial(this.changeSetting, "rulerPixels")}
                        value={this.props.rulerPixels} />
                </label>
            </div>
            <div>
                <label>
                    {' '}Ruler length in units:{' '}
                    <NumberInput
                        allowEmpty={false}
                        onChange={_.partial(this.changeSetting, "rulerLength")}
                        value={this.props.rulerLength} />
                </label>
            </div>
            </div>}
        </div>;
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            return <option value={nameAndValue[1]}>{nameAndValue[0]}</option>;
        });
    },

    changeImageUrl: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this.props.onChange({
            imageUrl: this.refs["image-url"].getDOMNode().value
        });
    },

    changeRulerLabel: function(e) {
        this.props.onChange({rulerLabel: e.target.value});
    },

    changeSetting: function(type, e) {
        var newProps = {};
        newProps[type] = e.target ? +e.target.value : e;
        this.props.onChange(newProps);
    },

    toggleShowProtractor: function() {
        this.props.onChange({showProtractor: !this.props.showProtractor});
    },

    toggleShowRuler: function() {
        this.props.onChange({showRuler: !this.props.showRuler});
    },

    toJSON: function() {
        return _.pick(this.props, "imageUrl", "imageTop", "imageLeft",
            "showProtractor", "showRuler", "rulerLabel", "rulerTicks",
            "rulerPixels", "rulerLength");
    }
});

Widgets.register("measurer", Measurer);
Widgets.register("measurer-editor", MeasurerEditor);

// This widget was originally called "Protractor"
Widgets.register("protractor", Measurer);
Widgets.register("protractor-editor", MeasurerEditor);

})(Perseus);
