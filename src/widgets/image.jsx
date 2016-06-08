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

var defaultBoxSize = 400;
var defaultRange = [0, 10];
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
};

var ImageWidget = React.createClass({
    propTypes: {
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
            title: "",
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: [],
            alt: "",
            caption: "",
        };
    },

    render: function() {
        var image;
        var alt;
        var titleAndCaption;
        var {apiOptions} = this.props;

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
                        preloader={apiOptions ?
                            apiOptions.imagePreloader : null}
                        extraGraphie={{
                            box: this.props.box,
                            range: this.props.range,
                            labels: this.props.labels,
                        }}
                        trackInteraction={this.props.trackInteraction}
                        zoomToFullSizeOnMobile={this.props.apiOptions &&
                            this.props.apiOptions.xomManatee}
            />;
        }

        if (this.props.alt) {
            alt = <span className="perseus-sr-only">
                <Renderer
                    content={this.props.alt}
                    apiOptions={this.props.apiOptions}
                />
            </span>;
        }

        if (this.props.title || this.props.caption) {
            let title = this.props.title;

            // Bold the title, and make it the first sentence of the caption.
            if (title) {
                // We add a period to separate the title from the caption (if
                // it exists), unless the title already ends with a punctuation
                // symbol (whitespace ignored). Copied from webapp's
                // tutorial-shared-package/components/content-description.jsx
                if (this.props.caption && !/[.?!"']\s*$/.test(title)) {
                    title += ".";
                }

                title = `**${title}** `;
            }

            const className = classNames({
                "perseus-image-caption": true,
                "has-title": !!title,
            });

            titleAndCaption = <div className={className}>
                <Renderer
                    content={title + this.props.caption}
                    apiOptions={this.props.apiOptions}
                />
            </div>;
        }

        return <div className="perseus-image-widget">
            {image}
            {alt}
            {titleAndCaption}
        </div>;
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
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    displayName: "Image",
    widget: ImageWidget,
};
