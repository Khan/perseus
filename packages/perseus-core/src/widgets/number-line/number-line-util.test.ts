import getNumberLinePublicWidgetOptions from "./number-line-util";

import type {PerseusNumberLineWidgetOptions} from "../../data-schema";

describe("getNumberLinePublicWidgetOptions", () => {
    it("removes correctX and correctRel", () => {
        const options: PerseusNumberLineWidgetOptions = {
            correctRel: "lt",
            correctX: 42,
            range: [0, 100],
            numDivisions: 5,
            tickStep: 6,
            divisionRange: [],
            initialX: 3,
            labelRange: [],
            labelStyle: "",
            labelTicks: false,
            isInequality: false,
            snapDivisions: 0,
            isTickCtrl: false,
            showTooltips: false,
            static: false,
        };

        const publicOptions = getNumberLinePublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            range: [0, 100],
            numDivisions: 5,
            tickStep: 6,
            divisionRange: [],
            initialX: 3,
            labelRange: [],
            labelStyle: "",
            labelTicks: false,
            isInequality: false,
            snapDivisions: 0,
            isTickCtrl: false,
            showTooltips: false,
            static: false,
        });
    });
});
