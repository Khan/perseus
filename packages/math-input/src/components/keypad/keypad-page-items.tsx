import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import ButtonAsset from "./button-assets";
import Button from "./button";

import type {KeyConfig} from "../../data/key-configs";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
// @ts-expect-error [FEI-5003] - TS2305 - Module '"react"' has no exported member 'Node'.
import type {Node} from "React";

export const KeypadPageContainer: React.FC<{
    children: Node;
}> = ({children}): React.ReactElement => (
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

export const KeypadButton: React.FC<{
    keyConfig: KeyConfig;
    tintColor?: string;
    style?: StyleType;
    onClickKey: (keyConfig: string) => void;
}> = ({keyConfig, onClickKey, tintColor, style}): React.ReactElement => (
    <Button
        onPress={() => onClickKey(keyConfig.id)}
        tintColor={tintColor}
        style={style}
    >
        <ButtonAsset id={keyConfig.id} />
    </Button>
);

export const SecondaryKeypadButton: React.FC<{
    keyConfig: KeyConfig;
    style?: any;
    onClickKey: (keyConfig: string) => void;
}> = ({keyConfig, onClickKey, style}): React.ReactElement => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#F6F6F7"}
    />
);

export const KeypadActionButton: React.FC<{
    keyConfig: KeyConfig;
    style?: any;
    onClickKey: (keyConfig: string) => void;
}> = ({keyConfig, onClickKey, style}): React.ReactElement => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#DBDCDD"}
    />
);

export const PlaceHolderButton = (): React.ReactElement => (
    <View
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
);
