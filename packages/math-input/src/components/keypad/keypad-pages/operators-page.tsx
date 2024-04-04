import * as React from "react";

import Keys from "../../../data/key-configs";
import {KeypadButton} from "../keypad-button";

import type {MathInputStrings, ClickKeyCallback} from "../../../types";

type Props = {
    onClickKey: ClickKeyCallback;
    preAlgebra?: boolean;
    logarithms?: boolean;
    basicRelations?: boolean;
    advancedRelations?: boolean;
    strings: MathInputStrings;
    locale: string;
};

export default function OperatorsPage(props: Props) {
    const {
        onClickKey,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
        strings,
        locale,
    } = props;

    return (
        <>
            {/* Row 1 */}
            {preAlgebra && (
                <>
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).EXP_2}
                        onClickKey={onClickKey}
                        coord={[0, 0]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).EXP}
                        onClickKey={onClickKey}
                        coord={[1, 0]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).SQRT}
                        onClickKey={onClickKey}
                        coord={[2, 0]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).RADICAL}
                        onClickKey={onClickKey}
                        coord={[3, 0]}
                    />
                </>
            )}

            {/* Row 2 */}
            {logarithms && (
                <>
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).LOG}
                        onClickKey={onClickKey}
                        coord={[0, 1]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).LOG_N}
                        onClickKey={onClickKey}
                        coord={[1, 1]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).LN}
                        onClickKey={onClickKey}
                        coord={[2, 1]}
                    />
                </>
            )}

            {/* Row 3 */}
            {basicRelations && (
                <>
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).EQUAL}
                        onClickKey={onClickKey}
                        coord={[0, 2]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).LT}
                        onClickKey={onClickKey}
                        coord={[1, 2]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).GT}
                        onClickKey={onClickKey}
                        coord={[2, 2]}
                    />
                </>
            )}

            {/* Row 4 */}
            {advancedRelations && (
                <>
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).NEQ}
                        onClickKey={onClickKey}
                        coord={[0, 3]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).LEQ}
                        onClickKey={onClickKey}
                        coord={[1, 3]}
                    />
                    <KeypadButton
                        locale={locale}
                        keyConfig={Keys(strings).GEQ}
                        onClickKey={onClickKey}
                        coord={[2, 3]}
                    />
                </>
            )}
        </>
    );
}
