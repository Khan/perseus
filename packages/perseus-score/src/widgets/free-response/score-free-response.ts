import type {
    PerseusFreeResponseUserInput,
    PerseusFreeResponseRubric,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreFreeResponse(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusFreeResponseUserInput | undefined,
    rubric: PerseusFreeResponseRubric,
    locale: string,
): PerseusScore {
    // TODO(AX-961): Implement support for external scoring. Since the user's
    //     input is free text input, we can't easily do scoring inside the
    //     widget, so we'll need to have a way to do it by some other method.
    //     For now, we'll just always give full credit.
    return {
        type: "points",
        earned: 0,
        total: 0,
        message: null,
    };
}

export default scoreFreeResponse;
