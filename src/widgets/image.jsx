var React = require("react");
var _ = require("underscore");

var Util = require("../util.js");

var BlurInput    = require("react-components/blur-input.js");
var Editor       = require("../editor.jsx");
var InfoTip      = require("react-components/info-tip.js");
var Renderer     = require("../renderer.jsx");

var Changeable    = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var RangeInput   = require("../components/range-input.jsx");
var SvgImage     = require("../components/svg-image.jsx");

var defaultBoxSize = 400;
var defaultRange = [0, 10];
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0
};

/**
 * Alignment option for captions, relative to specified coordinates.
 */
var captionAlignments = [
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
    mixins: [Changeable],

    propTypes: {
        title: React.PropTypes.string,
        box: React.PropTypes.arrayOf(React.PropTypes.number),

        // TODO(alex): Rename to something else, e.g. "image", perhaps flatten
        backgroundImage: React.PropTypes.shape({
            url: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number
        }),

        // TODO(alex): Convert uses of this widget's labeling functionality to
        // SvgImage wherever possible (almost certainly requires a backfill)
        labels: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.string,
                coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
                alignment: React.PropTypes.string
            })
        ),
        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number)
        ),

        alt: React.PropTypes.string,
        caption: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            title: "",
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: [],
            alt: "",
            caption: ""
        };
    },

    render: function() {
        var title;
        var image;
        var alt;
        var caption;

        if (this.props.title) {
            title = <div className="perseus-image-title">
                <Renderer
                    content={this.props.title}
                    apiOptions={this.props.apiOptions} />
            </div>;
        }

        var backgroundImage = this.props.backgroundImage;

        if (backgroundImage.url) {
            image = <SvgImage
                        src={backgroundImage.url}
                        alt={
                            /* alt text is formatted in a sr-only
                               div next to the image, so we make
                               this empty here.
                               If there is no alt text at all,
                               we don't put an alt attribute on
                               the image, so that screen readers
                               know there's something they can't
                               read there :(.
                               NOTE: React <=0.13 (maybe later)
                               has a bug where it won't ever
                               remove an attribute, so if this
                               alt node is ever defined it's
                               not removed. This is sort of
                               dangerous, but we usually re-key
                               new renderers so that they're
                               rendered from scratch anyways,
                               so this shouldn't be a problem
                               in practice right now, although
                               it will exhibit weird behaviour
                               while editing. */
                            this.props.alt ? "" : undefined
                        }
                        width={backgroundImage.width}
                        height={backgroundImage.height}
                        extraGraphie={{
                            box: this.props.box,
                            range: this.props.range,
                            labels: this.props.labels,
                        }} />;
        }

        if (this.props.alt) {
            alt = <span className="perseus-sr-only">
                <Renderer
                    content={this.props.alt}
                    apiOptions={this.props.apiOptions} />
            </span>;
        }

        if (this.props.caption) {
            caption = <div className="perseus-image-caption">
                <Renderer content={this.props.caption} />
            </div>;
        }

        return <div className="perseus-image-widget">
            {title}
            {image}
            {alt}
            {caption}
        </div>;
    },

    getUserInput: function() {
        return null;
    },

    simpleValidate: function(rubric) {
        return ImageWidget.validate(this.getUserInput(), rubric);
    },

    focus: $.noop
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
    mixins: [Changeable, EditorJsonify],

    componentDidMount: function() {
        // defer this because it can call a change handler synchronously
        _.defer(() => {
            var url = this.props.backgroundImage.url;
            this.onUrlChange(url, true);
        });
    },

    getDefaultProps: function() {
        return {
            title: "",
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: [],
            alt: "",
            caption: "",
        };
    },

    getInitialState: function() {
        return {
            showAdvancedSettings:
                this.props.title.length > 0 || this.props.labels.length > 0,
        };
    },

    render: function() {
        var backgroundImage = this.props.backgroundImage;

        var imageSettings = <div className="image-settings">
            <div>
                <label>
                    <div>
                        Alt text:
                        <InfoTip>
                            This is important for screenreaders.
                            The content of this alt text will be
                            formatted as markdown (tables, emphasis,
                            etc. are supported).
                        </InfoTip>
                    </div>
                    <Editor
                        content={this.props.alt}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("alt", props.content);
                            }
                        }}
                        widgetEnabled={false} />
                </label>
            </div>
            <div>
                <label>
                    <div>Caption:</div>
                    <Editor
                        content={this.props.caption}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("caption", props.content);
                            }
                        }}
                        widgetEnabled={false} />
                </label>
            </div>
        </div>;

        var advancedSettings = <div className="graph-settings">
            <div>
                <label>Graphie X range:{' '}
                    <RangeInput
                        value={this.props.range[0]}
                        onChange={_.partial(this.onRangeChange, 0)} />
                </label>
            </div>
            <div>
                <label>Graphie Y range:{' '}
                    <RangeInput
                        value={this.props.range[1]}
                        onChange={_.partial(this.onRangeChange, 1)} />
                </label>
            </div>
            <div className="add-label">
                <button onClick={this.addLabel}>
                    {' '}Add a label{' '}
                </button>
            </div>
            {this.props.labels.length > 0 &&
                <table className="label-settings">
                    <thead>
                    <tr>
                        <th>Coordinates</th>
                        <th>Content</th>
                        <th>Alignment</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.labels.map(this._renderRowForLabel)}
                    </tbody>
                </table>}
            <div>
                <label>
                    <div>
                        Title:
                        <InfoTip>Appears above the image.</InfoTip>
                    </div>
                    <Editor
                        content={this.props.title}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("title", props.content);
                            }
                        }}
                        widgetEnabled={false} />
                </label>
            </div>
        </div>;

        var showHideAdvancedSettings = <div>
            <a href="#" onClick={this._toggleAdvancedSettings}>
                {this.state.showAdvancedSettings ? "Hide " : "Show "}
                advanced settings
            </a>

            {this.state.showAdvancedSettings && advancedSettings}
        </div>;

        return <div className="perseus-image-editor">
            <label>
                Image url:
                <InfoTip>Paste an image or graphie image URL.</InfoTip>

                <BlurInput
                    value={backgroundImage.url || ''}
                    style={{width: 332}}
                    onChange={url => this.onUrlChange(url, false)} />
            </label>

            {backgroundImage.url && imageSettings}
            {backgroundImage.url && showHideAdvancedSettings}
        </div>;
    },

    _toggleAdvancedSettings: function(e) {
        e.preventDefault();
        this.setState({
            showAdvancedSettings: !this.state.showAdvancedSettings
        });
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
                    {captionAlignments.map(function(alignment, i) {
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

    setUrl: function(url, width, height, silent) {
        // Because this calls into WidgetEditor._handleWidgetChange, which
        // checks for this widget's ref to serialize it.
        //
        // Errors if you switch items before the `Image` from `onUrlChange`
        // loads.
        if (!this.isMounted()) {
            return;
        }

        var image = _.clone(this.props.backgroundImage);
        image.url = url;
        image.width = width;
        image.height = height;
        var box = [image.width, image.height];
        this.props.onChange({
                backgroundImage: image,
                box: box,
            },
            null,
            silent
        );
    },

    // silently load the image when the component mounts
    // silently update url and sizes when the image loads
    // noisily load the image in response to the author changing it
    onUrlChange: function(url, silent) {
        // We update our background image prop after the image loads below. To
        // avoid weirdness when we change to a very slow URL, then a much
        // faster URL, we keep track of the URL we're trying to change to.
        this._leadingUrl = url;

        if (!url) {
            this.setUrl(url, 0, 0, silent);
            return;
        }

        Util.getImageSize(
            url,
            (width, height) => {
                if (this._leadingUrl !== url) {
                    return;
                }

                this.setUrl(url, width, height, true);
            });
    },

    onRangeChange: function(type, newRange) {
        var range = this.props.range.slice();
        range[type] = newRange;
        this.props.onChange({range: range});
    },

    getSaveWarnings: function() {
        var warnings = [];

        if (this.props.backgroundImage.url && !this.props.alt) {
            warnings.push("No alt text");
        }

        return warnings;
    },
});

module.exports = {
    name: "image",
    // This widget's accessibility depends on its contents: if the image has
    // has a background but no alt text, it is not accessible
    accessible: (props) => {
        var bgImage = props.backgroundImage;
        return !(bgImage && bgImage.url && !props.alt);
    },
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    displayName: "Image",
    widget: ImageWidget,
    editor: ImageEditor
};
