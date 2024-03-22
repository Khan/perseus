import {Text} from "mafs";
import React from "react";

import type {TextProps} from "mafs";

type Props = Pick<TextProps, "x" | "y" | "attach" | "attachDistance"> & {
    children: React.ReactNode;
};

export const TextLabel = ({children, ...rest}: Props) => (
    <Text
        size={15}
        svgTextProps={{
            filter: "url(#background)",
            fontWeight: "bold",
        }}
        {...rest}
    >
        {children}
    </Text>
);
