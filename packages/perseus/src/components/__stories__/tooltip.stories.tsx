import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

import Tooltip, {HorizontalDirection, VerticalDirection} from "../tooltip";

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
};

export const Hidden = () => {
    return (
        <View style={{margin: "20px"}}>
            Hover over{" "}
            <Tooltip
                show={false}
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
};

export default meta;
