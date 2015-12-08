var React        = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var InfoTip       = require("react-components/info-tip");
var NumberInput   = require("../components/number-input.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var RangeInput    = require("../components/range-input.jsx");

var defaultImage = {
    url: null,
    top: 0,
    left: 0
};

var Measurer = React.createClass({
    propTypes: {
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        image: React.PropTypes.shape({
            url: React.PropTypes.string,
            top: React.PropTypes.number,
            left: React.PropTypes.number
        }),
        showProtractor: React.PropTypes.bool,
        protractorX: React.PropTypes.number,
        protractorY: React.PropTypes.number,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number,
        rulerPixels: React.PropTypes.number,
        rulerLength: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            box: [480, 480],
            image: {},
            showProtractor: true,
            protractorX: 7.5,
            protractorY: 0.5,
            showRuler: false,
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
        var image = _.extend({}, defaultImage, this.props.image);
        return <div
                className={
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad"
                }
                style={{width: this.props.box[0], height: this.props.box[1]}}>
            {image.url &&
                <img
                    src={image.url}
                    style={{
                        top: image.top,
                        left: image.left
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
                "box", "showProtractor", "showRuler", "rulerLabel",
                "rulerTicks", "rulerPixels", "rulerLength"
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
        var graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
        $(graphieDiv).empty();
        var graphie = this.graphie = KhanUtil.createGraphie(graphieDiv);

        var scale = [40, 40];
        var range = [
            [0, this.props.box[0] / scale[0]],
            [0, this.props.box[1] / scale[1]]
        ];
        graphie.init({
            range: range,
            scale: scale
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
                    (range[0][0] + range[0][1]) / 2,
                    (range[1][0] + range[1][1]) / 2
                ],
                label: this.props.rulerLabel,
                pixelsPerUnit: this.props.rulerPixels,
                ticksPerUnit: this.props.rulerTicks,
                units: this.props.rulerLength
            });
        }
    },

    getUserInput: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        // TODO(joel) - I don't understand how this is useful!
        return Measurer.validate(this.getUserInput(), rubric);
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
    mixins: [Changeable, EditorJsonify],
    className: "perseus-widget-measurer",

    propTypes: {
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        image: React.PropTypes.shape({
            url: React.PropTypes.string,
            top: React.PropTypes.number,
            left: React.PropTypes.number
        }),
        showProtractor: React.PropTypes.bool,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number,
        rulerPixels: React.PropTypes.number,
        rulerLength: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            box: [480, 480],
            image: {},
            showProtractor: true,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10
        };
    },

    render: function() {
        var image = _.extend({}, defaultImage, this.props.image);

        return <div className="perseus-widget-measurer">
            <div>Image displayed under protractor and/or ruler:</div>
            <div>URL:{' '}
                <input type="text"
                        className="perseus-widget-measurer-url"
                        ref="image-url"
                        defaultValue={image.url}
                        onChange={this._changeUrl} />
            <InfoTip>
                <p>Create an image in graphie, or use the "Add image" function
                to create a background.</p>
            </InfoTip>
            </div>
            {image.url && <div className="perseus-widget-row">
                <label className="perseus-widget-left-col">
                    Pixels from top:
                    {" "}
                    <NumberInput
                        placeholder={0}
                        onChange={this._changeTop}
                        value={image.top}
                        useArrowKeys={true} />
                </label>
                <label className="perseus-widget-right-col">
                    Pixels from left:
                    {" "}
                    <NumberInput
                        placeholder={0}
                        onChange={this._changeLeft}
                        value={image.left}
                        useArrowKeys={true} />
                </label>
            </div>}
            <div>Containing area [width, height]:{' '}
                <RangeInput
                    onChange={this.change("box")}
                    value={this.props.box}
                    useArrowKeys={true} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="Show ruler"
                        showRuler={this.props.showRuler}
                        onChange={this.props.onChange} />
                </div>
                <div className="perseus-widget-right-col">
                    <PropCheckBox label="Show protractor"
                        showProtractor={this.props.showProtractor}
                        onChange={this.props.onChange} />
                </div>
            </div>
            {this.props.showRuler && <div>
            <div>
                <label>
                    {' '}Ruler label:{' '}
                    <select
                        onChange={(e) =>
                            this.change("rulerLabel", e.target.value)}
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
                        onChange={(e) =>
                            this.change("rulerTicks", +e.target.value)}
                        value={this.props.rulerTicks} >
                            {_.map([1, 2, 4, 8, 10, 16], function(n) {
                                return <option key={n} value={n}>{n}</option>;
                            })}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Ruler pixels per unit:
                    {" "}
                    <NumberInput
                        placeholder={40}
                        onChange={this.change("rulerPixels")}
                        value={this.props.rulerPixels}
                        useArrowKeys={true} />
                </label>
            </div>
            <div>
                <label>
                    Ruler length in units:
                    {" "}
                    <NumberInput
                        placeholder={10}
                        onChange={this.change("rulerLength")}
                        value={this.props.rulerLength}
                        useArrowKeys={true} />
                </label>
            </div>
            </div>}
        </div>;
    },

    _changeUrl: function(e) {
        this._changeImage("url", e.target.value);
    },

    _changeTop: function(newTop) {
        this._changeImage("top", newTop);
    },

    _changeLeft: function(newLeft) {
        this._changeImage("left", newLeft);
    },

    _changeImage: function(subProp, newValue) {
        var image = _.clone(this.props.image);
        image[subProp] = newValue;
        this.change("image", image);
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            var [name, value] = nameAndValue;
            return <option key={value} value={value}>{name}</option>;
        });
    }
});

propUpgrades = {
    1: (v0props) => {
        var v1props = _(v0props).chain()
            .omit("imageUrl", "imageTop", "imageLeft")
            .extend({
                image: {
                    url: v0props.imageUrl,
                    top: v0props.imageTop,
                    left: v0props.imageLeft
                }
            })
            .value();
        return v1props;
    }
};

module.exports = {
    name: "measurer",
    displayName: "Measurer",
    widget: Measurer,
    editor: MeasurerEditor,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades
};
