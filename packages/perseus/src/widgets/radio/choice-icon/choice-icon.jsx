// @flow
/* Component for rendering a letter icon in radio choice */

import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";

import {getChoiceLetter} from "../util.js";

import LibraryChoiceIcon from "./library-choice-icon.jsx";
import SATChoiceIcon from "./sat-choice-icon.jsx";

type ChoiceIconProps = {|
    pos: number,
    checked: boolean,
    crossedOut: boolean,
    focused: boolean,
    hovered: boolean,
    pressed: boolean,
    correct: boolean,
    showCorrectness: boolean,
    // TODO(amy): if we go this "product" flag route, define this type
    // somewhere shared
    product: "sat" | "library",
    multipleSelect: boolean,
    reviewMode: boolean,
    previouslyAnswered: boolean,
    // TODO(mdr): The CrossOutButton needs a transparent-background ChoiceIcon,
    //     so I've added this prop. I'm not sure why we have backgrounds in the
    //     general case, though? When does the choice container have a
    //     non-white background, aside from SAT, which uses a different icon?
    transparentBackground?: boolean,

    primaryProductColor?: string,
|};

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

function ChoiceIcon(props: ChoiceIconProps): React.Node {
    const {
        pos,
        reviewMode,
        checked,
        crossedOut,
        correct,
        product,
        multipleSelect,
        showCorrectness,
        focused,
        hovered,
        pressed,
        primaryProductColor = Color.blue,
        previouslyAnswered,
        transparentBackground,
    } = props;

    const letter = getChoiceLetter(pos);
    const a11yText = getA11yText(
        letter,
        checked,
        correct,
        crossedOut,
        showCorrectness,
    );

    if (product === "sat") {
        return (
            <SATChoiceIcon
                letter={letter}
                a11yText={a11yText}
                reviewMode={reviewMode}
                checked={checked}
                correct={correct}
                crossedOut={crossedOut}
                multipleSelect={multipleSelect}
            />
        );
    }
    return (
        <LibraryChoiceIcon
            letter={letter}
            a11yText={a11yText}
            reviewMode={reviewMode}
            checked={checked}
            crossedOut={crossedOut}
            focused={focused}
            hovered={hovered}
            pressed={pressed}
            correct={correct}
            showCorrectness={showCorrectness}
            primaryProductColor={primaryProductColor}
            previouslyAnswered={previouslyAnswered}
            transparentBackground={transparentBackground}
            multipleSelect={multipleSelect}
        />
    );
}

export default ChoiceIcon;
