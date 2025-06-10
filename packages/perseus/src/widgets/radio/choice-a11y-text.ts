import type {PerseusStrings} from "../../strings";

function getA11yText(
    letter: string,
    checked: boolean,
    correct: boolean,
    showCorrectness: boolean,
    strings: PerseusStrings,
): string {
    // There are two pieces of metadata we want to add to each a11yText:
    // whether the answer was checked/not checked, and whether the
    // answer is correct/incorrect/not-yet-revealed.
    //
    // Translation is tricky for cross-product situations like this, so
    // we've just enumerated all 9 possibilities as separate strings.
    if (showCorrectness && correct) {
        if (checked) {
            return strings.choiceCheckedCorrect({
                letter,
            });
        }
        return strings.choiceCorrect({
            letter,
        });
    }
    if (showCorrectness && !correct) {
        if (checked) {
            return strings.choiceCheckedIncorrect({
                letter,
            });
        }

        return strings.choiceIncorrect({
            letter,
        });
    }
    if (checked) {
        return strings.choiceChecked({
            letter,
        });
    }

    return strings.choice({
        letter,
    });
}

export default getA11yText;
