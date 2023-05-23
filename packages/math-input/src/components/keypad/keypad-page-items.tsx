import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import {KeyConfig} from "../../types";

import Button from "./button";
import ButtonAsset from "./button-assets";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type KeypadPageContainerProps = {
    children: React.ReactNode;
};

export const KeypadPageContainer = ({
    children,
}: KeypadPageContainerProps): React.ReactElement => (
    <View
        style={{
            backgroundColor: "#DBDCDD",
            width: "100%",
            height: 192,

            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
        }}
    >
        {children}
    </View>
);

export type KeypadButtonProps = {
    keyConfig: KeyConfig;
    tintColor?: string;
    style?: StyleType;
    onClickKey: (keyConfig: string) => void;
};

export const KeypadButton = ({
    keyConfig,
    onClickKey,
    tintColor,
    style,
}: KeypadButtonProps): React.ReactElement => (
    <Button
        onPress={() => onClickKey(keyConfig.id)}
        tintColor={tintColor}
        style={style}
        ariaLabel={keyConfig.id}
    >
        <ButtonAsset id={keyConfig.id} />
    </Button>
);

type SecondaryKeypadButtonProps = {
    keyConfig: KeyConfig;
    style?: StyleType;
    onClickKey: (keyConfig: string) => void;
};

export const SecondaryKeypadButton = ({
    keyConfig,
    onClickKey,
    style,
}: SecondaryKeypadButtonProps): React.ReactElement => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#F6F6F7"}
    />
);

type KeypadActionButtonProps = {
    keyConfig: KeyConfig;
    style?: StyleType;
    onClickKey: (keyConfig: string) => void;
};

export const KeypadActionButton = ({
    keyConfig,
    onClickKey,
    style,
}: KeypadActionButtonProps): React.ReactElement => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#DBDCDD"}
    />
);

/**
 * A placeholder button for the keypad. Optional count prop to render multiple
 * buttons. Defaults to 1.
 */
export const PlaceHolderButtons = ({
    count = 1,
}: {
    count?: number;
}): React.ReactElement => (
    <React.Fragment>
        {Array.from({length: count}).map((_, index) => (
            <View
                key={index}
                style={{
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: 7,
                    border: "4px solid transparent",
                }}
            >
                <View
                    style={{
                        background: "rgba(33, 36, 44, 0.04)",
                        width: "100%",
                        height: "100%",
                        borderRadius: 4,
                        border: `1px solid transparent`,
                    }}
                />
            </View>
        ))}
    </React.Fragment>
);
