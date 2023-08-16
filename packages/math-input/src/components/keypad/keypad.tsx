import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect} from "react";

import Tabbar from "../tabbar";

import ExtrasPage from "./keypad-pages/extras-page";
import GeometryPage from "./keypad-pages/geometry-page";
import NumbersPage from "./keypad-pages/numbers-page";
import OperatorsPage from "./keypad-pages/operators-page";
import SharedKeys from "./shared-keys";

import type Key from "../../data/keys";
import type {ClickKeyCallback} from "../../types";
import type {CursorContext} from "../input/cursor-contexts";
import type {TabbarItemType} from "../tabbar";
import type {SendEventFn} from "@khanacademy/perseus-core";
import FractionsPage from "./keypad-pages/fractions-page";

export type Props = {
    extraKeys: ReadonlyArray<Key>;
    cursorContext?: typeof CursorContext[keyof typeof CursorContext];
    showDismiss?: boolean;

    multiplicationDot?: boolean;
    divisionKey?: boolean;

    trigonometry?: boolean;
    preAlgebra?: boolean;
    logarithms?: boolean;
    basicRelations?: boolean;
    advancedRelations?: boolean;
    fractionsOnly?: boolean;

    onClickKey: ClickKeyCallback;
    sendEvent?: SendEventFn;
};

const defaultProps = {
    extraKeys: [],
};

function getAvailableTabs(props: Props): ReadonlyArray<TabbarItemType> {
    // We don't want to show any available tabs on the fractions keypad
    if (props.fractionsOnly) {
        return [];
    }

    const tabs: Array<TabbarItemType> = ["Numbers"];
    if (
        // OperatorsButtonSets
        props.preAlgebra ||
        props.logarithms ||
        props.basicRelations ||
        props.advancedRelations
    ) {
        tabs.push("Operators");
    }

    if (props.trigonometry) {
        tabs.push("Geometry");
    }

    if (props.extraKeys?.length) {
        tabs.push("Extras");
    }

    return tabs;
}

// The main (v2) Keypad. Use this component to present an accessible, onscreen
// keypad to learners for entering math expressions.
export default function Keypad(props: Props) {
    // If we're using the Fractions keyapd, we want to default select that page
    // Otherwise, we want to default to the Numbers page
    const defaultSelectedPage = props.fractionsOnly ? "Fractions" : "Numbers";
    const [selectedPage, setSelectedPage] =
        React.useState<TabbarItemType>(defaultSelectedPage);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    // We don't want any tabs available on mobile fractions keypad
    const availableTabs = getAvailableTabs(props);

    const {
        onClickKey,
        cursorContext,
        extraKeys,
        multiplicationDot,
        divisionKey,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
        showDismiss,
        fractionsOnly,
        sendEvent,
    } = props;

    // Use a different grid for our fraction keypad
    const gridStyle = fractionsOnly
        ? styles.fractionsGrid
        : styles.expressionGrid;

    // This useeffect is only used to ensure that we can test the keypad in storybook
    useEffect(() => {
        setSelectedPage(defaultSelectedPage);
    }, [fractionsOnly]);

    useEffect(() => {
        if (!isMounted) {
            sendEvent?.({
                type: "math-input:keypad-opened",
                payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
            });
            setIsMounted(true);
        }
        return () => {
            if (isMounted) {
                sendEvent?.({
                    type: "math-input:keypad-closed",
                    payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
                });
                setIsMounted(false);
            }
        };
    }, [sendEvent, isMounted]);

    return (
        <View>
            <Tabbar
                items={availableTabs}
                selectedItem={selectedPage}
                onSelectItem={(tabbarItem: TabbarItemType) => {
                    setSelectedPage(tabbarItem);
                }}
                style={styles.tabbar}
                onClickClose={
                    showDismiss ? () => onClickKey("DISMISS") : undefined
                }
            />

            <View
                style={[styles.keypadGrid, gridStyle]}
                role="grid"
                tabIndex={0}
                aria-label="Keypad"
            >
                {selectedPage === "Fractions" && (
                    <FractionsPage
                        onClickKey={onClickKey}
                        cursorContext={cursorContext}
                    />
                )}
                {selectedPage === "Numbers" && (
                    <NumbersPage onClickKey={onClickKey} />
                )}
                {selectedPage === "Extras" && (
                    <ExtrasPage onClickKey={onClickKey} extraKeys={extraKeys} />
                )}
                {selectedPage === "Operators" && (
                    <OperatorsPage
                        onClickKey={onClickKey}
                        preAlgebra={preAlgebra}
                        logarithms={logarithms}
                        basicRelations={basicRelations}
                        advancedRelations={advancedRelations}
                    />
                )}
                {selectedPage === "Geometry" && (
                    <GeometryPage onClickKey={onClickKey} />
                )}
                {!fractionsOnly && (
                    <SharedKeys
                        onClickKey={onClickKey}
                        cursorContext={cursorContext}
                        multiplicationDot={multiplicationDot}
                        divisionKey={divisionKey}
                        selectedPage={selectedPage}
                    />
                )}
            </View>
        </View>
    );
}

Keypad.defaultProps = defaultProps;

const styles = StyleSheet.create({
    tabbar: {
        background: Color.white,
    },
    keypadGrid: {
        display: "grid",
        gridTemplateRows: "repeat(4, 1fr)",
        backgroundColor: "#DBDCDD",
    },
    expressionGrid: {
        gridTemplateColumns: "repeat(6, 1fr)",
    },
    fractionsGrid: {
        gridTemplateColumns: "repeat(5, 1fr)",
    },
});
