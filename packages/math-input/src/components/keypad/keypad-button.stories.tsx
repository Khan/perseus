import {action} from "@storybook/addon-actions";
import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import {mockStrings} from "../../strings";

import {KeypadButton} from "./keypad-button";

import type {KeypadButtonProps} from "./keypad-button";

export default {
    title: "math-input/components/Keypad Button",
    args: {
        keyConfig: KeyConfigs["PLUS"],
        coord: [0, 0],
    },
    argTypes: {
        keyConfig: {
            control: "select",
            options: {...KeyConfigs(mockStrings)},
        },
    },
};

export const Default = ({
    keyConfig = KeyConfigs["PLUS"],
    coord = [0, 0],
}: KeypadButtonProps): React.ReactElement => (
    <div
        style={{
            width: 200,
            height: 200,
            backgroundColor: "#DBDCDD",
            display: "flex",
        }}
    >
        <div
            style={{
                width: 58,
                margin: "auto",
            }}
        >
            <KeypadButton keyConfig={keyConfig} coord={coord} onClickKey={action("pressed")} />
        </div>
    </div>
);

export const AllButtons = ({
    ...args
}: KeypadButtonProps): React.ReactElement => (
    <div
        style={{
            backgroundColor: "#DBDCDD",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "25px",
        }}
    >
        {Object.keys(KeyConfigs(mockStrings)).map((key) => (
            <div
                key={key}
                style={{
                    width: 58,
                    margin: "auto",
                    overflowWrap: "break-word",
                }}
            >
                {key}
                <KeypadButton
                    keyConfig={KeyConfigs(mockStrings)[key]}
                    onClickKey={action("pressed")}
                    coord={[0, 0]}
                />
            </div>
        ))}
    </div>
);
