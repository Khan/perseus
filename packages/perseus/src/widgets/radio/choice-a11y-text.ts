import * as i18n from "@khanacademy/wonder-blocks-i18n";

function getA11yText(
    letter: string,
    checked: boolean,
    correct: boolean,
    crossedOut: boolean,
    showCorrectness: boolean,
): string {
    // There are two pieces of metadata we want to add to each a11yText:
    // whether the answer was checked/crossed-out/neither, and whether the
    // answer is correct/incorrect/not-yet-revealed.
    //
    // Translation is tricky for cross-product situations like this, so
    // we've just enumerated all 9 possibilities as separate strings.
    if (showCorrectness && correct) {
        if (checked) {
            return i18n._("(Choice %(letter)s, Checked, Correct)", {
                letter,
            });
        }
        if (crossedOut) {
            return i18n._("(Choice %(letter)s, Crossed out, Correct)", {
                letter,
            });
        }
        return i18n._("(Choice %(letter)s, Correct)", {
            letter,
        });
    }
    if (showCorrectness && !correct) {
        if (checked) {
            return i18n._("(Choice %(letter)s, Checked, Incorrect)", {
                letter,
            });
        }
        if (crossedOut) {
            return i18n._("(Choice %(letter)s, Crossed out, Incorrect)", {
                letter,
            });
        }
        return i18n._("(Choice %(letter)s, Incorrect)", {
            letter,
        });
    }
    if (checked) {
        return i18n._("(Choice %(letter)s, Checked)", {
            letter,
        });
    }
    if (crossedOut) {
        return i18n._("(Choice %(letter)s, Crossed out)", {
            letter,
        });
    }
    return i18n._("(Choice %(letter)s)", {
        letter,
    });
}

export default getA11yText;
