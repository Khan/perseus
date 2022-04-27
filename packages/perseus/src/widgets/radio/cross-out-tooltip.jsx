// @flow
/**
 * The tooltip that appears when you open the `CrossOutMenu` on desktop,
 * enabling the user to toggle a choice's `crossedOut` state.
 */
import * as React from "react";

import NewTooltip from "../../components/new-tooltip/new-tooltip.jsx";
import mediaQueries from "../../styles/media-queries.js";

import CrossOutButton, {type CrossOutButtonProps} from "./cross-out-button.jsx";

export type CrossOutTooltipProps = {
    children: React$Element<any>,
    dismissed: boolean,
    onDismiss: () => void,
    // Props to pass directly to the CrossOutButton.
    buttonProps: CrossOutButtonProps,
    ...
};

export default class CrossOutTooltip extends React.PureComponent<CrossOutTooltipProps> {
    /**
     * When you press Tab or Shift-Tab from the tooltip button, we call this
     * handler to dismiss the tooltip and bring you back to the menu button.
     */
    _handleKeyDown: (e: SyntheticKeyboardEvent<HTMLElement>) => void = (
        e: SyntheticKeyboardEvent<HTMLElement>,
    ) => {
        // We don't need to check for the shift key _also_ being applied; we
        // can just listen for all keystrokes where the primary key is Tab.
        if (e.key === "Tab") {
            this.props.onDismiss();
            e.preventDefault();
        }
    };

    _renderTooltipContent(): React.Element<"div"> {
        return (
            // The button is the main semantic click target of the tooltip,
            // which can receive tab focus (and automatically does when the
            // flag `usingKeyboardFocus` is set!). However, the entire tooltip
            // serves as a click target as well; see the <NewTooltip />.
            <div onKeyDown={this._handleKeyDown}>
                <CrossOutButton {...this.props.buttonProps} />
            </div>
        );
    }

    render(): React.Element<"div"> {
        return (
            <div>
                <NewTooltip
                    content={this._renderTooltipContent()}
                    offsetFrom="arrow"
                    offset={10}
                    dismissed={this.props.dismissed}
                    showOnMount={true}
                    toggleOnHover={false}
                    onClick={() => this.props.buttonProps.onClick()}
                    // On smOrSmaller, hide this tooltip, and use the slide
                    // panel in `CrossOutMenuWrapper` instead.
                    media={mediaQueries.mdOrLarger}
                >
                    {this.props.children}
                </NewTooltip>

                {/* If the menu is open, register global dismissal handlers
                 * that listen for clicks elsewhere in the page, or Escape
                 * keypresses. This component renders nothing; it just
                 * registers/unregisters handlers on mount/unmount. */}
                {!this.props.dismissed && (
                    <GlobalDismissalHandlers onDismiss={this.props.onDismiss} />
                )}
            </div>
        );
    }
}

/**
 * A component that, when mounted, listens for dismissal-y events: clicking
 * anywhere on the page, or pressing the Escape key. We handle these events by
 * calling `onDismiss`.
 *
 * HACK(mdr): To generalize this component, we probably should ignore clicks
 *     inside the tooltip itself. However, conveniently, the `onClick` handler
 *     we receive from CrossOutMenu includes dismissal anyway. So, it's safe to
 *     dismiss on _any_ click, not just those outside the tooltip.
 */
class GlobalDismissalHandlers extends React.PureComponent<{
    onDismiss: () => void,
    ...
}> {
    componentDidMount() {
        // Register these listeners after a tick, so they don't catch the click
        // or keypress that _caused_ the tooltip to mount.
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        setTimeout(() => {
            window.addEventListener("click", this._handleGlobalClick);
            window.addEventListener("keyup", this._handleGlobalKeyup);
        }, 0);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keyup", this._handleGlobalKeyup);
    }

    /**
     * On clicking anywhere, trigger dismissal.
     */
    _handleGlobalClick = () => {
        this.props.onDismiss();
    };

    /**
     * If the key was Escape, trigger dismissal.
     */
    _handleGlobalKeyup = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.props.onDismiss();
        }
    };

    render(): React.Node {
        return null;
    }
}
