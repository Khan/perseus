var React = require('react');
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var Editor = require("../editor.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");
var PassageRef = require("./passage-ref.jsx");
var Util = require("../util.js");

var InfoTip = require("react-components/info-tip.jsx");

var shuffle = require("../util.js").shuffle;
var seededRNG = require("../util.js").seededRNG;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var cx = React.addons.classSet;

var BaseRadio = React.createClass({
    propTypes: {
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
        showClues: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool,
        apiOptions: React.PropTypes.object,
        reviewModeRubric: React.PropTypes.object,
        deselectEnabled: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            onePerLine: true,
        };
    },

    render: function() {
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";
        var rubric = this.props.reviewModeRubric;

        return <ul className={"perseus-widget-radio " +
                "above-scratchpad blank-background"}>
            {this.props.multipleSelect &&
                <div className="instructions">
                    <$_>Select all that apply.</$_>
                </div>}
            {this.props.choices.map(function(choice, i) {

                var content = <div>
                        {choice.content}
                    </div>;

                var classSet = {
                    "inline": !this.props.onePerLine,
                    "none-of-above": choice.isNoneOfTheAbove
                };
                classSet[ApiClassNames.RADIO.OPTION] = true;
                classSet[ApiClassNames.INTERACTIVE] =
                    !this.props.apiOptions.readOnly;
                classSet[ApiClassNames.RADIO.SELECTED] = choice.checked;
                if (rubric) {
                    classSet[ApiClassNames.CORRECT] =
                        rubric.choices[i].correct;
                    classSet[ApiClassNames.INCORRECT] =
                        !rubric.choices[i].correct;
                }
                var className = cx(classSet);

                return <li className={className} key={i}
                            onTouchStart={!this.props.labelWrap ?
                                null : captureScratchpadTouchStart
                            }
                            onClick={!this.props.labelWrap ? null : (e) => {
                                // Don't send this to the scratchpad
                                e.preventDefault();
                                if (!this.props.apiOptions.readOnly) {
                                    var shouldToggle =
                                        this.props.multipleSelect ||
                                        this.props.deselectEnabled;
                                    this.checkOption(
                                        i,
                                        shouldToggle ? !choice.checked : true);
                                }
                            }}>
                    <div>
                        <span className="checkbox">
                            <input
                                ref={"radio" + i}
                                type={inputType}
                                name={radioGroupName}
                                checked={choice.checked}
                                onClick={(e) => {
                                    // Avoid sending this to the parent
                                    e.stopPropagation();
                                }}
                                onChange={(e) => {
                                    this.checkOption(i, e.target.checked);
                                }}
                                disabled={this.props.apiOptions.readOnly} />
                        </span>
                        {/* A pseudo-label. <label> is slightly broken on iOS,
                            so this works around that. Unfortunately, it is
                            simplest to just work around that everywhere. */}
                        <span
                                className={
                                    ApiClassNames.RADIO.OPTION_CONTENT + " " +
                                    ApiClassNames.INTERACTIVE
                                }
                                style={{
                                    cursor: "default",
                                }}>
                            {content}
                        </span>
                        {Exercises.cluesEnabled && this.props.showClues &&
                            choice.checked &&
                            <div className="perseus-radio-clue">
                                {choice.clue}
                            </div>}
                    </div>
                </li>;

            }, this)}
        </ul>;
    },

    checkOption: function(radioIndex, shouldBeChecked) {
        var newChecked;
        if (this.props.multipleSelect) {
            // When multipleSelect is on, clicking an index toggles the
            // selection of just that index.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return (i === radioIndex) ? shouldBeChecked : choice.checked;
            });
        } else {
            // When multipleSelect is turned off we always unselect everything
            // that wasn't clicked.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return i === radioIndex && shouldBeChecked;
            });
        }

        // We send just the array of [true/false] checked values here;
        // onCheckedChange reconstructs the new choices to send to
        // this.props.onChange
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
            multipleSelect: false,
            deselectEnabled: false,
        };
    },

    getInitialState: function() {
        return {
            showClues: false
        };
    },

    render: function() {
        var choices = this.props.choices;
        var values = this.props.values || _.map(choices, () => false);
        var revealNoneOfTheAbove = this._shouldRevealNoneOfTheAbove(choices,
                                                                    values);
        choices = _.map(choices, (choice, i) => {
            var content;
            if (choice.isNoneOfTheAbove && !revealNoneOfTheAbove) {
                content = "None of the above";
            } else {
                content = choice.content;
            }
            return {
                // We need to make a copy, which _.pick does
                content: this._renderRenderer(content),
                checked: values[i],
                clue: this._renderRenderer(choice.clue),
            };
        });
        choices = this.enforceOrdering(choices);

        return <BaseRadio
            ref="baseRadio"
            labelWrap={true}
            onePerLine={this.props.onePerLine}
            multipleSelect={this.props.multipleSelect}
            showClues={this.state.showClues}
            choices={choices.map(function(choice) {
                return _.pick(choice, "content", "checked", "clue");
            })}
            onCheckedChange={this.onCheckedChange}
            reviewModeRubric={this.props.reviewModeRubric}
            deselectEnabled={this.props.deselectEnabled}
            apiOptions={this.props.apiOptions} />;
    },

    _renderRenderer: function(content) {
        content = content || "";

        var nextPassageRefId = 1;
        var widgets = {};

        var modContent = content.replace(
            /\{\{passage-ref (\d+) (\d+)\}\}/g,
            (match, passageNum, refNum) => {
                var widgetId = "passage-ref " + nextPassageRefId;
                nextPassageRefId++;

                widgets[widgetId] = {
                    type: "passage-ref",
                    graded: false,
                    options: {
                        passageNumber: parseInt(passageNum),
                        referenceNumber: parseInt(refNum),
                    },
                    version: PassageRef.version
                };

                return "[[" + Util.snowman + " " + widgetId + "]]";
            }
        );

        // alwaysUpdate={true} so that passage-refs interwidgets
        // get called when the outer passage updates the renderer
        // TODO(aria): This is really hacky
        return <Renderer
                content={modContent}
                widgets={widgets}
                interWidgets={this._interWidgets}
                alwaysUpdate={true} />;
    },

    _interWidgets: function(filterCriterion, localResults) {
        // If local results are not found, forward interwidgets
        // calls to our parent renderer.
        // For passage-refs to communicate with their passages.
        if (localResults.length) {
            return localResults;
        } else {
            return this.props.interWidgets(filterCriterion);
        }
    },

    _shouldRevealNoneOfTheAbove: function(choices, values) {
        // We reveal when 'None of the above' is the correct choice
        // and the entire question is completed. If 'None of the above' isn't
        // selected and the question is completed, then it's the wrong choice
        // and not worth revealing.
        var noneOfTheAboveSelected = _.any(choices, (choice, i) => {
            return choice.isNoneOfTheAbove && values[i];
        });
        return this.props.questionCompleted && noneOfTheAboveSelected;
    },

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    onCheckedChange: function(checked) {
        this.setState({showClues: false});
        this.props.onChange({
            values: checked
        });
    },

    getUserInput: function() {
        // Return checked inputs in the form {values: [bool]}. (Dear future
        // timeline implementers: this used to be {value: i} before multiple
        // select was added)
        if (this.props.values) {
            var noneOfTheAboveIndex = null;
            var noneOfTheAboveSelected = false;

            var values = this.props.values.slice();

            for (var i = 0; i < this.props.values.length; i++) {
                var index = this.props.choices[i].originalIndex;
                values[index] = this.props.values[i];

                if (this.props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;

                    if (values[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }

            return _.extend({}, this.props, {
                values: values,
                noneOfTheAboveIndex: noneOfTheAboveIndex,
                noneOfTheAboveSelected: noneOfTheAboveSelected
              }
            );
        } else {
            // Nothing checked
            return {
                values: _.map(this.props.choices, () => false)
            };
        }
    },

    simpleValidate: function(rubric) {
        this.setState({showClues: true});
        return Radio.validate(this.getUserInput(), rubric);
    },

    enforceOrdering: function(choices) {
        var content = _.pluck(choices, "content");
        if (_.isEqual(content, [$._("False"), $._("True")]) ||
            _.isEqual(content, [$._("No"), $._("Yes")])) {
            return ([choices[1]]).concat([choices[0]]);
        }
        return choices;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Radio, {
    validate: function(state, rubric) {
        var numSelected = _.reduce(state.values, function(sum, selected) {
            return sum + ((selected) ? 1 : 0); }
        , 0);

        if (numSelected === 0) {
            return {
                type: "invalid",
                message: null
            };
        // If NOTA and some other answer are checked, ...
        } else if (state.noneOfTheAboveSelected && numSelected > 1) {
            return {
                type: "invalid",
                message: $._("'None of the above' may not be selected " +
                                    "when other answers are selected.")
             };
        } else {
            /* jshint -W018 */
            var correct = _.all(state.values, function(selected, i) {
                var isCorrect;
                if (state.noneOfTheAboveIndex === i) {
                    isCorrect = _.all(rubric.choices, function(choice, j) {
                        return i === j || !choice.correct;
                    });
                } else {
                    isCorrect = !!rubric.choices[i].correct;
                }
                return isCorrect === selected;
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

    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            clue: React.PropTypes.string,
            correct: React.PropTypes.bool
        })),
        displayCount: React.PropTypes.number,
        randomize: React.PropTypes.bool,
        noneOfAbove: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool,
        deselectEnabled: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            choices: [{}, {}],
            displayCount: null,
            randomize: false,
            noneOfAbove: false,
            multipleSelect: false,
            onePerLine: true,
            deselectEnabled: false,
        };
    },

    render: function() {
        return <div>
            <div className="perseus-widget-row">

                <div className="perseus-widget-left-col">
                    <div>
                        <PropCheckBox label="One answer per line"
                                      labelAlignment="right"
                                      onePerLine={this.props.onePerLine}
                                      onChange={this.props.onChange} />
                        <InfoTip>
                            <p>
                                Use one answer per line unless your question has
                                images that might cause the answers to go off the
                                page.
                            </p>
                        </InfoTip>
                    </div>
                </div>

                <div className="perseus-widget-right-col">
                    <PropCheckBox label="Multiple selections"
                                  labelAlignment="right"
                                  multipleSelect={this.props.multipleSelect}
                                  onChange={this.onMultipleSelectChange} />
                </div>

                <div className="perseus-widget-left-col">
                    <PropCheckBox label="Randomize order"
                                  labelAlignment="right"
                                  randomize={this.props.randomize}
                                  onChange={this.props.onChange} />
                </div>
                <div className="perseus-widget-right-col">
                    <PropCheckBox label="Radio deselect enabled"
                                  labelAlignment="right"
                                  deselectEnabled={this.props.deselectEnabled}
                                  onChange={this.props.onChange} />
                </div>
            </div>

            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                onePerLine={true}
                labelWrap={false}
                apiOptions={this.props.apiOptions}
                choices={this.props.choices.map(function(choice, i) {
                    var checkedClass = choice.correct ? "correct" : "incorrect";
                    var placeholder = "Type a choice here...";

                    if (choice.isNoneOfTheAbove) {
                        placeholder = choice.correct ? "Type the answer to reveal to the user..." :
                        "None of the above";
                    }

                    var editor = <Editor
                        ref={"editor" + i}
                        content={choice.content || ""}
                        widgetEnabled={false}
                        placeholder={placeholder}
                        disabled={choice.isNoneOfTheAbove && !choice.correct}
                        onChange={newProps => {
                            if ("content" in newProps) {
                                this.onContentChange(i, newProps.content);
                            }
                        }} />;
                    var clueEditor = <Editor
                        ref={"clue-editor-" + i}
                        content={choice.clue || ""}
                        widgetEnabled={false}
                        placeholder={$._("Why is this choice " +
                            checkedClass + "?")}
                        onChange={newProps => {
                            if ("content" in newProps) {
                                this.onClueChange(i, newProps.content);
                            }
                        }} />;
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
                        isNoneOfTheAbove: choice.isNoneOfTheAbove,
                        checked: choice.correct
                    };
                }, this)}
                onCheckedChange={this.onCheckedChange} />

            <div className="add-choice-container">
                <a href="#" className="simple-button orange"
                        onClick={this.addChoice.bind(this, false)}>
                    <span className="icon-plus" />
                    {' '}Add a choice{' '}
                </a>

                {!this.props.noneOfAbove && <a href="#" className="simple-button"
                        onClick={this.addChoice.bind(this, true)}>
                    <span className="icon-plus" />
                    {' '}None of the above{' '}
                </a>}
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
        var choices = _.map(this.props.choices, (choice, i) => {
            return _.extend({}, choice, {
                correct: checked[i],
                content: choice.isNoneOfTheAbove && !checked[i] ? '' : choice.content
            });
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
        var deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices: choices,
            noneOfAbove: !( deleted.isNoneOfTheAbove || !this.props.noneOfAbove )
        });
    },

    addChoice: function(noneOfAbove, e) {
        e.preventDefault();

        var choices = this.props.choices;
        var newChoice = { isNoneOfTheAbove: !!noneOfAbove }
        var insertIndex = choices.length - ( this.props.noneOfAbove | 0 );

        choices.splice(insertIndex, 0, newChoice);

        this.props.onChange({
            choices: choices,
            noneOfAbove: !!noneOfAbove || this.props.noneOfAbove
        }, () => {
            this.refs["editor" + insertIndex].focus();
        });
    },

    setDisplayCount: function(num){
        this.props.onChange({displayCount: num});
    },

    focus: function() {
        this.refs.editor0.focus();
        return true;
    },

    getSaveWarnings: function() {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["Warning: No choice is marked as correct."];
        }
        return [];
    },

    serialize: function() {
        return _.pick(this.props, "choices", "randomize",
            "multipleSelect", "displayCount", "noneOfAbove", "onePerLine",
            "deselectEnabled");
    }
});

var choiceTransform = (editorProps, problemNum) => {

    var randomize = function(array) {
        if (editorProps.randomize) {
            return shuffle(array, problemNum);
        } else {
            return array;
        }
    };

    var addNoneOfAbove = function(array) {
        var noneIndex = null;

        _.find(array, function(choice, index) {
            if (choice.isNoneOfTheAbove) {
                noneIndex = index;
                return true;
            }
        });

        if (noneIndex !== null) {
            var itemToBeReplaced = array[noneIndex];

            // Shift array left so that 'None of the above' is last
            array.splice(noneIndex, 1);
            array.push(itemToBeReplaced);
        }

        return array;
    };

    // Add meta-information to choices
    var choices = editorProps.choices.slice();

    choices = _.map(choices, function(choice, i) {
        return _.extend({}, _.omit(choice, "correct"), { originalIndex: i });
    });

    // Randomize and add 'None of the above'
    choices = addNoneOfAbove(randomize(choices));

    editorProps = _.extend({}, editorProps, { choices: choices });
    return _.pick(editorProps, "choices", "noneOfAbove", "onePerLine",
        "multipleSelect", "correctAnswer", "deselectEnabled");
};

module.exports = {
    name: "radio",
    displayName: "Multiple choice",
    widget: Radio,
    editor: RadioEditor,
    transform: choiceTransform
};
