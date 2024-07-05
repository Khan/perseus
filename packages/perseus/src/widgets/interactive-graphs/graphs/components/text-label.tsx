import {Text} from "mafs";
import React from "react";

import type {TextProps} from "mafs";
import type {PropsWithChildren} from "react";

type Props = PropsWithChildren<
    Pick<TextProps, "x" | "y" | "attach" | "attachDistance" | "color">
>;

export const TextLabel = ({children, ...rest}: Props) => (
    <Text
        size={16}
        svgTextProps={{
            filter: "url(#background)",
            fontWeight: "bold",
        }}
        {...rest}
    >
        {children}
    </Text>
);

export const SvgDefs = () => (
    <defs>
        {/* This filter is used to create a background for text labels */}
        <filter id="background" x="-5%" width="110%" y="0%" height="100%">
            <feFlood floodColor="#FFF" floodOpacity="0.64" />
            <feComposite operator="over" in="SourceGraphic" />
        </filter>
    </defs>
);
