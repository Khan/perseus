/**
 * This is an iframe widget. It is used for rendering an iframe that
 *  then communicates its state via window.postMessage
 * This is useful for embedding arbitrary visualizations/simulations with
 *  completed conditions, such as the mazes and games in Algorithms.
 * It's particularly well suited for embedding our ProcessingJS programs,
 *  but could also be used for embedding viz's hosted elsewhere.
 */

var React = require("react");

var BlurInput    = require("react-components/js/blur-input.jsx");
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var updateQueryString = require("../util.js").updateQueryString;


/* This renders the iframe and handles validation via window.postMessage */
var Iframe = React.createClass({

    mixins: [Changeable, JsonifyProps],

    propTypes: {
        status: React.PropTypes.string,
        message: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            // options: incomplete, incorrect, correct
            status: "correct",
            // optional message
            message: null,
            allowFullScreen: true
        };
    },

    componentDidMount: function() {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // It could also contain an optional message
        $(window).bind("message", (e) => {
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

        });
    },

    render: function() {
        var style = {
            width: this.props.width,
            height: this.props.height
        };
        var url = this.props.url;

        // If the URL doesnt start with http, it must be a program ID
        if (url && url.length && url.indexOf("http") !== 0) {
            url = "https://www.youtube.com/embed/" + url;
            // Origin is used by output.js in deciding to send messages
            url = updateQueryString(url, "origin", window.location.origin);
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
                       allowFullScreen={this.props.allowFullScreen}/>;
    },

    simpleValidate: function(rubric) {
        return Iframe.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
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


/**
 * This is used for editing a name/value pair.
 */
var PairEditor = React.createClass({

    mixins: [Changeable, JsonifyProps],

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
        return <fieldset>
                <label>名稱: 
                    <BlurInput value={this.props.name}
                           onChange={this.change("name")} />
                </label>
                <label>設定值:
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

    mixins: [Changeable, JsonifyProps],

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

/**
 * This is the main editor for this widget, to specify all the options.
 */
var IframeEditor = React.createClass({

    mixins: [Changeable, JsonifyProps],

    getDefaultProps: function() {
        return {
            url: "",
            settings: [{name: "", value: ""}],
            width: 560,
            height: 320
        };
    },

    render: function() {
        return <div>
            <label>網址 Url:
                <BlurInput name="url"
                           value={this.props.url}
                           onChange={this.change("url")} />
            </label>
        </div>;
    },

    handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    }
});


module.exports = {
    name: "iframe",
    displayName: "Iframe/外掛套件",
    widget: Iframe,
    // Let's not expose it to all content creators yet
    hidden: false,
    editor: IframeEditor
};
