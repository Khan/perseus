/* eslint-disable react/no-unsafe */
// @flow
/**
 * This component is a wrapper around Wonderblock's tooltip with the API
 * that perseus expects
 */

import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";

import {colors} from "../../styles/global-styles.js";

import type {NewTooltipProps} from "./types.js";

type NewTooltipState = {|
    // Whether the tooltip has been dismissed.
    dismissed: boolean,
    // Whether the target element is currently being hovered.
    hovered: boolean,
|};

type Props = {|
    ...NewTooltipProps,

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
    static defaultProps: DefaultProps = DefaultPropValues;

    constructor(props: Props) {
        super(props);

        this.state = {
            dismissed: props.dismissed != null ? props.dismissed : false,
            hovered: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (Object.keys(nextProps).includes("dismissed")) {
            this.setState({dismissed: nextProps.dismissed});
        }
    }

    _shouldShowTooltip(): boolean {
        const {toggleOnHover, showOnMount} = this.props;
        const {dismissed} = this.state;

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

    _handleDismiss: () => void = () => {
        if (this.props.dismissed == null) {
            // We're serving as an "uncontrolled component": our dismissed
            // state is managed by us, not by incoming props.
            this.setState({dismissed: true});
        }

        this.props.onDismiss && this.props.onDismiss();
    };

    _popoverContentColor: () => "white" | "blue" | "darkBlue" = () => {
        const {inverted, color} = this.props;
        if (inverted) {
            return "darkBlue";
        } else if (color === "blue") {
            return "blue";
        }

        return "white";
    };

    render(): React.Element<any> {
        const {side, children, content, dismissOnClickClose} = this.props;
        const {onMouseEnter, onMouseLeave} = this.props;
        return (
            <Popover
                content={
                    <PopoverContentCore
                        color={this._popoverContentColor()}
                        closeButtonVisible={dismissOnClickClose}
                        style={{}}
                    >
                        {content}
                    </PopoverContentCore>
                }
                placement={side}
                opened={this._shouldShowTooltip()}
                onClose={this._handleDismiss}
                dismissEnabled={false}
                testId="question-id"
            >
                <div
                    onMouseEnter={() => {
                        onMouseEnter && onMouseEnter();
                        this.setState({hovered: true});
                    }}
                    onMouseLeave={() => {
                        onMouseLeave && onMouseLeave();
                        this.setState({hovered: false});
                    }}
                >
                    {children}
                </div>
            </Popover>
        );
    }
}

export default NewTooltip;
