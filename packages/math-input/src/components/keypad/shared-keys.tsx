import * as React from "react";

import Keys from "../../data/key-configs";
import {CursorContext} from "../input/cursor-contexts";

import {KeypadButton} from "./keypad-button";

import type {ClickKeyCallback} from "../../types";
import type {TabbarItemType} from "../tabbar";

type Props = {
    onClickKey: ClickKeyCallback;
    selectedPage: TabbarItemType;
    cursorContext?: typeof CursorContext[keyof typeof CursorContext];
    multiplicationDot?: boolean;
    divisionKey?: boolean;
    isMobileFractions?: boolean;
};

function getCursorContextConfig(
    cursorContext?: typeof CursorContext[keyof typeof CursorContext],
) {
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
        isMobileFractions,
    } = props;

    const cursorKeyConfig = getCursorContextConfig(cursorContext);

    // Fraction position depends on the page
    const fractionCoord: readonly [number, number] =
        selectedPage === "Numbers" || selectedPage === "Operators"
            ? [3, 1]
            : [3, 0];

    // We show a minimal sidebar for our mobile fraction view
    if (isMobileFractions) {
        return (
            <>
                <KeypadButton
                    keyConfig={Keys.PERCENT}
                    onClickKey={onClickKey}
                    coord={[3, 0]}
                    secondary
                />
                <KeypadButton
                    keyConfig={Keys.PI}
                    onClickKey={onClickKey}
                    coord={[3, 1]}
                    secondary
                />
                <KeypadButton
                    keyConfig={Keys.FRAC_INCLUSIVE}
                    onClickKey={onClickKey}
                    coord={[3, 2]}
                    secondary
                />
                {cursorKeyConfig && (
                    <KeypadButton
                        keyConfig={cursorKeyConfig}
                        onClickKey={onClickKey}
                        coord={[3, 3]}
                        secondary
                    />
                )}
                <KeypadButton
                    keyConfig={Keys.BACKSPACE}
                    onClickKey={onClickKey}
                    coord={[4, 3]}
                    action
                />
            </>
        );
    }

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
            <KeypadButton
                keyConfig={Keys.FRAC_INCLUSIVE}
                onClickKey={onClickKey}
                coord={fractionCoord}
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
