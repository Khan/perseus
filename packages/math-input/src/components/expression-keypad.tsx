/**
 * A keypad that includes all of the expression symbols.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {BorderStyles} from "../consts";
import KeyConfigs from "../data/key-configs";
import {View} from "../fake-react-native-web/index";

import {valueGrey, controlGrey} from "./common-style";
import * as CursorContexts from "./input/cursor-contexts";
import ManyKeypadButton from "./many-keypad-button";
import Styles from "./styles";
import TouchableKeypadButton from "./touchable-keypad-button";
import TwoPageKeypad from "./two-page-keypad";
import type {KeypadLayout, Popover, Echo} from "../types";
import type {CursorContext} from "./input/cursor-contexts";
import GestureManager from "./gesture-manager";

const {row, column, oneColumn, fullWidth, roundedTopLeft, roundedTopRight} =
    Styles;

type Props = {
    extraKeys?: ReadonlyArray<string>;
    roundTopLeft: boolean;
    roundTopRight: boolean;
    currentPage: number;
    cursorContext?: CursorContext;
    dynamicJumpOut: boolean;
    paginationEnabled: boolean;
    active: boolean;
    echoes: ReadonlyArray<Echo>;
    popover: Popover | null;
    heightPx: number;
    widthPx: number;
    gestureManager: GestureManager;
    removeEcho?: (animationId: string) => void;
};

export const expressionKeypadLayout: KeypadLayout = {
    rows: 4,
    columns: 5,
    numPages: 2,
    // Since we include a two-key popover in the top-right, when the popover
    // is visible, the keypad will expand to fill the equivalent of five
    // rows vertically.
    maxVisibleRows: 4,
};

class ExpressionKeypad extends React.Component<Props> {
    render() {
        const {
            currentPage,
            cursorContext,
            dynamicJumpOut,
            extraKeys,
            roundTopLeft,
            roundTopRight,
            paginationEnabled,
            active,
            echoes,
            popover,
            heightPx,
            widthPx,
            gestureManager,
            removeEcho,
        } = this.props;

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

        const rightPageStyle = [
            row,
            fullWidth,
            styles.rightPage,
            roundTopRight && roundedTopRight,
        ];
        const rightPage = (
            <View style={rightPageStyle}>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_7}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_4}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_1}
                        borders={BorderStyles.BOTTOM}
                    />
                    <ManyKeypadButton
                        keys={extraKeys}
                        gestureManager={gestureManager}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_8}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_5}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_2}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_0}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_9}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_6}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_3}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DECIMAL}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DIVIDE}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.TIMES}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.MINUS}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.PLUS}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.FRAC}
                        style={roundTopRight && roundedTopRight}
                    />
                    <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.BACKSPACE}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={dismissOrJumpOutKey}
                        borders={BorderStyles.LEFT}
                    />
                </View>
            </View>
        );

        const leftPageStyle = [
            row,
            fullWidth,
            styles.leftPage,
            roundTopLeft && roundedTopLeft,
        ];
        const leftPage = (
            <View style={leftPageStyle}>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.EXP_2}
                        borders={BorderStyles.NONE}
                        style={roundTopLeft && roundedTopLeft}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.SQRT}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LOG}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.SIN}
                        borders={BorderStyles.NONE}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.EXP_3}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.CUBE_ROOT}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LN}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.COS}
                        borders={BorderStyles.NONE}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.EXP}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.RADICAL}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LOG_N}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.TAN}
                        borders={BorderStyles.NONE}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.GEQ}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.EQUAL}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton keyConfig={KeyConfigs.LEQ} />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LEFT_PAREN}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={[column, oneColumn]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.GT}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NEQ}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LT}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.RIGHT_PAREN}
                        borders={BorderStyles.NONE}
                    />
                </View>
            </View>
        );

        return (
            <TwoPageKeypad
                currentPage={currentPage}
                rightPage={rightPage}
                leftPage={leftPage}
                paginationEnabled={paginationEnabled}
                active={active}
                echoes={echoes}
                popover={popover}
                heightPx={heightPx}
                widthPx={widthPx}
                removeEcho={removeEcho}
            />
        );
    }
}

const styles = StyleSheet.create({
    // NOTE(charlie): These backgrounds are applied to as to fill in some
    // unfortunate 'cracks' in the layout. However, not all keys in the first
    // page use this background color (namely, the 'command' keys, backspace and
    // dismiss).
    // TODO(charlie): Apply the proper background between the 'command' keys.
    rightPage: {
        backgroundColor: valueGrey,
    },

    leftPage: {
        backgroundColor: controlGrey,
    },
});

export default ExpressionKeypad;
