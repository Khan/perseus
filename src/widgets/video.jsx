/**
 * This is a video widget for embedding videos in articles.
 */

var React = require("react");
var _ = require("underscore");

var BlurInput = require("react-components/blur-input.js");
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var FixedToResponsive = require("../components/fixed-to-responsive.jsx");
var InfoTip = require("react-components/info-tip.js");

// Current default is 720p, based on the typical videos we upload currently
var DEFAULT_WIDTH = 1280;
var DEFAULT_HEIGHT = 720;

var KA_VIDEO_URL = /khanacademy\.org\/.*\/v\/(.*)$/;
var KA_EMBED = "https://{hostname}/embed_video?slug={slug}" +
               "&internal_video_only=1";
var IS_URL = /^https?:\/\//;
var IS_KA_SITE = /khanacademy\.org/;


/**
 * Video renderer.
 */
var Video = React.createClass({

    propTypes: {
        alignment: React.PropTypes.string,
        location: React.PropTypes.string,
    },

    mixins: [Changeable],

    simpleValidate: function(rubric) {
        return Video.validate(null, rubric);
    },

    render: function() {
        var location = this.props.location;
        if (!location) {
            return <div/>;
        }

        var url;

        if (IS_URL.test(location)) {
            url = location;
        } else {
            url = KA_EMBED.replace("{slug}", location);
            var currentHostname = document.location.hostname;
            var embedHostname = "www.khanacademy.org";
            if (IS_KA_SITE.test(currentHostname)) {
                embedHostname = currentHostname;
            }
            url = url.replace("{hostname}", embedHostname);
        }

        return <FixedToResponsive // @Nolint this is fine, the linter is wrong
            width={DEFAULT_WIDTH}
            height={DEFAULT_HEIGHT}
            // The key is here for the benefit of the editor, to ensure that
            // any changes cause a re-rendering of the frame.
            key={location + this.props.alignment}
        >
            <iframe
                className="perseus-video-widget"
                sandbox="allow-same-origin allow-scripts"
                width={DEFAULT_WIDTH}
                height={DEFAULT_HEIGHT}
                src={url}
                allowFullScreen={true}
            />
        </FixedToResponsive>;
    },
});


/**
 * This is the widget's grading function.
 * Points for videos are tallied by the embedded video itself, in the case
 * of Khan Academy videos.
 */
_.extend(Video, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

/**
 * Turns Khan Academy URLs into the KA slugs, if possible. Any other URLs are
 * returned unchanged.
 */
function getSlugFromUrl(url) {
    var match = KA_VIDEO_URL.exec(url);
    if (match) {
        return match[1];
    }
    return url;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
var VideoEditor = React.createClass({

    propTypes: {
        location: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            location: "",
        };
    },

    _handleUrlChange: function(url) {
        this.props.onChange({location: getSlugFromUrl(url)});
    },

    render: function() {
        return <div>
            <label>URL or KA Video Slug:{' '}
                <BlurInput
                    name="location"
                    value={this.props.location}
                    style={{width: 290}}
                    onChange={this._handleUrlChange}
                />
                <InfoTip>
                    You can paste any URL here. KA video URLs will
                    be converted to just the slug.
                </InfoTip>
            </label>
        </div>;
    },
});


module.exports = {
    name: "video",
    displayName: "Video",
    defaultAlignment: "block",
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    widget: Video,
    editor: VideoEditor,
};
