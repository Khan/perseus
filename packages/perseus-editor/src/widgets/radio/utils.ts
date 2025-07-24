import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";

export function getMovedChoices(
    choices: PerseusRadioChoice[],
    hasNoneOfTheAbove: boolean,
    choiceIndex: number,
    movement: ChoiceMovementType,
): PerseusRadioChoice[] {
    const newChoices = [...choices];
    const [removedChoice] = newChoices.splice(choiceIndex, 1);

    switch (movement) {
        case "top":
            // No need to move the first choice to the top since it's already there.
            if (choiceIndex === 0) {
                return choices;
            }

            // Move the removed choice to the beginning/top of the array.
            newChoices.unshift(removedChoice);
            break;
        case "up":
            // No need to move the first choice up since it's already at the top.
            if (choiceIndex === 0) {
                return choices;
            }

            // Move the removed choice to the position before its current index.
            newChoices.splice(choiceIndex - 1, 0, removedChoice);
            break;
        case "down":
            // No need to move the last choice down since it's already at the bottom.
            if (choiceIndex === choices.length - 1) {
                return choices;
            }

            // If the current choice is the second to last choice and the
            // last choice is "None of the above", we don't want to move
            // the current choice down. Keep the "None of the above" choice
            // as the last choice.
            if (choiceIndex === choices.length - 2 && hasNoneOfTheAbove) {
                return choices;
            }

            // Move the removed choice to the position after its current index.
            newChoices.splice(choiceIndex + 1, 0, removedChoice);
            break;
        case "bottom":
            // No need to move the last choice to the bottom since it's already there.
            if (choiceIndex === choices.length - 1) {
                return choices;
            }

            // If the last choice is "None of the above", we don't want to move
            // the current choice to the bottom. Keep the "None of the above"
            // choice as the last choice, and move the current choice to the
            // second to last position.
            if (hasNoneOfTheAbove) {
                const removedNoneOfTheAbove = newChoices.pop();
                newChoices.push(removedChoice);

                if (removedNoneOfTheAbove) {
                    newChoices.push(removedNoneOfTheAbove);
                }
            } else {
                newChoices.push(removedChoice);
            }
            break;
    }

    return newChoices;
}
