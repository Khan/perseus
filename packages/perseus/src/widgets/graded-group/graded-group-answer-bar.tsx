/**
 * Renders answer bar for mobile graded groups. [STATELESS]
 */
import Button from "@khanacademy/wonder-blocks-button";
import {color} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {iconStar, iconTryAgain} from "../../icon-paths";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";

import type {APIOptions} from "../../types";

export type ANSWER_BAR_STATES =
    // Initial state before the question is answerable.  The user must complete
    // each of the widgets before the answer bar becomes visible.
    | "HIDDEN"
    // The 'Check' button is active whenever the question is answerable or any
    // of the input widgets have been modified after getting the answer wrong.
    | "ACTIVE"
    // The 'Check' button is disabled and there is no message.  This occurs when
    // some of the widgets haven't been filled in after the answer bar has already become
    // visible.
    | "INACTIVE"
    // This happens immediately after clicking 'Check' with a wrong answer.
    // The 'Check' button is disabled and the 'Try Again' message is displayed.
    | "INCORRECT"
    // Final state.  This occurs after the user submits the correct answer.
    // The widgets in this grade-group are disabled.
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
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    render(): React.ReactNode {
        const {apiOptions, answerBarState, onCheckAnswer, onNextQuestion} =
            this.props;
        const {keepTrying, tryAgain, check, correctExcited, nextQuestion} =
            this.context.strings;

        const answerBarStyle = {
            ...styles.answerBar,
            backgroundColor:
                answerBarState === "CORRECT" ? color.offWhite : "white",
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
                    <span style={{marginLeft: 8}}>{keepTrying}</span>
                </span>
            ) : (
                <span />
            ); // empty span keeps the button on the right side

        if (answerBarState !== "CORRECT") {
            const buttonLabel =
                answerBarState === "INCORRECT" ? tryAgain : check;

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
                    <span style={{fontSize: 28, color: color.green}}>
                        <InlineIcon {...iconStar} style={{marginBottom: 5}} />
                    </span>
                    <span
                        role="alert"
                        aria-label={correctExcited}
                        style={{marginLeft: 8}}
                    >
                        {correctExcited}
                    </span>
                </span>
                {onNextQuestion && (
                    <Button onClick={onNextQuestion}>{nextQuestion}</Button>
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
        borderTop: `1px solid ${color.offBlack50}`,
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
