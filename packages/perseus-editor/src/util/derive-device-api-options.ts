import {ApiOptions} from "@khanacademy/perseus";

import type {APIOptions, APIOptionsWithDefaults} from "@khanacademy/perseus";

export type DeviceApiOptionsInputs = {
    apiOptions: APIOptions | undefined;
    touch: boolean;
};

function buildDeviceApiOptions(
    inputs: DeviceApiOptionsInputs,
): APIOptionsWithDefaults {
    return {
        ...ApiOptions.defaults,
        ...inputs.apiOptions,
        customKeypad: inputs.touch,
        isMobile: inputs.touch,
    };
}

/**
 * Returns a memoized deriver for the preview's device-adjusted apiOptions.
 * It returns the same object reference across calls while neither `apiOptions`
 * (by reference) nor `touch` (by value) changes, so EditorPage's per-render
 * rebuild doesn't hand a fresh object to <ItemEditor>'s content memo — which
 * would defeat it and, with axe-core scanning on, loop scan -> report ->
 * re-render -> resend. (This is the class-component stand-in for `useMemo`.)
 */
export function createDeviceApiOptionsDeriver(): (
    inputs: DeviceApiOptionsInputs,
) => APIOptionsWithDefaults {
    let lastInputs: DeviceApiOptionsInputs | null = null;
    let lastResult: APIOptionsWithDefaults | null = null;

    return (inputs: DeviceApiOptionsInputs): APIOptionsWithDefaults => {
        if (
            lastResult != null &&
            lastInputs != null &&
            lastInputs.apiOptions === inputs.apiOptions &&
            lastInputs.touch === inputs.touch
        ) {
            return lastResult;
        }
        const result = buildDeviceApiOptions(inputs);
        lastInputs = inputs;
        lastResult = result;
        return result;
    };
}
