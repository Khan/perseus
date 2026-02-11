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
        // WB green darkened by 18%
        backgroundColor: "#00880b",
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
