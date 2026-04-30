/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Controlled question image marker, rendered as a styled button element.
 *
 * The target for labeling question image with answers.
 */

import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import classNames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Icon from "../../components/icon";
import {iconCheck, iconChevronDown, iconMinus} from "../../icon-paths";

import {AnswerPill} from "./answer-pill";
import styles from "./marker.module.css";

import type {IconType} from "../../components/icon";

type Props = {
    selected?: string[];
    showCorrectness?: "correct" | "incorrect";
    label: string;
    // Whether this marker has been selected by user.
    showSelected: boolean;
    // Whether this marker should pulsate to draw user attention.
    showPulsate: boolean;
    answerSide: "top" | "bottom" | "left" | "right";
    answerStyles?: React.CSSProperties;
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

        let iconClassName: string | undefined;

        const iconNull: IconType = {
            path: "",
            height: 1,
            width: 1,
        };

        // default dot
        let args: Icon["props"] = {
            size: MARKER_SIZE,
            color: semanticColor.core.foreground.knockout.default,
            icon: iconNull,
        };

        if (showCorrectness) {
            iconClassName = classNames(
                styles.markerGraded,
                showCorrectness === "correct"
                    ? styles.markerCorrect
                    : styles.markerIncorrect,
                isOpen && styles.markerSelected,
            );
            args = {
                ...args,
                icon: showCorrectness === "correct" ? iconCheck : iconMinus,
            };
        } else if (selectedAnswers && selectedAnswers.length > 0) {
            iconClassName = classNames(
                styles.markerFilled,
                isOpen && styles.markerSelected,
            );
        } else if (isOpen) {
            iconClassName = styles.markerSelected;
            args = {
                ...args,
                icon: iconChevronDown,
                size: 8,
            };
        } else if (showPulsate) {
            iconClassName = classNames(
                styles.markerPulsateBase,
                this._mounted && shouldReduceMotion()
                    ? showPulsate && styles.markerUnfilledPulsateOnce
                    : showPulsate && styles.markerUnfilledPulsateInfinite,
            );
        }

        return (
            <div
                className={classNames(styles.markerIcon, iconClassName)}
                ref={(node) => (this._icon = node)}
            >
                <Icon {...args} />
            </div>
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
                <div
                    className={classNames(
                        styles.marker,
                        active && !markerDisabled && styles.markerActive,
                    )}
                    aria-label={
                        markerDisabled
                            ? this.context.strings.correctExcited
                            : label
                    }
                >
                    {this.renderIcon()}
                </div>
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
