// TODO(LEMS-4131): `Pill` is deprecated (use `Badge`/`StatusBadge`). This is
// the only remaining `Pill` after the editor Pill migration. It is intentionally
// left for now because it is a RUNTIME, learner-facing component (rendered by
// label-image/marker.tsx), not part of the editor — so it is out of scope for
// the editor disabled-state work and should be migrated under its own
// runtime-scoped ticket with its own QA. Note it is interactive (has onClick),
// so the replacement is an interactive control, not a Badge.
import Pill from "@khanacademy/wonder-blocks-pill";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, type CSSProperties} from "aphrodite";
import * as React from "react";
import {useId} from "react";
import {Popper} from "react-popper";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

const BringToFront: CSSProperties = {
    boxShadow: `0 8px 8px ${semanticColor.core.border.neutral.default}`,
    zIndex: 1000,
};

export const AnswerPill = (props: {
    selectedAnswers: readonly string[];
    showCorrectness?: "correct" | "incorrect";
    markerRef?: HTMLElement;
    side: "top" | "bottom" | "left" | "right";
    style?: CSSProperties;
    hovered?: boolean;
    focused?: boolean;
    onClick?: () => void;
}) => {
    const {
        selectedAnswers,
        showCorrectness,
        markerRef,
        side,
        onClick,
        style,
        focused,
        hovered,
    } = props;

    const pillId = useId();
    const {strings} = usePerseusI18n();

    const answerString =
        selectedAnswers.length > 1
            ? strings.answers({num: selectedAnswers.length})
            : selectedAnswers[0];

    // It should no longer be possible to interact with an answer after it
    // has been labeled (answered) correctly.
    const correct = showCorrectness === "correct";
    const incorrect = showCorrectness === "incorrect";

    return (
        <Popper
            placement={side}
            referenceElement={markerRef}
            modifiers={[
                {
                    name: "preventOverflow",
                    options: {
                        rootBoundary: "viewport",
                    },
                },
            ]}
        >
            {({ref, style: popperStyle}) => (
                <Pill
                    size="large"
                    kind="accent"
                    id={pillId}
                    onClick={correct ? undefined : onClick}
                    ref={ref}
                    style={[
                        style,
                        popperStyle,
                        styles.pill,
                        correct && styles.correct,
                        incorrect && styles.incorrect,
                        (focused || hovered) && BringToFront,
                    ]}
                >
                    <Renderer content={answerString} strings={strings} inline />
                </Pill>
            )}
        </Popper>
    );
};

const styles = StyleSheet.create({
    correct: {
        backgroundColor: semanticColor.core.background.success.strong,
    },
    incorrect: {
        backgroundColor: semanticColor.core.background.neutral.default,
    },
    pill: {
        // Reset the Pill's default height in order to account
        // for multi-line pills.
        height: "auto",
    },
});
