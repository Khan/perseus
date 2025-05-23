/**
 * Renders text indicating whether the choice was correct or
 * not and whether the choice was selected or not.
 * This information is redundant with that provided in the
 * ChoiceIcon visualizations but is meant to make the distinctions
 * between the states more immediately clear to users.
 */

import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";

import type {PerseusStrings} from "../../strings";

type Props = {
    // Was this option the correct answer?
    correct: boolean;
    // Did the user select this option as the answer?
    checked: boolean;
    // Did the user select this option as the answer earlier?
    previouslyAnswered: boolean;
    reviewMode: boolean;
};

function renderText(
    checked: boolean,
    correct: boolean,
    strings: PerseusStrings,
): string {
    if (correct) {
        // For correct answers, we surface checked state,
        // because any interaction with the correct answer is noteworthy!
        if (checked) {
            return strings.correctSelected;
        }
        return strings.correct;
    }
    // But, for incorrect answers, we only surface checked state,
    // because crossing out an incorrect answer is not noteworthy.
    if (checked) {
        return strings.incorrectSelected;
    }
    return strings.incorrect;
}

const OptionStatus = function (props: Props): React.ReactElement {
    const {checked, correct, previouslyAnswered, reviewMode} = props;

    const {strings} = usePerseusI18n();

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
            {renderText(checked, correct, strings)}
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
        color: color.green,
    },
    incorrectAnswered: {
        color: color.red,
    },
    incorrect: {
        color: color.offBlack64,
    },
});

export default OptionStatus;
