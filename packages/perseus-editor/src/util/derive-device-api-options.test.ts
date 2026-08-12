import {createDeviceApiOptionsDeriver} from "./derive-device-api-options";

import type {DeviceApiOptionsInputs} from "./derive-device-api-options";
import type {APIOptions} from "@khanacademy/perseus";

// A single stable reference, reused by `inputs()` below — real callers pass
// `this.props.apiOptions`, whose reference only changes when props change.
const stableApiOptions: APIOptions = {readOnly: true};

function inputs(
    overrides: Partial<DeviceApiOptionsInputs> = {},
): DeviceApiOptionsInputs {
    return {
        apiOptions: stableApiOptions,
        touch: false,
        ...overrides,
    };
}

describe("createDeviceApiOptionsDeriver", () => {
    it("adjusts apiOptions for a touch device", () => {
        const derive = createDeviceApiOptionsDeriver();

        const result = derive(inputs({touch: true}));

        expect(result).toMatchObject({
            readOnly: true,
            customKeypad: true,
            isMobile: true,
        });
    });

    it("leaves customKeypad and isMobile off for a non-touch device", () => {
        const derive = createDeviceApiOptionsDeriver();

        const result = derive(inputs({touch: false}));

        expect(result).toMatchObject({customKeypad: false, isMobile: false});
    });

    it("returns the same object reference when inputs are unchanged", () => {
        const derive = createDeviceApiOptionsDeriver();

        const first = derive(inputs());
        const second = derive(inputs());

        expect(second).toBe(first);
    });

    it("returns a new object reference when apiOptions identity changes", () => {
        const derive = createDeviceApiOptionsDeriver();

        const first = derive(inputs({apiOptions: {readOnly: true}}));
        const second = derive(inputs({apiOptions: {readOnly: true}}));

        expect(second).not.toBe(first);
    });

    it("returns a new object reference when touch changes", () => {
        const derive = createDeviceApiOptionsDeriver();

        const first = derive(inputs({touch: false}));
        const second = derive(inputs({touch: true}));

        expect(second).not.toBe(first);
    });
});
