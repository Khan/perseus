import type {PerseusRadioWidgetOptions} from "../../data-schema";

export function deriveNumCorrect(options: PerseusRadioWidgetOptions) {
    const {choices} = options;

    return choices.filter((c) => c.correct).length;
}
