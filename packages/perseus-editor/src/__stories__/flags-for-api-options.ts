import {ApiOptions, type APIOptions} from "@khanacademy/perseus";

export const flags = {
    mafs: {
        angle: true,
        segment: true,
        circle: true,
        quadratic: true,
        sinusoid: true,
        polygon: true,
        linear: true,
        "linear-system": true,
        ray: true,
        point: true,
        none: true,

        // Locked figures flags
        "interactive-graph-locked-features-labels": true,
        "locked-point-labels": true,
    },
} satisfies APIOptions["flags"];

export const apiOptionsWithDefaults = {
    ...ApiOptions.defaults,
    flags: {
        ...ApiOptions.defaults.flags,
        ...flags,
    },
};
