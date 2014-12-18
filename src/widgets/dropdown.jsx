var React = require('react');
var InfoTip = require("react-components/info-tip.jsx");
var FancySelect = require("../components/fancy-select.jsx");
var FancyOption = FancySelect.Option;
var _ = require("underscore");

var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;
var ApiOptions = require("../perseus-api.jsx").Options;

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var Dropdown = React.createClass({
    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.string),
        selected: React.PropTypes.number,
        placeholder: React.PropTypes.string,
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            choices: [],
            selected: 0,
            placeholder: "",
            apiOptions: ApiOptions.defaults
        };
    },

    render: function() {
        var choices = this.props.choices.slice();

        var selectClasses = React.addons.classSet({
            "perseus-widget-dropdown": true,
            "perseus-fancy-dropdown": this.props.apiOptions.fancyDropdowns
        });

        if (this.props.apiOptions.fancyDropdowns) {
            return <FancySelect
                    onChange={this._handleChange}
                    className={selectClasses + " " + ApiClassNames.INTERACTIVE}
                    value={this.props.selected}>
                <FancyOption value={0} visible={false}>
                    <span className="placeholder">
                        {this.props.placeholder}
                    </span>
                </FancyOption>
                {choices.map((choice, i) => {
                    // Always visible so we can animate them with css
                    return <FancyOption value={i + 1} visible>
                        {choice}
                    </FancyOption>;
                })}
            </FancySelect>;

        } else {
            return <select
                    onChange={this._handleChangeEvent}
                    onTouchStart={captureScratchpadTouchStart}
                    className={selectClasses + " " + ApiClassNames.INTERACTIVE}
                    value={this.props.selected}>
                <option value={0} disabled>
                    {this.props.placeholder}
                </option>
                {choices.map((choice, i) => {
                    return <option
                            key={"" + (i + 1)}
                            value={i + 1}>
                        {choice}
                    </option>;
                })}
            </select>;
        }
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    _handleChangeEvent: function(e) {
        this._handleChange(parseInt(e.target.value));
    },

    _handleChange: function(selected) {
        this.props.onChange({selected: selected});
    },

    getUserInput: function() {
        return {value: this.props.selected};
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
        var selected = state.value;
        if (selected === 0) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            var correct = rubric.choices[selected - 1].correct;
            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});

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
            <div>Dropdown
                <InfoTip>
                    <p>The drop down is useful for making inequalities in a
                    custom format. We normally use the symbols {"<"}, {">"},
                    ≤, ≥ (in that order) which you can copy into the
                    choices. When possible, use the "multiple choice" answer
                    type instead.</p>
                </InfoTip>
            </div>
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
            <ul>
                {this.props.choices.map(function(choice, i) {
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
                                value={choice.content} />
                            <a href="#" className="simple-button orange"
                                    onClick={this.removeChoice.bind(this, i)}>
                                <span className="icon-trash remove-choice" />
                            </a>
                        </div>
                    </li>;
                }, this)}
            </ul>

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice}>
                    <span className="icon-plus" />
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
        this.refs["editor" + i].getDOMNode().focus();
        return true;
    }
});

var propTransform = (editorProps) => {
    return {
        placeholder: editorProps.placeholder,
        choices: _.map(editorProps.choices, (choice) => choice.content)
    };
};

module.exports = {
    name: "dropdown",
    displayName: "Drop down",
    widget: Dropdown,
    editor: DropdownEditor,
    transform: propTransform
};
