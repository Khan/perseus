/**
 * Renders the answer bar for graded groups. [STATELESS]
 */
import Button from "@khanacademy/wonder-blocks-button";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import arrowCounterIcon from "@phosphor-icons/core/bold/arrow-counter-clockwise-bold.svg";
import warningIcon from "@phosphor-icons/core/bold/warning-bold.svg";
import starIcon from "@phosphor-icons/core/fill/star-fill.svg";
import * as React from "react";
import {flushSync} from "react-dom";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import styles from "./graded-group-answer-bar.module.css";

import type {APIOptions, TrackingGradedGroupExtraArguments} from "../../types";

// The result of clicking 'Check'. ("correct", "incorrect", "invalid")
export type GradingStatus = TrackingGradedGroupExtraArguments["status"];

export type AnswerBarState =
    // The initial state, and the state the group returns to whenever an input
    // widget is modified after checking. The 'Check' button is offered and
    // there is no result.
    | "active"
    // Immediately after clicking 'Check', the answer bar shows the result
    // until the user changes their answer.
    | GradingStatus;

type Props = {
    answerBarState: AnswerBarState;
    apiOptions: APIOptions;
    // A string explaining why the answer is invalid / couldn't be checked.
    invalidMessage?: string;
    onCheckAnswer: () => unknown;
    // The function to call when clicking "Next question" after correctly
    // answering one graded group out of a set. If this is null, the
    // "Next question" button will not appear.
    onNextQuestion?: () => unknown;
};

function GradedGroupAnswerBar({
    apiOptions,
    answerBarState,
    invalidMessage,
    onCheckAnswer,
    onNextQuestion,
}: Props) {
    const {strings} = usePerseusI18n();
    const {keepTrying, check, correctExcited, nextQuestion} = strings;

    const resultRef = React.useRef<HTMLOutputElement>(null);

    // Move focus to the status message every time the user checks their answer,
    // so that the message is read by the screen reader. We want this on every
    // check, even if the answer/result hasn't changed.
    // Moving focus here also keeps it off the body when a correct answer
    // unmounts the "Check" button.
    const handleCheckAnswer = () => {
        // React waits until the handler finishes before updating
        // the page, so the status message wouldn't exist yet for us to
        // focus. `flushSync` makes React show it right away.
        flushSync(onCheckAnswer);
        resultRef.current?.focus();
    };

    const stateInfoMap = {
        correct: {
            icon: starIcon,
            iconColor: semanticColor.core.foreground.success.default,
            text: correctExcited,
        },
        incorrect: {
            icon: arrowCounterIcon,
            iconColor: semanticColor.core.foreground.neutral.subtle,
            text: keepTrying,
        },
        invalid: {
            icon: warningIcon,
            iconColor: semanticColor.core.border.warning.strong,
            text: invalidMessage,
            // This one explains what went wrong rather than announcing a
            // result, so it isn't emphasized like the other two.
        },
        active: null,
    } as const;
    const stateInfo = stateInfoMap[answerBarState];

    const action =
        // If the answer is correct, show the "Next Question" button,
        // if applicable (i.e. in a Graded Group Set).
        answerBarState === "correct"
            ? onNextQuestion && {
                  label: nextQuestion,
                  onClick: onNextQuestion,
                  // The "Next question" button is never disabled
                  // after correctly answering a question.
                  disabled: false,
              }
            : {
                  // Otherwise, show the "Check" button
                  label: check,
                  onClick: handleCheckAnswer,
                  disabled: apiOptions.readOnly,
              };

    return (
        <div className={styles.answerBar}>
            {/* Render the <span> whether `stateInfo` is available or not,
                so that `space-between` keeps the button at the inline-end of
                the bar while there's no result to sit at the inline-start. */}
            <span className={styles.message}>
                {stateInfo && (
                    <>
                        <PhosphorIcon
                            icon={stateInfo.icon}
                            color={stateInfo.iconColor}
                        />
                        {/* <output> is the native element for the result of a
                            user action, and it means screen readers don't read
                            "group" like they would for a span.

                            Focus moves here on every check, which is what
                            reads the result out to a screen reader. */}
                        <output
                            ref={resultRef}
                            tabIndex={-1}
                            className={styles.result}
                        >
                            <Renderer
                                content={stateInfo.text}
                                strings={strings}
                                apiOptions={apiOptions}
                            />
                        </output>
                    </>
                )}
            </span>
            {action && (
                <Button disabled={action.disabled} onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
}

export default GradedGroupAnswerBar;
