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
                <NavigationButton
                    keyConfig={Keys.UP}
                    onClickKey={onClickKey}
                    coord={[1, 0]}
                />
                <NavigationButton
                    keyConfig={Keys.RIGHT}
                    onClickKey={onClickKey}
                    coord={[2, 1]}
                />
                <NavigationButton
                    keyConfig={Keys.DOWN}
                    onClickKey={onClickKey}
                    coord={[1, 2]}
                />
                <NavigationButton
                    keyConfig={Keys.LEFT}
                    onClickKey={onClickKey}
                    coord={[0, 1]}
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
        padding: "0 1.5rem",
    },
    grid: {
        width: 140,
        height: 140,
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
