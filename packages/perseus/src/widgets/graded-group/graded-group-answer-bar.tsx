/**
 * Renders the answer bar for graded groups. [STATELESS]
 */
import Button from "@khanacademy/wonder-blocks-button";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {iconStar, iconTryAgain} from "../../icon-paths";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";

import type {APIOptions} from "../../types";

export type ANSWER_BAR_STATES =
    // The 'Check' button is active whenever the question is answerable or any
    // of the input widgets have been modified after getting the answer wrong.
    | "ACTIVE"
    // The 'Check' button is disabled and there is no message.  This is the initial state and also occurs when
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
    // Points at the status result once it is rendered ("Correct!" or "Keep
    // trying"), so GradedGroup can move focus there for screen readers.
    resultRef?: React.Ref<HTMLOutputElement>;
};

function GradedGroupAnswerBar({
    apiOptions,
    answerBarState,
    onCheckAnswer,
    onNextQuestion,
    resultRef,
}: Props) {
    const {strings} = usePerseusI18n();
    const {keepTrying, tryAgain, check, correctExcited, nextQuestion} = strings;

    const answerBarStyle = {
        ...styles.answerBar,
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
                <output
                    ref={resultRef}
                    tabIndex={-1}
                    style={{marginInlineStart: 8}}
                >
                    {keepTrying}
                </output>
            </span>
        ) : (
            <span />
        ); // empty span keeps the button on the right side

    if (answerBarState !== "CORRECT") {
        const buttonLabel = answerBarState === "INCORRECT" ? tryAgain : check;

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
                <span
                    style={{
                        color: semanticColor.core.foreground.success.default,
                    }}
                >
                    <InlineIcon {...iconStar} style={{marginBlockEnd: 5}} />
                </span>
                {/* <output> is the native element for the result of a
                    user action, and it means screen readers don't read
                    "group" like they would for a span.

                    GradedGroup moves focus here once this renders, which
                    is what reads the result to a screen reader. */}
                <output
                    ref={resultRef}
                    tabIndex={-1}
                    style={{marginInlineStart: 8}}
                >
                    {correctExcited}
                </output>
            </span>
            {onNextQuestion && (
                <Button onClick={onNextQuestion}>{nextQuestion}</Button>
            )}
        </div>
    );
}

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
        borderTop: `${border.width.thin} solid ${semanticColor.core.border.neutral.default}`,
        backgroundColor: semanticColor.core.background.base.subtle,
    },

    tryAgainIcon: {
        color: semanticColor.core.foreground.neutral.subtle,
        transform: "scale(-1,1) rotate(-268deg)",
    },

    text: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: font.weight.bold,
        fontSize: font.body.size.medium,
    },
} as const;

export default GradedGroupAnswerBar;
