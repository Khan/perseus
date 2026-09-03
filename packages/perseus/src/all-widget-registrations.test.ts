import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import allWidgetRegistrations from "./all-widget-registrations";
import allWidgets from "./all-widgets";
import {getWidgetExport, registerWidgets} from "./widgets";

describe("allWidgetRegistrations", () => {
    it("has a descriptor for every production React widget", () => {
        const registered = allWidgetRegistrations.map((r) => r.widget.name);

        expect(registered.sort()).toEqual(allWidgets.map((w) => w.name).sort());
    });

    it("registers each descriptor in both the React and core registries", () => {
        const registerLogic = jest.spyOn(CoreWidgetRegistry, "registerLogic");

        registerWidgets(allWidgetRegistrations);

        for (const {widget, logic} of allWidgetRegistrations) {
            expect(getWidgetExport(widget.name)).toBe(widget);
            expect(registerLogic).toHaveBeenCalledWith(logic);
        }
    });

    it("pairs each descriptor's widget and logic under the same name", () => {
        for (const {widget, logic} of allWidgetRegistrations) {
            expect(logic.name).toBe(widget.name);
        }
    });
});
