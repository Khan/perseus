var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var Changeable = require("../mixins/changeable.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var Editor = require("../editor.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");
var PassageRef = require("./passage-ref.jsx");
var Util = require("../util.js");

var InfoTip = require("react-components/info-tip.js");

var shuffle = require("../util.js").shuffle;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var classNames = require("classnames");

/**
 * A radio button that can be unchecked by clicking it again.
 *
 * This component behaves much like a checkbox in that when you click it again
 * (or hit space bar or select it in some other way), it will become unchecked.
 * (Hopefully) it behaves exactly like a radio button in every other way though
 * (arrow keys can still be used to select it within a group for example).
 *
 * Here's a summary of which of our event handlers fire for each way to select
 * or deselect the button:
 *
 * - Clicking a button: handleClick, handleChange
 * - Pressing spacebar with button focussed: handleKeyDown, handleKeyUp (we
 *   suppress the default behavior of some browsers to synthesize a click event
 *   here).
 * - When radio button A is selected, pressing down arrow to select B:
 *   handleKeyDown (A), handleClick (B), handleChange (B), handleKeyUp (B)
 * - Clicking with mac screenreader: handleClick, handleChange
 */
var ToggleableRadioButton = React.createClass({
    propTypes: {
        // A function that will be called whenever the radio button is checked
        // or unchecked. It's possible for this to be called twice for a single
        // checking or unchecking.
        onChecked: React.PropTypes.func.isRequired,

        // Whether the radio button should be checked or unchecked (this is a
        // controlled component).
        checked: React.PropTypes.bool.isRequired,
    },

    handleClick: function(event) {
        this.props.onChecked(!this.props.checked);

        // NOTE(johnsullivan): Preventing default would make sense to do here
        //     because we're fully controlling the state of the check box and
        //     don't really want it to be (un)checked accidently. React
        //     requires that we *don't* call preventDefault from the onClick or
        //     onChecked handlers of a controlled component though.
    },

    handleKeyUp: function(event) {
        // Make hitting the spacebar with the element selected equivalent to
        // clicking it. Some browsers do this as part of the radio button's
        // default behavior, but since some browsers don't we normalize the
        // behavior here.
        if (event.key === " ") {
            this.props.onChecked(!this.props.checked);
            event.preventDefault();
        }
    },

    handleChange: function(event) {
        // If the checkbox is going from unchecked to checked, we'll handle it
        // here.
        // NOTE(johnsullivan): The onClick/onKeyUp handler most likely *also*
        //     handled this, but we're being defensive against browsers/devices
        //     that might not call those handlers like we'd expect. It's
        //     unclear to me whether this is strictly necessary.
        if (!this.props.checked && event.target.checked) {
            this.props.onChecked(true);
        }
    },

    handleKeyDown: function(event) {
        // This is necessary in order to prevent IE9 from creating a duplicate
        // click event on the radio button when the space bar is hit.
        if (event.key === " ") {
            event.preventDefault();
        }
    },

    render: function() {
        var inputProps = _.extend({}, this.props, {
            type: "radio",
            onChange: this.handleChange,
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
        });

        return <input {...inputProps} />;
    },
});

var Choice = React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        clue: React.PropTypes.object,
        content: React.PropTypes.node,
        disabled: React.PropTypes.bool,
        groupName: React.PropTypes.string,
        showClue: React.PropTypes.bool,
        type: React.PropTypes.string,
        onChecked: React.PropTypes.func.isRequired,
        deselectEnabled: React.PropTypes.bool,
        // This indicates the position of the choice relative to others
        // (so that we can display a nice little (A), (B), etc. next to it)
        pos: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            checked: false,
            classSet: {},
            disabled: false,
            showClue: false,
            type: 'radio',
            pos: 0
        };
    },

    render: function() {
        // NOTE(jeresig): This is not i18n appropriate and should probably be
        // changed to a map of common options that are properly translated.
        var letter = String.fromCharCode(65 + this.props.pos);

        var a11yText = () => {
            // If the option was checked we need to reveal more context about
            // what the result was (correct/incorrect)
            if (this.props.checked) {
                if (typeof this.props.correct === "boolean") {
                    if (this.props.correct) {
                        return i18n._("(Choice %(letter)s, Checked, Correct)",
                            {letter: letter});
                    } else {
                        return i18n._("(Choice %(letter)s, Checked, Incorrect)",
                            {letter: letter});
                    }
                }

                return i18n._("(Choice %(letter)s, Checked)", {letter: letter});

            // If the option wasn't checked, but was correct, we need to tell
            // the user that this was, in fact, the correct answer.
            } else if (this.props.correct) {
                return i18n._("(Choice %(letter)s, Correct Answer)",
                    {letter: letter});
            }

            return i18n._("(Choice %(letter)s)", {letter: letter});
        };

        var className = classNames(this.props.className, "checkbox-label");

        // There's two different input components we could use (the builtin
        // input component, or the ToggleableRadioButton component). These are
        // the props that we will pass to either.
        var commonInputProps = {
            type: this.props.type,
            name: this.props.groupName,
            checked: this.props.checked,
            disabled: this.props.disabled,
        };

        var input = null;
        if (this.props.type === "radio" && this.props.deselectEnabled) {
            // This is a special radio button that allows a user to deselect
            // it by merely clicking/selecting it again.
            input = (
                <ToggleableRadioButton
                    onChecked={this.props.onChecked}
                    {...commonInputProps} />);
        } else {
            input = (
                <input
                    onChange={(event) => {
                        this.props.onChecked(event.target.checked);
                    }}
                    {...commonInputProps} />);
        }

        return <label className={className}>
            {input}
            <div className="description">
                <div className="checkbox-and-option">
                    <span className="checkbox">
                        <div className="pos-back"></div>
                        <div className="pos">
                            <span className="perseus-sr-only">
                                {a11yText()}
                            </span>
                            <span aria-hidden="true">{letter}</span>
                        </div>
                    </span>
                    {/* A pseudo-label. <label> is slightly broken on iOS,
                        so this works around that. Unfortunately, it is
                        simplest to just work around that everywhere. */}
                    <span className={
                            ApiClassNames.RADIO.OPTION_CONTENT + " " +
                            ApiClassNames.INTERACTIVE
                        }
                        style={{ cursor: "default" }}>
                        <div>
                            {this.props.content}
                        </div>
                    </span>
                </div>
                {this.props.showClue &&
                    <div className="perseus-radio-clue">
                        {this.props.clue}
                    </div>}
            </div>
        </label>;
    }
});

var ChoiceNoneAbove = React.createClass({
    propTypes: {
        showContent: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            showContent: true
        };
    },

    render: function() {
        var choiceProps = _.extend({}, this.props, {
            className: classNames(this.props.className, "none-of-above"),
            content: (this.props.showContent ?
                this.props.content :
                // We use a Renderer here because that is how
                // `this.props.content` is wrapped otherwise.
                // We pass in a key here so that we avoid a semi-spurious
                // react warning when we render this in the same place
                // as the previous choice content renderer.
                // Note this destroys state, but since all we're doing
                // is outputting "None of the above", that is okay.
                <Renderer
                    key="noneOfTheAboveRenderer"
                    content={i18n._("None of the above")} />
            ),
        });

        return <Choice {...choiceProps} />;
    }
});

var ChoiceEditor = React.createClass({
    propTypes: {
        choice: React.PropTypes.object,
        showDelete: React.PropTypes.bool,
        onClueChange: React.PropTypes.func,
        onContentChange: React.PropTypes.func,
        onDelete: React.PropTypes.func
    },

    render: function() {
        var checkedClass = this.props.choice.correct ? "correct" : "incorrect";
        var placeholder = "Type a choice here...";

        if (this.props.choice.isNoneOfTheAbove) {
            placeholder = this.props.choice.correct ?
                "Type the answer to reveal to the user..." :
                "None of the above";
        }

        var editor = <Editor
            ref={"content-editor"}
            content={this.props.choice.content || ""}
            widgetEnabled={false}
            placeholder={placeholder}
            disabled={this.props.choice.isNoneOfTheAbove &&
                !this.props.choice.correct}
            onChange={this.props.onContentChange} />;

        var clueEditor = <Editor
            ref={"clue-editor"}
            content={this.props.choice.clue || ""}
            widgetEnabled={false}
            placeholder={i18n._(`Why is this choice ${checkedClass}?`)}
            onChange={this.props.onClueChange} />;

        var deleteLink = <a href="#"
                className="simple-button orange delete-choice"
                title="Remove this choice"
                onClick={this.props.onDelete}>
            <span className="icon-trash" />
        </a>;

        return <div className="choice-clue-editors">
            <div className={`choice-editor ${checkedClass}`}>
                {editor}
            </div>
            <div className="clue-editor">
                {clueEditor}
            </div>
            {this.props.showDelete && deleteLink}
        </div>;
    }
});

var BaseRadio = React.createClass({
    propTypes: {
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
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
        // TODO(aria): Stop this from mutating the id every time someone
        // clicks on a radio :(
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";
        var rubric = this.props.reviewModeRubric;

        return <fieldset className="perseus-widget-radio-fieldset">
            <legend className="perseus-sr-only">{this.props.multipleSelect ?
                <$_>Select all that apply.</$_> :
                <$_>Please choose from one of the following options.</$_>
            }</legend>
            <ul className={"perseus-widget-radio " +
                "above-scratchpad blank-background"}>
                {this.props.multipleSelect &&
                    <div className="instructions">
                        <$_>Select all that apply.</$_>
                    </div>}
                {this.props.choices.map(function(choice, i) {
                    // True if we're in review mode and a clue (aka rationale)
                    // is available. These are only used for SAT questions,
                    // though there was historically an inconclusive AB test
                    // that showed clues for other exercises.
                    // (See content/targeted_clues_exercises.py for more)
                    // TODO(marcia): Aria recommends bringing this logic up a
                    // level, as with this.props.questionCompleted.
                    var reviewModeClues = !!(rubric && rubric.choices[i].clue);

                    var Element = Choice;
                    var elementProps = {
                        ref: `radio${i}`,
                        checked: choice.checked,
                        correct: (rubric && rubric.choices[i].correct),
                        clue: choice.clue,
                        content: choice.content,
                        disabled: this.props.apiOptions.readOnly,
                        groupName: radioGroupName,
                        showClue: reviewModeClues,
                        type: inputType,
                        pos: i,
                        deselectEnabled: this.props.deselectEnabled,
                        onChecked: (checked) => {
                            this.checkOption(i, checked);
                        }
                    };

                    if (choice.isNoneOfTheAbove) {
                        Element = ChoiceNoneAbove;
                        _.extend(elementProps, {showContent: choice.correct});
                    }

                    var className = classNames(
                        // TODO(aria): Make test case for these API classNames
                        ApiClassNames.RADIO.OPTION,
                        choice.checked && ApiClassNames.RADIO.SELECTED,
                        !this.props.onePerLine && "inline",
                        (rubric && rubric.choices[i].correct &&
                            ApiClassNames.CORRECT
                        ),
                        (rubric && !rubric.choices[i].correct &&
                            ApiClassNames.INCORRECT
                        )
                    );

                    // TODO(mattdr): Index isn't a *good* choice of key here;
                    // is there a better one? Can we use choice content
                    // somehow? Would changing our choice of key somehow break
                    // any voodoo happening inside a choice's child Renderers
                    // by changing when we mount/unmount?
                    return <li className={className} key={i}
                            onTouchStart={!this.props.labelWrap ?
                                null : captureScratchpadTouchStart
                            }>
                        <Element {...elementProps} />
                    </li>;
                }, this)}
            </ul>
        </fieldset>;
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
        ReactDOM.findDOMNode(this.refs["radio" + (i || 0)]).focus();
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

    render: function() {
        var choices = this.props.choices;
        var values = this.props.values || _.map(choices, () => false);

        choices = _.map(choices, (choice, i) => {
            var content = (choice.isNoneOfTheAbove && !choice.content) ?
                // we use i18n._ instead of $_ here because the content
                // sent to a renderer needs to be a string, not a react
                // node (/renderable/fragment).
                i18n._("None of the above") :
                choice.content;
            return {
                content: this._renderRenderer(content),
                checked: values[i],
                correct: this.props.questionCompleted && values[i],
                clue: this._renderRenderer(choice.clue),
                isNoneOfTheAbove: choice.isNoneOfTheAbove
            };
        });
        choices = this.enforceOrdering(choices);

        return <BaseRadio
            ref="baseRadio"
            labelWrap={true}
            onePerLine={this.props.onePerLine}
            multipleSelect={this.props.multipleSelect}
            choices={choices}
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
            /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
            (match, passageNum, refNum, summaryText) => {
                var widgetId = "passage-ref " + nextPassageRefId;
                nextPassageRefId++;

                widgets[widgetId] = {
                    type: "passage-ref",
                    graded: false,
                    options: {
                        passageNumber: parseInt(passageNum),
                        referenceNumber: parseInt(refNum),
                        summaryText: summaryText,
                    },
                    version: PassageRef.version
                };

                return "[[" + Util.snowman + " " + widgetId + "]]";
            }
        );

        // alwaysUpdate={true} so that passage-refs interwidgets
        // get called when the outer passage updates the renderer
        // TODO(aria): This is really hacky
        // We pass in a key here so that we avoid a semi-spurious
        // react warning when the ChoiceNoneAbove renders a
        // different renderer in the same place. Note this destroys
        // state, but since all we're doing is outputting
        // "None of the above", that is okay.
        return <Renderer
                key="choiceContentRenderer"
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

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    onCheckedChange: function(checked) {
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

            return {
                values: values,
                noneOfTheAboveIndex: noneOfTheAboveIndex,
                noneOfTheAboveSelected: noneOfTheAboveSelected
            };
        } else {
            // Nothing checked
            return {
                values: _.map(this.props.choices, () => false)
            };
        }
    },

    simpleValidate: function(rubric) {
        return Radio.validate(this.getUserInput(), rubric);
    },

    enforceOrdering: function(choices) {
        var content = _.pluck(choices, "content");
        if (_.isEqual(content, [i18n._("False"), i18n._("True")]) ||
            _.isEqual(content, [i18n._("No"), i18n._("Yes")])) {
            return ([choices[1]]).concat([choices[0]]);
        }
        return choices;
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
                message: i18n._("'None of the above' may not be selected " +
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
        hasNoneOfTheAbove: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool,
        deselectEnabled: React.PropTypes.bool,
        static: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            choices: [{}, {}],
            displayCount: null,
            randomize: false,
            hasNoneOfTheAbove: false,
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
                                Use one answer per line unless your question
                                has images that might cause the answers to go
                                off the page.
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
                {!this.props.static &&
                    <div className="perseus-widget-right-col">
                        <PropCheckBox
                            label="Radio deselect enabled"
                            labelAlignment="right"
                            deselectEnabled={this.props.deselectEnabled}
                            onChange={this.props.onChange} />
                    </div>}
            </div>

            <BaseRadio
                ref="baseRadio"
                multipleSelect={this.props.multipleSelect}
                onePerLine={true}
                labelWrap={false}
                apiOptions={this.props.apiOptions}
                choices={this.props.choices.map(function(choice, i) {
                    return {
                        content: <ChoiceEditor
                            ref={`choice-editor${i}`}
                            choice={choice}
                            onContentChange={(newProps) => {
                                if ("content" in newProps) {
                                    this.onContentChange(i, newProps.content);
                                }
                            }}
                            onClueChange={(newProps) => {
                                if ("content" in newProps) {
                                    this.onClueChange(i, newProps.content);
                                }
                            }}
                            onDelete={this.onDelete.bind(this, i)}
                            showDelete={this.props.choices.length >= 2} />,
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

                {!this.props.hasNoneOfTheAbove &&
                    <a href="#" className="simple-button"
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
                content: choice.isNoneOfTheAbove && !checked[i] ?
                        '' : choice.content,
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
            hasNoneOfTheAbove: this.props.hasNoneOfTheAbove &&
                !deleted.isNoneOfTheAbove,
        });
    },

    addChoice: function(noneOfTheAbove, e) {
        e.preventDefault();

        var choices = this.props.choices.slice();
        var newChoice = { isNoneOfTheAbove: noneOfTheAbove };
        var addIndex = choices.length - (this.props.hasNoneOfTheAbove ? 1 : 0);

        choices.splice(addIndex, 0, newChoice);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove: noneOfTheAbove || this.props.hasNoneOfTheAbove
        }, () => {
            this.refs[`choice-editor${addIndex}`]
                .refs['content-editor'].focus();
        });
    },

    setDisplayCount: function(num) {
        this.props.onChange({displayCount: num});
    },

    focus: function() {
        this.refs['choice-editor0'].refs['content-editor'].focus();
        return true;
    },

    getSaveWarnings: function() {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["No choice is marked as correct."];
        }
        return [];
    },

    serialize: function() {
        return _.pick(this.props, "choices", "randomize", "multipleSelect",
            "displayCount", "hasNoneOfTheAbove", "onePerLine",
            "deselectEnabled");
    }
});

var _choiceTransform = (editorProps, problemNum) => {
    var _maybeRandomize = function(array) {
        return editorProps.randomize ? shuffle(array, problemNum) : array;
    };

    var _addNoneOfAbove = function(choices) {
        var noneOfTheAbove = null;

        var newChoices = _.reject(choices, function(choice, index) {
            if (choice.isNoneOfTheAbove) {
                noneOfTheAbove = choice;
                return true;
            }
        });

        // Place the "None of the above" options last
        if (noneOfTheAbove) {
            newChoices.push(noneOfTheAbove);
        }

        return newChoices;
    };

    // Add meta-information to choices
    var choices = editorProps.choices.slice();
    choices = _.map(choices, (choice, i) => {
        return _.extend({}, choice, { originalIndex: i });
    });

    // Randomize and add 'None of the above'
    return _addNoneOfAbove(_maybeRandomize(choices));
};

var radioTransform = (editorProps, problemNum) => {
    var choices = _.map(_choiceTransform(editorProps, problemNum),
        (choice) => _.omit(choice, 'correct'));

    editorProps = _.extend({}, editorProps, { choices: choices });
    return _.pick(editorProps, "choices", "hasNoneOfTheAbove", "onePerLine",
        "multipleSelect", "correctAnswer", "deselectEnabled");
};

var staticTransform = (editorProps, problemNum) => {
    var choices = _choiceTransform(editorProps, problemNum);
    // The correct answers are the selected values in the rendered widget
    var selectedChoices = _.pluck(choices, "correct");

    var selectedProps = _.pick(editorProps, "hasNoneOfTheAbove", "onePerLine",
        "multipleSelect", "correctAnswer", "deselectEnabled");
    var staticProps = _.extend({}, selectedProps, {
        choices: choices,
        values: selectedChoices,
    });
    return staticProps;
};

var propUpgrades = {
    1: (v0props) => {
        var choices;
        var hasNoneOfTheAbove;

        if (!v0props.noneOfTheAbove) {
            choices = v0props.choices;
            hasNoneOfTheAbove = false;

        } else {
            choices = _.clone(v0props.choices);
            var noneOfTheAboveIndex = _.random(0, v0props.choices.length - 1);
            var noneChoice = _.extend(
                {},
                v0props.choices[noneOfTheAboveIndex],
                {
                    isNoneOfTheAbove: true,
                }
            );
            choices.splice(noneOfTheAboveIndex, 1);
            choices.push(noneChoice);
            hasNoneOfTheAbove = true;
        }

        return _.extend(_.omit(v0props, "noneOfTheAbove"), {
            choices: choices,
            hasNoneOfTheAbove: hasNoneOfTheAbove,
        });
    },
};

module.exports = {
    name: "radio",
    displayName: "Multiple choice",
    accessible: true,
    widget: Radio,
    editor: RadioEditor,
    transform: radioTransform,
    staticTransform: staticTransform,
    version: { major: 1, minor: 0 },
    propUpgrades: propUpgrades,
};

