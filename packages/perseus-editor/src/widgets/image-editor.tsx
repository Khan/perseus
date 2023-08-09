/* eslint-disable jsx-a11y/anchor-is-valid, react/sort-comp */
import {
    components,
    icons,
    Changeable,
    EditorJsonify,
    Util,
} from "@khanacademy/perseus";
import createReactClass from "create-react-class";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";
import Editor from "../editor";

const {InfoTip, InlineIcon, RangeInput} = components;

const defaultBoxSize = 400;
const defaultRange = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

// Match any image URL (including "web+graphie" links) that is hosted by KA.
// We're somewhat generous in our AWS URL matching
// ("ka-<something>.s3.amazonaws.com") so that we don't have to update Perseus
// every time we add a new proxied AWS bucket.
const INTERNALLY_HOSTED_DOMAINS =
    "(" +
    "ka-.*.s3.amazonaws.com|" +
    "(fastly|cdn).kastatic.org|" +
    "khanacademy.org|" +
    "kasandbox.org" +
    ")";
const INTERNALLY_HOSTED_URL_RE = new RegExp(
    "^(https?|web\\+graphie)://[^/]*" + INTERNALLY_HOSTED_DOMAINS,
);

/**
 * Alignment option for captions, relative to specified coordinates.
 */
const captionAlignments = [
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

const ImageEditor: any = createReactClass({
    displayName: "ImageEditor",

    propTypes: {
        ...Changeable.propTypes,
    },

    statics: {
        widgetName: "image",
    },

    componentDidMount: function () {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    },

    componentWillUnmount: function () {
        this._isMounted = false;
    },

    getDefaultProps: function () {
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

    getInitialState: function () {
        return {
            backgroundImageError: "",
        };
    },

    render: function () {
        const backgroundImage = this.props.backgroundImage;

        const imageSettings = (
            <div className="image-settings">
                {!Util.isLabeledSVG(backgroundImage.url) && (
                    <div>
                        <label>
                            <div>Preview:</div>
                            <img
                                alt="Editor preview of image"
                                src={backgroundImage.url}
                                style={{
                                    width: "100%",
                                }}
                            />
                        </label>
                    </div>
                )}
                <div>
                    <label>
                        <div>Dimensions:</div>
                        <p>
                            {backgroundImage.width}x{backgroundImage.height}
                        </p>
                    </label>
                </div>

                <div>
                    <label>
                        <div>
                            Alt text:
                            <InfoTip>
                                This is important for screenreaders. The content
                                of this alt text will be formatted as markdown
                                (tables, emphasis, etc. are supported).
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
            </div>
        );

        const backgroundImageErrorText = (
            <div className="renderer-widget-error">
                {this.state.backgroundImageError}
            </div>
        );

        return (
            <div className="perseus-image-editor">
                <label>
                    Image url:
                    <InfoTip>Paste an image or graphie image URL.</InfoTip>
                    {this.state.backgroundImageError &&
                        backgroundImageErrorText}
                    <BlurInput
                        value={backgroundImage.url || ""}
                        style={{width: 332}}
                        onChange={(url) => this.onUrlChange(url, false)}
                    />
                </label>

                {backgroundImage.url && imageSettings}
            </div>
        );
    },

    _renderRowForLabel: function (label, i) {
        return (
            <tr key={i}>
                <td>
                    <RangeInput
                        value={label.coordinates}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onCoordinateChange.bind(this, i)}
                    />
                </td>
                <td style={{verticalAlign: "bottom", width: "5px"}}>
                    <input
                        type="text"
                        className="graph-settings-axis-label"
                        value={label.content}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onContentChange.bind(this, i)}
                    />
                </td>
                <td>
                    <select
                        className="perseus-widget-dropdown"
                        value={label.alignment}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onAlignmentChange.bind(this, i)}
                    >
                        {captionAlignments.map(function (alignment, i) {
                            return (
                                <option key={"" + i} value={alignment}>
                                    {alignment}
                                </option>
                            );
                        }, this)}
                    </select>
                </td>
                <td>
                    <a
                        href="#"
                        className="simple-button orange delete-label"
                        title="Remove this label"
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={this.removeLabel.bind(this, i)}
                    >
                        <InlineIcon {...icons.iconTrash} />
                    </a>
                </td>
            </tr>
        );
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    removeLabel: function (labelIndex, e) {
        e.preventDefault();
        const labels = _(this.props.labels).clone();
        labels.splice(labelIndex, 1);
        this.props.onChange({labels: labels});
    },

    onCoordinateChange: function (labelIndex, newCoordinates) {
        const labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            coordinates: newCoordinates,
        });
        this.props.onChange({labels: labels});
    },

    onContentChange: function (labelIndex, e) {
        const newContent = e.target.value;
        const labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            content: newContent,
        });
        this.props.onChange({labels: labels});
    },

    onAlignmentChange: function (labelIndex, e) {
        const newAlignment = e.target.value;
        const labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            alignment: newAlignment,
        });
        this.props.onChange({labels: labels});
    },

    setUrl: function (url, width, height, silent) {
        // Because this calls into WidgetEditor._handleWidgetChange, which
        // checks for this widget's ref to serialize it.
        //
        // Errors if you switch items before the `Image` from `onUrlChange`
        // loads.
        if (!this._isMounted) {
            return;
        }

        const image = _.clone(this.props.backgroundImage);
        image.url = url;
        image.width = width;
        image.height = height;
        const box = [image.width, image.height];
        this.props.onChange(
            {
                backgroundImage: image,
                box: box,
            },
            null,
            silent,
        );
    },

    // silently load the image when the component mounts
    // silently update url and sizes when the image loads
    // noisily load the image in response to the author changing it
    onUrlChange: async function (
        url: string | undefined | null,
        silent: boolean,
    ) {
        // Check if we've been passed something that looks like a URL
        if (!url) {
            this.setUrl(url, 0, 0, silent);
            return;
        }

        // All article content must be KA-owned!
        if (!INTERNALLY_HOSTED_URL_RE.test(url)) {
            this.setState({
                backgroundImageError:
                    "Images must be from sites hosted by Khan Academy. " +
                    "Please input a Khan Academy-owned address, or use the " +
                    "Add Image tool to rehost an existing image",
            });
            return;
        }

        // Clear previous errors
        this.setState({backgroundImageError: ""});

        try {
            const size = await Util.getImageSizeModern(url);
            this.setUrl(url, size[0], size[1], true);
        } catch (error) {
            this.setState({
                backgroundImageError: `There was an error loading the image URL: ${JSON.stringify(
                    error,
                    null,
                    2,
                )}`,
            });
        }
    },

    onRangeChange: function (type, newRange) {
        const range = this.props.range.slice();
        range[type] = newRange;
        this.props.onChange({range: range});
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

export default ImageEditor;
