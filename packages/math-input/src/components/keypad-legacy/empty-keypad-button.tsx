/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

import * as React from "react";
import {connect} from "react-redux";

import KeyConfigs from "../../data/key-configs";

import GestureManager from "./gesture-manager";
import KeypadButton from "./keypad-button";

import type {State} from "./store/types";

interface ReduxProps {
    gestureManager: GestureManager;
}

class EmptyKeypadButton extends React.Component<ReduxProps> {
    render() {
        const {gestureManager, ...rest} = this.props;

        // Register touch events on the button, but don't register its DOM node
        // or compute focus state or anything like that. We want the gesture
        // manager to know about touch events that start on empty buttons, but
        // we don't need it to know about their DOM nodes, as it doesn't need
        // to focus them or trigger presses.
        return (
            <KeypadButton
                onTouchStart={(evt: React.TouchEvent<HTMLDivElement>) =>
                    gestureManager.onTouchStart(evt)
                }
                onTouchEnd={(evt: React.TouchEvent<HTMLDivElement>) =>
                    gestureManager.onTouchEnd(evt)
                }
                onTouchMove={(evt: React.TouchEvent<HTMLDivElement>) =>
                    gestureManager.onTouchMove(evt)
                }
                onTouchCancel={(evt: React.TouchEvent<HTMLDivElement>) =>
                    gestureManager.onTouchCancel(evt)
                }
                {...KeyConfigs.NOOP}
                {...rest}
            />
        );
    }
}

const mapStateToProps = (state: State): ReduxProps => {
    const {gestures} = state;
    return {
        gestureManager: gestures.gestureManager,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    EmptyKeypadButton,
);
