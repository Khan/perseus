/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Controlled question image marker, rendered as a styled button element.
 *
 * The target for labeling question image with answers.
 */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Icon from "../../components/icon";
import {iconCheck, iconMinus} from "../../icon-paths";

import type {InteractiveMarkerType} from "./types";

type Props = InteractiveMarkerType & {
    // Whether this marker has been selected by user.
    showSelected: boolean;
    // Whether this marker should pulsate to draw user attention.
    showPulsate: boolean;
    // Callbacks for when marker is interacted with using input device.
    onClick: (e: MouseEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
};

type State = {
    // Whether the marker button has input focus.
    isFocused: boolean;
};

export default class Marker extends React.Component<Props, State> {
    // The marker icon element.
    _icon: HTMLElement | null | undefined;

    static defaultProps: {
        selected: ReadonlyArray<any>;
    } = {
        selected: [],
    };

    state: State = {
        isFocused: false,
    };

    handleFocus() {
        this.setState({isFocused: true});
    }

    handleBlur() {
        this.setState({isFocused: false});
    }

    renderIcon(): React.ReactElement<React.ComponentProps<"div">> {
        const {selected, showCorrectness, showSelected, showPulsate} =
            this.props;

        const {isFocused} = this.state;

        // Only a single marker may be "selected" at a time.
        // `showSelected` is a controlled prop, that may be set to `true` for
        // one marker at a time.
        // `isFocused` is a controlled state, driven by focus events, and may
        // only be `true` when there's no answer choices popup visible, and
        // keyboard focus is given to the marker.
        const isSelected = showSelected || isFocused;

        let innerIcon;
        let iconStyles;

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
                    styles.markerCorrect,
                    isSelected && styles.markerSelected,
                ];
            } else {
                iconStyles = [
                    styles.markerIncorrect,
                    isSelected && styles.markerSelected,
                ];
            }
        } else if (isFocused) {
            iconStyles = [styles.markerFocused];
        } else if (selected && selected.length > 0) {
            iconStyles = [
                styles.markerFilled,
                isSelected && styles.markerSelected,
            ];
        } else {
            iconStyles = [
                isSelected
                    ? styles.markerSelected
                    : showPulsate && styles.markerUnfilledPulsate,
            ];
        }

        return (
            <div
                className={css(styles.markerIcon, ...iconStyles)}
                ref={(node) => (this._icon = node)}
            >
                {innerIcon}
            </div>
        );
    }

    render(): React.ReactNode {
        const {label, x, y, showCorrectness} = this.props;

        // It should no longer be possible to interact with a marker after it
        // has been labeled (answered) correctly.
        const isDisabled = showCorrectness === "correct";

        return (
            <button
                aria-label={label}
                className={css(
                    styles.unstyledButton,
                    styles.marker,
                    isDisabled && styles.disabled,
                )}
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                }}
                tabIndex={isDisabled ? -1 : 0}
                onFocus={() => this.handleFocus()}
                onBlur={() => this.handleBlur()}
                // @ts-expect-error - TS2345 - Argument of type 'MouseEvent<HTMLButtonElement, MouseEvent>' is not assignable to parameter of type 'MouseEvent'.
                onClick={(e) => this.props.onClick(e)}
                // @ts-expect-error - TS2345 - Argument of type 'KeyboardEvent<HTMLButtonElement>' is not assignable to parameter of type 'KeyboardEvent'.
                onKeyDown={(e) => this.props.onKeyDown(e)}
            >
                {this.renderIcon()}
            </button>
        );
    }
}

const selectedColor = "#2552b0";
const activeColor = selectedColor;
const correctColor = "#00a60e";
const incorrectColor = "#909195";
const lightShadowColor = "rgba(33, 36, 44, 0.16)";

const markerSize = 16;

const styles = StyleSheet.create({
    unstyledButton: {
        padding: 0,

        overflow: "visible",

        color: "inherit",
        font: "inherit",

        lineHeight: "normal",

        background: "none",
        border: "none",
    },

    marker: {
        position: "absolute",
        outline: "none",

        // Center marker position based on it's maximum size.
        width: 30,
        height: 30,
        marginLeft: -15,
        marginTop: -15,
    },

    disabled: {
        pointerEvents: "none",
    },

    // The base and unfilled marker style.
    markerIcon: {
        display: "flex",
        position: "relative",

        boxSizing: "content-box",

        width: markerSize,
        height: markerSize,
        // Center icon within marker.
        marginLeft: 5,

        cursor: "pointer",

        borderStyle: "solid",
        borderWidth: 2,
        borderColor: Color.offBlack64,
        borderRadius: markerSize,

        boxShadow: `0 8px 8px ${Color.offBlack8}`,
    },

    // The animation that presents the marker to the learner
    markerUnfilledPulsate: {
        animationName: {
            "0%": {
                transform: "scale(1)",
            },

            "100%": {
                transform: "scale(1.3)",
                backgroundColor: Color.blue,
            },
        },

        animationDirection: "alternate",
        animationDuration: "0.8s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in",

        transformOrigin: "50% 50%",
    },

    markerFocused: {
        "::before": {
            content: "''",
            display: "inline-block",
            position: "absolute",

            width: 22,
            height: 22,
            marginLeft: -5,
            marginTop: -5,
            border: `2px solid ${Color.blue}`,
            borderRadius: 20,
        },
    },

    // The learner is making an initial selection
    markerSelected: {
        "::before": {
            content: "''",
            display: "inline-block",
            position: "absolute",

            width: 20,
            height: 20,
            marginLeft: -2,
            marginTop: -2,

            backgroundImage: `url('https://khan.github.io/wonder-blocks/assets/caret-up-bold-daf71073.svg')`,
            backgroundSize: "10px 10px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        },

        boxShadow: `0 8px 8px ${Color.offBlack8}`,

        border: `solid 4px ${Color.white}`,
        backgroundColor: Color.blue,
        borderRadius: 20,

        ":active": {
            backgroundColor: activeColor,

            "::before": {
                display: "none",
            },
        },

        ":hover": {
            "::after": {
                content: "''",
                display: "inline-block",
                position: "absolute",

                width: 22,
                height: 22,
                marginLeft: -5,
                marginTop: -5,

                border: `2px solid ${Color.blue}`,
                borderRadius: 24,
            },
        },
    },

    // The learner has made a selection
    markerFilled: {
        width: markerSize,
        height: markerSize,
        borderRadius: 20,
        backgroundColor: "#ECF3FE",

        marginLeft: 5,
        marginTop: 0,

        border: `4px solid ${Color.blue}`,

        boxShadow: `0 1px 1px 0 ${lightShadowColor}`,
    },

    markerCorrect: {
        width: 24,
        height: 24,
        marginLeft: 1,
        marginTop: 1,

        justifyContent: "center",
        alignItems: "center",

        background: correctColor,

        boxShadow: `0 1px 1px 0 ${lightShadowColor}`,
    },

    markerIncorrect: {
        width: 24,
        height: 24,
        marginLeft: 1,
        marginTop: 1,

        justifyContent: "center",
        alignItems: "center",

        background: incorrectColor,

        boxShadow: `0 1px 1px 0 ${lightShadowColor}`,
    },
});
