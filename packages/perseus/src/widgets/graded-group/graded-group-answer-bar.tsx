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

import type {APIOptions, TrackingGradedGroupExtraArguments} from "../../types";

// The result of clicking 'Check'. ("correct", "incorrect", "invalid")
export type GradingStatus = TrackingGradedGroupExtraArguments["status"];

export type AnswerBarState =
    // The 'Check' button is active whenever the question is answerable or any
    // of the input widgets have been modified after getting the answer wrong.
    | "active"
    // The 'Check' button is disabled and there is no message.  This is the initial state and also occurs when
    // some of the widgets haven't been filled in after the answer bar has already become
    // visible.
    | "inactive"
    // Immediately after clicking 'Check', the answer bar shows the result
    // until the user changes their answer.
    | GradingStatus;

type Props = {
    answerBarState: AnswerBarState;
    apiOptions: APIOptions;
    onCheckAnswer: () => unknown;
    // The function to call when clicking "Next question" after correctly
    // answering one graded group out of a set. If this is null, the
    // "Next question" button will not appear.
    onNextQuestion?: () => unknown;
};

function GradedGroupAnswerBar({
    apiOptions,
    answerBarState,
    onCheckAnswer,
    onNextQuestion,
}: Props) {
    const {strings} = usePerseusI18n();
    const {keepTrying, tryAgain, check, correctExcited, nextQuestion} = strings;

    const resultRef = React.useRef<HTMLOutputElement>(null);
    const prevAnswerBarState = React.useRef(answerBarState);

    // Don't let focus fall back to the body after answer is checked and
    // the "Check/Try again" button is unmounted.
    React.useEffect(() => {
        resultRef.current?.focus();
        prevAnswerBarState.current = answerBarState;
    }, [answerBarState]);

    const answerBarStyle = {
        ...styles.answerBar,
        // Center the "Correct!" message only when there's no next question
        justifyContent:
            answerBarState === "correct" && !onNextQuestion
                ? "center"
                : "space-between",
    } as const;

    const message =
        answerBarState === "incorrect" ? (
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

    if (answerBarState !== "correct") {
        const buttonLabel = answerBarState === "incorrect" ? tryAgain : check;

        return (
            <div style={answerBarStyle}>
                {message}
                <Button
                    disabled={
                        apiOptions.readOnly || answerBarState !== "active"
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
