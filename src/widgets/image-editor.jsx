/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const {iconTrash} = require("../icon-paths.js");
const Util        = require("../util.js");

const Changeable    = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const BlurInput    = require("react-components/blur-input.jsx");
const Editor       = require("../editor.jsx");
const InfoTip      = require("../components/info-tip.jsx");
const InlineIcon   = require("../components/inline-icon.jsx");
const RangeInput   = require("../components/range-input.jsx");

const defaultBoxSize = 400;
const defaultRange = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
};

// Match any image URL (including "web+graphie" links) that is hosted by KA.
// We're somewhat generous in our AWS URL matching
// ("ka-<something>.s3.amazonaws.com") so that we don't have to update Perseus
// every time we add a new proxied AWS bucket.
const INTERNALLY_HOSTED_DOMAINS = "(" +
    "ka-.*\.s3\.amazonaws\.com|" +
    "(fastly|cdn)\.kastatic\.org|" +
    "khanacademy\.org|" +
    "kasandbox\.org" +
")";
const INTERNALLY_HOSTED_URL_RE = new RegExp(
    "^(https?|web\\+graphie)://[^/]*" + INTERNALLY_HOSTED_DOMAINS);

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
    "above left",
];

function blankLabel() {
    return {
        content: "",
        coordinates: [0, 0],
        alignment: "center",
    };
}

const ImageEditor = React.createClass({
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
            backgroundImageError: "",
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
                        apiOptions={this.props.apiOptions}
                        content={this.props.alt}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("alt", props.content);
                            }
                        }}
                        widgetEnabled={false}
                    />
                </label>
            </div>
            <div>
                <label>
                    <div>Caption:</div>
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={this.props.caption}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("caption", props.content);
                            }
                        }}
                        widgetEnabled={false}
                    />
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
                        apiOptions={this.props.apiOptions}
                        content={this.props.title}
                        onChange={(props) => {
                            if (props.content != null) {
                                this.change("title", props.content);
                            }
                        }}
                        widgetEnabled={false}
                    />
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

        var backgroundImageErrorText = <div className='renderer-widget-error'>
            {this.state.backgroundImageError}
        </div>;

        return <div className="perseus-image-editor">
            <label>
                Image url:
                <InfoTip>Paste an image or graphie image URL.</InfoTip>
                {this.state.backgroundImageError && backgroundImageErrorText}

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
            showAdvancedSettings: !this.state.showAdvancedSettings,
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
                    onClick={this.removeLabel.bind(this, i)}
                >
                    <InlineIcon {...iconTrash} />
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
            coordinates: newCoordinates,
        });
        this.props.onChange({labels: labels});
    },

    onContentChange: function(labelIndex, e) {
        var newContent = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            content: newContent,
        });
        this.props.onChange({labels: labels});
    },

    onAlignmentChange: function(labelIndex, e) {
        var newAlignment = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            alignment: newAlignment,
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
        // All article content must be KA-owned!
        if (!INTERNALLY_HOSTED_URL_RE.test(url)) {
            this.setState({
                backgroundImageError: (
                    'Images must be from sites hosted by Khan Academy. ' +
                    'Please input a Khan Academy-owned address, or use the ' +
                    'Add Image tool to rehost an existing image'),
            });
            return;
        } else {
            this.setState({backgroundImageError: ""});
        }

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

module.exports = ImageEditor;
