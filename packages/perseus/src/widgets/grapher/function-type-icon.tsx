import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import type {FunctionTypeMappingKeys} from "@khanacademy/perseus-core";

const paths: Record<FunctionTypeMappingKeys, string> = {
    linear: "M8 42L42 8",
    quadratic: "M8 8Q25 72 42 8",
    sinusoid:
        "M8 25C11.1 13 13.4 13 16.5 25C19.6 37 21.9 37 25 25C28.1 13 30.4 13 33.5 25C36.6 37 38.9 37 42 25",
    tangent:
        "M8 42L8.2 38.6L8.5 35.2L9.1 31.8L10.4 28.4L13.7 25L16.9 21.6L18.3 18.2L18.8 14.8L19.1 11.4L19.3 8M19.3 42L19.5 38.6L19.8 35.2L20.4 31.8L21.7 28.4L25 25L28.3 21.6L29.6 18.2L30.2 14.8L30.5 11.4L30.7 8M30.7 42L30.9 38.6L31.2 35.2L31.7 31.8L33.1 28.4L36.3 25L39.6 21.6L40.9 18.2L41.5 14.8L41.8 11.4L42 8",
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
