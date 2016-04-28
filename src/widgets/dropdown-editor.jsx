const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const InfoTip = require("../components/info-tip.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const DropdownEditor = React.createClass({
    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            correct: React.PropTypes.bool,
        })),
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
    },

    mixins: [EditorJsonify],

    getDefaultProps: function() {
        return {
            placeholder: "",
            choices: [{
                content: "",
                correct: false,
            }],
        };
    },

    onPlaceholderChange: function(e) {
        const placeholder = e.target.value;
        this.props.onChange({placeholder: placeholder});
    },

    onCorrectChange: function(choiceIndex) {
        const choices = _.map(this.props.choices, function(choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex,
            });
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, e) {
        const choices = this.props.choices.slice();
        const choice = _.clone(choices[choiceIndex]);
        choice.content = e.target.value;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    },

    addChoice: function(e) {
        e.preventDefault();

        const choices = this.props.choices;
        const blankChoice = {content: "", correct: false};
        this.props.onChange({
            choices: choices.concat([blankChoice]),
        }, this.focus.bind(this, choices.length));
    },

    removeChoice: function(choiceIndex, e) {
        e.preventDefault();
        const choices = _(this.props.choices).clone();
        choices.splice(choiceIndex, 1);
        this.props.onChange({
            choices: choices,
        });
    },

    focus: function(i) {
        ReactDOM.findDOMNode(this.refs["editor" + i]).focus();
        return true;
    },

    render: function() {
        const dropdownGroupName = _.uniqueId("perseus_dropdown_");
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
                    onChange={this.onPlaceholderChange}
                />
                <InfoTip>
                    <p>This value will appear as the drop down default. It
                    should give the user some indication of the values available
                    in the drop down itself, e.g., Yes/No/Maybe.</p>
                </InfoTip>
            </div>
            <div className="clearfix"></div>
            <ul className="dropdown-choices">
                {this.props.choices.map(function(choice, i) {
                    const checkedClass = choice.correct ?
                        'correct' : 'incorrect';

                    return <li key={"" + i}>
                        <div>
                            <input
                                ref={"radio" + i}
                                type="radio"
                                name={dropdownGroupName}
                                checked={choice.correct ? "checked" : ""}
                                onChange={this.onCorrectChange.bind(this, i)}
                                value={i}
                            />
                            <input
                                type="text"
                                ref={"editor" + i}
                                onChange={this.onContentChange.bind(this, i)}
                                className={checkedClass}
                                value={choice.content}
                            />
                            <a
                                href="#" className="simple-button orange"
                                onClick={this.removeChoice.bind(this, i)}
                            >
                                <span className="icon-trash remove-choice" />
                            </a>
                        </div>
                    </li>;
                }, this)}
            </ul>

            <div className="add-choice-container">
                <a
                    href="#" className="simple-button orange"
                    onClick={this.addChoice}
                >
                    <span className="icon-plus" />
                    {' '}Add a choice{' '}
                </a>
            </div>
        </div>;
    },
});

module.exports = DropdownEditor;
