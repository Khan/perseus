var React = require("react");
var _ = require("underscore");

var BlurInput    = require("react-components/js/blur-input.jsx");
var InfoTip      = require("react-components/js/info-tip.jsx");

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Graphie      = require("../components/graphie.jsx");
var RangeInput   = require("../components/range-input.jsx");

var defaultBoxSize = 400;
var defaultRange = [0, 10];
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0
};
var maxImageSize = 480;

/**
 * Alignment option for captions, relative to specified coordinates.
 */
var alignments = [
    "center",
    "above",
    "above right",
    "right",
    "below right",
    "below",
    "below left",
    "left",
    "above left"
];

function blankLabel() {
    return {
        content: "",
        coordinates: [0, 0],
        alignment: "center"
    };
}

var ImageWidget = React.createClass({
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number
            )
        ),
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        backgroundImage: React.PropTypes.shape({
            url: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number
        }),
        useBoxSize: React.PropTypes.bool,
        labels: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.string,
                coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
                alignment: React.PropTypes.string
            })
        ),
        allowScratchpad: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: [],
            allowScratchpad: true
        };
    },

    render: function() {
        var image;
        var backgroundImage = this.props.backgroundImage;
        if (backgroundImage.url) {
            var style = {
                width: backgroundImage.width,
                height: backgroundImage.height
            };
            image = <img style={style} src={backgroundImage.url} />;
        }

        var box = this.props.box;

        return <div
                className="graphie-container"
                style={{
                    width: box[0],
                    height: box[1]
                }}>
            {image}
            <Graphie
                ref="graphie"
                box={this.props.box}
                range={this.props.range}
                options={_.pick(this.props, "box", "range", "labels")}
                setup={this.setupGraphie}
                allowScratchpad={this.props.allowScratchpad}>
            </Graphie>
        </div>;
    },

    setupGraphie: function(graphie, options) {
        _.map(options.labels, function(label) {
            graphie.label(label.coordinates, label.content, label.alignment);
        });
    },

    simpleValidate: function(rubric) {
        return ImageWidget.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});

_.extend(ImageWidget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var ImageEditor = React.createClass({
    mixins: [Changeable, JsonifyProps],

    componentDidMount: function() {
        // If URL already provided on page load, should display image
        var url = this.props.backgroundImage.url;
        this.onUrlChange(url);
    },

    getDefaultProps: function() {
        return {
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            useBoxSize: false,
            backgroundImage: defaultBackgroundImage,
            labels: []
        };
    },

    render: function() {
        var imageSettings = <div className="image-settings">
            <div>圖片網址:{' '}
                <BlurInput value={this.props.backgroundImage.url}
                           onChange={this.onUrlChange} />
                <InfoTip>
                    <p>填入圖片的網址。例如，先上傳至 http://imgur.com ，貼上圖片網址 (Direct link)。</p>
                </InfoTip>
            </div>
            <label>
                <input type="checkbox"
                        checked={this.props.useBoxSize}
                        onChange={this.toggleUseBoxSize} />手動調整寬度，寬度上限480
            </label>
            <div>寬度:{' '}
                <BlurInput value={parseInt(this.props.box[0])}
                           onChange={this.onWidthChange} />
                <InfoTip>
                    <p>希望圖片顯示的寬度(px)，若要調整請先勾選"手動調整寬度"</p>
                </InfoTip>
            </div>
        </div>;

        return <div className="perseus-widget-image">
            {imageSettings}

        </div>;
    },

    _renderRowForLabel: function(label, i) {
        return <tr key={i}>
            <td>
                <RangeInput
                    value={label.coordinates}
                    onChange={this.onCoordinateChange.bind(this, i)} />
            </td>
            <td style={{verticalAlign: "bottom", width: "5px"}}>
                <input
                    type="text"
                    className="graph-settings-axis-label"
                    value={label.content}
                    onChange={this.onContentChange.bind(this, i)} />
            </td>
            <td>
                <select
                    className="perseus-widget-dropdown"
                    value={label.alignment}
                    onChange={this.onAlignmentChange.bind(this, i)}>
                    {alignments.map(function(alignment, i) {
                        return <option key={"" + i} value={alignment}>
                            {alignment}
                        </option>;
                    }, this)}
                </select>
            </td>
            <td>
                <a
                    href="#"
                    className="simple-button orange delete-label"
                    title="Remove this label"
                    onClick={this.removeLabel.bind(this, i)}>
                    <span className="icon-trash" />
                </a>
            </td>
        </tr>;
    },

    addLabel: function(e) {
        e.preventDefault();
        var labels = this.props.labels.slice();
        var label = blankLabel();
        labels.push(label);
        this.props.onChange({
            labels: labels,
        });
    },

    removeLabel: function(labelIndex, e) {
        e.preventDefault();
        var labels = _(this.props.labels).clone();
        labels.splice(labelIndex, 1);
        this.props.onChange({labels: labels});
    },

    onCoordinateChange: function(labelIndex, newCoordinates) {
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            coordinates: newCoordinates
        });
        this.props.onChange({labels: labels});
    },

    onContentChange: function(labelIndex, e) {
        var newContent = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            content: newContent
        });
        this.props.onChange({labels: labels});
    },

    onAlignmentChange: function(labelIndex, e) {
        var newAlignment = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            alignment: newAlignment
        });
        this.props.onChange({labels: labels});
    },

    onWidthChange: function(newAlignment) {
        var image = _.clone(this.props.backgroundImage);
        if (this.props.useBoxSize) {
            var w_h_ratio = image.height / image.width;
            image.width = parseInt(newAlignment) > maxImageSize ? maxImageSize:parseInt(newAlignment);
            image.height = Math.round(image.width * w_h_ratio);
        }
        var box = [image.width, image.height];
        this.props.onChange({
            backgroundImage: image,
            box: box,
        });
    },

    toggleUseBoxSize: function() {
        var useBoxSize = !this.props.useBoxSize;
        if (!useBoxSize) {
            this.reloadImage(this.props.backgroundImage.url);
        }
        this.props.onChange({
            useBoxSize: useBoxSize
        });
    },

    setUrl: function(url, width, height) {
        var image = _.clone(this.props.backgroundImage);
        image.url = url;
        image.width = width;
        image.height = height;
        var box = [image.width, image.height];
        this.props.onChange({
            backgroundImage: image,
            box: box,
            useBoxSize: false
        });
    },

    reloadImage: function(url) {
        var img = new Image();
        img.onload = function()  {return this.setUrl(url, img.width, img.height);}.bind(this);
        img.src = url;
    },

    onUrlChange: function(url) {
        if (url) {
            if (this.props.backgroundImage.url != url) {
                this.reloadImage(url);
            }
        } else {
            this.setUrl(url, 0, 0);
        }
    },

    onRangeChange: function(type, newRange) {
        var range = this.props.range.slice();
        range[type] = newRange;
        this.props.onChange({range: range});
    },
});

module.exports = {
    name: "image",
    displayName: "Image/圖片",
    widget: ImageWidget,
    editor: ImageEditor
};
