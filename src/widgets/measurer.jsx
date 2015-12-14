/** @jsx React.DOM */

var React        = require('react');
var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

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
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = this.graphie = KhanUtil.currentGraph = KhanUtil.createGraphie(graphieDiv);

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
            this.protractor = graphie.Protractor([
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

    toJSON: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Measurer.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
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
    mixins: [Changeable, JsonifyProps],
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
            <div>背景圖片:</div>
            <div>圖片網址:{' '}
                <input type="text"
                        className="perseus-widget-measurer-url"
                        ref="image-url"
                        defaultValue={image.url}
                        onChange={this._changeUrl} />
            <InfoTip>
                <p>插入圖片的連結網址。例如，先將圖片上傳至 http://imgur.com ，再分享其圖片網址 (Direct Link)。 </p>
            </InfoTip>
            </div>
            {image.url && <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <NumberInput label="與上方的間隔畫素:"
                        placeholder={0}
                        onChange={this._changeTop}
                        value={image.top}
                        useArrowKeys={true} />
                </div>
                <div className="perseus-widget-right-col">
                    <NumberInput label="與左方的間隔畫素:"
                        placeholder={0}
                        onChange={this._changeLeft}
                        value={image.left}
                        useArrowKeys={true} />
                </div>
            </div>}
            <div>圖片大小 [寬, 高]:{' '}
                <RangeInput
                    onChange={this.change("box")}
                    value={this.props.box}
                    useArrowKeys={true} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="顯示直尺"
                        showRuler={this.props.showRuler}
                        onChange={this.props.onChange} />
                </div>
                <div className="perseus-widget-right-col">
                    <PropCheckBox label="顯示量角器"
                        showProtractor={this.props.showProtractor}
                        onChange={this.props.onChange} />
                </div>
            </div>
            {this.props.showRuler && <div>
            <div>
                <label>
                    {' '}直尺單位:{' '}
                    <select
                        onChange={(e) =>
                            this.change("rulerLabel", e.target.value)}
                        value={this.props.rulerLabel} >
                            <option value="">無</option>
                            <optgroup label="公制">
                                {this.renderLabelChoices([
                                    ["厘米", "mm"],
                                    ["公分", "cm"],
                                    ["公尺", "m"],
                                    ["公里", "km"]
                                ])}
                            </optgroup>
                            <optgroup label="英制">
                                {this.renderLabelChoices([
                                    ["英吋", "in"],
                                    ["英呎", "ft"],
                                    ["碼", "yd"],
                                    ["英哩", "mi"]
                                ])}
                            </optgroup>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    {' '}每單位分割數:{' '}
                    <select
                        onChange={(e) =>
                            this.change("rulerTicks", +e.target.value)}
                        value={this.props.rulerTicks} >
                            {_.map([1, 2, 4, 8, 10, 16], function(n) {
                                return <option value={n}>{n}</option>;
                            })}
                    </select>
                </label>
            </div>
            <div>
                <NumberInput label="每單位長的畫素:"
                    placeholder={40}
                    onChange={this.change("rulerPixels")}
                    value={this.props.rulerPixels}
                    useArrowKeys={true} />
            </div>
            <div>
                <NumberInput label="直尺長度:"
                    placeholder={10}
                    onChange={this.change("rulerLength")}
                    value={this.props.rulerLength}
                    useArrowKeys={true} />
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
            return <option value={nameAndValue[1]}>{nameAndValue[0]}</option>;
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
    displayName: "Measurer/直尺、量角器",
    widget: Measurer,
    editor: MeasurerEditor,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,
    hidden: false
};
