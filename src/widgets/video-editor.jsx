/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const InfoTip = require("../components/info-tip.jsx");
const BlurInput = require("react-components/blur-input.jsx");

const KA_VIDEO_URL = /khanacademy\.org\/.*\/v\/(.*)$/;

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
const VideoEditor = React.createClass({

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

module.exports = VideoEditor;
