import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import FractionsPage from "./keypad-pages/fractions-page";
import styles from "./keypad.module.css";
import {RenderKeyPadPanel} from "./render-keypad-panel";

import type {KeypadProps} from "./keypad";
import type {KeypadPageType} from "../../types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeypadFractionsOnlyProps
    extends Pick<
        KeypadProps,
        | "fractionsOnly"
        | "onClickKey"
        | "cursorContext"
        | "convertDotToTimes"
        | "divisionKey"
        | "expandedView"
    > {}

export function KeypadFractionsOnly(props: KeypadFractionsOnlyProps) {
    const {onClickKey, cursorContext, expandedView} = props;
    const selectedPage: KeypadPageType = "Fractions";

    return (
        <View className={expandedView ? styles.keypadOuterContainer : ""}>
            <View
                className={`${styles.wrapper} ${expandedView ? styles.expandedWrapper : ""}`}
            >
                <View className={styles.keypadInnerContainer}>
                    <View
                        // className={`${styles.keypadGrid} ${styles.fractionsGrid}`}
                        aria-label="Keypad"
                    >
                        <RenderKeyPadPanel
                            {...props}
                            selectedPage={selectedPage}
                        >
                            <FractionsPage
                                onClickKey={onClickKey}
                                cursorContext={cursorContext}
                            />
                        </RenderKeyPadPanel>
                    </View>
                </View>
            </View>
        </View>
    );
}
