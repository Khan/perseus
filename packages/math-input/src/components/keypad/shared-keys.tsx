import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Keys from "../../data/key-configs";
import {ClickKeyCallback} from "../../types";

import {KeypadButton} from "./keypad-button";

type Props = {
    onClickKey: ClickKeyCallback;
    multiplicationDot?: boolean;
    divisionKey?: boolean;
};

export default function SharedKeys(props: Props) {
    const {onClickKey, divisionKey, multiplicationDot} = props;

    return (
        <View style={styles.grid} aria-label="Sidebar" role="group">
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
            <KeypadButton
                keyConfig={Keys.FRAC_INCLUSIVE}
                onClickKey={onClickKey}
                coord={[4, 3]}
                secondary
            />
            <KeypadButton
                keyConfig={Keys.BACKSPACE}
                onClickKey={onClickKey}
                coord={[5, 3]}
                action
            />
        </View>
    );
}
const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridRow: "1/5",
        gridColumn: "5/-1",
        gridTemplateColumns: "subgrid",
    },
});
