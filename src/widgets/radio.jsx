/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, object-curly-spacing */
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
    transform: radioTransform,
    staticTransform: staticTransform,
    version: { major: 1, minor: 0 },
    propUpgrades: propUpgrades,
};
