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

import {getOptionStatusText} from "./utils/string-utils";

interface OptionStatusProps {
    // Was this option the correct answer?
    correct: boolean;
    // Did the user select this option as the answer?
    checked: boolean;
    // Did the user select this option as the answer earlier?
    previouslyAnswered: boolean;
    reviewMode: boolean;
}

/**
 * This component is a duplicate of the OptionStatus component in option-status.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component will eventually replace option-status.tsx when the feature flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
const OptionStatus = ({
    checked,
    correct,
    previouslyAnswered,
    reviewMode,
}: OptionStatusProps): React.ReactElement | null => {
    const {strings} = usePerseusI18n();

    // Option status is shown only in review mode, or for incorrectly
    // answered items.
    if (!reviewMode && !previouslyAnswered) {
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
            {getOptionStatusText({
                checked,
                correct,
                strings,
            })}
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
        textAlign: "start",
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
