/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

import * as React from "react";

import {BorderStyles} from "../consts";
import KeyConfigs from "../data/key-configs";
import {View} from "../fake-react-native-web/index";

import GestureManager from "./gesture-manager";
import * as CursorContexts from "./input/cursor-contexts";
import Keypad from "./keypad";
import Styles from "./styles";
import TouchableKeypadButton from "./touchable-keypad-button";

import type {Key} from "../data/keys";
import type {KeypadLayout, Popover, Echo} from "../types";
import type {CursorContext} from "./input/cursor-contexts";

const {row, roundedTopLeft, roundedTopRight} = Styles;

type Props = {
    roundTopLeft: boolean;
    roundTopRight: boolean;
    cursorContext?: CursorContext;
    dynamicJumpOut: boolean;
    active: boolean;
    echoes: ReadonlyArray<Echo>;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
    gestureManager: GestureManager;
    gestureFocus: Key | null;
    removeEcho?: (animationId: string) => void;
};

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
        const {
            cursorContext,
            dynamicJumpOut,
            roundTopLeft,
            roundTopRight,
            active,
            echoes,
            popover,
            removeEcho,
            heightPx,
            widthPx,
            gestureManager,
            gestureFocus,
        } = this.props;

        const sharedButtonProps = {
            popover,
            heightPx,
            widthPx,
            gestureManager,
            gestureFocus,
        };

        let dismissOrJumpOutKey;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContexts.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContexts.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContexts.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContexts.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContexts.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContexts.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContexts.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        return (
            <Keypad
                active={active}
                echoes={echoes}
                popover={popover}
                removeEcho={removeEcho}
                heightPx={heightPx}
                widthPx={widthPx}
                gestureManager={gestureManager}
                gestureFocus={gestureFocus}
            >
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_7}
                        borders={BorderStyles.NONE}
                        style={roundTopLeft && roundedTopLeft}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_8}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_9}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
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
                            cursorContext === CursorContexts.IN_NUMERATOR ||
                            cursorContext === CursorContexts.IN_DENOMINATOR
                        }
                        style={roundTopRight && roundedTopRight}
                        {...sharedButtonProps}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_4}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_5}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_6}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.PERCENT}
                        {...sharedButtonProps}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_1}
                        borders={BorderStyles.BOTTOM}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_2}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_3}
                        borders={BorderStyles.BOTTOM}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.BACKSPACE}
                        borders={BorderStyles.LEFT}
                        {...sharedButtonProps}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NEGATIVE}
                        borders={BorderStyles.NONE}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_0}
                        borders={BorderStyles.LEFT}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DECIMAL}
                        borders={BorderStyles.LEFT}
                        {...sharedButtonProps}
                    />
                    <TouchableKeypadButton
                        keyConfig={dismissOrJumpOutKey}
                        borders={BorderStyles.LEFT}
                        {...sharedButtonProps}
                    />
                </View>
            </Keypad>
        );
    }
}

export default FractionKeypad;
