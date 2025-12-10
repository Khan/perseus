import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
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
>;

// Inline styles needed because CSS modules don't have enough specificity
// to override Wonder Blocks View default styles
const keypadInnerContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: semanticColor.core.background.disabled.strong,
    // Even in RTL languages, math is LTR.
    // So we force this component to always render LTR
    direction: "ltr",
} as const;

export function KeypadFractionsOnly(props: KeypadFractionsOnlyProps) {
    const {onClickKey, cursorContext, expandedView} = props;
    const selectedPage: KeypadPageType = "Fractions";

    return (
        <View className={expandedView ? styles.keypadOuterContainer : ""}>
            <View
                className={`${styles.wrapper} ${expandedView ? styles.expandedWrapper : ""}`}
            >
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
