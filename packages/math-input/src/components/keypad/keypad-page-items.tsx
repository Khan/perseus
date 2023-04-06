import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Button from "./button";
import ButtonAsset from "./button-assets";

import type {KeyConfig} from "../../data/key-configs";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

export const KeypadPageContainer: React.FC<{
    children: React.ReactNode;
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
