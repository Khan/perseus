const React = require("react");
const _ = require("underscore");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const BlurInput = require("react-components/blur-input.jsx");
const InfoTip = require("../components/info-tip.jsx");
const PropCheckBox  = require("../components/prop-check-box.jsx");

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

/**
 * This is used for editing a name/value pair.
 */
const PairEditor = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        value: React.PropTypes.string,
    },

    mixins: [Changeable, EditorJsonify],

    getDefaultProps: function() {
        return {
            name:  "",
            value: "",
        };
    },

    render: function() {
        return <fieldset className="pair-editor">
                <label>Name:{" "}
                    <BlurInput
                        value={this.props.name}
                        onChange={this.change("name")}
                    />
                </label>
                <label> Value:{" "}
                    <BlurInput
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </label>
            </fieldset>;
    },
});

/**
 * This is used for editing a set of name/value pairs.
 */
const PairsEditor = React.createClass({
    propTypes: {
        pairs: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            value: React.PropTypes.string,
        })).isRequired,
    },

    mixins: [Changeable, EditorJsonify],

    handlePairChange: function(pairIndex, pair) {
        // If they're both non empty, add a new one
        const pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;

        const lastPair = pairs[pairs.length - 1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    },

    render: function() {
        const editors = _.map(this.props.pairs, (pair, i) => {
            return <PairEditor
                key={i} name={pair.name} value={pair.value}
                onChange={this.handlePairChange.bind(this, i)}
            />;
        });
        return <div>
            {editors}
            </div>;
    },
});

const KA_PROGRAM_URL = /khanacademy\.org\/computer-programming\/[^\/]+\/(\d+)/;

/**
 * Given a program URL from the site, extract its program ID.
 * If the input does not match the known URL patterns, it is assumed to be
 * a program ID.
 */
function isolateProgramID(programUrl) {
    const match = KA_PROGRAM_URL.exec(programUrl);
    if (match) {
        programUrl = match[1];
    }

    return programUrl;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
const CSProgramEditor = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        programID: React.PropTypes.string,
        settings: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            value: React.PropTypes.string,
        })),
        showButtons: React.PropTypes.bool,
        showEditor: React.PropTypes.bool,
    },

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

    _handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    },

    _handleProgramIDChange: function(programID) {
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
                this.change({
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                    programID: programID,
                });
            });
    },

    render: function() {
        return <div>
            <label>Url or Program ID:{" "}
                <BlurInput
                    name="programID"
                    value={this.props.programID}
                    onChange={this._handleProgramIDChange}
                />
            </label>
            <br/>
            <PropCheckBox
                label="Show Editor"
                showEditor={this.props.showEditor}
                onChange={this.props.onChange}
            />
            <InfoTip>
                If you show the editor, you should use the "full-width"
                alignment to make room for the width of the editor.
            </InfoTip>
            <br/>
            <PropCheckBox
                label="Show Buttons"
                showButtons={this.props.showButtons}
                onChange={this.props.onChange}
            />
            <br/>
            <label>Settings:
                <PairsEditor
                    name="settings"
                    pairs={this.props.settings}
                    onChange={this._handleSettingsChange}
                />
                <InfoTip>
                    Settings that you add here are available to the program
                    as an object returned by <code>Program.settings()</code>
                </InfoTip>
            </label>
        </div>;
    },
});

module.exports = CSProgramEditor;
