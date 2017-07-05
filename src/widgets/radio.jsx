/* eslint-disable no-var, object-curly-spacing */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");

var shuffle = require("../util.js").shuffle;

var Radio = require("./radio/widget.jsx");

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

var transform = (editorProps, problemNum) => {
    const choices = _choiceTransform(editorProps, problemNum);

    const numCorrect = _.reduce(editorProps.choices,
            function(memo, choice) {
                return choice.correct ? memo + 1 : memo;
            }, 0);

    const {
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        correctAnswer,
        deselectEnabled,
    } = editorProps;

    return {
        numCorrect,
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        correctAnswer,
        deselectEnabled,
        choices,
        selectedChoices: _.pluck(choices, "correct"),
    };
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
    transform: transform,
    staticTransform: transform,
    version: { major: 1, minor: 0 },
    propUpgrades: propUpgrades,
    isLintable: true,
};
