import * as React from "react";

import Keys from "../../data/key-configs";
import {ClickKeyCallback} from "../../types";
import {CursorContext} from "../input/cursor-contexts";
import {TabbarItemType} from "../tabbar/types";

import {KeypadButton} from "./keypad-button";

type Props = {
    onClickKey: ClickKeyCallback;
    selectedPage: TabbarItemType;
    cursorContext?: CursorContext;
    multiplicationDot?: boolean;
    divisionKey?: boolean;
};

function getCursorContextConfig(cursorContext?: CursorContext) {
    if (!cursorContext) {
        return null;
    }

    switch (cursorContext) {
        case CursorContext.NONE:
            return null;
        case CursorContext.IN_PARENS:
            return Keys.JUMP_OUT_PARENTHESES;
        case CursorContext.IN_SUPER_SCRIPT:
            return Keys.JUMP_OUT_EXPONENT;
        case CursorContext.IN_SUB_SCRIPT:
            return Keys.JUMP_OUT_BASE;
        case CursorContext.IN_NUMERATOR:
            return Keys.JUMP_OUT_NUMERATOR;
        case CursorContext.IN_DENOMINATOR:
            return Keys.JUMP_OUT_DENOMINATOR;
        case CursorContext.BEFORE_FRACTION:
            return Keys.JUMP_INTO_NUMERATOR;
    }
}

export default function SharedKeys(props: Props) {
    const {
        onClickKey,
        cursorContext,
        divisionKey,
        multiplicationDot,
        selectedPage,
    } = props;

    const cursorKeyConfig = getCursorContextConfig(cursorContext);
    const fracCoord: readonly [number, number] =
        selectedPage === "Numbers" || selectedPage === "Operators"
            ? [3, 1]
            : [3, 0];

    return (
        <>
            <KeypadButton
                keyConfig={Keys.PLUS}
                onClickKey={onClickKey}
                coord={[4, 0]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.MINUS}
                onClickKey={onClickKey}
                coord={[5, 0]}
                secondary
            />

            {/* Row 2 */}
            <KeypadButton
                keyConfig={multiplicationDot ? Keys.CDOT : Keys.TIMES}
                onClickKey={onClickKey}
                coord={[4, 1]}
                secondary
            />
            {divisionKey && (
                <KeypadButton
                    keyConfig={Keys.DIVIDE}
                    onClickKey={onClickKey}
                    coord={[5, 1]}
                    secondary
                />
            )}

            {/* Row 3 */}
            <KeypadButton
                keyConfig={Keys.FRAC_INCLUSIVE}
                onClickKey={onClickKey}
                coord={fracCoord}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.LEFT_PAREN}
                onClickKey={onClickKey}
                coord={[4, 2]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.RIGHT_PAREN}
                onClickKey={onClickKey}
                coord={[5, 2]}
                secondary
            />

            {/* Row 4 */}
            {cursorKeyConfig && (
                <KeypadButton
                    keyConfig={cursorKeyConfig}
                    onClickKey={onClickKey}
                    coord={[4, 3]}
                    secondary
                />
            )}
            <KeypadButton
                keyConfig={Keys.BACKSPACE}
                onClickKey={onClickKey}
                coord={[5, 3]}
                action
            />
        </>
    );
}
