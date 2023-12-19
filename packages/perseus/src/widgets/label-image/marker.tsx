/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Controlled question image marker, rendered as a styled button element.
 *
 * The target for labeling question image with answers.
 */

import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color from "@khanacademy/wonder-blocks-color";
import {View, type StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Icon from "../../components/icon";
import {iconCheck, iconChevronDown, iconMinus} from "../../icon-paths";

import {AnswerPill} from "./answer-pill";

import type {InteractiveMarkerType} from "./types";
import type {ClickableState} from "@khanacademy/wonder-blocks-clickable";
import type {CSSProperties} from "aphrodite";

type Props = InteractiveMarkerType & {
    // Whether this marker has been selected by user.
    showSelected: boolean;
    // Whether this marker should pulsate to draw user attention.
    showPulsate: boolean;
    // Callbacks for when marker is interacted with using input device.
    onClick: (e: React.SyntheticEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    answerSide: "top" | "bottom" | "left" | "right";
    answerStyles?: CSSProperties;
    showAnswer?: boolean;
};

function shouldReduceMotion(): boolean {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return !mediaQuery || mediaQuery.matches;
}

export default class Marker extends React.Component<Props> {
    // The marker icon element.
    _icon: HTMLElement | null | undefined;

    static defaultProps: {
        selected: ReadonlyArray<any>;
    } = {
        selected: [],
    };

    renderIcon({
        focused,
        pressed,
        hovered,
    }: ClickableState): React.ReactElement<React.ComponentProps<"div">> {
        const {selected, showCorrectness, showSelected, showPulsate} =
            this.props;

        // Only a single marker may be "selected" at a time.
        // `showSelected` is a controlled prop, that may be set to `true` for
        // one marker at a time.
        // `focused` is a controlled state, driven by focus events, and may
        // only be `true` when there's no answer choices popup visible, and
        // keyboard focus is given to the marker.
        const isSelected = showSelected || focused || pressed;

        let innerIcon: React.ReactElement | undefined;
        let iconStyles: StyleType;

        if (showCorrectness) {
            innerIcon = (
                <Icon
                    icon={showCorrectness === "correct" ? iconCheck : iconMinus}
                    size={24}
                    color={Color.white}
                />
            );

            if (showCorrectness === "correct") {
                iconStyles = [
                    styles.markerGraded,
                    styles.markerCorrect,
                    isSelected && styles.markerSelected,
                ];
            } else {
                iconStyles = [
                    styles.markerGraded,
                    styles.markerIncorrect,
                    isSelected && styles.markerSelected,
                ];
            }
        } else if (focused || hovered) {
            iconStyles = [
                styles.markerFocused,
                selected && selected.length > 0 && styles.markerFilled,
                showSelected && styles.markerSelected,
            ];
        } else if (selected && selected.length > 0) {
            iconStyles = [
                styles.markerFilled,
                isSelected && styles.markerSelected,
            ];
        } else if (isSelected) {
            iconStyles = [styles.markerSelected];
        } else {
            iconStyles = [
                styles.markerPulsateBase,
                shouldReduceMotion()
                    ? showPulsate && styles.markerUnfilledPulsateOnce
                    : showPulsate && styles.markerUnfilledPulsateInfinite,
            ];
        }

        if (isSelected && selected) {
            innerIcon = (
                <Icon icon={iconChevronDown} size={8} color={Color.white} />
            );
        }

        return (
            <View
                style={[styles.markerIcon, iconStyles]}
                ref={(node) => (this._icon = node)}
            >
                {innerIcon}
            </View>
        );
    }

    render(): React.ReactNode {
        const {
            // label,
            showCorrectness,
            selected,
            showAnswer,
            answerSide,
            answerStyles,
        } = this.props;

        // It should no longer be possible to interact with a marker after it
        // has been labeled (answered) correctly.
        const isDisabled = showCorrectness === "correct";

        return (
            <Clickable
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onClick(e);
                }}
                onKeyDown={(e) => this.props.onKeyDown(e)}
                style={[
                    styles.unstyledButton,
                    styles.marker,
                    isDisabled && styles.disabled,
                ]}
            >
                {(state) => (
                    <>
                        {this.renderIcon(state)}
                        {!!selected && showAnswer && (
                            <AnswerPill
                                selectedAnswers={selected}
                                showCorrectness={showCorrectness}
                                side={answerSide}
                                style={answerStyles}
                                markerRef={this._icon ?? undefined}
                                hovered={state.hovered}
                                focused={state.focused}
                            />
                        )}
                    </>
                )}
            </Clickable>
        );
    }
}

const lightShadowColor = "rgba(33, 36, 44, 0.16)";

const markerSize = 24;

const styles = StyleSheet.create({
    marker: {
        position: "absolute",
        outlineOffset: 2,

        ":hover": {
            outline: `2px solid ${Color.blue}`,
        },

        backgroundColor: Color.white,
        borderRadius: markerSize,

        // Center marker position based on its maximum size.
        width: markerSize,
        height: markerSize,
        marginLeft: markerSize / -2,
        marginTop: markerSize / -2,
    },

    disabled: {
        pointerEvents: "none",
    },

    // The base and unfilled marker style.
    markerIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        boxSizing: "border-box",

        width: markerSize,
        height: markerSize,

        cursor: "pointer",

        border: `2px solid ${Color.offBlack64}`,
        borderRadius: markerSize,

        boxShadow: `0 8px 8px ${Color.offBlack8}`,
    },

    // The animation that presents the marker to the learner
    markerPulsateBase: {
        animationName: {
            "0%": {
                transform: "scale(1)",
                backgroundColor: Color.blue,
            },

            "100%": {
                transform: "scale(1.3)",
                backgroundColor: Color.blue,
            },
        },

        animationDirection: "alternate",
        animationDuration: "0.8s",
        animationTimingFunction: "ease-in",

        transformOrigin: "50% 50%",

        animationIterationCount: "0",
    },

    markerUnfilledPulsateInfinite: {
        animationIterationCount: "infinite",
    },

    markerUnfilledPulsateOnce: {
        // Doing the animation twice lets it ease-in and ease-out
        animationIterationCount: "2",
    },

    markerFocused: {
        outline: `2px solid ${Color.blue}`,
        outlineOffset: 2,
    },

    // The learner is making an initial selection
    markerSelected: {
        boxShadow: `0 8px 8px ${Color.offBlack8}`,

        border: `solid 4px ${Color.white}`,
        backgroundColor: Color.blue,
        borderRadius: markerSize,
        transform: "rotate(180deg)",
    },

    // The learner has made a selection
    markerFilled: {
        backgroundColor: "#ECF3FE",

        border: `4px solid ${Color.blue}`,

        boxShadow: `0 1px 1px 0 ${lightShadowColor}`,
    },

    markerGraded: {
        width: markerSize,
        height: markerSize,

        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${Color.white}`,
        boxShadow: `0 8px 8px ${Color.offBlack8}`,
    },

    markerCorrect: {
        background: "#00880b", // WB green darkened by 18%
    },

    markerIncorrect: {
        background: Color.offBlack64,
    },
});
