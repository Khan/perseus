import dropdownLogic from "@khanacademy/perseus-core/widgets/dropdown";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

import {defineWidgetRegistration} from "./widget-registration";
import radioWidget from "./widgets/radio";

import type {PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";

describe("defineWidgetRegistration", () => {
    it("returns the widget and logic unchanged", () => {
        // Arrange, Act
        const registration = defineWidgetRegistration({
            widget: radioWidget,
            logic: radioLogic,
        });

        expect(registration).toEqual({
            widget: radioWidget,
            logic: radioLogic,
        });
    });

    it("rejects a logic whose widget name differs from the widget's", () => {
        defineWidgetRegistration({
            widget: radioWidget,
            // @ts-expect-error [FEI-5003] - "dropdown" logic can't pair with
            // the "radio" widget.
            logic: dropdownLogic,
        });
    });

    it("rejects public options that aren't a subset of the widget options", () => {
        const logicWithExtraPublicOptions = {
            name: "radio",
            getPublicWidgetOptions: (options: PerseusRadioWidgetOptions) => ({
                ...options,
                answerKey: 1,
            }),
        } as const;

        // @ts-expect-error [FEI-5003] - the public options add a field the
        // widget options don't have.
        defineWidgetRegistration({
            widget: radioWidget,
            logic: logicWithExtraPublicOptions,
        });
    });
});
