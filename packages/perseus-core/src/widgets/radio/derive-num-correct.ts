import type {PerseusRadioWidgetOptions} from "../../data-schema";

export function deriveNumCorrect(options: PerseusRadioWidgetOptions) {
    const {choices, numCorrect} = options;

    return numCorrect ?? choices.filter((c) => c.correct).length;
}
