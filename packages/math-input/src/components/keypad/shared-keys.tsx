import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import {convertDotToTimesByLocale} from "../../utils";
import {useMathInputI18n} from "../i18n-context";

import {KeypadButton} from "./keypad-button";
import {getCursorContextConfig} from "./utils/get-cursor-context-config";

import type {ClickKeyCallback, KeypadPageType} from "../../types";
import type {CursorContext} from "../input/cursor-contexts";

type Props = {
    onClickKey: ClickKeyCallback;
    selectedPage: KeypadPageType;
    cursorContext?: (typeof CursorContext)[keyof typeof CursorContext];
    convertDotToTimes?: boolean;
    divisionKey?: boolean;
};

export default function SharedKeys(props: Props) {
    const {
        onClickKey,
        cursorContext,
        divisionKey,
        convertDotToTimes,
        selectedPage,
    } = props;
    const {strings, locale} = useMathInputI18n();
    const cursorKeyConfig = getCursorContextConfig(strings, cursorContext);
    const Keys = KeyConfigs(strings);

    // Fraction position depends on the page
    const fractionCoord: readonly [number, number] =
        selectedPage === "Numbers" || selectedPage === "Operators"
            ? [3, 1]
            : [3, 0];

    return (
        <>
            <KeypadButton
                keyConfig={Keys.FRAC}
                onClickKey={onClickKey}
                coord={fractionCoord}
                secondary
            />
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
                keyConfig={
                    convertDotToTimesByLocale(locale, !!convertDotToTimes)
                        ? Keys.TIMES
                        : Keys.CDOT
                }
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
                secondary
            />
        </>
    );
}
