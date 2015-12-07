/**
 * This widget is for embedding Khan Academy CS programs.
 */

var React = require("react");
var _ = require("underscore");

var BlurInput = require("react-components/blur-input.js");
var Changeable = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var InfoTip = require("react-components/info-tip.js");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var updateQueryString = require("../util.js").updateQueryString;

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 400;
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
        return Scratchpad.validate({
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

/**
 * This is used for editing a name/value pair.
 */
var PairEditor = React.createClass({

    mixins: [Changeable, EditorJsonify],

    propTypes: {
        name: React.PropTypes.string,
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name:  "",
            value: ""
        };
    },

    render: function() {
        return <fieldset className="pair-editor">
                <label>Name:{" "}
                    <BlurInput value={this.props.name}
                           onChange={this.change("name")} />
                </label>
                <label> Value:{" "}
                    <BlurInput value={this.props.value}
                           onChange={this.change("value")} />
                </label>
            </fieldset>;
    }
});

/**
 * This is used for editing a set of name/value pairs.
 */
var PairsEditor = React.createClass({

    mixins: [Changeable, EditorJsonify],

    propTypes: {
        pairs: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            value: React.PropTypes.string
        })).isRequired
    },

    render: function() {
        var editors = _.map(this.props.pairs, (pair, i) => {
            return <PairEditor key={i} name={pair.name} value={pair.value}
                     onChange={this.handlePairChange.bind(this, i)}/>;
        });
        return <div>
            {editors}
            </div>;
    },

    handlePairChange: function(pairIndex, pair) {
        // If they're both non empty, add a new one
        var pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        var lastPair = pairs[pairs.length-1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    }
});

var KA_PROGRAM_URL = /khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;

/**
 * Given a program URL from the site, extract its program ID.
 * If the input does not match the known URL patterns, it is assumed to be
 * a program ID.
 */
function isolateProgramID(programUrl) {
    var match = KA_PROGRAM_URL.exec(programUrl);
    if (match) {
        programUrl = match[1];
    }

    return programUrl;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
var CSProgramEditor = React.createClass({

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            programID: "",
            settings: [{name: "", value: ""}],
            showEditor: false,
            showButtons: false,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
        };
    },

    render: function() {
        return <div>
            <label>Url or Program ID:{" "}
                <BlurInput name="programID"
                           value={this.props.programID}
                           onChange={this._handleProgramIDChange} />
            </label>
            <br/>
            <PropCheckBox
                label="Show Editor"
                showEditor={this.props.showEditor}
                onChange={this.props.onChange} />
            <InfoTip>
                If you show the editor, you should use the "full-width"
                alignment to make room for the width of the editor.
            </InfoTip>
            <br/>
            <PropCheckBox
                label="Show Buttons"
                showButtons={this.props.showButtons}
                onChange={this.props.onChange} />
            <br/>
            <label>Settings:
                <PairsEditor name="settings"
                           pairs={this.props.settings}
                           onChange={this._handleSettingsChange} />
                <InfoTip>
                    Settings that you add here are available to the program
                    as an object returned by <code>Program.settings()</code>
                </InfoTip>
            </label>
        </div>;
    },

    _handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    },

    _handleProgramIDChange: function (programID) {
        programID = isolateProgramID(programID);

        $.getJSON("https://www.khanacademy.org/api/internal/scratchpads/" +
            programID)
            .done((programInfo) => {
                this.change({
                    width: programInfo.width,
                    height: programInfo.height,
                    programID: programID,
                });
            })
            .fail((jqxhr, textStatus, error) => {
                console.error("Error retrieving scratchpad info for " +
                    "program ID ", programID);
                console.error(textStatus + ", " + error);
                this.change({
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                    programID: programID,
                });
            });
    }
});


module.exports = {
    name: "cs-program",
    displayName: "CS Program",
    supportedAlignments: ["block", "full-width"],
    widget: CSProgram,
    editor: CSProgramEditor
};
