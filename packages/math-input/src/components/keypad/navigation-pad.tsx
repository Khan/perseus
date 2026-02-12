import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import {useMathInputI18n} from "../i18n-context";

import NavigationButton from "./navigation-button";

import type {ClickKeyCallback} from "../../types";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default function NavigationPad(props: Props) {
    const {onClickKey} = props;
    const {strings} = useMathInputI18n();
    const Keys = KeyConfigs(strings);

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
        background: semanticColor.core.background.base.default,
    },
});
