/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Controlled question image marker, rendered as a styled button element.
 *
 * The target for labeling question image with answers.
 */

import {View, type StyleType} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Icon from "../../components/icon";
import {iconCheck, iconChevronDown, iconMinus} from "../../icon-paths";

import {AnswerPill} from "./answer-pill";

import type {IconType} from "../../components/icon";
import type {CSSProperties} from "aphrodite";

type Props = {
    selected?: string[];
    showCorrectness?: "correct" | "incorrect";
    label: string;
    // Whether this marker has been selected by user.
    showSelected: boolean;
    // Whether this marker should pulsate to draw user attention.
    showPulsate: boolean;
    answerSide: "top" | "bottom" | "left" | "right";
    answerStyles?: CSSProperties;
    showAnswer?: boolean;
    focused: boolean;
    hovered: boolean;
};

function shouldReduceMotion(): boolean {
    // We cannot use matchMedia during SSR.
    if (typeof window.matchMedia !== "function") {
        return true;
    }
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return !mediaQuery || mediaQuery.matches;
}

const MARKER_SIZE = 24;

export default class Marker extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // The marker icon element.
    _icon: HTMLElement | null | undefined;
    _mounted: boolean = false;

    static defaultProps: {
        selected: ReadonlyArray<any>;
    } = {
        selected: [],
    };

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    renderIcon() {
        const {selected, showCorrectness, showSelected, showPulsate} =
            this.props;

        // Only a single marker may be "selected" at a time.
        // `showSelected` is a controlled prop, that may be set to `true` for
        // one marker at a time.
        const isOpen = showSelected;

        const selectedAnswers = selected;

        let iconStyles: StyleType;

        const iconNull: IconType = {
            path: "",
            height: 1,
            width: 1,
        };

        // default dot
        let args: Icon["props"] = {
            size: MARKER_SIZE,
            color: color.white,
            icon: iconNull,
        };

        if (showCorrectness) {
            iconStyles = [
                styles.markerGraded,
                showCorrectness === "correct"
                    ? styles.markerCorrect
                    : styles.markerIncorrect,
                isOpen && styles.markerSelected,
            ];
            args = {
                ...args,
                icon: showCorrectness === "correct" ? iconCheck : iconMinus,
            };
        } else if (selectedAnswers && selectedAnswers.length > 0) {
            iconStyles = [styles.markerFilled, isOpen && styles.markerSelected];
        } else if (isOpen) {
            iconStyles = [styles.markerSelected];
            args = {
                ...args,
                icon: iconChevronDown,
                size: 8,
            };
        } else if (showPulsate) {
            iconStyles = [
                styles.markerPulsateBase,
                this._mounted && shouldReduceMotion()
                    ? showPulsate && styles.markerUnfilledPulsateOnce
                    : showPulsate && styles.markerUnfilledPulsateInfinite,
            ];
        }

        return (
            <View
                style={[styles.markerIcon, iconStyles]}
                ref={(node) => (this._icon = node)}
            >
                <Icon {...args} />
            </View>
        );
    }

    render(): React.ReactNode {
        const {
            showCorrectness,
            selected,
            showAnswer,
            answerSide,
            answerStyles,
            hovered,
            focused,
            label,
        } = this.props;

        // We cannot make dropdown openers untabbable, so we isolate tabbing
        // to answer pills when interaction is disabled.
        const markerDisabled = showCorrectness === "correct";
        const active = hovered || focused;

        return (
            <>
                <View
                    style={[
                        styles.marker,
                        active && !markerDisabled && styles.markerActive,
                    ]}
                    aria-label={
                        markerDisabled
                            ? this.context.strings.correctExcited
                            : label
                    }
                >
                    {this.renderIcon()}
                </View>
                {!!selected && showAnswer && (
                    <AnswerPill
                        selectedAnswers={selected}
                        showCorrectness={showCorrectness}
                        side={answerSide}
                        style={answerStyles}
                        markerRef={this._icon ?? undefined}
                        hovered={hovered}
                        focused={focused}
                    />
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    marker: {
        position: "absolute",

        backgroundColor: color.white,
        borderRadius: MARKER_SIZE,

        // Center marker position based on its maximum size.
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        marginLeft: MARKER_SIZE / -2,
        marginTop: MARKER_SIZE / -2,

        // Add a shadow to the marker to make it stand out from the image.
        boxShadow: `0 8px 8px ${color.offBlack8}`,
    },

    // The base and unfilled marker style.
    markerIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        boxSizing: "border-box",

        width: MARKER_SIZE,
        height: MARKER_SIZE,

        border: `2px solid ${color.offBlack64}`,
        borderRadius: MARKER_SIZE,
    },

    // The animation that presents the marker to the learner
    markerPulsateBase: {
        animationName: {
            "0%": {
                transform: "scale(1)",
                backgroundColor: color.blue,
            },

            "100%": {
                transform: "scale(1.3)",
                backgroundColor: color.blue,
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

    markerActive: {
        outline: `2px solid ${color.blue}`,
        outlineOffset: 2,
    },

    // The learner is making an initial selection
    markerSelected: {
        boxShadow: `0 8px 8px ${color.offBlack8}`,

        border: `solid 4px ${color.white}`,
        backgroundColor: color.blue,
        borderRadius: MARKER_SIZE,
        transform: "rotate(180deg)",
    },

    // The learner has made a selection
    markerFilled: {
        backgroundColor: "#ECF3FE",
        border: `4px solid ${color.blue}`,
    },

    markerGraded: {
        width: MARKER_SIZE,
        height: MARKER_SIZE,

        justifyContent: "center",
        alignItems: "center",
        border: `2px solid ${color.white}`,
    },

    markerCorrect: {
        background: "#00880b", // WB green darkened by 18%
    },

    markerIncorrect: {
        background: color.offBlack64,
    },
});
