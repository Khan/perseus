import type {
    PerseusFreeResponseUserInput,
    PerseusFreeResponseRubric,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreFreeResponse(
    userInput: PerseusFreeResponseUserInput,
    rubric: PerseusFreeResponseRubric,
    locale: string,
): PerseusScore {
    // TODO: Implement support for external scoring. Since the user's input is
    //       free text input, we can't easily do scoring inside the widget, so
    //       we'll need to have a way to do it by some other method. For now,
    //       we'll just always give full credit.
    return {
        type: "points",
        earned: 1,
        total: 1,
    };
}

export default scoreFreeResponse;
