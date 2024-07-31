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
        // TODO(LEMS-2228): Remove flags once this is fully released
        "start-coords-ui-phase-1": true,
        "start-coords-ui-phase-2": true,
    },
} satisfies APIOptions["flags"];

export const apiOptionsWithDefaults = {
    ...ApiOptions.defaults,
    flags: {
        ...ApiOptions.defaults.flags,
        ...flags,
    },
};
