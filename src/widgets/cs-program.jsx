/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * This widget is for embedding Khan Academy CS programs.
 */

var React = require("react");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var updateQueryString = require("../util.js").updateQueryString;

var PADDING_WIDTH = 2;

var IS_KA_SITE = /khanacademy\.org/;
var KA_EMBED_URL = "https://{hostname}/computer-programming/program/" +
        "{programID}/embedded?embed=yes&author=no";

function getUrlFromProgramID(programID) {
    var url = KA_EMBED_URL.replace("{programID}", programID);
    var currentHostname = document.location.hostname;
    var embedHostname = "www.khanacademy.org";
    if (IS_KA_SITE.test(currentHostname)) {
        embedHostname = currentHostname;
    }
    return url.replace("{hostname}", embedHostname);
}

/* This renders the scratchpad in an iframe and handles validation via
 * window.postMessage */
var CSProgram = React.createClass({

    mixins: [Changeable],

    propTypes: {
        programID: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        settings: React.PropTypes.array,
        showEditor: React.PropTypes.bool,
        showButtons: React.PropTypes.bool,
        status: React.PropTypes.oneOf(['incomplete', 'incorrect', 'correct']),
        message: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            showEditor: false,
            showButtons: false,
            status: "incomplete",
            // optional message
            message: null,
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
        if (!this.props.programID) {
            return <div/>;
        }

        var url = getUrlFromProgramID(this.props.programID);
        var className;
        var style = {
            height: this.props.height
        };

        if (this.props.showEditor) {
            url += "&editor=yes";
            style.width = "100%";
            className = "perseus-scratchpad-editor";
        } else {
            url += "&editor=no";
            style.width = this.props.width + PADDING_WIDTH;
            className = "perseus-scratchpad";
        }

        if (this.props.showButtons) {
            url += "&buttons=yes";
            style.height += 50;
        } else {
            url += "&buttons=no";
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
                       src={url}
                       style={style}
                       className={className}
                       allowFullScreen={true} />;
    },

    simpleValidate: function(rubric) {
        return CSProgram.validate({
            status: this.props.status,
            message: this.props.message
        }, rubric);
    },

    statics: {
        // The widget's grading function
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
    },
});

module.exports = {
    name: "cs-program",
    displayName: "CS Program",
    supportedAlignments: ["block", "full-width"],
    widget: CSProgram,
};
