/* global i18n */

const React = require("react");
const _ = require("underscore");

const Renderer = require("../../renderer.jsx");
const PassageRef = require("../passage-ref.jsx");
const Util = require("../../util.js");

const BaseRadio = require("./base-radio.jsx");

const {
    linterContextProps,
    linterContextDefault,
} = require("../../gorgon/proptypes.js");

const Radio = React.createClass({
    propTypes: {
        apiOptions: BaseRadio.propTypes.apiOptions,
        choices: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.string.isRequired,
                // Clues are called "rationales" in most other places but are
                // left as "clue"s here to preserve legacy widget data.
                clue: React.PropTypes.string,
                correct: React.PropTypes.bool,
                isNoneOfTheAbove: React.PropTypes.bool,
                originalIndex: React.PropTypes.number.isRequired,
            }).isRequired
        ).isRequired,

        deselectEnabled: React.PropTypes.bool,
        displayCount: React.PropTypes.any,
        findWidgets: React.PropTypes.func,
        multipleSelect: React.PropTypes.bool,
        countChoices: React.PropTypes.bool,
        numCorrect: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired,

        questionCompleted: React.PropTypes.bool,
        reviewModeRubric: BaseRadio.propTypes.reviewModeRubric,
        trackInteraction: React.PropTypes.func.isRequired,
        // values is the legacy choiceState data format
        values: React.PropTypes.arrayOf(React.PropTypes.bool),
        choiceStates: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                // Indicates whether this choice is selected. (Inside
                // BaseRadio, this is called `checked`.)
                selected: React.PropTypes.bool,

                // Indicates whether the user has "crossed out" this choice,
                // meaning that they don't think it's correct. This value does
                // not affect scoring or other behavior; it's just a note for
                // the user's reference.
                crossedOut: React.PropTypes.bool,

                highlighted: React.PropTypes.bool,
                rationaleShown: React.PropTypes.bool,
                correctnessShown: React.PropTypes.bool,
                readOnly: React.PropTypes.bool,
            }).isRequired
        ),
        linterContext: linterContextProps,
        static: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            choices: [{}],
            displayCount: null,
            multipleSelect: false,
            countChoices: false,
            deselectEnabled: false,
            linterContext: linterContextDefault,
        };
    },

    _renderRenderer: function(content) {
        content = content || "";

        let nextPassageRefId = 1;
        const widgets = {};

        const modContent = content.replace(
            /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
            (match, passageNum, refNum, summaryText) => {
                const widgetId = "passage-ref " + nextPassageRefId;
                nextPassageRefId++;

                widgets[widgetId] = {
                    type: "passage-ref",
                    graded: false,
                    options: {
                        passageNumber: parseInt(passageNum),
                        referenceNumber: parseInt(refNum),
                        summaryText: summaryText,
                    },
                    version: PassageRef.version,
                };

                return "[[" + Util.snowman + " " + widgetId + "]]";
            }
        );

        // alwaysUpdate={true} so that passage-refs findWidgets
        // get called when the outer passage updates the renderer
        // TODO(aria): This is really hacky
        // We pass in a key here so that we avoid a semi-spurious
        // react warning when the ChoiceNoneAbove renders a
        // different renderer in the same place. Note this destroys
        // state, but since all we're doing is outputting
        // "None of the above", that is okay.
        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <Renderer
                key="choiceContentRenderer"
                content={modContent}
                widgets={widgets}
                findExternalWidgets={this.props.findWidgets}
                alwaysUpdate={true}
                linterContext={this.props.linterContext}
            />
        );
    },

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    // When `BaseRadio`'s `onChange` handler is called, indicating a change in
    // our choices' state, we need to call our `onChange` handler in order to
    // persist those changes in the item's Perseus state.
    //
    // So, given the new values for each choice, construct the new
    // `choiceStates` objects, and pass them to `this.props.onChange`.
    //
    // `newValueLists` is an object with two keys: `checked` and `crossedOut`.
    // Each contains an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    //
    // NOTE(mdr): This method expects to be auto-bound. If this component is
    //     converted to an ES6 class, take care to auto-bind this method!
    updateChoices: function(newValueLists) {
        const {choiceStates, choices} = this.props;

        // Construct the baseline `choiceStates` objects. If this is the user's
        // first interaction with the widget, we'll need to initialize them to
        // new objects with all fields set to the default values. Otherwise, we
        // should clone the old `choiceStates` objects, in preparation to
        // mutate them.
        let newChoiceStates;
        if (choiceStates) {
            newChoiceStates = choiceStates.map(state => ({...state}));
        } else {
            newChoiceStates = choices.map(() => ({
                selected: false,
                crossedOut: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                readOnly: false,
            }));
        }

        // Mutate the new `choiceState` objects, according to the new `checked`
        // and `crossedOut` values provided in `newValueLists`.
        newChoiceStates.forEach((choiceState, i) => {
            choiceState.selected = newValueLists.checked[i];
            choiceState.crossedOut = newValueLists.crossedOut[i];
        });

        this.props.onChange({choiceStates: newChoiceStates});
        this.props.trackInteraction();
    },

    getUserInput: function() {
        // Return checked inputs in the form {choicesSelected: [bool]}. (Dear
        // future timeline implementers: this used to be {value: i} before
        // multiple select was added)
        if (this.props.choiceStates) {
            let noneOfTheAboveIndex = null;
            let noneOfTheAboveSelected = false;

            const choiceStates = this.props.choiceStates;
            const choicesSelected = choiceStates.map(() => false);
            const countChoices = this.props.countChoices;
            const numCorrect = this.props.numCorrect;

            for (let i = 0; i < choicesSelected.length; i++) {
                const index = this.props.choices[i].originalIndex;
                choicesSelected[index] = choiceStates[i].selected;

                if (this.props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;

                    if (choicesSelected[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }

            return {
                countChoices,
                choicesSelected,
                numCorrect,
                noneOfTheAboveIndex,
                noneOfTheAboveSelected,
            };
            // Support legacy choiceState implementation
        } else if (this.props.values) {
            let noneOfTheAboveIndex = null;
            let noneOfTheAboveSelected = false;

            const values = this.props.values.slice();
            const countChoices = this.props.countChoices;
            const numCorrect = this.props.numCorrect;

            for (let i = 0; i < this.props.values.length; i++) {
                const index = this.props.choices[i].originalIndex;
                values[index] = this.props.values[i];

                if (this.props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;
                    if (values[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }
            return {
                choicesSelected: values,
                noneOfTheAboveIndex,
                noneOfTheAboveSelected,
                countChoices,
                numCorrect,
            };
        } else {
            // Nothing checked
            return {
                choicesSelected: _.map(this.props.choices, () => false),
            };
        }
    },

    simpleValidate: function(rubric) {
        return Radio.validate(this.getUserInput(), rubric);
    },

    enforceOrdering: function(choices) {
        const content = _.pluck(choices, "content");
        if (
            _.isEqual(content, [i18n._("False"), i18n._("True")]) ||
            _.isEqual(content, [i18n._("No"), i18n._("Yes")])
        ) {
            return [choices[1]].concat([choices[0]]);
        }
        return choices;
    },

    /**
     * Turn on rationale display for the currently selected choices. Note that
     * this leaves rationales on for choices that are already showing
     * rationales.
     */
    showRationalesForCurrentlySelectedChoices(rubric) {
        if (this.props.choiceStates) {
            const score = this.simpleValidate(rubric);
            const widgetCorrect =
                score.type === "points" && score.total === score.earned;

            const newStates = this.props.choiceStates.map(state => ({
                ...state,
                highlighted: state.selected,
                // If the choice is selected, show the rationale now
                rationaleShown:
                    state.selected ||
                    // If the choice already had a rationale, keep it shown
                    state.rationaleShown ||
                    // If the widget is correctly answered, show the rationale
                    // for all the choices
                    widgetCorrect,
                // We use the same behavior for the readOnly flag as for
                // rationaleShown, but we keep it separate in case other
                // behaviors want to disable choices without showing rationales.
                readOnly: state.selected || state.readOnly || widgetCorrect,
                correctnessShown: state.selected || state.correctnessShown,
            }));

            this.props.onChange(
                {
                    choiceStates: newStates,
                },
                null, // cb
                true // silent
            );
        }
    },

    /**
     * Deselects any currently-selected choices that are not correct choices.
     */
    deselectIncorrectSelectedChoices() {
        if (this.props.choiceStates) {
            const newStates = this.props.choiceStates.map((state, i) => ({
                ...state,
                selected: state.selected && !!this.props.choices[i].correct,
                highlighted: false,
            }));

            this.props.onChange(
                {
                    choiceStates: newStates,
                },
                null, // cb
                false // silent
            );
        }
    },

    render: function() {
        let choices = this.props.choices;
        let choiceStates;
        if (this.props.static) {
            choiceStates = _.map(choices, val => ({
                selected: val.correct,
                crossedOut: val.crossedOut,
                readOnly: true,
                highlighted: false,
                rationaleShown: true,
                correctnessShown: true,
            }));
        } else if (this.props.choiceStates) {
            choiceStates = this.props.choiceStates;
        } else if (this.props.values) {
            // Support legacy choiceStates implementation
            choiceStates = _.map(this.props.values, val => ({
                selected: val,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
            }));
        } else {
            choiceStates = _.map(choices, () => ({
                selected: false,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
            }));
        }

        choices = _.map(choices, (choice, i) => {
            const content =
                choice.isNoneOfTheAbove && !choice.content
                    ? // we use i18n._ instead of $_ here because the content
                      // sent to a renderer needs to be a string, not a react
                      // node (/renderable/fragment).
                      i18n._("None of the above")
                    : choice.content;

            const {
                selected,
                crossedOut,
                rationaleShown,
                correctnessShown,
                readOnly,
                highlighted,
            } = choiceStates[i];

            const reviewChoice =
                this.props.reviewModeRubric &&
                this.props.reviewModeRubric.choices[i];

            return {
                content: this._renderRenderer(content),
                checked: selected,
                // Current versions of the radio widget always pass in the
                // "correct" value through the choices. Old serialized state
                // for radio widgets doesn't have this though, so we have to
                // pull the correctness out of the review mode rubric. This
                // only works because all of the places we use
                // `restoreSerializedState()` also turn on reviewMode, but is
                // fine for now.
                // TODO(emily): Come up with a more comprehensive way to solve
                // this sort of "serialized state breaks when internal
                // structure changes" problem.
                correct:
                    typeof choice.correct === "undefined"
                        ? !!reviewChoice && reviewChoice.correct
                        : choice.correct,
                disabled: readOnly,
                hasRationale: !!choice.clue,
                rationale: this._renderRenderer(choice.clue),
                showRationale: rationaleShown,
                showCorrectness: correctnessShown,
                isNoneOfTheAbove: choice.isNoneOfTheAbove,
                revealNoneOfTheAbove: this.props.questionCompleted && selected,
                crossedOut,
                highlighted,
            };
        });
        choices = this.enforceOrdering(choices);

        return (
            <BaseRadio
                ref="baseRadio"
                labelWrap={true}
                multipleSelect={this.props.multipleSelect}
                countChoices={this.props.countChoices}
                numCorrect={this.props.numCorrect}
                choices={choices}
                onChange={this.updateChoices}
                reviewModeRubric={this.props.reviewModeRubric}
                deselectEnabled={this.props.deselectEnabled}
                apiOptions={this.props.apiOptions}
            />
        );
    },
});

_.extend(Radio, {
    validate: function(state, rubric) {
        const numSelected = _.reduce(
            state.choicesSelected,
            (sum, selected) => {
                return sum + (selected ? 1 : 0);
            },
            0
        );

        if (numSelected === 0) {
            return {
                type: "invalid",
                message: null,
            };
        } else if (state.countChoices && numSelected !== state.numCorrect) {
            return {
                type: "invalid",
                message: i18n._("Please choose the correct number of answers."),
            };
            // If NOTA and some other answer are checked, ...
        } else if (state.noneOfTheAboveSelected && numSelected > 1) {
            return {
                type: "invalid",
                message: i18n._(
                    "'None of the above' may not be selected " +
                        "when other answers are selected."
                ),
            };
        } else {
            /* jshint -W018 */
            const correct = _.all(state.choicesSelected, function(selected, i) {
                let isCorrect;
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
                message: null,
            };
        }
    },
});

module.exports = Radio;
