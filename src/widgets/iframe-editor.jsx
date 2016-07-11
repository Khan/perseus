/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, space-infix-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const BlurInput    = require("react-components/blur-input.jsx");
const PropCheckBox  = require("../components/prop-check-box.jsx");

/**
 * This is used for editing a name/value pair.
 */
const PairEditor = React.createClass({

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
        return <fieldset>
            <label>Name:
                <BlurInput value={this.props.name}
                           onChange={this.change("name")} />
            </label>
            <label>Value:
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

/**
 * This is the main editor for this widget, to specify all the options.
 */
var IframeEditor = React.createClass({

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            url: "",
            settings: [{name: "", value: ""}],
            width: "400",
            height: "400",
            allowFullScreen: false,
        };
    },

    render: function() {
        return <div>
            <div style={{fontWeight: "bold", textAlign: "center"}} >
                This widget is deprecated! <br />
                Try using the Video or CS Program widgets instead.
            </div>
            <label>Url or Program ID:
                <BlurInput name="url"
                           value={this.props.url}
                           onChange={this.change("url")} />
            </label>
            <br/>
            <label>Settings:
                <PairsEditor name="settings"
                           pairs={this.props.settings}
                           onChange={this.handleSettingsChange} />
            </label>
            <br/>
            <label>Width:
                <BlurInput name="width"
                           value={this.props.width}
                           onChange={this.change("width")} />
            </label>
            <label>Height:
                <BlurInput name="height"
                           value={this.props.height}
                           onChange={this.change("height")} />
            </label>
            <PropCheckBox label="Allow full screen"
                allowFullScreen={this.props.allowFullScreen}
                onChange={this.props.onChange} />
        </div>;
    },

    handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    }
});

module.exports = IframeEditor;
