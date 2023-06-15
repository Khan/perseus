import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Keys from "../../../data/key-configs";
import {ClickKeyCallback} from "../../../types";
import {KeypadButton} from "../keypad-button";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default function GeometryPage(props: Props) {
    const {onClickKey} = props;
    return (
        <View style={styles.grid} aria-label="Geometry" role="group">
            {/* Row 1 */}
            <KeypadButton
                keyConfig={Keys.SIN}
                onClickKey={onClickKey}
                coord={[0, 0]}
            />
            <KeypadButton
                keyConfig={Keys.COS}
                onClickKey={onClickKey}
                coord={[1, 0]}
            />
            <KeypadButton
                keyConfig={Keys.TAN}
                onClickKey={onClickKey}
                coord={[2, 0]}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    grid: {
        display: "grid",
        gridRow: "1/1",
        gridColumn: "span 3",
        gridTemplateColumns: "repeat(3, 1fr)",
    },
});
