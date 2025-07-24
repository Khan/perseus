import * as React from "react";
import {action} from "storybook/actions";

import KeyConfigs from "../../data/key-configs";
import {mockStrings} from "../../strings";

import {KeypadButton} from "./keypad-button";

import type {KeypadButtonProps} from "./keypad-button";

const keyConfigs = KeyConfigs(mockStrings);

export default {
    title: "Math Input/Components/Keypad Button",
    args: {
        keyConfig: keyConfigs["PLUS"],
        coord: [0, 0],
    },
    argTypes: {
        keyConfig: {
            control: "select",
            options: {...keyConfigs},
        },
    },
    tags: ["!dev"],
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
            <KeypadButton
                keyConfig={keyConfig}
                coord={coord}
                onClickKey={action("pressed")}
            />
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
        {Object.keys(keyConfigs).map((key) => (
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
                    keyConfig={keyConfigs[key]}
                    onClickKey={action("pressed")}
                    coord={[0, 0]}
                />
            </div>
        ))}
    </div>
);
