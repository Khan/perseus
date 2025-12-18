import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import {useMathInputI18n} from "../i18n-context";

import {useKeypadIdContext} from "./keypad-id-context";
import NavigationButton from "./navigation-button";

import type {ClickKeyCallback} from "../../types";

type Props = {
    onClickKey: ClickKeyCallback;
};

export default function NavigationPad(props: Props) {
    const {onClickKey} = props;
    const {strings} = useMathInputI18n();
    const Keys = KeyConfigs(strings);

    const keypadId = useKeypadIdContext();

    const buttonIds = {
        UP: `keypad-${keypadId}-navigation-up`,
        RIGHT: `keypad-${keypadId}-navigation-right`,
        DOWN: `keypad-${keypadId}-navigation-down`,
        LEFT: `keypad-${keypadId}-navigation-left`,
    };

    function onKeyDown(e: React.KeyboardEvent<Element>) {
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                document.getElementById(buttonIds.UP)?.focus();
                break;
            case "ArrowRight":
                e.preventDefault();
                document.getElementById(buttonIds.RIGHT)?.focus();
                break;
            case "ArrowDown":
                e.preventDefault();
                document.getElementById(buttonIds.DOWN)?.focus();
                break;
            case "ArrowLeft":
                e.preventDefault();
                document.getElementById(buttonIds.LEFT)?.focus();
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                <NavigationButton
                    keyConfig={Keys.UP}
                    onClickKey={onClickKey}
                    coord={[1, 0]}
                    id={buttonIds.UP}
                    onKeyDown={onKeyDown}
                />
                <NavigationButton
                    keyConfig={Keys.RIGHT}
                    onClickKey={onClickKey}
                    coord={[2, 1]}
                    id={buttonIds.RIGHT}
                    onKeyDown={onKeyDown}
                />
                <NavigationButton
                    keyConfig={Keys.DOWN}
                    onClickKey={onClickKey}
                    coord={[1, 2]}
                    id={buttonIds.DOWN}
                    onKeyDown={onKeyDown}
                />
                <NavigationButton
                    keyConfig={Keys.LEFT}
                    onClickKey={onClickKey}
                    coord={[0, 1]}
                    id={buttonIds.LEFT}
                    onKeyDown={onKeyDown}
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
        background: color.white,
    },
});
