/** @jsx React.DOM */
(function(Perseus) {

var Dropdown = React.createClass({
    render: function() {
        var choices = this.props.choices;
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");

        return <select name={dropdownGroupName} className="perseus-widget-dropdown">
            {choices.map(function(choice, i) {
                console.log(choice);
                return <option
                        ref={"dropdown" + i}
                        value={i}>
                    {Perseus.Renderer(choice)}
                </option>
            }, this)}
        </select>;
    },

    focus: function(i) {
        if (i == null) {
            i = 0;
        }

        if (this.props.isEditor) {
            this.refs["editor" + i].focus();
        } else {
            this.refs["dropdown" + i].getDOMNode().focus();
        }
        return true;
    },

    toJSON: function(skipValidation) {
        // Retrieve which choices are selected
        var isSelected = this.props.choices.map(function(choice, i) {
            return this.refs["dropdown" + i].getDOMNode().checked;
        }, this);

        // Dear future timeline implementers: this used to be {value: i} before
        // multiple select was added
        return {values: isSelected};
    },

    toEditorJSON: function(skipValidation) {
        var choices = this.props.choices.map(function(choiceProps, i) {
            var checked = this.refs["dropdown" + i].getDOMNode().checked;
            var choice = this.refs["editor" + i].toJSON(skipValidation);
            choice.correct = checked;
            return choice;
        }, this);

        return {
            choices: choices
        };
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.toJSON(), rubric);
    },
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
        if (!_.any(state.values)) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            var correct = _.all(state.values, function(selected, i) {
                return rubric.choices[i].correct === selected;
            });

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
    defaultState: {
        choices: [{
            correct: true
        }],
    },

    mixins: [Perseus.Util.PropsToState],

    render: function() {
        // TODO(jakesandlund): get real value
        var dropdownGroupName = 'XXX';
        return <div>
            <ul className="perseus-widget-dropdown">
                {this.state.choices.map(function(choice, i) {
                    return <li>
                        <div>
                            <input
                                    ref={"dropdown" + i}
                                    type="radio"
                                    name={dropdownGroupName}
                                    checked={choice.correct}
                                    value={i}>
                                {Perseus.SingleEditor(_.extend({
                                    ref: "editor" + i,
                                    onChange: this.props.onChange,
                                    widgetEnabled: false
                                }, choice))}
                            </input>
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

    addChoice: React.autoBind(function() {
        var choices = this.toJSON(true).choices;
        choices.push({});
        this.setState({choices: choices});

        // XXX
        //this.focus(choices.length - 1);
        return false;
    }),

    focus: function(i) {
        this.refs.dropdown.focus(i);
        return true;
    },

    toJSON: function(skipValidation) {
        //var choices = this.refs.dropdown.toEditorJSON(skipValidation).choices;
        // XXX
        var choices = this.state.choices.map(function (choice, i) {
            return this.refs["editor" + i].toJSON(skipValidation);
        }, this);
        return {
            choices: choices,
        };
    }
});

Perseus.Widgets.register("dropdown", Dropdown);
Perseus.Widgets.register("dropdown-editor", DropdownEditor);

})(Perseus);
