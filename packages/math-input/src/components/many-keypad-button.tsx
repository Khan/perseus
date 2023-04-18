/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

import * as React from "react";

import {KeyTypes} from "../consts";
import KeyConfigs from "../data/key-configs";
import Keys from "../data/keys";

import EmptyKeypadButton from "./empty-keypad-button";
import TouchableKeypadButton from "./touchable-keypad-button";
import GestureManager from "./gesture-manager";
import type {Popover} from "../types";

type Props = {
    keys: ReadonlyArray<string>;
    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

class ManyKeypadButton extends React.Component<Props> {
    static defaultProps = {
        keys: [],
    };

    render() {
        const {keys, gestureManager, gestureFocus, popover, heightPx, widthPx} =
            this.props;

        // If we have no extra symbols, render an empty button. If we have just
        // one, render a standard button. Otherwise, capture them all in a
        // single button.
        if (keys.length === 0) {
            return <EmptyKeypadButton gestureManager={gestureManager} />;
        } else {
            const keyConfig =
                keys.length === 1
                    ? KeyConfigs[keys[0]]
                    : {
                          id: Keys.MANY,
                          type: KeyTypes.MANY,
                          childKeyIds: keys,
                      };
            return (
                <TouchableKeypadButton
                    keyConfig={keyConfig}
                    gestureManager={gestureManager}
                    gestureFocus={gestureFocus}
                    popover={popover}
                    heightPx={heightPx}
                    widthPx={widthPx}
                />
            );
        }
    }
}

export default ManyKeypadButton;
