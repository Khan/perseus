// @flow
/**
 * This is TooltipPortal, part of NewTooltip.
 *
 * This component renders nothing inline - but it mounts a TooltipPositioner in
 * `#outer-wrapper`, and unmounts it when this unmounts.
 *
 * This is a lot like a React 16 "portal", but we're in React 15, so we sorta
 * have to reimplement that behavior ourselves ^_^`
 * https://reactjs.org/docs/portals.html
 *
 * This component has a public method `remeasure`, to delegate `remeasure`
 * calls down from NewTooltip to TooltipPositioner.
 *
 * TODO(mdr): Once we upgrade to React 16, replace some of this logic with a
 *     built-in React portal.
 */
import * as React from "react";
import ReactDOM from "react-dom";

import TooltipPositioner from "./tooltip-positioner.jsx";

import type {NewTooltipProps} from "./types.js";

type TooltipPortalProps = {|
    tooltipProps: NewTooltipProps,
    dismiss: () => void,
    rootElement: HTMLElement,
    targetElement: HTMLElement,
    isAboveModal?: boolean,
|};
export default class TooltipPortal extends React.Component<TooltipPortalProps> {
    _mountNode: ?HTMLElement;
    _tooltipPositioner: ?TooltipPositioner;

    // We mounted, so we should mount the TooltipPositioner! Create a node for
    // it, then mount it there.
    componentDidMount() {
        const mountNode = document.createElement("div");
        this._mountNode = mountNode;
        this.props.rootElement.appendChild(mountNode);

        this._renderInMountNode(mountNode);
    }

    // We updated, so we should update to the TooltipPositioner! Re-call
    // ReactDOM.render, which will trigger an update rather than a mount,
    // because the component is already mounted in that location.
    componentDidUpdate() {
        const mountNode = this._mountNode;
        if (!mountNode) {
            return;
        }

        this._renderInMountNode(mountNode);
    }

    // We unmounted, so we should unmount the TooltipPositioner! Ask React to
    // unmount it, then destroy the node we created.
    componentWillUnmount() {
        const mountNode = this._mountNode;
        if (!mountNode) {
            return;
        }

        ReactDOM.unmountComponentAtNode(mountNode);
        this.props.rootElement.removeChild(mountNode);
    }

    remeasure() {
        this._tooltipPositioner && this._tooltipPositioner.remeasure();
    }

    _renderInMountNode(mountNode: HTMLElement) {
        const {
            tooltipProps,
            dismiss,
            rootElement,
            targetElement,
            isAboveModal,
        } = this.props;

        // TODO(LP-11406): Replace with React Portal
        // eslint-disable-next-line no-restricted-syntax
        ReactDOM.render(
            <TooltipPositioner
                tooltipProps={tooltipProps}
                dismiss={dismiss}
                rootElement={rootElement}
                targetElement={targetElement}
                isAboveModal={isAboveModal}
                ref={(node) => (this._tooltipPositioner = node)}
            />,
            mountNode,
        );
    }

    render(): null {
        return null;
    }
}
