import {action} from "@storybook/addon-actions";
import {ComponentStory} from "@storybook/react";
import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import Keys from "../../data/keys";

import {KeypadButton, KeypadButtonProps} from "./keypad-page-items";

export default {
    title: "Keypad Button",
    argTypes: {
        keyConfig: {
            control: "select",
            options: {...KeyConfigs},
            defaultValue: KeyConfigs[Keys.PLUS],
        },
        tintColor: {
            control: "color",
            defaultValue: "#F6F6F7",
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
                />
            </div>
        ))}
    </div>
);
