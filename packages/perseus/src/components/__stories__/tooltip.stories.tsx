import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tooltip from "../tooltip";

import type {Meta} from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
    title: "Perseus/Components/Tooltip",
};

export const Shown = () => {
    return (
        <View style={{margin: "20px"}}>
            Hover over{" "}
            <Tooltip
                show={true}
                horizontalPosition="left"
                horizontalAlign="left"
                verticalPosition="bottom"
            >
                <span>this</span>
                <View style={{backgroundColor: "white"}}>
                    You can read so much more if you want...
                </View>
            </Tooltip>{" "}
            to see more information
        </View>
    );
};

export const Hidden = () => {
    return (
        <View style={{margin: "20px"}}>
            Hover over{" "}
            <Tooltip
                show={false}
                horizontalPosition="left"
                horizontalAlign="left"
                verticalPosition="bottom"
            >
                <span>this</span>
                <View style={{backgroundColor: "white"}}>
                    You can read so much more if you want...
                </View>
            </Tooltip>{" "}
            to see more information
        </View>
    );
};

export default meta;
