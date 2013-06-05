/** @jsx React.DOM */
(function(Perseus) {

var Radio = React.createClass({
    render: function() {
        var isEditor = this.props.isEditor;
        var choices = this.props.choices.map(function(choice, i) {
            return _.extend({
                originalIndex: i
            }, choice);
        });
        choices = this.randomize(choices);

        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";

        return <ul className="perseus-widget-radio">
            {choices.map(function(choice, i) {
                return <li>
                    {React.DOM[isEditor ? "div" : "label"](null, [
                        <input
                            ref={"radio" + choice.originalIndex}
                            type={inputType}
                            name={radioGroupName}
                            checked={isEditor && choice.correct}
                            value={i} />,
                        isEditor ?
                            Perseus.SingleEditor(_.extend({
                                ref: "editor" + choice.originalIndex,
                                onChange: this.props.onChange,
                                widgetEnabled: false
                            }, choice)) :
                            Perseus.Renderer(choice)
                    ])}
                </li>;
            }, this)}
        </ul>;
    },

    focus: function(i) {
        if (i == null) {
            i = 0;
        }

        if (this.props.isEditor) {
            this.refs["editor" + i].focus();
        } else {
            this.refs["radio" + i].getDOMNode().focus();
        }
        return true;
    },

    toJSON: function(skipValidation) {
        // Retrieve which choices are selected
        var isSelected = this.props.choices.map(function(choice, i) {
            return this.refs["radio" + i].getDOMNode().checked;
        }, this);

        // Dear future timeline implementers: this used to be {value: i} before
        // multiple select was added
        return {values: isSelected};
    },

    toEditorJSON: function(skipValidation) {
        var choices = this.props.choices.map(function(choiceProps, i) {
            var checked = this.refs["radio" + i].getDOMNode().checked;
            var choice = this.refs["editor" + i].toJSON(skipValidation);
            choice.correct = checked;
            return choice;
        }, this);

        return {
            choices: choices
        };
    },

    simpleValidate: function(rubric) {
        return Radio.validate(this.toJSON(), rubric);
    },

    randomize: function(array) {
        if (this.props.randomize && this.props.problemNum) {
            return Perseus.Util.shuffle(array, this.props.problemNum);
        } else {
            return array;
        }
    }
});

_.extend(Radio, {
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

var RadioEditor = React.createClass({
    defaultState: {
        choices: [{
            correct: true
        }],
        randomize: false,
        multipleSelect: false
    },

    mixins: [Perseus.Util.PropsToState],

    render: function() {
        return <div>
            {Radio(_.extend({
                ref: "radio",
                isEditor: true,
                onChange: this.props.onChange
            }, this.state, {
                // Randomizing in the editor is unhelpful
                randomize: false
            }))}

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addHint}>
                    <span className="icon-plus" />
                    Add a choice
                </a>
            </div>

            <div><label>
                <input
                    type="checkbox"
                    checked={this.state.randomize}
                    onChange={function(e) {
                        this.setState({randomize: e.target.checked});
                    }.bind(this)} />
                Randomize answer order
            </label></div>

            <div><label>
                <input
                    type="checkbox"
                    checked={this.state.multipleSelect}
                    onChange={function(e) {
                        this.setState({multipleSelect: e.target.checked});
                    }.bind(this)} />
                Allow multiple selections
            </label></div>
        </div>;
    },

    addHint: React.autoBind(function() {
        var choices = this.toJSON(true).choices;
        choices.push({});
        this.setState({choices: choices});

        this.focus(choices.length - 1);
        return false;
    }),

    focus: function(i) {
        this.refs.radio.focus(i);
        return true;
    },

    toJSON: function(skipValidation) {
        var choices = this.refs.radio.toEditorJSON(skipValidation).choices;
        return {
            choices: choices,
            randomize: this.state.randomize,
            multipleSelect: this.state.multipleSelect
        };
    }
});

Perseus.Widgets.register("radio", Radio);
Perseus.Widgets.register("radio-editor", RadioEditor);

})(Perseus);
