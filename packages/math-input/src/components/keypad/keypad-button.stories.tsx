import {action} from "@storybook/addon-actions";
import {ComponentStory} from "@storybook/react";
import * as React from "react";

import KeyConfigs from "../../data/key-configs";

import {KeypadButton, KeypadButtonProps} from "./keypad-button";

export default {
    title: "Keypad Button",
    args: {
        keyConfig: KeyConfigs["PLUS"],
        tintColor: "#F6F6F7",
    },
    argTypes: {
        keyConfig: {
            control: "select",
            options: {...KeyConfigs},
        },
        tintColor: {
            control: "color",
        },
    },
};

const Template: ComponentStory<typeof KeypadButton> = ({
    ...args
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
            <KeypadButton {...args} onClickKey={action("pressed")} />
        </div>
    </div>
);
export const Default = Template.bind({});

export const AllButtons: ComponentStory<typeof KeypadButton> = ({
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
        {Object.keys(KeyConfigs).map((key) => (
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
                    keyConfig={KeyConfigs[key]}
                    onClickKey={action("pressed")}
                    coord={[0, 0]}
                />
            </div>
        ))}
    </div>
);
