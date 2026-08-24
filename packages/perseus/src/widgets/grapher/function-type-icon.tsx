import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import type {FunctionTypeMappingKeys} from "@khanacademy/perseus-core";

const paths: Record<FunctionTypeMappingKeys, string> = {
    linear: "M8 42L42 8",
    quadratic: "M8 8Q25 72 42 8",
    sinusoid: "M8 25C14.2 11 18.8 11 25 25C31.2 39 35.8 39 42 25",
    tangent:
        "M13.7 38.9L15.6 35.3L17.4 32.5L19.3 30.3L21.2 28.4L23.1 26.7L25 25L26.9 23.3L28.8 21.6L30.7 19.7L32.6 17.5L34.4 14.7L36.3 11.1",
    exponential:
        "M8 42L10.6 41.8L13.2 41.5L15.8 41.1L18.5 40.5L21.1 39.8L23.7 38.7L26.3 37.3L28.9 35.4L31.5 32.7L34.2 29.1L36.8 24.1L39.4 17.3L42 8",
    logarithm:
        "M8 42L10.6 29.7L13.2 24.5L15.8 21.2L18.5 18.7L21.1 16.7L23.7 15.1L26.3 13.7L28.9 12.5L31.5 11.4L34.2 10.4L36.8 9.5L39.4 8.7L42 8",
    absolute_value: "M10 8L25 42L40 8",
};

interface Props {
    type: FunctionTypeMappingKeys;
    label: string;
}

export default function FunctionTypeIcon({type, label}: Props) {
    return (
        <svg
            width={50}
            height={50}
            viewBox="0 0 50 50"
            role="img"
            aria-label={label}
            focusable="false"
        >
            <path
                d={paths[type]}
                fill="none"
                stroke={semanticColor.core.foreground.instructive.default}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
