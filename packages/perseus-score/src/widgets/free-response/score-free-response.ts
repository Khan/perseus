import scoreNoop from "../../util/score-noop";

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
    // TODO(AX-961): Implement support for external scoring. Since the user's
    //     input is free text input, we can't easily do scoring inside the
    //     widget, so we'll need to have a way to do it by some other method.
    //     For now, we'll just always give full credit.
    return scoreNoop();
}

export default scoreFreeResponse;
