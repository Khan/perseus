/** @jsx React.DOM */
(function(Perseus) {

require("../core.js");
var Util = require("../util.js");
require("../renderer.jsx");
require("../editor.jsx");

var InfoTip = require("../components/info-tip.jsx");
var Widgets = require("../widgets.js");

var shuffle = Util.shuffle;

var BaseRadio = React.createClass({
    render: function() {
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";

        return <ul className={"perseus-widget-radio " +
                "above-scratchpad blank-background"}>
            {this.props.multipleSelect &&
                <div className="instructions">
                    <$_>Select all that apply.</$_>
                </div>}
            {this.props.choices.map(function(choice, i) {

                var content = <div>
                        <span className="checkbox">
                            <input
                                ref={"radio" + i}
                                type={inputType}
                                name={radioGroupName}
                                checked={choice.checked}
                                onChange={this.onChange.bind(this, i)} />
                        </span>
                        {choice.content}
                        {this.props.showClues && choice.checked &&
                            <div className="perseus-radio-clue">
                                {choice.clue}
                            </div>}
                    </div>;

                if (this.props.labelWrap) {
                    return <li>
                        <label className="interactive-component">
                            {content}
                        </label>
                    </li>;
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

    getInitialState: function() {
        return {
            showClues: false
        };
    },

    render: function() {
        var values = this.props.values || _.map(this.props.choices,
                function() {
            return false;
        });

        var choices = this.props.choices.map(function(choice, i) {
            return {
                // We need to make a copy, which _.pick does
                content: Perseus.Renderer(_.pick(choice, "content")),
                checked: values[i],
                clue: Perseus.Renderer({content: choice.clue}),
                originalIndex: i
            };
        });
        choices = this.randomize(choices);

        return <BaseRadio
            ref="baseRadio"
            labelWrap={true}
            multipleSelect={this.props.multipleSelect}
            showClues={this.state.showClues}
            choices={choices.map(function(choice) {
                return _.pick(choice, "content", "checked", "clue");
            })}
            onCheckedChange={this.onCheckedChange} />;
    },

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    onCheckedChange: function(checked) {
        this.setState({showClues: false});
        this.props.onChange({
            values: this.derandomize(checked)
        });
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
            };
        }
    },

    simpleValidate: function(rubric) {
        this.setState({showClues: true});
        return Radio.validate(this.toJSON(), rubric);
    },

    randomize: function(array) {
        if (this.props.randomize && this.props.problemNum) {
            return shuffle(array, this.props.problemNum);
        } else {
            return array;
        }
    },

    derandomize: function(array) {
        if (this.props.randomize && this.props.problemNum) {
            var map = shuffle(_.range(array.length), this.props.problemNum);
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
            /* jshint -W018 */
            var correct = _.all(state.values, function(selected, i) {
                return !!rubric.choices[i].correct === selected;
            });
            /* jshint +W018 */

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
            choices: [{}, {}],
            randomize: false,
            multipleSelect: false
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">

                <div className="perseus-widget-left-col"><label>
                    <input type="checkbox"
                           checked={this.props.multipleSelect}
                           onChange={this.onMultipleSelectChange} />
                    {' '}Multiple selections{' '}
                </label></div>

                <div className="perseus-widget-right-col"><label>
                    <input type="checkbox"
                           checked={this.props.randomize}
                           onChange={(e) => this.props.onChange(
                            {randomize: e.target.checked})} />
                    {' '}Randomize order{' '}
                </label>
                <InfoTip>
                    <p>For this option to work, don’t label choices or have
                    "None of the above" as an option. For true/false questions,
                    make the first choice True and the second choice False,
                    and do NOT select randomize answer order.</p>
                </InfoTip>
                </div>
            </div>

            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                labelWrap={false}
                choices={this.props.choices.map(function(choice, i) {
                    var checkedClass = choice.correct ?
                        "correct" :
                        "incorrect";
                    var editor = Perseus.Editor({
                        ref: "editor" + i,
                        content: choice.content || "",
                        widgetEnabled: false,
                        placeholder: "Type a choice here...",
                        onChange: newProps => {
                            if ("content" in newProps) {
                                this.onContentChange(i, newProps.content);
                            }}
                    });
                    var clueEditor = Perseus.Editor({
                        ref: "clue-editor-" + i,
                        content: choice.clue || "",
                        widgetEnabled: false,
                        placeholder: $._("Why is this choice " +
                            checkedClass + "?"),
                        onChange: newProps => {
                            if ("content" in newProps) {
                                this.onClueChange(i, newProps.content);
                            }}
                    });
                    var deleteLink = <a href="#"
                            className="simple-button orange delete-choice"
                            title="Remove this choice"
                            onClick={this.onDelete.bind(this, i)}>
                        <span className="icon-trash" />
                    </a>;
                    return {
                        content: <div className="choice-clue-editors">
                            <div className={"choice-editor " + checkedClass}>
                                {editor}
                            </div>
                            {/* TODO(eater): Remove this condition after clues
                                            are fully launched. */}
                            {(!window.KA || window.KA.allowEditingClues) &&
                                <div className="clue-editor">
                                    {clueEditor}
                                </div>
                            }
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
                    {' '}Add a choice{' '}
                </a>
            </div>

        </div>;
    },

    onMultipleSelectChange: function(e) {

        var allowMultiple = e.target.checked;

        var numSelected = _.reduce(this.props.choices,
                function(memo, choice) {
            return choice.correct ? memo + 1 : memo;
        }, 0);

        if (!allowMultiple && numSelected > 1) {
            var choices = _.map(this.props.choices, function(choice) {
                return _.defaults({
                    correct: false
                }, choice);
            });
            this.props.onChange({
                multipleSelect: allowMultiple,
                choices: choices
            });

        } else {
            this.props.onChange({
                multipleSelect: allowMultiple
            });
        }
    },

    onCheckedChange: function(checked) {
        var choices = _.map(this.props.choices, function(choice, i) {
            return _.extend({}, choice, {correct: checked[i]});
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, newContent) {
        var choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent
        });
        this.props.onChange({choices: choices});
    },

    onClueChange: function(choiceIndex, newClue) {
        var choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            clue: newClue
        });
        if (newClue === "") {
            delete choices[choiceIndex].clue;
        }
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

Widgets.register("radio", Radio);
Widgets.register("radio-editor", RadioEditor);

})(Perseus);
