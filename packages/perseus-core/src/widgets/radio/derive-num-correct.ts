import type {PerseusRadioWidgetOptions} from "../../data-schema";

export function deriveNumCorrect(
    choices: PerseusRadioWidgetOptions["choices"],
) {
    return choices.filter((c) => c.correct).length;
}
