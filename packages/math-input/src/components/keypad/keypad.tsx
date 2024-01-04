import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useEffect} from "react";

import Tabbar from "../tabbar";

import ExtrasPage from "./keypad-pages/extras-page";
import FractionsPage from "./keypad-pages/fractions-page";
import GeometryPage from "./keypad-pages/geometry-page";
import NumbersPage from "./keypad-pages/numbers-page";
import OperatorsPage from "./keypad-pages/operators-page";
import NavigationPad from "./navigation-pad";
import SharedKeys from "./shared-keys";
import {expandedViewThreshold} from "./utils";

import type Key from "../../data/keys";
import type {ClickKeyCallback, KeypadPageType} from "../../types";
import type {CursorContext} from "../input/cursor-contexts";
import type {AnalyticsEventHandlerFn} from "@khanacademy/perseus-core";

export type Props = {
    extraKeys: ReadonlyArray<Key>;
    cursorContext?: typeof CursorContext[keyof typeof CursorContext];
    showDismiss?: boolean;
    expandedView?: boolean;

    convertDotToTimes?: boolean;
    divisionKey?: boolean;
    trigonometry?: boolean;
    preAlgebra?: boolean;
    logarithms?: boolean;
    basicRelations?: boolean;
    advancedRelations?: boolean;
    fractionsOnly?: boolean;

    onClickKey: ClickKeyCallback;
    onAnalyticsEvent: AnalyticsEventHandlerFn;
};

const defaultProps = {
    extraKeys: [],
};

function getAvailableTabs(props: Props): ReadonlyArray<KeypadPageType> {
    // We don't want to show any available tabs on the fractions keypad
    if (props.fractionsOnly) {
        return [];
    }

    const tabs: Array<KeypadPageType> = ["Numbers"];
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
    // If we're using the Fractions keypad, we want to default select that page
    // Otherwise, we want to default to the Numbers page
    const defaultSelectedPage = props.fractionsOnly ? "Fractions" : "Numbers";
    const [selectedPage, setSelectedPage] =
        React.useState<KeypadPageType>(defaultSelectedPage);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    // We don't want any tabs available on mobile fractions keypad
    const availableTabs = getAvailableTabs(props);

    const {
        onClickKey,
        cursorContext,
        extraKeys,
        convertDotToTimes,
        divisionKey,
        preAlgebra,
        logarithms,
        basicRelations,
        advancedRelations,
        showDismiss,
        onAnalyticsEvent,
        fractionsOnly,
        expandedView,
    } = props;

    // Use a different grid for our fraction keypad
    const gridStyle = fractionsOnly
        ? styles.fractionsGrid
        : styles.expressionGrid;

    // This useEffect is only used to ensure that we can test the keypad in storybook
    useEffect(() => {
        setSelectedPage(defaultSelectedPage);
    }, [fractionsOnly, defaultSelectedPage]);

    useEffect(() => {
        if (!isMounted) {
            onAnalyticsEvent({
                type: "math-input:keypad-opened",
                payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
            });
            setIsMounted(true);
        }
        return () => {
            if (isMounted) {
                onAnalyticsEvent({
                    type: "math-input:keypad-closed",
                    payload: {virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2"},
                });
                setIsMounted(false);
            }
        };
    }, [onAnalyticsEvent, isMounted]);

    return (
        <View style={expandedView ? styles.keypadOuterContainer : null}>
            <View
                style={[
                    styles.wrapper,
                    expandedView ? styles.expandedWrapper : null,
                ]}
            >
                <Tabbar
                    items={availableTabs}
                    selectedItem={selectedPage}
                    onSelectItem={(newSelectedPage: KeypadPageType) => {
                        setSelectedPage(newSelectedPage);
                    }}
                    onClickClose={
                        showDismiss ? () => onClickKey("DISMISS") : undefined
                    }
                />

                <View style={styles.keypadInnerContainer}>
                    <View
                        style={[styles.keypadGrid, gridStyle]}
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
                            <ExtrasPage
                                onClickKey={onClickKey}
                                extraKeys={extraKeys}
                            />
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
                                convertDotToTimes={convertDotToTimes}
                                divisionKey={divisionKey}
                                selectedPage={selectedPage}
                            />
                        )}
                    </View>
                    {expandedView && <NavigationPad onClickKey={onClickKey} />}
                </View>
            </View>
        </View>
    );
}

Keypad.defaultProps = defaultProps;

const styles = StyleSheet.create({
    keypadOuterContainer: {
        display: "flex",
        alignItems: "center",
    },
    wrapper: {
        background: Color.white,
    },
    expandedWrapper: {
        borderWidth: "1px 1px 0 1px",
        borderColor: Color.offBlack32,
        maxWidth: expandedViewThreshold,
        borderRadius: "3px 3px 0 0",
    },
    keypadInnerContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#DBDCDD",
    },
    keypadGrid: {
        display: "grid",
        gridTemplateRows: "repeat(4, 1fr)",
        flex: 1,
    },
    expressionGrid: {
        gridTemplateColumns: "repeat(6, 1fr)",
    },
    fractionsGrid: {
        gridTemplateColumns: "repeat(5, 1fr)",
    },
});
