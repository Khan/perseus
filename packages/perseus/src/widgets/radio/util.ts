import type {PerseusStrings} from "../../strings";

/**
 * Given a choice's position in the radio widget, return the corresponding
 * "choice letter". (For example, in English, `getChoiceLetter(0)` is "A",
 * `getChoiceLetter(1)` is "B", etc.)
 */
export function getChoiceLetter(pos: number, strings: PerseusStrings): string {
    const lettersString = strings.letters;

    const letters = lettersString.split(" ");

    if (pos < letters.length) {
        // If the position we need is listed in the localized string, use that.
        return letters[pos];
    }
    // If we're out of letters, give up and return a space.
    return " ";
}
