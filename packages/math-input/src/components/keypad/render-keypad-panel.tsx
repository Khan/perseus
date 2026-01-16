import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import NavigationPad from "./navigation-pad";
import styles from "./render-keypad-panel.module.css";
import SharedKeys from "./shared-keys";

import type {KeypadProps} from "./keypad";
import type {KeypadPageType} from "../../types";

export interface RenderKeyPadPanelProps extends Pick<
    KeypadProps,
    | "fractionsOnly"
    | "onClickKey"
    | "cursorContext"
    | "convertDotToTimes"
    | "divisionKey"
    | "expandedView"
> {
    selectedPage: KeypadPageType;
    children: React.ReactNode;
}

export function RenderKeyPadPanel({
    children,
    fractionsOnly,
    onClickKey,
    cursorContext,
    convertDotToTimes,
    divisionKey,
    expandedView,
    selectedPage,
}: RenderKeyPadPanelProps) {
    // Use a different grid for our fraction keypad
    const gridStyle = fractionsOnly
        ? styles.fractionsGrid
        : styles.expressionGrid;

    return (
        <>
            <View
                className={`${styles.keypadGrid} ${gridStyle}`}
                aria-label="Keypad"
            >
                {children}
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
        </>
    );
}
