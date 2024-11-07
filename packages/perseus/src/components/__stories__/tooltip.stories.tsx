import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tooltip, {HorizontalDirection, VerticalDirection} from "../tooltip";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Tooltip",
    component: Tooltip,
    render(props) {
        return (
            <View style={{margin: "20px"}}>
                Hover over{" "}
                <Tooltip
                    show={props.show}
                    horizontalPosition={HorizontalDirection.Left}
                    horizontalAlign={HorizontalDirection.Left}
                    verticalPosition={VerticalDirection.Bottom}
                >
                    <span>this</span>
                    <View style={{backgroundColor: "white"}}>
                        You can read so much more if you want...
                    </View>
                </Tooltip>{" "}
                to see more information
            </View>
        );
    },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Shown: Story = {
    args: {show: true},
};

export const Hidden: Story = {
    args: {show: false},
};
