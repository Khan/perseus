/** @jsx React.DOM */
(function(Perseus) {

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

        return <select
                    onChange={this.onChange}
                    className="perseus-widget-dropdown">
            {choices.map(function(choice, i) {
                return <option
                        value={i}>
                    {choice.content}
                </option>;
            }, this)}
        </select>;
    },

    onChange: function(e) {
        var selected = this.getDOMNode().selectedIndex;
        this.props.onChange({selected: selected});
    },

    toJSON: function(skipValidation) {
        return {value: this.props.selected};
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
                correct: true
            }]
        };
    },

    render: function() {
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
        return <div className="perseus-widget-dropdown">
            <ul>
                {this.props.choices.map(function(choice, i) {
                    return <li>
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
                                onInput={this.onContentChange.bind(this, i)}
                                value={choice.content} />
                        </div>
                    </li>;
                }, this)}
            </ul>

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice}>
                    <span className="icon-plus" />
                    Add a choice
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

    focus: function(i) {
        this.refs["editor" + i].getDOMNode().focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return _.pick(this.props, 'choices');
    }
});

Perseus.Widgets.register("dropdown", Dropdown);
Perseus.Widgets.register("dropdown-editor", DropdownEditor);

})(Perseus);
