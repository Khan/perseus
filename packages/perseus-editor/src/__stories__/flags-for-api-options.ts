import {ApiOptions, type APIOptions} from "@khanacademy/perseus";

export const flags = {
    mafs: {
        segment: true,
        circle: true,
        quadratic: true,
        sinusoid: true,
        polygon: true,
        linear: true,
        "linear-system": true,
        ray: true,
        "start-coords-ui": true,
        "interactive-graph-locked-features-m2": true,
        "interactive-graph-locked-features-m2b": true,
    },
} satisfies APIOptions["flags"];

export const apiOptionsWithDefaults = {
    ...ApiOptions.defaults,
    flags: {
        ...ApiOptions.defaults.flags,
        ...flags,
    },
};
