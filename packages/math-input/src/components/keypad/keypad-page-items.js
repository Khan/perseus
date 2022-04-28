// @flow
import * as React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

import Button from "./button";
import ButtonAsset from "./button-assets";
import type {KeyConfig} from "../../data/key-configs";

import type {Node} from "React";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const KeypadPageContainer = ({children}: {children: Node}): React.Node => (
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

const KeypadButton = ({
    keyConfig,
    onClickKey,
    tintColor,
    style,
}: {
    keyConfig: KeyConfig,
    tintColor?: string,
    style?: StyleType,
    onClickKey: (keyConfig: string) => void,
}): React.Node => (
    <Button
        onPress={() => onClickKey(keyConfig.id)}
        tintColor={tintColor}
        style={style}
    >
        <ButtonAsset id={keyConfig.id} />
    </Button>
);

const SecondaryKeypadButton = ({
    keyConfig,
    onClickKey,
    style,
}: {
    keyConfig: KeyConfig,
    style?: any,
    onClickKey: (keyConfig: string) => void,
}): React.Node => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#F6F6F7"}
    />
);

const KeypadActionButton = ({
    keyConfig,
    onClickKey,
    style,
}: {
    keyConfig: KeyConfig,
    style?: any,
    onClickKey: (keyConfig: string) => void,
}): React.Node => (
    <KeypadButton
        keyConfig={keyConfig}
        onClickKey={onClickKey}
        style={style}
        tintColor={"#DBDCDD"}
    />
);

const PlaceHolderButton = (): React.Node => (
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
        ></View>
    </View>
);

module.exports = {
    KeypadPageContainer,
    KeypadButton,
    SecondaryKeypadButton,
    KeypadActionButton,
    PlaceHolderButton,
};
