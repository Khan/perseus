import tableWidgetLogic from "../../widgets/table";

import {generateTableOptions} from "./table-widget-generator";

describe("generateTableOptions", () => {
    it("returns the widget's default options when given no overrides", () => {
        // Arrange, Act
        const options = generateTableOptions();

        // Assert
        expect(options).toEqual(tableWidgetLogic.defaultWidgetOptions);
    });

    it("derives rows, columns and headers from the provided answers", () => {
        // Arrange, Act
        const options = generateTableOptions({
            answers: [
                ["1", "2", "3"],
                ["4", "5", "6"],
            ],
        });

        // Assert
        expect(options.rows).toBe(2);
        expect(options.columns).toBe(3);
        expect(options.headers).toEqual(["", "", ""]);
    });

    it("uses the provided rows, columns and headers when they are given", () => {
        // Arrange, Act
        const options = generateTableOptions({
            answers: [["1", "2"]],
            rows: 5,
            columns: 7,
            headers: ["a", "b"],
        });

        // Assert
        expect(options.rows).toBe(5);
        expect(options.columns).toBe(7);
        expect(options.headers).toEqual(["a", "b"]);
    });
});
