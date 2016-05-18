const _ = require("underscore");

const shuffle = require("../util.js").shuffle;

const Radio = require("./radio/widget.jsx");

const _choiceTransform = (editorProps, problemNum) => {
    const _maybeRandomize = function(array) {
        return editorProps.randomize ? shuffle(array, problemNum) : array;
    };

    const _addNoneOfAbove = function(choices) {
        let noneOfTheAbove = null;

        const newChoices = _.reject(choices, function(choice, index) {
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
    let choices = editorProps.choices.slice();
    choices = _.map(choices, (choice, i) => {
        return _.extend({}, choice, { originalIndex: i });
    });

    // Randomize and add 'None of the above'
    return _addNoneOfAbove(_maybeRandomize(choices));
};

const radioTransform = (editorProps, problemNum) => {
    const choices = _.map(_choiceTransform(editorProps, problemNum),
        (choice) => _.omit(choice, 'correct'));

    editorProps = _.extend({}, editorProps, { choices: choices });
    return _.pick(editorProps, "choices", "hasNoneOfTheAbove", "onePerLine",
        "multipleSelect", "correctAnswer", "deselectEnabled");
};

const staticTransform = (editorProps, problemNum) => {
    const choices = _choiceTransform(editorProps, problemNum);
    // The correct answers are the selected values in the rendered widget
    const selectedChoices = _.pluck(choices, "correct");

    const selectedProps = _.pick(editorProps, "hasNoneOfTheAbove", "onePerLine",
        "multipleSelect", "correctAnswer", "deselectEnabled");
    const staticProps = _.extend({}, selectedProps, {
        choices: choices,
        values: selectedChoices,
    });
    return staticProps;
};

const propUpgrades = {
    1: (v0props) => {
        let choices;
        let hasNoneOfTheAbove;

        if (!v0props.noneOfTheAbove) {
            choices = v0props.choices;
            hasNoneOfTheAbove = false;

        } else {
            choices = _.clone(v0props.choices);
            const noneOfTheAboveIndex = _.random(0, v0props.choices.length - 1);
            const noneChoice = _.extend(
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

