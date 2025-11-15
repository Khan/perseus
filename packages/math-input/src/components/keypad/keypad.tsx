import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Tabs} from "@khanacademy/wonder-blocks-tabs";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import xBold from "@phosphor-icons/core/bold/x-bold.svg";
import * as React from "react";
import {useEffect} from "react";

import {KeypadFractionsOnly} from "./keypad-fractions-only";
import styles from "./keypad.module.css";
import {getAvailableTabs} from "./utils";

import type {ClickKeyCallback, KeypadPageType} from "../../types";
import type {CursorContext} from "../input/cursor-contexts";
import type {PerseusAnalyticsEvent, KeypadKey} from "@khanacademy/perseus-core";

export interface KeypadProps {
    extraKeys?: ReadonlyArray<KeypadKey>;
    cursorContext?: (typeof CursorContext)[keyof typeof CursorContext];
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
    scientific?: boolean;

    onClickKey: ClickKeyCallback;
    onAnalyticsEvent: (
        event: Extract<
            PerseusAnalyticsEvent,
            {type: "math-input:keypad-opened" | "math-input:keypad-closed"}
        >,
    ) => void;
}

// The main (v2) Keypad. Use this component to present an accessible, onscreen
// keypad to learners for entering math expressions.
export default function Keypad({extraKeys = [], ...props}: KeypadProps) {
    const {
        onAnalyticsEvent,
        fractionsOnly,
        expandedView,
        showDismiss,
        onClickKey,
    } = props;
    // If we're using the Fractions keypad, we want to default select that page
    // Otherwise, we want to default to the Numbers page
    const defaultSelectedPage = fractionsOnly ? "Fractions" : "Numbers";
    const [selectedPage, setSelectedPage] =
        React.useState<KeypadPageType>(defaultSelectedPage);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

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

    // We don't want to show any available tabs on the fraction keypad
    if (fractionsOnly) {
        return <KeypadFractionsOnly {...props} />;
    }

    // We don't want any tabs available on mobile fractions keypad
    // TODO(ivy): figure out how the getAvailableTabs influences mobile fractions keypad
    const availableTabs = getAvailableTabs({...props, extraKeys}, selectedPage);

    return (
        <View className={expandedView ? styles.keypadOuterContainer : ""}>
            <View
                className={`${styles.wrapper} ${expandedView ? styles.expandedWrapper : ""}`}
                style={{position: "relative"}}
            >
                {showDismiss && (
                    <View
                        style={{
                            position: "absolute",
                            top: sizing.size_120,
                            right: sizing.size_080,
                            zIndex: 10,
                        }}
                    >
                        <IconButton
                            icon={xBold}
                            kind="tertiary"
                            aria-label="Dismiss"
                            onClick={() => onClickKey("DISMISS")}
                            size="xsmall"
                            tabIndex={0}
                            style={{
                                color: semanticColor.core.foreground.neutral
                                    .default,
                            }}
                        />
                    </View>
                )}
                <Tabs
                    aria-label="Keypad"
                    tabs={availableTabs}
                    selectedTabId={selectedPage}
                    onTabSelected={(newSelectedPage: string) => {
                        setSelectedPage(newSelectedPage as KeypadPageType);
                    }}
                    styles={{
                        tab: {
                            marginBlockStart: sizing.size_080,
                            marginBlockEnd: sizing.size_080,
                        },
                        tablist: {
                            gap: sizing.size_080,
                            paddingInline: sizing.size_080,
                        },
                        tabPanel: {
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            backgroundColor:
                                semanticColor.core.background.disabled.strong,
                            // Even in RTL languages, math is LTR.
                            // So we force this component to always render LTR
                            direction: "ltr",
                        },
                    }}
                />
            </View>
        </View>
    );
}
