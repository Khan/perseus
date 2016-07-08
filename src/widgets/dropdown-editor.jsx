/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, max-len, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp, semi, space-before-function-paren */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var {iconPlus, iconTrash} = require("../icon-paths.js");
var InfoTip = require("../components/info-tip.jsx");
var InlineIcon = require("../components/inline-icon.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");

var DropdownEditor = React.createClass({
    mixins: [EditorJsonify],

    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            correct: React.PropTypes.bool
        })),
        placeholder: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            placeholder: "",
            choices: [{
                content: "",
                correct: false
            }]
        };
    },

    render: function() {
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
        return <div className="perseus-widget-dropdown">
            <div className="dropdown-info">Dropdown
                <InfoTip>
                    <p>The drop down is useful for making inequalities in a
                    custom format. We normally use the symbols {"<"}, {">"},
                    ≤, ≥ (in that order) which you can copy into the
                    choices. When possible, use the "multiple choice" answer
                    type instead.</p>
                </InfoTip>
            </div>
            <div className="dropdown-placeholder">
                <input
                    type="text"
                    placeholder="Placeholder value"
                    value={this.props.placeholder}
                    onChange={this.onPlaceholderChange} />
                <InfoTip>
                    <p>This value will appear as the drop down default. It should
                    give the user some indication of the values available in the
                    drop down itself, e.g., Yes/No/Maybe.</p>
                </InfoTip>
            </div>
            <div className="clearfix"></div>
            <ul className="dropdown-choices">
                {this.props.choices.map(function(choice, i) {
                    var checkedClass = choice.correct ? 'correct' : 'incorrect'

                    return <li key={"" + i}>
                        <div>
                            <input
                                ref={"radio" + i}
                                type="radio"
                                name={dropdownGroupName}
                                checked={choice.correct ? "checked" : ""}
                                onChange={this.onCorrectChange.bind(this, i)}
                                value={i} />
                            <input
                                type="text"
                                ref={"editor" + i}
                                onChange={this.onContentChange.bind(this, i)}
                                className={checkedClass}
                                value={choice.content} />
                            <a href="#" className="simple-button orange"
                                    onClick={this.removeChoice.bind(this, i)}>
                                <span className="remove-choice">
                                    <InlineIcon {...iconTrash} />
                                </span>
                            </a>
                        </div>
                    </li>;
                }, this)}
            </ul>

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice}>
                    <InlineIcon {...iconPlus} />
                    {' '}Add a choice{' '}
                </a>
            </div>
        </div>;
    },

    onPlaceholderChange: function(e) {
        var placeholder = e.target.value;
        this.props.onChange({placeholder: placeholder});
    },

    onCorrectChange: function(choiceIndex) {
        var choices = _.map(this.props.choices, function (choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex
            });
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, e) {
        var choices = this.props.choices.slice();
        var choice = _.clone(choices[choiceIndex]);
        choice.content = e.target.value;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    },

    addChoice: function(e) {
        e.preventDefault();

        var choices = this.props.choices;
        var blankChoice = {content: "", correct: false};
        this.props.onChange({
            choices: choices.concat([blankChoice])
        }, this.focus.bind(this, choices.length));
    },

    removeChoice: function(choiceIndex, e) {
        e.preventDefault();
        var choices = _(this.props.choices).clone();
        choices.splice(choiceIndex, 1);
        this.props.onChange({
            choices: choices
        });
    },

    focus: function(i) {
        ReactDOM.findDOMNode(this.refs["editor" + i]).focus();
        return true;
    }
});

module.exports = DropdownEditor;
