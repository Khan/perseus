/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {KeyType, KeyTypes} from "../consts";
import KeyConfigs from "../data/key-configs";

import GestureManager from "./gesture-manager";
import KeypadButton from "./keypad-button";

import type {Key} from "../data/keys";
import type {Border, Icon, KeyConfig, Popover} from "../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    keyConfig: KeyConfig;
    borders?: Border;
    disabled?: boolean;
    style?: StyleType;

    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

type ComputedProps = {
    childKeyIds: ReadonlyArray<string>;
    childKeys: any;
    focused: boolean;
    id: Key;
    type: KeyType;
    icon?: Icon;
    popoverEnabled: boolean;
};

class TouchableKeypadButton extends React.Component<Props> {
    shouldComponentUpdate(newProps: Props) {
        const newCompProps = this._getComputedProperties(newProps);
        const oldCompProps = this._getComputedProperties(this.props);

        // We take advantage of a few different properties of our key
        // configuration system. Namely, we know that the other props flow
        // directly from the ID, and thus don't need to be checked. If a key has
        // a custom style, we bail out (this should be rare).
        return (
            newCompProps.id !== oldCompProps.id ||
            newProps.gestureManager !== this.props.gestureManager ||
            newCompProps.focused !== oldCompProps.focused ||
            newProps.disabled !== this.props.disabled ||
            newCompProps.popoverEnabled !== oldCompProps.popoverEnabled ||
            newCompProps.type !== oldCompProps.type ||
            !!newProps.style
        );
    }

    componentWillUnmount() {
        const {gestureManager} = this.props;
        const {id} = this._getComputedProperties(this.props);
        gestureManager.unregisterDOMNode(id);
    }

    _extractFromKeyConfig(keyConfig: KeyConfig) {
        const {ariaLabel, icon, type} = keyConfig;
        return {ariaLabel, icon, type};
    }

    _getComputedProperties(props: Props): ComputedProps {
        const {keyConfig, popover, gestureFocus} = props;
        const {id, childKeyIds, type} = keyConfig;

        const childKeys =
            childKeyIds && childKeyIds.map((id) => KeyConfigs[id]);

        // Override with the default child props, if the key is a multi-symbol key
        // (but not a many-symbol key, which operates under different rules).
        const useFirstChildProps =
            type !== KeyTypes.MANY && childKeys && childKeys.length > 0;

        return {
            childKeyIds: childKeyIds,
            id: id,

            // Add in some gesture state.
            focused: gestureFocus === id,
            popoverEnabled: popover?.parentId === id,

            // Pass down the child keys and any extracted props.
            childKeys,
            ...this._extractFromKeyConfig(
                useFirstChildProps ? childKeys[0] : keyConfig,
            ),
        };
    }

    render() {
        const {borders, disabled, gestureManager, style, heightPx, widthPx} =
            this.props;

        const {childKeyIds, id, icon, focused, popoverEnabled, type} =
            this._getComputedProperties(this.props);

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
                icon={icon}
                focused={focused}
                popoverEnabled={popoverEnabled}
                type={type}
                heightPx={heightPx}
                widthPx={widthPx}
                {...eventHandlers}
            />
        );
    }
}

const styles = StyleSheet.create({
    preventScrolls: {
        // Touch events that start in the touchable buttons shouldn't be
        // allowed to produce page scrolls.
        touchAction: "none",
    },
});

export default TouchableKeypadButton;
