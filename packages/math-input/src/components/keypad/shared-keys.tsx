import * as React from "react";

import Keys from "../../data/key-configs";
import {convertDotToTimesByLocale} from "../../utils";

import {KeypadButton} from "./keypad-button";
import {getCursorContextConfig} from "./utils";

import type {
    MathInputStrings,
    ClickKeyCallback,
    KeypadPageType,
} from "../../types";
import type {CursorContext} from "../input/cursor-contexts";

type Props = {
    onClickKey: ClickKeyCallback;
    selectedPage: KeypadPageType;
    cursorContext?: (typeof CursorContext)[keyof typeof CursorContext];
    convertDotToTimes?: boolean;
    divisionKey?: boolean;
    strings: MathInputStrings;
    locale: string;
};

export default function SharedKeys(props: Props) {
    const {
        onClickKey,
        cursorContext,
        divisionKey,
        convertDotToTimes,
        selectedPage,
        strings,
        locale,
    } = props;

    const cursorKeyConfig = getCursorContextConfig(strings, cursorContext);

    // Fraction position depends on the page
    const fractionCoord: readonly [number, number] =
        selectedPage === "Numbers" || selectedPage === "Operators"
            ? [3, 1]
            : [3, 0];

    return (
        <>
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).FRAC}
                onClickKey={onClickKey}
                coord={fractionCoord}
                secondary
            />
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).PLUS}
                onClickKey={onClickKey}
                coord={[4, 0]}
                secondary
            />
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).MINUS}
                onClickKey={onClickKey}
                coord={[5, 0]}
                secondary
            />

            {/* Row 2 */}
            <KeypadButton
                locale={locale}
                keyConfig={
                    convertDotToTimesByLocale(!!convertDotToTimes, locale)
                        ? Keys(strings).TIMES
                        : Keys(strings).CDOT
                }
                onClickKey={onClickKey}
                coord={[4, 1]}
                secondary
            />
            {divisionKey && (
                <KeypadButton
                    locale={locale}
                    keyConfig={Keys(strings).DIVIDE}
                    onClickKey={onClickKey}
                    coord={[5, 1]}
                    secondary
                />
            )}

            {/* Row 3 */}
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).LEFT_PAREN}
                onClickKey={onClickKey}
                coord={[4, 2]}
                secondary
            />
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).RIGHT_PAREN}
                onClickKey={onClickKey}
                coord={[5, 2]}
                secondary
            />

            {/* Row 4 */}
            {cursorKeyConfig && (
                <KeypadButton
                    locale={locale}
                    keyConfig={cursorKeyConfig}
                    onClickKey={onClickKey}
                    coord={[4, 3]}
                    secondary
                />
            )}
            <KeypadButton
                locale={locale}
                keyConfig={Keys(strings).BACKSPACE}
                onClickKey={onClickKey}
                coord={[5, 3]}
                action
            />
        </>
    );
}
