/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* global i18n */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var Renderer = require("../../renderer.jsx");
var PassageRef = require("../passage-ref.jsx");
var Util = require("../../util.js");

var BaseRadio = require("./base-radio.jsx");


var Radio = React.createClass({
    propTypes: {
        trackInteraction: React.PropTypes.func.isRequired,
    },

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
        this.props.trackInteraction();
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

module.exports = Radio;
