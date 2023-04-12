/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

import * as React from "react";
import {connect} from "react-redux";

import KeyConfigs from "../data/key-configs";

import GestureManager from "./gesture-manager";
import KeypadButton from "./keypad-button";

type Props = {
    gestureManager: GestureManager;
};

class EmptyKeypadButton extends React.Component<Props> {
    render() {
        const {gestureManager, ...rest} = this.props;

        // Register touch events on the button, but don't register its DOM node
        // or compute focus state or anything like that. We want the gesture
        // manager to know about touch events that start on empty buttons, but
        // we don't need it to know about their DOM nodes, as it doesn't need
        // to focus them or trigger presses.
        return (
            <KeypadButton
                onTouchStart={(evt: TouchEvent) =>
                    gestureManager.onTouchStart(evt)
                }
                onTouchEnd={(evt: TouchEvent) => gestureManager.onTouchEnd(evt)}
                onTouchMove={(evt: TouchEvent) =>
                    gestureManager.onTouchMove(evt)
                }
                onTouchCancel={(evt: TouchEvent) =>
                    gestureManager.onTouchCancel(evt)
                }
                {...KeyConfigs.NOOP}
                {...rest}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {gestures} = state;
    return {
        gestureManager: gestures.gestureManager,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    EmptyKeypadButton,
);
