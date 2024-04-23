import * as React from "react";

import KeyConfigs from "../../../data/key-configs";
import {useMathInputI18n} from "../../i18n-context";
import {KeypadButton} from "../keypad-button";

import type {ClickKeyCallback} from "../../../types";

type Props = {
    onClickKey: ClickKeyCallback;
    preAlgebra?: boolean;
    logarithms?: boolean;
    basicRelations?: boolean;
    advancedRelations?: boolean;
};

export default function OperatorsPage(props: Props) {
    const {
        onClickKey,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
    } = props;
    const {strings} = useMathInputI18n();
    const Keys = KeyConfigs(strings);

    return (
        <>
            {/* Row 1 */}
            {preAlgebra && (
                <>
                    <KeypadButton
                        keyConfig={Keys.EXP_2}
                        onClickKey={onClickKey}
                        coord={[0, 0]}
                    />
                    <KeypadButton
                        keyConfig={Keys.EXP}
                        onClickKey={onClickKey}
                        coord={[1, 0]}
                    />
                    <KeypadButton
                        keyConfig={Keys.SQRT}
                        onClickKey={onClickKey}
                        coord={[2, 0]}
                    />
                    <KeypadButton
                        keyConfig={Keys.RADICAL}
                        onClickKey={onClickKey}
                        coord={[3, 0]}
                    />
                </>
            )}

            {/* Row 2 */}
            {logarithms && (
                <>
                    <KeypadButton
                        keyConfig={Keys.LOG}
                        onClickKey={onClickKey}
                        coord={[0, 1]}
                    />
                    <KeypadButton
                        keyConfig={Keys.LOG_N}
                        onClickKey={onClickKey}
                        coord={[1, 1]}
                    />
                    <KeypadButton
                        keyConfig={Keys.LN}
                        onClickKey={onClickKey}
                        coord={[2, 1]}
                    />
                </>
            )}

            {/* Row 3 */}
            {basicRelations && (
                <>
                    <KeypadButton
                        keyConfig={Keys.EQUAL}
                        onClickKey={onClickKey}
                        coord={[0, 2]}
                    />
                    <KeypadButton
                        keyConfig={Keys.LT}
                        onClickKey={onClickKey}
                        coord={[1, 2]}
                    />
                    <KeypadButton
                        keyConfig={Keys.GT}
                        onClickKey={onClickKey}
                        coord={[2, 2]}
                    />
                </>
            )}

            {/* Row 4 */}
            {advancedRelations && (
                <>
                    <KeypadButton
                        keyConfig={Keys.NEQ}
                        onClickKey={onClickKey}
                        coord={[0, 3]}
                    />
                    <KeypadButton
                        keyConfig={Keys.LEQ}
                        onClickKey={onClickKey}
                        coord={[1, 3]}
                    />
                    <KeypadButton
                        keyConfig={Keys.GEQ}
                        onClickKey={onClickKey}
                        coord={[2, 3]}
                    />
                </>
            )}
        </>
    );
}
