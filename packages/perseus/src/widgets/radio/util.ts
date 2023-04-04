import * as i18n from "@khanacademy/wonder-blocks-i18n";

/**
 * Given a choice's position in the radio widget, return the corresponding
 * "choice letter". (For example, in English, `getChoiceLetter(0)` is "A",
 * `getChoiceLetter(1)` is "B", etc.)
 */
export function getChoiceLetter(pos: number): string {
    /* I18N: This is a list of single-character labels that will appear in
     * front of multiple-choice options. For instance, a multiple-choice
     * question with three options would display
     *  (A) first option
     *  (B) second option
     *  (C) third option
     * There must be spaces between each of the different characters. The
     * characters will show up next to options in the order that they are
     * listed here. Most multiple choice questions have 5 or fewer options.
     */
    const lettersString = i18n._(
        "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    );

    const letters = lettersString.split(" ");

    if (pos < letters.length) {
        // If the position we need is listed in the localized string, use that.
        return letters[pos];
    }
    // If we're out of letters, give up and return a space.
    return " ";
}
