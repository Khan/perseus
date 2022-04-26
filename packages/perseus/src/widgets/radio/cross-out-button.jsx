// @flow
/**
 * The button that appears when you open the `CrossOutMenu`, enabling the user
 * to toggle a choice's `crossedOut` state.
 */
import colors from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {colors as oldColors} from "../../styles/global-styles.js";

import ChoiceIcon from "./choice-icon.jsx";
import {getChoiceLetter} from "./util.js";

export type CrossOutButtonProps = {
    onClick: () => void,
    onFocus: () => void,
    onBlur: () => void,
    crossedOut: boolean,
    pos: number,
    primaryProductColor?: string,
    disabled?: boolean,
    tabFocusable?: boolean,
    usingKeyboardFocus: boolean,
    // Day theme uses dark colors, for use on light backgrounds (tooltip).
    // Night theme uses light colors, for use on dark backgrounds (slide panel).
    //
    // TODO(mdr): The day/night naming is used in Test Prep, but I've also seen
    //     a similar concept in another component (tooltip), as a boolean prop
    //     named `inverted`. If one of those emerges as the standard, we should
    //     switch to that!
    theme: "day" | "night",
    ...
};

export default class CrossOutButton extends React.PureComponent<CrossOutButtonProps> {
    static defaultProps: {|primaryProductColor: string|} = {
        primaryProductColor: oldColors.kaGreen,
    };

    /**
     * A ref function for the tooltip button. Unlike most ref functions, where
     * we save/delete the node on mount/unmount, we instead use this handler to
     * auto-focus the button on mount, if appropriate.
     */
    _handleTooltipButtonRef: (tooltipButton: ?HTMLButtonElement) => void = (
        tooltipButton: ?HTMLButtonElement,
    ) => {
        if (tooltipButton && this.props.usingKeyboardFocus) {
            tooltipButton.focus();
        }
    };

    _getAriaLabel(): string {
        const {crossedOut, pos} = this.props;
        const letter = getChoiceLetter(pos);

        if (crossedOut) {
            return i18n._("Bring back Choice %(letter)s", {letter});
        }
        return i18n._("Cross out Choice %(letter)s", {letter});
    }

    render(): React.Element<"button"> {
        const {crossedOut, pos, primaryProductColor, theme} = this.props;

        const buttonAndTextColor =
            theme === "day" ? primaryProductColor : colors.white;

        return (
            <button
                type="button"
                aria-label={this._getAriaLabel()}
                className={css([styles.tooltipButton])}
                onClick={() => this.props.onClick()}
                // Don't focus this element on mousedown. It's visually
                // distracting, and confuses our "should we shift focus"
                // logic for keyboard users.
                onMouseDown={(e) => e.preventDefault()}
                onFocus={() => this.props.onFocus()}
                onBlur={() => this.props.onBlur()}
                disabled={this.props.disabled}
                tabIndex={this.props.tabFocusable ? 0 : -1}
                ref={this._handleTooltipButtonRef}
            >
                <ChoiceIcon
                    pos={pos}
                    product="library"
                    // This icon is a preview of the _other_ state, so we use
                    // !crossedOut, the opposite of our current state.
                    crossedOut={!this.props.crossedOut}
                    // HACK(mdr): Here, we're using ChoiceIcon as a visual
                    //     element: we want a non-filled bubble, with custom
                    //     colored stroke/text rather than gray stroke/text.
                    //     Unfortunately for us, ChoiceIcon has semantic props,
                    //     so we have to hardcode the semantics that give us
                    //     the visuals we want. This is a bit confusing and a
                    //     bit fragile, but for now it seems better than adding
                    //     complexity to the ChoiceIcon API!
                    primaryProductColor={buttonAndTextColor}
                    pressed={true}
                    checked={false}
                    focused={false}
                    correct={false}
                    showCorrectness={false}
                    reviewMode={false}
                    previouslyAnswered={false}
                    transparentBackground={true}
                />
                <LabelLarge style={{color: buttonAndTextColor}}>
                    {crossedOut ? i18n._("Bring back") : i18n._("Cross out")}
                </LabelLarge>
            </button>
        );
    }
}

const styles = StyleSheet.create({
    tooltipButton: {
        // Reset <button> styles to be more like <div>.
        background: "none",
        border: "none",
        font: "inherit",
        padding: 0,

        cursor: "pointer",
        textDecoration: "none",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
});
