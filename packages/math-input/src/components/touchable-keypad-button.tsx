/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";

import {KeyType} from "../consts";
import KeyConfigs from "../data/key-configs";
import Keys from "../data/keys";

import GestureManager from "./gesture-manager";
import KeypadButton from "./keypad-button";

import type {Border, IconConfig} from "../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    borders: Border;
    childKeyIds: ReadonlyArray<Keys>;
    disabled: boolean;
    focused: boolean;
    gestureManager: GestureManager;
    id: Keys;
    popoverEnabled: boolean;
    style: StyleType;
    type: KeyType;
    icon: IconConfig;
};

class TouchableKeypadButton extends React.Component<Props> {
    shouldComponentUpdate(newProps) {
        // We take advantage of a few different properties of our key
        // configuration system. Namely, we know that the other props flow
        // directly from the ID, and thus don't need to be checked. If a key has
        // a custom style, we bail out (this should be rare).
        return (
            newProps.id !== this.props.id ||
            newProps.gestureManager !== this.props.gestureManager ||
            newProps.focused !== this.props.focused ||
            newProps.disabled !== this.props.disabled ||
            newProps.popoverEnabled !== this.props.popoverEnabled ||
            newProps.type !== this.props.type ||
            !!newProps.style
        );
    }

    componentWillUnmount() {
        const {gestureManager, id} = this.props;
        gestureManager.unregisterDOMNode(id);
    }

    render() {
        const {
            borders,
            childKeyIds,
            disabled,
            gestureManager,
            id,
            style,
            ...rest
        } = this.props;

        // Only bind the relevant event handlers if the key is enabled.
        const eventHandlers = disabled
            ? {
                  onTouchStart: (evt) => evt.preventDefault(),
              }
            : {
                  onTouchStart: (evt) => gestureManager.onTouchStart(evt, id),
                  onTouchEnd: (evt) => gestureManager.onTouchEnd(evt),
                  onTouchMove: (evt) => gestureManager.onTouchMove(evt),
                  onTouchCancel: (evt) => gestureManager.onTouchCancel(evt),
              };

        const styleWithAddons = [
            ...(Array.isArray(style) ? style : [style]),
            styles.preventScrolls,
        ];

        return (
            <KeypadButton
                ref={(node) =>
                    gestureManager.registerDOMNode(
                        id,
                        ReactDOM.findDOMNode(node),
                        childKeyIds,
                        borders,
                    )
                }
                borders={borders}
                disabled={disabled}
                style={styleWithAddons}
                {...eventHandlers}
                {...rest}
            />
        );
    }
}

const extractProps = (keyConfig) => {
    const {ariaLabel, icon, type} = keyConfig;
    return {ariaLabel, icon, type};
};

const mapStateToProps = (state, ownProps) => {
    const {gestures} = state;

    const {keyConfig, ...rest} = ownProps;
    const {id, childKeyIds, type} = keyConfig;

    const childKeys = childKeyIds && childKeyIds.map((id) => KeyConfigs[id]);

    // Override with the default child props, if the key is a multi-symbol key
    // (but not a many-symbol key, which operates under different rules).
    const useFirstChildProps =
        type !== KeyType.MANY && childKeys && childKeys.length > 0;

    return {
        ...rest,
        childKeyIds: childKeyIds,
        gestureManager: gestures.gestureManager,
        id: id,

        // Add in some gesture state.
        focused: gestures.focus === id,
        popoverEnabled: gestures.popover && gestures.popover.parentId === id,

        // Pass down the child keys and any extracted props.
        childKeys,
        ...extractProps(useFirstChildProps ? childKeys[0] : keyConfig),
    };
};

const styles = StyleSheet.create({
    preventScrolls: {
        // Touch events that start in the touchable buttons shouldn't be
        // allowed to produce page scrolls.
        touchAction: "none",
    },
});

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    TouchableKeypadButton,
);
