import {radioLogic, random} from "@khanacademy/perseus-core";
import _ from "underscore";

import Radio from "./radio.ff";

import type {RenderProps, RadioChoiceWithMetadata} from "./radio-component";
import type {PerseusStrings} from "../../strings";
import type {WidgetExports} from "../../types";
import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import { getWidgetSeed, hashBasedShuffle } from "./hash-shuffle";

// Transforms the choices for display.
const _choiceTransform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
    problemNum?: number | null,
) => {
    const _maybeRandomize = function (
        array: ReadonlyArray<RadioChoiceWithMetadata>,
    ) {
        const randomSeed = getWidgetSeed(random, problemNum)
        // NOTE: `problemNum` will only be set when the radio widget is
        // rendered at the root of an exercise question. It will be `undefined`
        // if it's rendered embedded in another widget, such as `graded-group`,
        // or if rendered within an article. This results in a predictable
        // shuffle order. To avoid this we use a random seed when `problemNum`
        // is `undefined`.
        console.log(`__ randomSeed: ${randomSeed} __`)
        console.log(`__ randomize enabled: ${widgetOptions.randomize} __`)
        console.log(`__ before shuffle:`, array.map(c => c.content))
        const result = widgetOptions.randomize
            ? hashBasedShuffle(array, randomSeed)
            : array;
        console.log(`__ after shuffle:`, result.map(c => c.content))
        return result;
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        console.log(`__ enforceOrdering input:`, content)
        if (ReversedChoices.some((reversed) => _.isEqual(content, reversed))) {
            console.log(`__ enforceOrdering: swapping order`)
            return [choices[1], choices[0]];
        }
        console.log(`__ enforceOrdering: no change`)
        return choices;
    };

    // Add meta-information to choices
    const choices: ReadonlyArray<RadioChoiceWithMetadata> =
        widgetOptions.choices.map((choice, i): RadioChoiceWithMetadata => {
            console.log(`choice ${i}:`, choice, `id: ${choice.id}`)
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

    const {
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        deselectEnabled,
        numCorrect,
    } = widgetOptions;

    return {
        numCorrect: numCorrect as number,
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        deselectEnabled,
        choices,
        selectedChoices: _.pluck(choices, "correct"),
    };
};

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    accessible: true,
    widget: Radio,
    transform: transform,
    staticTransform: transform,
    version: radioLogic.version,
    propUpgrades: radioLogic.widgetOptionsUpgrades,
    isLintable: true,
} satisfies WidgetExports<typeof Radio>;
