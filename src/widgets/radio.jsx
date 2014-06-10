/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");

var ButtonGroup = require("react-components/button-group");
var Editor = require("../editor.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");

var InfoTip = require("react-components/info-tip");

var shuffle = require("../util.js").shuffle;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var cx = React.addons.classSet;

var BaseRadio = React.createClass({
    propTypes: {
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
        showClues: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            onePerLine: true
        };
    },

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
                        {Exercises.cluesEnabled === "cluesEnabled" &&
                            this.props.showClues && choice.checked &&
                            <div className="perseus-radio-clue">
                                {choice.clue}
                            </div>}
                    </div>;

                var className = cx({
                    "inline": !this.props.onePerLine
                });

                if (this.props.labelWrap) {
                    return <li className={className} key={i}>
                        <label
                                className="interactive-component"
                                onTouchStart={captureScratchpadTouchStart}>
                            {content}
                        </label>
                    </li>;
                } else {
                    return <li className={className} key={i}>{content}</li>;
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
            displayCount: null,
            randomize: false,
            multipleSelect: false,
            noneOfTheAbove: false
        };
    },

    getInitialState: function() {
        return {
            showClues: false,
            revealCorrectAnswer: false
        };
    },

    render: function() {
        var choices = this.props.choices;
        var values = this.props.values || _.map(choices, () => false);
        choices = _.map(choices, function(choice, i) {
            return {
                // We need to make a copy, which _.pick does
                content: Renderer(_.pick(choice, "content")),
                correct: choice.correct,
                checked: values[i],
                clue: Renderer({content: choice.clue}),
                originalIndex: i
            };
        });
        if (this.props.randomize) {
            choices = this.randomize(choices);
            //choices = this.applyDisplayCount(choices); // :(
            //choices = this.addNoneOfAbove(choices);
        }
        //choices = this.enforceOrdering(choices);
        this.derandomizer = _.pluck(choices, "originalIndex");

        return <BaseRadio
            ref="baseRadio"
            labelWrap={true}
            onePerLine={this.props.onePerLine}
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
                values: _.map(this.props.choices, () => false)
            };
        }
    },

    simpleValidate: function(rubric) {
        this.setState({showClues: true});
        rubric = _.clone(rubric);
        if (false && this.props.noneOfTheAbove) {
            var nota = _.last(rubric.choices);
            var values = (this.toJSON()).values;
            var othersChecked = _.any(_.initial(values));
            if (nota.correct && nota.checked && !othersChecked) {
                this.setState({revealCorrectAnswer: true});
            }
        }
        return Radio.validate(this.toJSON(), rubric);
    },

    enforceOrdering: function(choices) {
        var content = _.pluck(choices, "content");
        if (_.isEqual(content, [$._("False"), $._("True")]) ||
            _.isEqual(content, [$._("No"), $._("Yes")])) {
            return ([choices[1]]).concat([choices[0]]);
        }
        return choices;
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
            var derandomized = new Array(this.derandomizer.length);
            _.each(this.derandomizer, function(originalIndex, i) {
                derandomized[originalIndex] = array[i];
            });
            return derandomized;
        } else {
            return array;
        }
    },

    applyDisplayCount: function(array) {
        if (this.props.displayCount) {
            var newArray = array.slice(0, this.props.displayCount);
            // If any of the new choices are correct, ...
            if(_.any(newArray, choice => choice.correct) ||
              // or all the original choices are incorrect, ...
              _.every(this.props.choices, choice => !choice.correct) ||
              // or none of the above is an option, ...
              this.props.noneOfTheAbove) {
                return newArray;
            } else {
                // Otherwise try again (in a random way that's not infinite)
                return this.applyDisplayCount(this.randomize(array.slice(1)));
            }
        }
        return array;
    },

    addNoneOfAbove: function(array) {
        if (this.props.noneOfTheAbove) {
            if (this.state.revealCorrectAnswer) {
                var answer = _(this.props.choices).where({correct: true});
                if (!_.isEmpty(answer)) {
                    return array.concat(answer);
                }
            }
            var values = this.props.values || [false];
            return array.concat([{
                content: $._("None of the above"),
                checked: values[values.length - 1],
                correct: !_.any(array, choice => choice.correct),
                originalIndex: array.length
            }]);
        }
        return array;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Radio, {
    validate: function(state, rubric) {
        if (!_.any(state.values)) {
            return {
                type: "invalid",
                message: null
            };
        // If NOTA and some other answer are checked, ...
        } else if (false && rubric.noneOfTheAbove && _.last(state.values) &&
                    _.any(_.initial(state.values))) {
            return {
                type: "invalid",
                message: $._("'None of the above' may not be selected " +
                                    "when other answers are selected.")
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
    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            choices: [{}, {}],
            displayCount: null,
            randomize: false,
            multipleSelect: false,
            onePerLine: true
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">

                <div>
                    <div className="perseus-widget-left-col">
                        <PropCheckBox label="One answer per line"
                                      labelAlignment="right"
                                      onePerLine={this.props.onePerLine}
                                      onChange={this.props.onChange} />
                    </div>
                    <InfoTip>
                        <p>
                            Use one answer per line unless your question has
                            images that might cause the answers to go off the
                            page.
                        </p>
                    </InfoTip>
                </div>

                <div className="perseus-widget-left-col">
                    <PropCheckBox label="Multiple selections"
                                  labelAlignment="right"
                                  multipleSelect={this.props.multipleSelect}
                                  onChange={this.onMultipleSelectChange} />
                </div>

                <div className="perseus-widget-right-col">
                    <PropCheckBox label="Randomize order"
                                  labelAlignment="right"
                                  randomize={this.props.randomize}
                                  onChange={this.props.onChange} />
                </div>
            </div>
            {false && <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    <PropCheckBox label="None of the above"
                           labelAlignment="right"
                           noneOfTheAbove={this.props.noneOfTheAbove}
                           onChange={this.props.onChange} />
                </div>
                <div className="perseus-widget-right-col">
                    # Displayed {' '}
                    <ButtonGroup value={this.props.displayCount}
                        buttons={[
                            {text: "3", value: 3},
                            {text: "4", value: 4},
                            {text: "5", value: 5}]}
                        onChange={this.setDisplayCount}/>
                </div>
            </div>}

            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                onePerLine={true}
                labelWrap={false}
                choices={this.props.choices.map(function(choice, i) {
                    var checkedClass = choice.correct ?
                        "correct" :
                        "incorrect";
                    var editor = Editor({
                        ref: "editor" + i,
                        content: choice.content || "",
                        widgetEnabled: false,
                        placeholder: "Type a choice here...",
                        onChange: newProps => {
                            if ("content" in newProps) {
                                this.onContentChange(i, newProps.content);
                            }}
                    });
                    var clueEditor = Editor({
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

    onMultipleSelectChange: function(allowMultiple) {
        allowMultiple = allowMultiple.multipleSelect;

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
        this.props.onChange({choices: choices.concat([{}])}, () => {
            this.refs["editor" + choices.length].focus();
        });
    },

    setDisplayCount: function(num){
        this.props.onChange({displayCount: num});
    },

    focus: function() {
        this.refs.editor0.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        if (!skipValidation && !this.props.noneOfTheAbove &&
                !_.some(_.pluck(this.props.choices, "correct"))) {
            alert("Warning: No choice is marked as correct.");
        }

        return _.pick(this.props, "choices", "randomize",
            "multipleSelect", "displayCount", "noneOfTheAbove", "onePerLine");
    }
});

module.exports = {
    name: "radio",
    displayName: "Multiple choice",
    widget: Radio,
    editor: RadioEditor
};
