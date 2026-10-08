import {KeypadContext} from "@khanacademy/keypad-context";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg";
import xCircle from "@phosphor-icons/core/regular/x-circle.svg";
import * as React from "react";

import {usePerseusI18n} from "../components/i18n-context";
import {useDependencies} from "../dependencies";
import WrappedServerItemRenderer from "../server-item-renderer";
import {mapErrorToString} from "../strings";

import styles from "./perseus-question.module.css";

import type {PerseusQuestionState} from "./use-perseus-question";
import type {PerseusStrings} from "../strings";
import type {APIOptions} from "../types";

export type PerseusQuestionProps = {
    /** The value returned by `usePerseusQuestion`. */
    question: PerseusQuestionState;
    /** Passed to ServerItemRenderer. `readOnly` is forced on once finished. */
    apiOptions?: APIOptions;
};

const defaultApiOptions: APIOptions = Object.freeze({});

/**
 * Renders the item for a `usePerseusQuestion` state: answerless until
 * checked, then locked with solutions shown once finished. The Check button
 * is the host's; wire it to `question.check`.
 */
export function PerseusQuestion({
    question,
    apiOptions = defaultApiOptions,
}: PerseusQuestionProps): React.ReactElement {
    const dependencies = useDependencies();
    const {isFinished} = question;
    const {item, revealedItem, rendererRef} = question._internal;

    const rendererApiOptions = React.useMemo(
        () => (isFinished ? {...apiOptions, readOnly: true} : apiOptions),
        [apiOptions, isFinished],
    );

    return (
        <KeypadContext.Consumer>
            {({keypadElement}) => (
                <WrappedServerItemRenderer
                    ref={rendererRef}
                    // Swapping the item (with no key change) keeps the
                    // learner's input when solutions are revealed.
                    item={revealedItem ?? item}
                    showSolutions={isFinished ? "all" : "none"}
                    reviewMode={isFinished}
                    apiOptions={rendererApiOptions}
                    keypadElement={keypadElement}
                    dependencies={dependencies}
                    problemNum={0}
                    hintsVisible={0}
                />
            )}
        </KeypadContext.Consumer>
    );
}

export type PerseusQuestionFeedbackProps = {
    /** The value returned by `usePerseusQuestion`. */
    question: PerseusQuestionState;
};

/**
 * Optional accessible result text ("Correct!", "Your answer is empty.", …)
 * for a `usePerseusQuestion` state. Place it wherever your design puts
 * feedback, usually next to your Check button. Leave it out if your UI gives
 * its own feedback (e.g. a tutor chat); `question.status` has the result.
 */
export function PerseusQuestionFeedback({
    question,
}: PerseusQuestionFeedbackProps): React.ReactElement {
    const {strings} = usePerseusI18n();
    return (
        // <output> represents the result of a user action and its implicit
        // role is "status". aria-live is set explicitly because AT support
        // for <output>'s implicit role varies. It stays mounted (even when
        // empty) because live regions only announce changes to content
        // already in the DOM.
        <output aria-live="polite" className={styles.result}>
            <Feedback status={question.status} strings={strings} />
        </output>
    );
}

// <output> only permits phrasing content, so BodyText renders <span>s here
// (it defaults to <p>). Text carries the meaning; color only reinforces it.
function Feedback({
    status,
    strings,
}: {
    status: PerseusQuestionState["status"];
    strings: PerseusStrings;
}): React.ReactElement | null {
    switch (status.type) {
        case "invalid":
            return (
                <>
                    <BodyText tag="span" weight="bold">
                        {status.score.suppressAlmostThere
                            ? strings.tryAgain
                            : strings.keepTrying}
                    </BodyText>
                    <BodyText tag="span">
                        {
                            // A missing message is Perseus's signal for
                            // "empty / not filled in" (see scoreIsEmpty in
                            // perseus-score), not a parse error.
                            status.score.message
                                ? mapErrorToString(
                                      status.score.message,
                                      strings,
                                  ) || strings.ERROR_MESSAGE
                                : strings.USER_INPUT_EMPTY
                        }
                    </BodyText>
                </>
            );
        case "error":
            return (
                <>
                    <BodyText tag="span" weight="bold">
                        {strings.ERROR_TITLE}
                    </BodyText>
                    <BodyText tag="span">{strings.checkAnswerError}</BodyText>
                </>
            );
        case "correct":
            return (
                <>
                    <PhosphorIcon
                        icon={checkCircle}
                        color={semanticColor.core.foreground.success.default}
                        aria-hidden="true"
                    />
                    <BodyText tag="span" weight="bold">
                        {strings.correctExcited}
                    </BodyText>
                </>
            );
        case "incorrect":
            return (
                <>
                    <PhosphorIcon
                        icon={xCircle}
                        color={semanticColor.core.foreground.critical.default}
                        aria-hidden="true"
                    />
                    <BodyText tag="span" weight="bold">
                        {strings.incorrect}
                    </BodyText>
                    {!status.finished && (
                        <BodyText tag="span">{strings.tryAgain}</BodyText>
                    )}
                </>
            );
        default:
            return null;
    }
}
