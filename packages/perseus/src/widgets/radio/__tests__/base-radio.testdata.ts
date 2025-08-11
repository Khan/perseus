import type {ChoiceType} from "../base-radio";

export function generateChoice(options: Partial<ChoiceType>): ChoiceType {
    const base = {
        id: "",
        checked: false,
        crossedOut: false,
        content: "",
        rationale: "",
        hasRationale: false,
        showRationale: false,
        showCorrectness: false,
        correct: false,
        isNoneOfTheAbove: false,
        highlighted: false,
        previouslyAnswered: false,
        revealNoneOfTheAbove: false,
        disabled: false,
    } as const;

    return {...base, ...options};
}
