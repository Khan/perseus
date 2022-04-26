/* eslint-disable react/no-unsafe */
// @flow
/**
 * A wrapper for radio choice UI. This adds an ellipsis menu on its right-hand
 * side that, when clicked, reveals a `CrossOutButton`.
 *
 * On desktop, we reveal this button by showing a simple tooltip.
 *
 * On mobile, we reveal this button by sliding the choice content to the left,
 * to uncover a cross-out button underneath. (This is why we need to wrap the
 * content!)
 */
import colors from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Icon from "../../components/icon.jsx";
import mediaQueries from "../../styles/media-queries.js";

import CrossOutButton from "./cross-out-button.jsx";
import CrossOutTooltip from "./cross-out-tooltip.jsx";
import {getChoiceLetter} from "./util.js";

// TODO(mdr): The icon in the cross-out spec isn't this one. The spec's icon
//     rounder dots.
const ellipsisHorizontalIcon = {
    path: "M27.218 6.82l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836zm36.27 0l0 13.578q0 2.852-1.984 4.836t-4.836 1.984l-13.578 0q-2.852 0-4.836-1.984t-1.984-4.836l0-13.578q0-2.852 1.984-4.836t4.836-1.984l13.578 0q2.852 0 4.836 1.984t1.984 4.836z",
    width: 100,
    height: 27.284,
};

type CrossOutMenuWrapperProps = {
    // The main radio choice UI.
    children: React.Node,
    // Whether to show the cross-out UI at all.
    enabled: boolean,
    // The choice's position in the question, e.g., `0` for choice "A".
    pos: number,
    // The "primary product color" that Perseus has been configured with.
    // Optional; defaults to `kaGreen`.
    primaryProductColor?: string,
    // Whether the choice is currently crossed out.
    crossedOut: boolean,
    // Callback for when the user requests to change the crossed-out state.
    onCrossedOutChange: (crossedOut: boolean) => void,
    // Whether cross out is for SAT tasks.
    isSatProduct?: boolean,
    ...
};

type CrossOutMenuWrapperState = {
    // Whether the menu area is being hovered.
    //
    // This controls the menu icon's color.
    hovered: boolean,
    // Whether the menu is currently open.
    //
    // This controls the tooltip on desktop, and the slide panel on mobile.
    opened: boolean,
    // Whether the slide panel for mobile is currently covered, even partially.
    //
    // This helps us decide what z-index to use: when covered, we want a low
    // z-index, to be below the content; when uncovered, we want a high enough
    // z-index to be clickable.
    slidePanelCovered: boolean,
    // Whether the user seems to be managing their keyboard focus. If so, we
    // auto-focus the `tooltipButton` once the tooltip opens.
    usingKeyboardFocus: boolean,
    // Whether `crossedOut` was true when we last opened the menu.
    //
    // This helps us keep the slide-panel button visually constant, while we
    // slide the content back over it.
    //
    // If we just use `this.props.crossedOut` instead, then the "Cross out"
    // button switches to a different "Re-enable" button _right_ after you tap
    // it, and then immediately starts to disappear. This is visually jarring,
    // and liable to produce anxiety ("wait what was that, what did I miss?").
    // It also gives the false impression that perhaps the user could tap very
    // quickly to toggle it again, which isn't true, and it's not actually an
    // interaction that we want to encourage: interrupting the slide animation
    // would be visually messy, and would be liable to produce a mis-click on
    // the answer choice itself instead of its menu.
    wasCrossedOutOnLastOpen: boolean,
    ...
};

export default class CrossOutMenuWrapper extends React.PureComponent<
    CrossOutMenuWrapperProps,
    CrossOutMenuWrapperState,
> {
    // A reference to our menu element.
    _menu: ?HTMLDivElement;

    // A reference to our menu button element.
    _menuButton: ?HTMLButtonElement;

    // Whether keyboard focus is currently inside a CrossOutButton.
    _crossOutButtonIsFocused: boolean;

    state: CrossOutMenuWrapperState = {
        hovered: false,
        opened: false,
        slidePanelCovered: true,
        usingKeyboardFocus: false,
        wasCrossedOutOnLastOpen: false,
    };

    UNSAFE_componentWillReceiveProps(nextProps: CrossOutMenuWrapperProps) {
        // If the menu becomes disabled, it should also become closed. (This
        // helps us avoid permanently staying open when switching from
        // non-review mode to review mode!)
        if (!nextProps.enabled) {
            this._closeMenu();
        }
    }

    /**
     * Open the menu, and shift focus to the tooltip cross-out button, if
     * necessary.
     *
     * NOTE(mdr): We only do focus-shifting for the tooltip case, because it's
     *     especially hard to tab-navigate to. But the slide panel button is
     *     easy to tab to, so we don't do any special focus behavior.
     */
    _openMenu: () => void = () => {
        // If keyboard focus is inside this component (e.g., the user
        // tabbed to it and pressed Enter), set state that will cause us to
        // auto-focus the tooltip content once it mounts. This is helpful
        // if you care about element focus (e.g., primary keyboard user),
        // but distracting if you don't (e.g., primary mouse user).
        const thisComponentHasFocus =
            this._menu != null && this._menu.contains(document.activeElement);

        this.setState({
            opened: true,
            usingKeyboardFocus: thisComponentHasFocus,
            wasCrossedOutOnLastOpen: this.props.crossedOut,
        });
    };

    /**
     * Close the menu, and shift focus back out of the button, if necessary.
     */
    _closeMenu: () => void = () => {
        // If we're closing the menu, but keyboard focus is still inside the
        // menu tooltip, move focus back to the menu button.
        if (this._crossOutButtonIsFocused && this._menuButton) {
            this._menuButton.focus();
        }

        this.setState({opened: false, slidePanelCovered: true});
    };

    /**
     * When the menu is clicked, we call this handler to toggle the menu
     * open/closed.
     */
    _handleMenuClick: (
        e: SyntheticMouseEvent<HTMLElement>,
        willBeOpened: boolean,
    ) => void = (
        e: SyntheticMouseEvent<HTMLElement>,
        willBeOpened: boolean,
    ) => {
        // Toggle the `opened` state. (Instead of reading `!this.state.opened`
        // here, we use the value at the time the element was rendered. This
        // helps us avoid double-toggling if we receive events from both the
        // `menuButton` and `menuWrapper`.)
        if (willBeOpened) {
            this._openMenu();
        } else {
            this._closeMenu();
        }

        // This click shouldn't count as a click on the parent <label> element.
        // TODO(mdr): Should we move the <label> to not include this menu?
        e.preventDefault();
    };

    /**
     * When the tooltip is clicked, we call this handler to toggle the
     * cross-out state and close the tooltip.
     */
    _handleCrossedOutButtonClick: (willBeCrossedOut: boolean) => void = (
        willBeCrossedOut: boolean,
    ) => {
        // Toggle the `crossedOut` state. (Instead of reading
        // `!this.props.crossedOut` here, we use the value at the time the
        // element was rendered. This helps us avoid double-toggling if we
        // receive events from both the `menuButton` and `menuWrapper`.)
        //
        // NOTE(mdr): This *shouldn't* be an issue, because the current React
        //     lifecycle seems to not give us new props during a click
        //     handler's bubbling... but it seems good to be defensive!
        this.props.onCrossedOutChange(willBeCrossedOut);
        this._closeMenu();
    };

    /**
     * When we finish the slide-open animation, record that the slide panel is
     * now uncovered.
     */
    _handleSlideTransitionEnd: () => void = () => {
        if (this.state.opened) {
            this.setState({slidePanelCovered: false});
        }
    };

    /**
     * Build props for the `CrossOutButton`, which we'll use in both the
     * tooltip's button (desktop) and the slide panel's button (mobile).
     */
    _getButtonProps(theme: "day" | "night"): {|
        crossedOut: boolean,
        disabled?: boolean,
        onBlur: () => void,
        onClick: () => void,
        onFocus: () => void,
        pos: number,
        primaryProductColor?: string,
        tabFocusable?: boolean,
        theme: "day" | "night",
        usingKeyboardFocus: boolean,
    |} {
        const wasCrossedOut = this.state.wasCrossedOutOnLastOpen;

        return {
            onClick: () => {
                this._handleCrossedOutButtonClick(!wasCrossedOut);
            },
            onFocus: () => {
                this._crossOutButtonIsFocused = true;
            },
            onBlur: () => {
                this._crossOutButtonIsFocused = false;
            },
            crossedOut: wasCrossedOut,
            pos: this.props.pos,
            primaryProductColor: this.props.primaryProductColor,
            usingKeyboardFocus: this.state.usingKeyboardFocus,
            theme,
        };
    }

    _getMenuIconColor(): void | string {
        if (this.state.opened) {
            return this.props.primaryProductColor;
        }
        if (this.state.hovered) {
            return colors.offBlack;
        }
        return colors.offBlack50;
    }

    _renderMenu(): React.Element<"div"> {
        const {pos, isSatProduct} = this.props;
        const {opened} = this.state;
        const menuStyles = css(styles.menu, isSatProduct && styles.spacing);

        return (
            // This whole wrapper is a valid click target for opening the menu,
            // and it's where we track hover state. But this isn't the main
            // _semantic_ click target, and it's not focusable; see the
            // <button>.
            <div
                ref={(el) => (this._menu = el)}
                className={menuStyles}
                onClick={(e) => this._handleMenuClick(e, !opened)}
                onMouseEnter={() => this.setState({hovered: true})}
                onMouseLeave={() => this.setState({hovered: false})}
            >
                <CrossOutTooltip
                    // This tooltip is "dismissed" unless the menu is open.
                    dismissed={!this.state.opened}
                    onDismiss={this._closeMenu}
                    buttonProps={this._getButtonProps("day")}
                >
                    {/* This button is the main semantic click target. It
                     * receives focus when you tab to it, and has a nice small
                     * square focus outline. But the entire wrapper element is
                     * a valid click target, too! */}
                    <button
                        type="button"
                        aria-label={i18n._("Open menu for Choice %(letter)s", {
                            letter: getChoiceLetter(pos),
                        })}
                        className={css([styles.menuButton])}
                        onClick={(e) => this._handleMenuClick(e, !opened)}
                        // Don't focus this element on mousedown. It's visually
                        // distracting, and confuses our "should we shift focus"
                        // logic for keyboard users.
                        onMouseDown={(e) => e.preventDefault()}
                        ref={(el) => (this._menuButton = el)}
                    >
                        <Icon
                            className={css(styles.menuIcon)}
                            icon={ellipsisHorizontalIcon}
                            size={3}
                            color={this._getMenuIconColor()}
                        />
                    </button>
                </CrossOutTooltip>
            </div>
        );
    }

    _renderSlidePanel(): React.Element<"div"> {
        const buttonProps = this._getButtonProps("night");
        const {slidePanelCovered} = this.state;

        return (
            <div
                // The whole slide panel acts as an extra click target, but the
                // semantic click target (and focusable element) is the button
                // itself.
                className={css(
                    styles.slidePanel,
                    slidePanelCovered && styles.slidePanelCovered,
                )}
                onClick={buttonProps.onClick}
                aria-hidden={slidePanelCovered}
            >
                <CrossOutButton
                    {...buttonProps}
                    disabled={slidePanelCovered}
                    tabFocusable={!slidePanelCovered}
                />
            </div>
        );
    }

    render(): React.Element<"div"> {
        const {enabled} = this.props;
        const {opened} = this.state;

        // There are three main visual elements being composed here:
        //
        // 1. The choice content, provided as `this.props.children`.
        // 2. The menu element (ellipsis), which toggles the menu open/closed.
        //    (The tooltip on desktop is included as part of the menu element.)
        // 3. The slide panel, which sits beneath the other elements unless the
        //    menu is open and we're on mobile.
        //
        // On mobile, in order to show the slide panel, we need to slide
        // elements #1 and #2 to the left. So, we wrap them together in a
        // `slidingContent` element, which controls the actual slide animation.
        //
        // The slide panel itself is a sibling of `slideContent`, and it's
        // absolute-positioned relative to the wrapper. It has a negative
        // z-index when covered.
        //
        // Incidentally, we keep using all these same wrapper elements, even
        // when `this.props.enabled` is false. This helps performance when
        // switching from enabled (non-review mode) to disabled (review mode),
        // because we can reuse the same DOM tree, and just remove the menu and
        // slide panel elements.
        return (
            <div className={css(styles.wrapper)}>
                <div
                    className={css(
                        styles.slidingContent,
                        enabled && styles.slidingContentEnabled,
                        opened && styles.slidingContentOpen,
                    )}
                    onTransitionEnd={this._handleSlideTransitionEnd}
                >
                    <div className={css(styles.content)}>
                        {this.props.children}
                    </div>
                    {enabled && this._renderMenu()}
                </div>
                {enabled && this._renderSlidePanel()}
            </div>
        );
    }
}

const SLIDE_PANEL_WIDTH = 96;

const styles = StyleSheet.create({
    wrapper: {
        display: "block", // HACK(mdr): Override `display: inline` in LESS :/
        position: "relative",
    },

    slidingContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
    },

    slidingContentEnabled: {
        // Only apply this transition when the menu is enabled. That way, when
        // we switch from enabled to disabled with the menu open, we snap right
        // to being closed, rather than awkwardly _sliding_ closed.
        [mediaQueries.smOrSmaller]: {
            transition: "transform 0.2s ease-out",
            backgroundColor: colors.white,
        },
    },

    slidingContentOpen: {
        [mediaQueries.smOrSmaller]: {
            transform: `translateX(-${SLIDE_PANEL_WIDTH}px)`,
        },
    },

    content: {
        display: "block", // HACK(mdr): Override `display: inline` in LESS :/
        flex: "1 1 0",
    },

    menu: {
        cursor: "pointer",
        boxSizing: "border-box",
        width: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",

        // On phone screens, the multiple-choice answer is flush with the
        // viewport, which is confusing and makes for a bad click target. So,
        // we want to give some extra space between the dots and the edge of
        // the screen. But, on desktop, it's nicer to align the dots to the
        // right edge of the answer.
        //
        // HACK(mdr): The point at which answers _actually_ end up flush with
        //     the viewport depends on the embedding application. This media
        //     query is just a heuristic. But the in-between cases look fine
        //     with the extra space anyway, so, well, thems the hacks!
        [mediaQueries.smOrSmaller]: {
            paddingRight: 8,
        },
    },

    menuButton: {
        // Reset <button> styles to be more like <div>.
        background: "none",
        border: "none",
        font: "inherit",
        padding: 0,
        textAlign: "inherit",

        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 16,
    },

    menuIcon: {
        // The target of a NewTooltip must be a block-like element.
        display: "block",
    },

    slidePanel: {
        position: "absolute",
        top: 0,
        right: 0,

        boxSizing: "border-box",
        width: SLIDE_PANEL_WIDTH,
        height: "100%",
        paddingLeft: 8,
        paddingRight: 8,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        background: colors.offBlack50,
        cursor: "pointer",

        [mediaQueries.mdOrLarger]: {
            display: "none",
        },
    },

    spacing: {
        paddingRight: 12,
    },

    slidePanelCovered: {
        // When covered, use a z-index that puts us below the block-layout
        // content. This also makes the slide panel unclickable, so we _only_
        // apply it when the panel should be covered.
        zIndex: -1,
    },
});
