/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

import * as React from "react";
import {connect} from "react-redux";

import KeyConfigs from "../../data/key-configs";
import {BorderStyles} from "../../enums";
import {View} from "../../fake-react-native-web/index";
import {CursorContext} from "../input/cursor-contexts";

import Keypad from "./keypad";
import Styles from "./styles";
import TouchableKeypadButton from "./touchable-keypad-button";

import type {KeypadLayout} from "../../types";
import type {State} from "./store/types";

const {row, roundedTopLeft, roundedTopRight} = Styles;

interface ReduxProps {
    cursorContext?: CursorContext;
    dynamicJumpOut: boolean;
}

interface Props extends ReduxProps {
    roundTopLeft: boolean;
    roundTopRight: boolean;
}

export const fractionKeypadLayout: KeypadLayout = {
    rows: 4,
    columns: 4,
    numPages: 1,
    // Since we include a two-key popover in the top-right, when the popover
    // is visible, the keypad will expand to fill the equivalent of five
    // rows vertically.
    maxVisibleRows: 5,
};

class FractionKeypad extends React.Component<Props> {
    render() {
        const {cursorContext, dynamicJumpOut, roundTopLeft, roundTopRight} =
            this.props;

        let dismissOrJumpOutKey;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContext.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContext.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContext.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContext.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContext.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContext.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContext.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        return (
            <Keypad>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_7}
                        borders={BorderStyles.NONE}
                        style={roundTopLeft && roundedTopLeft}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_8}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_9}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.FRAC}
                        disabled={
                            // NOTE(charlie): It's only sufficient to use
                            // `IN_NUMERATOR` and `IN_DENOMINATOR` here because we
                            // don't support parentheses in this keypad. If we did,
                            // then when the cursor was inside a parenthetical
                            // expression in a numerator or denominator, this check
                            // would fail.
                            cursorContext === CursorContext.IN_NUMERATOR ||
                            cursorContext === CursorContext.IN_DENOMINATOR
                        }
                        style={roundTopRight && roundedTopRight}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_4}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_5}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_6}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_1}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_2}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_3}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.BACKSPACE}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NEGATIVE}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_0}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DECIMAL}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={dismissOrJumpOutKey}
                        borders={BorderStyles.LEFT}
                    />
                </View>
            </Keypad>
        );
    }
}

const mapStateToProps = (state: State): ReduxProps => {
    return {
        cursorContext: state.input.cursor?.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    FractionKeypad,
);
