import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import allWidgetRegistrations from "../all-widget-registrations";
import {getWidgetExport} from "../widgets";

import {registerAllWidgetsForTesting} from "./register-all-widgets-for-testing";

describe("registerAllWidgetsForTesting", () => {
    it("maps a deprecated type onto the standin in both registries", () => {
        const registerLogic = jest.spyOn(CoreWidgetRegistry, "registerLogic");

        registerAllWidgetsForTesting();

        for (const {logic} of allWidgetRegistrations) {
            expect(registerLogic).toHaveBeenCalledWith(logic);
        }
        expect(getWidgetExport("transformer")?.name).toBe(
            "deprecated-standin",
        );
        expect(CoreWidgetRegistry.isWidgetRegistered("transformer")).toBe(true);
    });
});
