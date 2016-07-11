/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");

const Changeable = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const InfoTip = require("../components/info-tip.jsx");
const NumberInput = require("../components/number-input.jsx");
const TextInput = require("../components/text-input.jsx");

const PassageRefEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        passageNumber: React.PropTypes.number,
        referenceNumber: React.PropTypes.number,
        summaryText: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "",
        };
    },

    render: function() {
        return <div>
            <div>
                <label>
                    {"Passage Number: "}
                    <NumberInput
                        value={this.props.passageNumber}
                        onChange={this.change("passageNumber")} />
                </label>
            </div>
            <div>
                <label>
                    {"Reference Number: "}
                    <NumberInput
                        value={this.props.referenceNumber}
                        onChange={this.change("referenceNumber")} />
                </label>
            </div>
            <div>
                <label>
                    {"Summary Text: "}
                    <TextInput
                        value={this.props.summaryText}
                        onChange={this.change("summaryText")} />
                    <InfoTip>
                        <p>
                            Short summary of the referenced section. This
                            will be included in parentheses and quotes
                            automatically.
                        </p>
                        <p>
                            Ex: The start ... the end
                        </p>
                    </InfoTip>
                </label>
            </div>
        </div>;
    }
});

module.exports = PassageRefEditor;
