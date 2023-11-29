import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import Pill from "@khanacademy/wonder-blocks-pill";
import {StyleSheet, type CSSProperties} from "aphrodite";
import * as React from "react";
import {Popper} from "react-popper";

import Renderer from "../../renderer";

export const AnswerPill = (props: {
    id: string;
    selectedAnswers: readonly string[];
    showCorrectness?: "correct" | "incorrect";
    markerRef: HTMLElement;
    side: "top" | "bottom" | "left" | "right";
    onClick: () => void;
    style?: CSSProperties;
}) => {
    const {
        id,
        selectedAnswers,
        showCorrectness,
        markerRef,
        side,
        onClick,
        style,
    } = props;

    const answerString =
        selectedAnswers.length > 1
            ? // always need `ngettext` for variable numbers even if we don't use the singular, see https://khanacademy.slack.com/archives/C0918TZ5G/p1700163024293079
              i18n.ngettext(
                  "%(num)s answer",
                  "%(num)s answers",
                  selectedAnswers.length,
              )
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
                    id={id}
                    onClick={correct ? undefined : onClick}
                    ref={ref}
                    style={[
                        style,
                        popperStyle,
                        {
                            ":hover": styles.bringToFront,
                            ":focus": styles.bringToFront,
                        },
                        correct && styles.correct,
                        incorrect && styles.incorrect,
                    ]}
                >
                    <Renderer content={answerString} />
                </Pill>
            )}
        </Popper>
    );
};

const styles = StyleSheet.create({
    bringToFront: {
        boxShadow: `0 8px 8px ${Color.offBlack64}`,
        zIndex: 1000,
    },
    correct: {
        backgroundColor: Color.green,
    },
    incorrect: {
        backgroundColor: Color.offBlack64,
    },
});
