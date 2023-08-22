import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import Keys from "../../data/key-configs";

import NavigationButton from "./navigation-button";

import type {ClickKeyCallback} from "../../types";

export type Props = {
    onClickKey: ClickKeyCallback;
};

export default function NavigationPad(props: Props) {
    const {onClickKey} = props;

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                <NavigationButton keyConfig={Keys.UP} onClickKey={onClickKey} />
                <NavigationButton
                    keyConfig={Keys.RIGHT}
                    onClickKey={onClickKey}
                />
                <NavigationButton
                    keyConfig={Keys.DOWN}
                    onClickKey={onClickKey}
                />
                <NavigationButton
                    keyConfig={Keys.LEFT}
                    onClickKey={onClickKey}
                />
                <View style={styles.spacer} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    grid: {
        width: 150,
        height: 150,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
    },
    spacer: {
        gridColumn: 2,
        gridRow: 2,
        background: Color.white,
    },
});
