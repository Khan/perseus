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

        // Locked figures flags
        "interactive-graph-locked-features-m2": true,
        "interactive-graph-locked-features-m2b": true,

        // Start coords UI flags
        "start-coords-ui": {
            angle: false,
            segment: true,
            circle: true,
            quadratic: false,
            sinusoid: false,
            polygon: false,
            linear: true,
            "linear-system": true,
            ray: true,
            point: false,
        },
    },
} satisfies APIOptions["flags"];

export const apiOptionsWithDefaults = {
    ...ApiOptions.defaults,
    flags: {
        ...ApiOptions.defaults.flags,
        ...flags,
    },
};
