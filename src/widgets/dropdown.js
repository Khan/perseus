/** @jsx React.DOM */
(function(Perseus) {

var Dropdown = React.createClass({
    render: function() {
        var choices = this.props.choices.slice();
        choices.unshift({
            content: ""
        });

        return <select className="perseus-widget-dropdown">
            {choices.map(function(choice, i) {
                return <option
                        value={i}>
                    {choice.content}
                </option>
            }, this)}
        </select>;
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
    defaultState: {
        choices: [{
            content: "",
            correct: true
        }]
    },

    mixins: [Perseus.Util.PropsToState],

    render: function() {
        // TODO(jakesandlund): is this ok that it is not using the
        // same one as Dropdown?
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
        return <div className="perseus-widget-dropdown">
            <ul>
                {this.state.choices.map(function(choice, i) {
                    return <li>
                        <div>
                            <input
                                ref={"radio" + i}
                                type="radio"
                                name={dropdownGroupName}
                                checked={choice.correct ? "checked" : ""}
                                value={i} />
                            <input
                                type="text"
                                ref={"editor" + i}
                                onChange={this.props.onChange}
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

    addChoice: React.autoBind(function() {
        var choices = this.toJSON(true).choices;
        choices.push({});
        this.setState({choices: choices});
        this.focus(choices.length - 1);
        return false;
    }),

    focus: function(i) {
        this.refs["editor" + i].getDOMNode().focus();
        return true;
    },

    toJSON: function(skipValidation) {
        var choices = this.state.choices.map(function (choice, i) {
            var choice = this.refs["editor" + i].getDOMNode().value;
            var correct = this.refs["radio" + i].getDOMNode().checked;
            return {
                content: choice,
                correct: correct
            };
        }, this);
        return {
            choices: choices,
        };
    }
});

Perseus.Widgets.register("dropdown", Dropdown);
Perseus.Widgets.register("dropdown-editor", DropdownEditor);

})(Perseus);
