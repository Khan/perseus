/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

// TODO(kevindangoor) fix these lint errors
/*eslint-disable react/sort-comp, react/jsx-indent-props, react/prop-types,
    react/jsx-closing-bracket-location
*/

var classNames = require("classnames");
var React = require("react");
var _ = require("underscore");

var ApiOptions   = require("../perseus-api.jsx").Options;
var Renderer     = require("../renderer.jsx");

var Changeable    = require("../mixins/changeable.jsx");

var SvgImage     = require("../components/svg-image.jsx");

const { baseUnitPx, negativePhoneMargin } = require("../styles/constants.js");

var defaultBoxSize = 400;
var defaultRange = [0, 10];
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
};
const supportedAlignments = ["block", "float-left", "float-right",
    "full-width"];
const DEFAULT_ALIGNMENT = "block";

function isImageProbablyPhotograph(imageUrl) {
    // TODO(david): Do an inventory to refine this heuristic. For example, what
    //     % of .png images are illustrations?
    return /\.(jpg|jpeg)$/i.test(imageUrl);
}

var ImageWidget = React.createClass({
    propTypes: {
        alignment: React.PropTypes.oneOf(supportedAlignments),
        alt: React.PropTypes.string,
        apiOptions: ApiOptions.propTypes,
        // TODO(alex): Rename to something else, e.g. "image", perhaps flatten
        backgroundImage: React.PropTypes.shape({
            url: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number,
        }),

        box: React.PropTypes.arrayOf(React.PropTypes.number),

        caption: React.PropTypes.string,

        // TODO(alex): Convert uses of this widget's labeling functionality to
        // SvgImage wherever possible (almost certainly requires a backfill)
        labels: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.string,
                coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
                alignment: React.PropTypes.string,
            })
        ),

        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number)
        ),

        title: React.PropTypes.string,
        trackInteraction: React.PropTypes.func.isRequired,
    },

    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            alignment: DEFAULT_ALIGNMENT,
            title: "",
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: [],
            alt: "",
            caption: "",
        };
    },

    componentDidMount: function() {
        // Cache this instead of computing on each render.
        this._viewportHeight = window.innerHeight;
        this._viewportWidth = window.innerWidth;
    },

    render: function() {
        var image;
        var alt;
        var imageWidth;
        var imageHeight;
        var {apiOptions} = this.props;

        var backgroundImage = this.props.backgroundImage;

        if (backgroundImage.url) {
            imageHeight = backgroundImage.height;
            imageWidth = backgroundImage.width;

            if (apiOptions.xomManatee && this._viewportHeight) {
                // Constrain image height to be at most 2/3 viewport height,
                // maintaining aspect ratio.
                const maxImageHeight = 2 / 3 * this._viewportHeight;
                if (imageHeight >= maxImageHeight) {
                    const aspectRatio = imageWidth / imageHeight;
                    imageHeight = maxImageHeight;
                    imageWidth = maxImageHeight * aspectRatio;
                }
            }

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
                        width={imageWidth}
                        height={imageHeight}
                        preloader={apiOptions.imagePreloader}
                        extraGraphie={{
                            box: this.props.box,
                            range: this.props.range,
                            labels: this.props.labels,
                        }}
                        trackInteraction={this.props.trackInteraction}
                        zoomToFullSizeOnMobile={apiOptions.xomManatee}
            />;
        }

        if (this.props.alt) {
            alt = <span className="perseus-sr-only">
                <Renderer
                    content={this.props.alt}
                    apiOptions={apiOptions}
                />
            </span>;
        }

        // As of the XOM Manatee beta, we combine an image's title and caption.
        if (apiOptions.xomManatee) {
            var titleAndCaption;

            if (this.props.title || this.props.caption) {
                let title = this.props.title;

                // Bold the title, and make it the first sentence of the
                // caption.
                if (title) {
                    // We add a period to separate the title from the caption
                    // (if it exists), unless the title already ends with a
                    // punctuation symbol (whitespace ignored). Copied from
                    // webapp: https://github.com/Khan/webapp/blob/6e930637edb65696d0749ea0f7558214aee32b4e/javascript/tutorial-shared-package/components/content-description.jsx#L80
                    // TODO(charlie): Internationalize this check, and the
                    // delimiter that is being inserted.
                    if (this.props.caption && !/[.?!"']\s*$/.test(title)) {
                        title += ".";
                    }

                    title = `**${title}** `;
                }

                const className = classNames({
                    "perseus-image-caption": true,
                    "has-title": !!title,
                });

                // Caption is left-aligned within a container that's centered
                // below the image, with these width constraints:
                // 1. Minimum width = 288px if image is full width, else 0
                // 2. Maximum width = min(400px, content width, image width)
                // The following CSS should do the trick, since CSS precedence
                // is minWidth > maxWidth > width.
                // TODO(david): If caption is only 1 line long, center-align
                //     the text.
                const alignment = this.props.alignment;
                const isImageFullWidth = (
                    alignment === "block" || alignment === "full-width");
                const minWidth = isImageFullWidth ? 288 : 0;
                const maxWidth = imageWidth ? Math.min(400, imageWidth) : 400;
                titleAndCaption = <div className={className}>
                    <div style={{
                        display: "inline-block",
                        marginTop: baseUnitPx,
                        minWidth: minWidth,
                        maxWidth: maxWidth,
                        width: "100%",
                    }}
                    >
                        <Renderer
                            content={title + this.props.caption}
                            apiOptions={apiOptions}
                        />
                    </div>
                </div>;
            }

            // Full-bleed photographs that can fill up the device width.
            let imageContainerStyle = null;
            if (backgroundImage.url &&
                    isImageProbablyPhotograph(backgroundImage.url) &&
                    this._viewportWidth && imageWidth >= this._viewportWidth) {
                imageContainerStyle = {
                    marginLeft: negativePhoneMargin,
                    marginRight: negativePhoneMargin,
                };
            }

            return <div className="perseus-image-widget">
                <div style={imageContainerStyle}>
                    {image}
                </div>
                {alt}
                {titleAndCaption}
            </div>;

        } else {
            var title;
            var caption;

            if (this.props.title) {
                title = <div className="perseus-image-title">
                    <Renderer
                        content={this.props.title}
                        apiOptions={apiOptions}
                    />
                </div>;
            }

            if (this.props.caption) {
                caption = <div className="perseus-image-caption">
                    <Renderer
                        content={this.props.caption}
                        apiOptions={apiOptions}
                    />
                </div>;
            }

            return <div className="perseus-image-widget">
                {title}
                {image}
                {alt}
                {caption}
            </div>;
        }
    },

    getUserInput: function() {
        return null;
    },

    simpleValidate: function(rubric) {
        return ImageWidget.validate(this.getUserInput(), rubric);
    },

    focus: $.noop,
});

_.extend(ImageWidget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
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
    defaultAlignment: DEFAULT_ALIGNMENT,
    supportedAlignments: supportedAlignments,
    displayName: "Image",
    widget: ImageWidget,
};
