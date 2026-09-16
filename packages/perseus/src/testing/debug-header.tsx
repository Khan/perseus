import {View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

type DebugHeaderProps = {
    title: string;
};

/**
 * A component that renders the header for the debug UI
 */
export const DebugHeader = ({title}: DebugHeaderProps): React.ReactElement => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Heading size="xxlarge">{title}</Heading>
        </View>
    );
};
