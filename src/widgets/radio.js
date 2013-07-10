/** @jsx React.DOM */
(function(Perseus) {

var BaseRadio = React.createClass({
    render: function() {
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";

        return <ul className="perseus-widget-radio">
            {this.props.choices.map(function(choice, i) {

                var content = <div>
                        <input
                            ref={"radio" + i}
                            type={inputType}
                            name={radioGroupName}
                            defaultChecked={choice.checked}
                            onChange={this.onChange.bind(this, i)} />
                        {choice.content}
                    </div>;

                if (this.props.labelWrap) {
                    return <li><label>{content}</label></li>;
                } else {
                    return <li>{content}</li>;
                }

            }, this)}
        </ul>;
    },

    onChange: function(radioIndex, e) {
        var newChecked = _.map(this.props.choices, function(choice, i) {
            return this.refs["radio" + i].getDOMNode().checked;
        }, this);

        this.props.onCheckedChange(newChecked);
    },

    focus: function(i) {
        this.refs["radio" + (i || 0)].getDOMNode().focus();
        return true;
    }
});

var Radio = React.createClass({
    getDefaultProps: function() {
        return {
            choices: [{}],
            randomize: false,
            multipleSelect: false
        };
    },

    render: function() {
        var choices = this.props.choices.map(function(choice, i) {
            return {
                // We need to make a copy, which _.pick does
                content: Perseus.Renderer(_.pick(choice, "content")),
                checked: false,
                originalIndex: i
            };
        });
        choices = this.randomize(choices);

        return <BaseRadio
            ref="baseRadio"
            labelWrap={true}
            multipleSelect={this.props.multipleSelect}
            choices={choices.map(function(choice) {
                return _.pick(choice, "content", "checked");
            })}
            onCheckedChange={this.onCheckedChange} />
    },

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    onCheckedChange: function(checked) {
        this.props.onChange({values: this.derandomize(checked)});
    },

    toJSON: function(skipValidation) {
        // Return checked inputs in the form {values: [bool]}. (Dear future
        // timeline implementers: this used to be {value: i} before multiple
        // select was added)
        if (this.props.values) {
            return _.pick(this.props, "values");
        } else {
            // Nothing checked
            return {
                values: _.map(this.props.choices, function() {
                    return false;
                })
            }
        }
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
    },

    derandomize: function(array) {
        if (this.props.randomize && this.props.problemNum) {
            var map = Perseus.Util.shuffle(
                    _.range(array.length), this.props.problemNum);
            var derandomized = new Array(array.length);
            _.each(map, function(shuffledIndex, originalIndex) {
                derandomized[shuffledIndex] = array[originalIndex];
            });
            return derandomized;
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
                return !!rubric.choices[i].correct === selected;
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
    getDefaultProps: function() {
        return {
            choices: [{}],
            randomize: false,
            multipleSelect: false
        };
    },

    render: function() {
        return <div>
            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                labelWrap={false}
                choices={this.props.choices.map(function(choice, i) {
                    var editor = Perseus.Editor({
                        ref: "editor" + i,
                        content: choice.content || "",
                        widgetEnabled: false,
                        onChange: function(newProps) {
                            if ("content" in newProps) {
                                this.onContentChange(i, newProps.content);
                            }
                        }.bind(this)
                    });
                    var deleteLink = <a href="#"
                            className="simple-button orange delete-choice"
                            title="Remove this choice"
                            onClick={this.onDelete.bind(this, i)}>
                        <span class="icon-trash" />
                    </a>;
                    return {
                        content: <div className="choice-editor">
                            {editor}
                            {this.props.choices.length >= 2 && deleteLink}
                        </div>,
                        checked: choice.correct
                    };
                }, this)}
                onCheckedChange={this.onCheckedChange} />

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice}>
                    <span className="icon-plus" />
                    Add a choice
                </a>
            </div>

            <div><label>
                <input
                    type="checkbox"
                    checked={this.props.randomize}
                    onChange={function(e) {
                        this.props.onChange({randomize: e.target.checked});
                    }.bind(this)} />
                Randomize answer order
            </label></div>

            <div><label>
                <input
                    type="checkbox"
                    checked={this.props.multipleSelect}
                    onChange={function(e) {
                        this.props.onChange({multipleSelect:
                                e.target.checked});
                    }.bind(this)} />
                Allow multiple selections
            </label></div>
        </div>;
    },

    onCheckedChange: function(checked) {
        var choices = _.map(this.props.choices, function(choice, i) {
            return _.extend({}, choice, {correct: checked[i]});
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, newContent, e) {
        var choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent
        });
        this.props.onChange({choices: choices});
    },

    onDelete: function(choiceIndex, e) {
        e.preventDefault();
        var choices = this.props.choices.slice();
        choices.splice(choiceIndex, 1);
        this.props.onChange({choices: choices});
    },

    addChoice: function(e) {
        e.preventDefault();

        var choices = this.props.choices;
        this.props.onChange({choices: choices.concat([{}])}, function() {
            this.refs["editor" + choices.length].focus();
        }.bind(this));
    },

    focus: function() {
        this.refs.editor0.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        if (!skipValidation &&
                !_.some(_.pluck(this.props.choices, "correct"))) {
            alert("Warning: No choice is marked as correct.");
        }

        return _.pick(this.props, "choices", "randomize", "multipleSelect");
    }
});

Perseus.Widgets.register("radio", Radio);
Perseus.Widgets.register("radio-editor", RadioEditor);

})(Perseus);
