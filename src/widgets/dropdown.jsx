/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");

var InfoTip = require("../components/info-tip.jsx");
var Widgets = require("../widgets.js");

var Dropdown = React.createClass({
    getDefaultProps: function() {
        return {
            choices: [{}],
            selected: 0
        };
    },

    render: function() {
        var choices = this.props.choices.slice();
        choices.unshift({
            content: ""
        });

        // TODO(jack): This should base the selected
        // item on its props
        return <select
                    onChange={this.onChange}
                    className="perseus-widget-dropdown">
            {choices.map(function(choice, i) {
                return <option
                        key={"" + i}
                        value={i}>
                    {choice.content}
                </option>;
            }, this)}
        </select>;
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    onChange: function(e) {
        var selected = this.getDOMNode().selectedIndex;
        this.props.onChange({selected: selected});
    },

    toJSON: function(skipValidation) {
        return {value: this.getDOMNode().selectedIndex};
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.toJSON(), rubric);
    },
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
    getDefaultProps: function() {
        return {
            choices: [{
                content: "",
                correct: false
            }]
        };
    },

    render: function() {
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
        return <div className="perseus-widget-dropdown">
            <InfoTip>
                <p>The drop down is useful for making inequalities in a custom
                format. We normally use the symbols {"<"}, {">"}, ≤, ≥ (in
                that order) which you can copy into the choices.  When
                possible, use the "multiple choice" answer type
                instead.</p>
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
    },

    toJSON: function(skipValidation) {
        if (!skipValidation &&
                !_.some(_.pluck(this.props.choices, "correct"))) {
            alert("Warning: No choice is marked as correct.");
        }
        return _.pick(this.props, 'choices');
    }
});

Widgets.register("dropdown", Dropdown);
Widgets.register("dropdown-editor", DropdownEditor);

})(Perseus);
