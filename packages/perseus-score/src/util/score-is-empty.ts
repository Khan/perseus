import type {PerseusScore} from "@khanacademy/perseus-core";

/**
 * If a widget says that it is empty once it is graded.
 * Trying to encapsulate references to the score format.
 */
export default function scoreIsEmpty(score: PerseusScore): boolean {
    // HACK(benkomalo): ugh. this isn't great; the Perseus score objects
    // overload the type "invalid" for what should probably be three
    // distinct cases:
    //  - truly empty or not fully filled out
    //  - invalid or malformed inputs
    //  - "almost correct" like inputs where the widget wants to give
    //  feedback (e.g. a fraction needs to be reduced, or `pi` should
    //  be used instead of 3.14)
    //
    //  Unfortunately the coercion happens all over the place, as these
    //  Perseus style score objects are created *everywhere* (basically
    //  in every widget), so it's hard to change now. We assume that
    //  anything with a "message" is not truly empty, and one of the
    //  latter two cases for now.
    return (
        score.type === "invalid" &&
        (!score.message || score.message.length === 0)
    );
}
