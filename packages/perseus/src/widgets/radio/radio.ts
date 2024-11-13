import _ from "underscore";

import Util from "../../util";

import Radio from "./radio-component";
import scoreRadio from "./score-radio";

import type {RenderProps, RadioChoiceWithMetadata} from "./radio-component";
import type {PerseusRadioWidgetOptions} from "../../perseus-types";
import type {PerseusStrings} from "../../strings";
import type {WidgetExports} from "../../types";

const {shuffle, random} = Util;

// Transforms the choices for display.
const _choiceTransform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
    problemNum?: number | null,
) => {
    const _maybeRandomize = function (
        array: ReadonlyArray<RadioChoiceWithMetadata>,
    ) {
        const randomSeed = problemNum === undefined ? random : problemNum;
        // NOTE: `problemNum` will only be set when the radio widget is
        // rendered at the root of an exercise question. It will be `undefined`
        // if it's rendered embedded in another widget, such as `graded-group`,
        // or if rendered within an article. This results in a predictable
        // shuffle order. To avoid this we use a random seed when `problemNum`
        // is `undefined`.
        return widgetOptions.randomize
            ? shuffle(array, randomSeed ?? 0)
            : array;
    };

    const _addNoneOfAbove = function (
        choices: ReadonlyArray<RadioChoiceWithMetadata>,
    ) {
        let noneOfTheAbove = null;

        const newChoices = choices.filter((choice, index) => {
            if (choice.isNoneOfTheAbove) {
                // @ts-expect-error - TS2322 - Type 'RadioChoiceWithMetadata' is not assignable to type 'null'.
                noneOfTheAbove = choice;
                return false;
            }
            return true;
        });

        // Place the "None of the above" options last
        if (noneOfTheAbove) {
            newChoices.push(noneOfTheAbove);
        }

        return newChoices;
    };

    const enforceOrdering = (
        choices: ReadonlyArray<RadioChoiceWithMetadata>,
    ) => {
        // Represents choices that we automatically re-order if encountered.
        // Note: these are in the reversed (incorrect) order that we will swap, if
        // found.
        // Note 2: these are internationalized when compared later on.
        const ReversedChoices: ReadonlyArray<[string, string]> = [
            [strings.false, strings.true],
            [strings.no, strings.yes],
        ];
        const content = choices.map((c) => c.content);
        if (ReversedChoices.some((reversed) => _.isEqual(content, reversed))) {
            return [choices[1], choices[0]];
        }
        return choices;
    };

    // Add meta-information to choices
    const choices: ReadonlyArray<RadioChoiceWithMetadata> =
        widgetOptions.choices.map((choice, i): RadioChoiceWithMetadata => {
            return {
                ...choice,
                originalIndex: i,
                correct: Boolean(choice.correct),
            };
        });

    // Apply all the transforms. Note that the order we call these is
    // important!
    // 3) finally add "None of the above" to the bottom
    return _addNoneOfAbove(
        // 2) then (potentially) enforce ordering (eg. False, True becomes
        //    True, False)
        enforceOrdering(
            // 1) we randomize the order first
            _maybeRandomize(choices),
        ),
    );
};

const transform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
    problemNum?: number | null,
): RenderProps => {
    const choices = _choiceTransform(widgetOptions, strings, problemNum);

    const numCorrect: number = _.reduce(
        widgetOptions.choices,
        function (memo, choice) {
            return choice.correct ? memo + 1 : memo;
        },
        0,
    );

    const {hasNoneOfTheAbove, multipleSelect, countChoices, deselectEnabled} =
        widgetOptions;

    return {
        numCorrect,
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        deselectEnabled,
        choices,
        selectedChoices: _.pluck(choices, "correct"),
    };
};

const propUpgrades = {
    "1": (v0props: any): any => {
        let choices;
        let hasNoneOfTheAbove;

        if (!v0props.noneOfTheAbove) {
            choices = v0props.choices;
            hasNoneOfTheAbove = false;
        } else {
            throw new Error(
                "radio widget v0 no longer supports auto noneOfTheAbove",
            );
        }

        return _.extend(_.omit(v0props, "noneOfTheAbove"), {
            choices: choices,
            hasNoneOfTheAbove: hasNoneOfTheAbove,
        });
    },
} as const;

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    accessible: true,
    widget: Radio,
    transform: transform,
    staticTransform: transform,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,
    isLintable: true,
    scorer: scoreRadio,
} satisfies WidgetExports<typeof Radio>;
