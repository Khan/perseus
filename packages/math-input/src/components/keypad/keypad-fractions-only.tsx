import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import xBold from "@phosphor-icons/core/bold/x-bold.svg";
import * as React from "react";

import FractionsPage from "./keypad-pages/fractions-page";
import styles from "./keypad.module.css";
import {RenderKeyPadPanel} from "./render-keypad-panel";

import type {KeypadProps} from "./keypad";
import type {KeypadPageType} from "../../types";

export type KeypadFractionsOnlyProps = Pick<
    KeypadProps,
    | "fractionsOnly"
    | "onClickKey"
    | "cursorContext"
    | "convertDotToTimes"
    | "divisionKey"
    | "expandedView"
    | "showDismiss"
>;

// Inline styles needed because CSS modules don't have enough specificity
// to override Wonder Blocks View default styles
const keypadOuterContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
} as const;

const keypadInnerContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: semanticColor.core.background.disabled.strong,
    // Even in RTL languages, math is LTR.
    // So we force this component to always render LTR
    direction: "ltr",
} as const;

// Header bar that mimics the Tabs component header area so the dismiss button can be added
const headerBarStyle = {
    display: "flex",
    alignItems: "center",
    paddingInline: sizing.size_080,
    paddingBlockStart: sizing.size_080,
    paddingBlockEnd: sizing.size_080,
} as const;

export function KeypadFractionsOnly(props: KeypadFractionsOnlyProps) {
    const {onClickKey, cursorContext, expandedView, showDismiss} = props;
    const selectedPage: KeypadPageType = "Fractions";

    return (
        <View
            className={expandedView ? styles.keypadOuterContainer : ""}
            style={expandedView ? keypadOuterContainerStyle : undefined}
        >
            <View
                className={`${styles.wrapper} ${expandedView ? styles.expandedWrapper : ""}`}
            >
                {/* Header bar with dismiss button - mimics Tabs header */}
                {showDismiss && (
                    <View style={headerBarStyle}>
                        <View style={{marginLeft: "auto"}}>
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
                    </View>
                )}
                <View style={keypadInnerContainerStyle}>
                    <RenderKeyPadPanel {...props} selectedPage={selectedPage}>
                        <FractionsPage
                            onClickKey={onClickKey}
                            cursorContext={cursorContext}
                        />
                    </RenderKeyPadPanel>
                </View>
            </View>
        </View>
    );
}
