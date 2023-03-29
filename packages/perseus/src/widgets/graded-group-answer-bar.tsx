/**
 * Renders answer bar for mobile graded groups. [STATELESS]
 */
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";

import InlineIcon from "../components/inline-icon";
import {iconStar, iconTryAgain} from "../icon-paths";
import {phoneMargin, negativePhoneMargin} from "../styles/constants";

import type {APIOptions} from "../types";

export type ANSWER_BAR_STATES = // Initial state before the question is answerable.  The user must complete
    // each of the widgets before the answer bar becomes visible.
    // The 'Check' button is active whenever the question is answerable or any
    // of the input widgets have been modified after getting the answer wrong.
    | "HIDDEN" // The 'Check' button is disabled and there is no message.  This occurs when
    // some of the widgets haven't been filled in after the has already become
    // visible.
    | "ACTIVE" // This happens immediately after clicking 'Check' with a wrong answer.
    // The 'Check' button is disabled and the 'Try Again' message is displayed.
    | "INACTIVE" // Final state.  This occurs after the user submits the correct answer.
    // The widgets in this grade-group are disabled.
    | "INCORRECT"
    | "CORRECT";

type Props = {
    answerBarState: ANSWER_BAR_STATES;
    apiOptions: APIOptions;
    onCheckAnswer: () => unknown;
    // The function to call when clicking "Next question" after correctly
    // answering one graded group out of a set. If this is null, the
    // "Next question" button will not appear.
    onNextQuestion?: () => unknown;
};

class GradedGroupAnswerBar extends React.Component<Props> {
    render(): React.ReactNode {
        const {apiOptions, answerBarState, onCheckAnswer, onNextQuestion} =
            this.props;

        const answerBarStyle = {
            ...styles.answerBar,
            backgroundColor:
                answerBarState === "CORRECT" ? Color.offWhite : "white",
            // Center the "Correct!" message only when there's no next question
            justifyContent:
                answerBarState === "CORRECT" && !onNextQuestion
                    ? "center"
                    : "space-between",
        } as const;

        const message =
            answerBarState === "INCORRECT" ? (
                <span style={styles.text}>
                    <span style={styles.tryAgainIcon}>
                        <InlineIcon {...iconTryAgain} />
                    </span>
                    <span style={{marginLeft: 8}}>{i18n._("Keep trying")}</span>
                </span>
            ) : (
                <span />
            ); // empty span keeps the button on the right side

        if (answerBarState !== "CORRECT") {
            const buttonLabel =
                answerBarState === "INCORRECT"
                    ? i18n._("Try again")
                    : i18n._("Check");

            return (
                <div style={answerBarStyle}>
                    {message}
                    <Button
                        disabled={
                            apiOptions.readOnly || answerBarState !== "ACTIVE"
                        }
                        onClick={onCheckAnswer}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            );
        }
        return (
            <div style={answerBarStyle}>
                <span style={styles.text}>
                    <span style={{fontSize: 28, color: Color.green}}>
                        <InlineIcon {...iconStar} style={{marginBottom: 5}} />
                    </span>
                    <span
                        role="alert"
                        aria-label={i18n._("Correct!")}
                        style={{marginLeft: 8}}
                    >
                        {i18n._("Correct!")}
                    </span>
                </span>
                {onNextQuestion && (
                    <Button onClick={onNextQuestion}>
                        {i18n._("Next question")}
                    </Button>
                )}
            </div>
        );
    }
}

const fontSize = 17;

const styles = {
    answerBar: {
        display: "flex",
        alignItems: "center",
        height: 68, // so that we don't have calculate the vertical padding
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        marginBottom: negativePhoneMargin,
        marginTop: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: 10,
        borderTop: `1px solid ${Color.offBlack50}`,
    },

    tryAgainIcon: {
        fontSize: 28,
        color: "#63D9EA",
        transform: "scale(-1,1) rotate(-268deg)",
    },

    text: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: fontSize,
    },
} as const;

export default GradedGroupAnswerBar;
