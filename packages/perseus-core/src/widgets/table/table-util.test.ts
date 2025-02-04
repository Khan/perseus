import getTablePublicWidgetOptions from "./table-util";

import type {PerseusTableWidgetOptions} from "@khanacademy/perseus-core";

describe("getTablePublicWidgetOptions", () => {
    it("removes the answers", () => {
        const options: PerseusTableWidgetOptions = {
            headers: ["a", "b"],
            answers: [
                ["1", "2"],
                ["3", "4"],
            ],
            columns: 2,
            rows: 2,
        };

        const publicOptions = getTablePublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            headers: ["a", "b"],
            columns: 2,
            rows: 2,
        });
    });
});
