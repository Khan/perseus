import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import categorizerLogic from "@khanacademy/perseus-core/widgets/categorizer";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

import {expectWarning, expectPass} from "../__tests__/test-utils";

import inaccessibleWidgetRule from "./inaccessible-widget";

describe("inaccessible-widget", () => {
    beforeEach(() => {
        CoreWidgetRegistry.registerLogics([categorizerLogic, radioLogic]);
    });

    it("warns for a widget whose logic declares it inaccessible", () => {
        expectWarning(
            inaccessibleWidgetRule,
            "[[☃ categorizer 1]]",
            {
                widgets: {
                    "categorizer 1": {
                        type: "categorizer",
                        options: {},
                    },
                },
            },
            {message: 'The "categorizer" widget is not accessible.'},
        );
    });

    it("passes for an accessible widget", () => {
        expectPass(inaccessibleWidgetRule, "[[☃ radio 1]]", {
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {},
                },
            },
        });
    });
});
