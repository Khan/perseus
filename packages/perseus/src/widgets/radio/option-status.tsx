/**
 * Renders text indicating whether the choice was correct or
 * not and whether the choice was selected or not.
 * This information is redundant with that provided in the
 * ChoiceIcon visualizations but is meant to make the distinctions
 * between the states more immediately clear to users.
 */

import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

type Props = {
    // Was this option the correct answer?
    correct: boolean;
    // Did the user select this option as the answer?
    checked: boolean;
    // Did the user cross out this option?
    crossedOut: boolean;
    // Did the user select this option as the answer earlier?
    previouslyAnswered: boolean;
    reviewMode: boolean;
};

function renderText(
    checked: boolean,
    correct: boolean,
    crossedOut: boolean,
): string {
    if (correct) {
        // For correct answers, we surface checked _or_ crossedOut state,
        // because any interaction with the correct answer is noteworthy!
        if (checked) {
            return i18n._("Correct (selected)");
        }
        if (crossedOut) {
            return i18n._("Correct (but you crossed it out)");
        }
        return i18n._("Correct");
    }
    // But, for incorrect answers, we only surface checked state,
    // because crossing out an incorrect answer is not noteworthy.
    if (checked) {
        return i18n._("Incorrect (selected)");
    }
    return i18n._("Incorrect");
}

const OptionStatus = function (props: Props): React.ReactElement {
    const {checked, correct, crossedOut, previouslyAnswered, reviewMode} =
        props;

    // Option status is shown only in review mode, or for incorrectly
    // answered items.
    if (!reviewMode && !previouslyAnswered) {
        // @ts-expect-error - TS2322 - Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return null;
    }

    let textStyle;
    if (correct) {
        textStyle = styles.correct;
    } else {
        if (checked || previouslyAnswered) {
            textStyle = styles.incorrectAnswered;
        } else {
            textStyle = styles.incorrect;
        }
    }

    return (
        <div className={css(styles.text, textStyle)}>
            {renderText(checked, correct, crossedOut)}
        </div>
    );
};

const styles = StyleSheet.create({
    text: {
        alignItems: "center",
        display: "flex",
        fontSize: 12,
        height: 32,
        textTransform: "uppercase",
    },
    correct: {
        color: Color.green,
    },
    incorrectAnswered: {
        color: Color.red,
    },
    incorrect: {
        color: Color.offBlack64,
    },
});

export default OptionStatus;
