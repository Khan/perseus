/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * This is an iframe widget. It is used for rendering an iframe that
 *  then communicates its state via window.postMessage
 * This is useful for embedding arbitrary visualizations/simulations with
 *  completed conditions, such as the mazes and games in Algorithms.
 * It's particularly well suited for embedding our ProcessingJS programs,
 *  but could also be used for embedding viz's hosted elsewhere.
 */

/* globals KA */
var React = require("react");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var updateQueryString = require("../util.js").updateQueryString;


/* This renders the iframe and handles validation via window.postMessage */
var Iframe = React.createClass({

    mixins: [Changeable, WidgetJsonifyDeprecated],

    propTypes: {
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        url: React.PropTypes.string,
        settings: React.PropTypes.array,
        status: React.PropTypes.oneOf(['incomplete', 'incorrect', 'correct']),
        message: React.PropTypes.string,
        allowFullScreen: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            status: "incomplete",
            // optional message
            message: null,
            allowFullScreen: false,
        };
    },
    handleMessageEvent: function(e) {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // It could also contain an optional message
        var data = {};
        try {
            data = JSON.parse(e.originalEvent.data);
        } catch (err) {
            return;
        }

        if (_.isUndefined(data.testsPassed)) {
            return;
        }

        var status = (data.testsPassed ? "correct" : "incorrect");
        this.change({
            status: status,
            message: data.message
        });
    },
    componentDidMount: function() {
        $(window).on("message", this.handleMessageEvent);
    },

    componentWillUnmount: function() {
        $(window).off("message", this.handleMessageEvent);
    },

    render: function() {
        var style = {
            width: this.props.width,
            height: this.props.height
        };
        var url = this.props.url;

        // If the URL doesnt start with http, it must be a program ID
        if (url && url.length && url.indexOf("http") !== 0) {
            url = "https://www.khanacademy.org/computer-programming/program/" + url +
                    "/embedded?buttons=no&embed=yes&editor=no&author=no";
            url = updateQueryString(url, "width", this.props.width);
            url = updateQueryString(url, "height", this.props.height);
            // Origin is used by output.js in deciding to send messages
            url = updateQueryString(url, "origin", window.location.origin);
        }

        // Zero-rated users may incur data charges for viewing non-zero.ka.org
        // resources, so we need to warn them first.
        if (typeof KA !== "undefined" && KA.isZeroRated) {
            if (url.match(/https?:\/\/[^\/]*khanacademy.org/)) {
                // Internal URLs should be rewritten to point at zero.ka.org,
                // unless they already do so
                if (!url.match(/zero.khanacademy.org/)) {
                    url = url.replace('khanacademy.org',
                                      'zero.khanacademy.org');
                }
            } else {
                // External URLs should be rewritten to point at a warning
                // interstitial
                url = ('/zero/external-link?context=iframe&url=' +
                            encodeURIComponent(url));
            }
        }

        // Turn array of [{name: "", value: ""}] into object
        if (this.props.settings) {
            var settings = {};
            _.each(this.props.settings, function(setting) {
                if (setting.name && setting.value) {
                    settings[setting.name] = setting.value;
                }
            });
            // This becomes available to programs as Program.settings()
            url = updateQueryString(url, "settings", JSON.stringify(settings));
        }

        // We sandbox the iframe so that we whitelist only the functionality
        //  that we need. This makes it a bit safer in case some content
        //  creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return <iframe sandbox="allow-same-origin allow-scripts"
                       style={style} src={url}
                       allowFullScreen={this.props.allowFullScreen} />;
    },

    simpleValidate: function(rubric) {
        return Iframe.validate(this.getUserInput(), rubric);
    }
});


/**
 * This is the widget's grading function
 */
_.extend(Iframe, {
    validate: function(state, rubric) {
        // The iframe can tell us whether it's correct or incorrect,
        //  and pass an optional message
        if (state.status === "correct") {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: state.message || null
            };
        } else if (state.status === "incorrect") {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: state.message || null
            };
        } else {
            return {
                type: "invalid",
                message: "Keep going, you're not there yet!"
            };
        }
    }
});

module.exports = {
    name: "iframe",
    displayName: "Iframe",
    widget: Iframe,
    // Let's not expose it to all content creators yet
    hidden: true,
};
