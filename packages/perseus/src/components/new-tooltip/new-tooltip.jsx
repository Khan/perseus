/* eslint-disable react/no-unsafe */
// @flow
/**
 * This component has been obsoleted by the Wonder Blocks tooltip (https://wonder-blocks.netlify.app/#tooltip-1).
 * It is no longer a WIP.  The Wonder Blocks tooltip should be used in future development.
 *
 * This top-level component primarily manages high-level visibility state. It
 * renders the tooltip's target element inline, and renders a TooltipPortal
 * to get the tooltip content outside of any `overflow: hidden` containers.
 *
 * For usage information and help navigating this package, see `README.md`.
 * For prop type information, see `types.js`.
 *
 * Public methods:
 *   - `remeasure()`: Re-measure the target element's position, and update the
 *     tooltip's position. This is helpful to call when the parent is aware of
 *     a change in the target element's position, which might not be clear from
 *     the events that the tooltip is watching (e.g., scrolls).
 */

import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";

import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

import {getDependencies} from "../../dependencies.js";
import {Errors, Log} from "../../logging/log.js";
import {PerseusError} from "../../perseus-error.js";
import {colors} from "../../styles/global-styles.js";
import {createVisibilityObserver} from "../visibility-observer/visibility-observer.js";

import TooltipPortal from "./tooltip-portal.jsx";

import type {VisibilityObserver} from "../visibility-observer/visibility-observer.js";
import type {NewTooltipProps} from "./types.js";

type NewTooltipState = {|
    // Whether the tooltip has been dismissed.
    dismissed: boolean,
    // Whether the target element is currently being hovered.
    hovered: boolean,
    // Whether the target element is currently visible, relative to the "root
    // element" where we're mounting the tooltip.
    //
    // NOTE(mdr): This can be true (element is visible), false (element is not
    //     visible), or null (unknown).
    targetElementIsVisible: ?boolean,
|};

type Props = {|
    ...NewTooltipProps,

    // The wrapped content that serves as the target of the tooltip.
    //
    // This must be a single React element, with block-like styles. (e.g.,
    // `display: block`, `display: inline-block`, `display: flex`, etc.)
    //
    // Unfortunately, we can't reliably track the position of inline elements,
    // and we can't wrap your children in a block-like element without
    // potentially disrupting your call site's layout.
    //
    // So, your element will need to be block-like. Sorry for the extra
    // constraint! (For details, see the `render` method of `NewTooltip`).
    children: React$Element<any>,
|};

type DefaultProps = {|
    color: Props["color"],
    dismissOnClickClose: Props["dismissOnClickClose"],
    inverted: Props["inverted"],
    noPadding: Props["noPadding"],
    offset: Props["offset"],
    offsetFrom: Props["offsetFrom"],
    showOnMount: Props["showOnMount"],
    side: Props["side"],
    toggleOnHover: Props["toggleOnHover"],
    tooltipMargin: Props["tooltipMargin"],
|};

export const DefaultPropValues: DefaultProps = Object.freeze({
    side: "top",
    offset: 0,
    offsetFrom: "bubble",
    tooltipMargin: 0,
    noPadding: false,
    color: colors.gray17,
    inverted: false,
    dismissOnClickClose: false,
    toggleOnHover: true,
    showOnMount: false,
});

class NewTooltip extends React.Component<Props, NewTooltipState> {
    // The root element, where we'll mount tooltips.
    _rootElement: HTMLElement;

    // The wrapper element that we created, to listen to mouse events.
    _wrapper: ?HTMLElement;

    // The target element itself: the child of the wrapper, provided by the
    // caller.
    _targetElement: ?HTMLElement;

    // Our child TooltipPortal instance. Used to pass down `remeasure` calls.
    _tooltipPortal: ?TooltipPortal;

    // The VisibilityObserver, notifying us when the element enters or exits
    // total invisibility. Will be null iff the browser doesn't support the
    // necessary APIs.
    _visibilityObserver: VisibilityObserver;

    // Whether this component is mounted.
    _isMounted: boolean;

    // A timeout used in `componentDidMount`.
    _targetElementMountTimeout: ?TimeoutID;

    static defaultProps: DefaultProps = DefaultPropValues;

    constructor(props: Props) {
        super(props);

        this._isMounted = false;

        this.state = {
            dismissed: props.dismissed != null ? props.dismissed : false,
            hovered: false,
            targetElementIsVisible: false,
        };
    }

    _findRootElement(): any {
        // In the Khan Academy webapp, the best place to mount is the
        // #outer-wrapper element, because it's our outermost scroll container.
        // But, if we're for some reason in a page without an #outer-wrapper,
        // then mounting at the body element is probably a good guess.
        // Also, if there is a modal anywhere in the context, it should be the
        // root because it obscures the visibility of the higher containers.
        //
        // HACK(davidflanagan):
        // Missions use a modal-like ../../tasks-package/task-container.jsx
        // component that does not work like our standard modal, so we handle
        // that with a special hardcoded case element id. When this component
        // is converted to a wonder block, we should upgrade Modal to use
        // the new context mechanism instead of the legacy mechanism and
        // replace this mission-task-container id with context.
        return (
            this.context.modalContainerElement ||
            document.getElementById("mission-task-container") ||
            document.getElementById("outer-wrapper") ||
            document.body
        );
    }

    _shouldShowTooltip(): boolean {
        const {toggleOnHover, showOnMount} = this.props;
        const {dismissed, targetElementIsVisible} = this.state;

        // If the target element isn't visible, then we shouldn't show the
        // tooltip, regardless of configuration.
        if (targetElementIsVisible === false) {
            return false;
        }

        // If the tooltip was dismissed, or we're not sure yet, don't show it.
        if (dismissed) {
            return false;
        }

        // If the tooltip should show on mount, and nothing has changed yet
        // that would cause it to hide (i.e., the `dismissed` case above fell
        // through), show the tooltip.
        if (showOnMount) {
            return true;
        }

        // If the target is hovered, and our visibility is hover-based, show
        // the tooltip.
        if (toggleOnHover && this.state.hovered) {
            return true;
        }

        return false;
    }

    _handleVisibilityChange: (targetElementIsVisible: boolean) => void = (
        targetElementIsVisible: boolean,
    ) => {
        this.setState({targetElementIsVisible});
    };

    _handleDismiss: () => void = () => {
        if (this.props.dismissed == null) {
            // We're serving as an "uncontrolled component": our dismissed
            // state is managed by us, not by incoming props.
            this.setState({dismissed: true});
        }
        this.props.onDismiss && this.props.onDismiss();
    };

    remeasure() {
        this._tooltipPortal && this._tooltipPortal.remeasure();
    }

    render(): React.Element<any> {
        const {children: _, ...portalProps} = this.props;

        const {side, content, toggleOnHover, children, inverted} = this.props;
        const {dismissed} = this.state;

        return (
            <Popover
                content={
                    <PopoverContentCore color={inverted ? "darkBlue" : "white"}>
                        {content}
                    </PopoverContentCore>
                }
                placement={side}
                opened={!dismissed && this.state.hovered}
                onClose={this._handleDismiss}
                dismissEnabled={false}
            >
                <div
                    onMouseEnter={() => {
                        this.setState({hovered: true});
                    }}
                    onMouseLeave={() => {
                        this.setState({hovered: false});
                    }}
                >
                    {children}
                </div>
            </Popover>
        );

        return (
            <div
                className={css(styles.targetElement)}
                onMouseEnter={
                    toggleOnHover ? this._handleMouseEnter : undefined
                }
                onMouseLeave={
                    toggleOnHover ? this._handleMouseLeave : undefined
                }
                ref={(node) => (this._wrapper = node)}
                data-tooltip-wrapper
                data-test-id="question-id"
            >
                {children}
                {this._targetElement && this._shouldShowTooltip() && (
                    <TooltipPortal
                        tooltipProps={portalProps}
                        dismiss={this._handleDismiss}
                        rootElement={this._rootElement}
                        targetElement={this._targetElement}
                        isAboveModal={!!this.context.modalContainerElement}
                        ref={(node) => (this._tooltipPortal = node)}
                    />
                )}
            </div>
        );
    }
}

NewTooltip.contextTypes = {
    modalContainerElement: PropTypes.instanceOf(HTMLElement),
};

const styles = StyleSheet.create({
    targetElement: {
        // NOTE(mdr): By setting this container to `display: inline`, we avoid
        //     disrupting the call site's layout! Yay! Unfortunately, this
        //     requires other hacks in order to do position tracking; see the
        //     `cloneElement` call in `render`.
        display: "inline",
    },
});

export default NewTooltip;
