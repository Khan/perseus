/**
 * A popover that renders a set of keys floating above the page.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {BorderStyles} from "../consts";
import {View} from "../fake-react-native-web/index";
import {KeyConfig} from "../types";

import TouchableKeypadButton from "./touchable-keypad-button";
import * as zIndexes from "./z-indexes";
import GestureManager from "./gesture-manager";
import type {Popover} from "../types";

type Prop = {
    keys: ReadonlyArray<KeyConfig>;
    gestureManager: GestureManager;
    gestureFocus: any;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
};

class MultiSymbolPopover extends React.Component<Prop> {
    render() {
        const {keys, gestureManager, gestureFocus, popover, heightPx, widthPx} =
            this.props;

        // TODO(charlie): We have to require this lazily because of a cyclic
        // dependence in our components.
        return (
            <View style={styles.container}>
                {keys.map((key) => {
                    return (
                        <TouchableKeypadButton
                            key={key.id}
                            keyConfig={key}
                            borders={BorderStyles.NONE}
                            gestureManager={gestureManager}
                            gestureFocus={gestureFocus}
                            popover={popover}
                            heightPx={heightPx}
                            widthPx={widthPx}
                        />
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column-reverse",
        position: "relative",
        width: "100%",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        zIndex: zIndexes.popover,
    },

    // eslint-disable-next-line react-native/no-unused-styles
    popoverButton: {
        backgroundColor: "#FFF",
        borderWidth: 0,
    },
});

export default MultiSymbolPopover;
