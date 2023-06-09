import * as React from "react";

import {KeyConfig, ClickKeyCallback} from "../../types";

import Button from "./button";
import ButtonAsset from "./button-assets";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

export type KeypadButtonProps = {
    // 0 indexed x,y position in keypad CSS grid
    coord: readonly [number, number];
    keyConfig: KeyConfig;
    onClickKey: ClickKeyCallback;
    // Apply action button styles
    action?: boolean;
    // Apply secondary button styles
    secondary?: boolean;
    style?: StyleType;
};

export const KeypadButton = ({
    coord,
    keyConfig,
    onClickKey,
    style,
    secondary,
    action,
}: KeypadButtonProps): React.ReactElement => {
    const tintColor = secondary ? "#F6F6F7" : action ? "#DBDCDD" : undefined;

    return (
        <Button
            coord={coord}
            onPress={() => onClickKey(keyConfig.id)}
            tintColor={tintColor}
            style={style}
            ariaLabel={keyConfig.ariaLabel}
        >
            <ButtonAsset id={keyConfig.id} />
        </Button>
    );
};
