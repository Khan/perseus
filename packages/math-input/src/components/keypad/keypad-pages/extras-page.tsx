import {View} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Keys from "../../../data/key-configs";
import Key from "../../../data/keys";
import {ClickKeyCallback} from "../../../types";
import {KeypadButton} from "../keypad-button";

type Props = {
    extraKeys: ReadonlyArray<Key>;
    onClickKey: ClickKeyCallback;
};

const columns = 4;

export default function ExtrasPage(props: Props) {
    const {extraKeys, onClickKey} = props;
    const styles = StyleSheet.create({
        grid: {
            display: "grid",
            gridRow: "1/" + (Math.ceil(extraKeys.length / columns) + 1),
            gridColumn: "span 4",
            gridTemplateColumns: "repeat(4, 1fr)",
        },
    });
    return (
        <View
            style={styles.grid}
            aria-label={i18n._("Extra Keys")}
            role="group"
        >
            {extraKeys.map((key, i) => {
                // Map 1D array to Cartesian coordinates
                const coordX = i % columns;
                const coordY = i / columns;
                return (
                    <KeypadButton
                        key={key}
                        keyConfig={Keys[key]}
                        onClickKey={onClickKey}
                        coord={[coordX, coordY]}
                    />
                );
            })}
        </View>
    );
}
