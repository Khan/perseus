import {
    generateMatrixOptions,
    generateMatrixWidget,
} from "./matrix-widget-generator";

import type {MatrixWidget, PerseusMatrixWidgetOptions} from "../../data-schema";

describe("generateMatrixOptions", () => {
    it("builds default matrix options", () => {
        // Arrange, Act
        const options: PerseusMatrixWidgetOptions = generateMatrixOptions();

        // Assert
        expect(options.matrixBoardSize).toEqual([3, 3]);
        expect(options.answers).toEqual([[]]);
        expect(options.prefix).toBe("");
        expect(options.suffix).toBe("");
        expect(options.cursorPosition).toEqual([0, 0]);
    });

    it("builds matrix options with all props", () => {
        // Arrange, Act
        const options: PerseusMatrixWidgetOptions = generateMatrixOptions({
            matrixBoardSize: [4, 4],
            answers: [
                [1, 2],
                [3, 4],
            ],
            prefix: "Given $A =$",
            suffix: "($2 \\times 2$ matrix)",
            cursorPosition: [1, 1],
            static: true,
        });

        // Assert
        expect(options.matrixBoardSize).toEqual([4, 4]);
        expect(options.answers).toEqual([
            [1, 2],
            [3, 4],
        ]);
        expect(options.prefix).toBe("Given $A =$");
        expect(options.suffix).toBe("($2 \\times 2$ matrix)");
        expect(options.cursorPosition).toEqual([1, 1]);
        expect(options.static).toBe(true);
    });
});

describe("generateMatrixWidget", () => {
    it("builds a default matrix widget", () => {
        // Arrange, Act
        const widget: MatrixWidget = generateMatrixWidget();

        // Assert
        expect(widget.type).toBe("matrix");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options.matrixBoardSize).toEqual([3, 3]);
        expect(widget.options.answers).toEqual([[]]);
        expect(widget.options.prefix).toBe("");
        expect(widget.options.suffix).toBe("");
    });

    it("builds a matrix widget with all props", () => {
        // Arrange, Act
        const widget: MatrixWidget = generateMatrixWidget({
            graded: false,
            version: {major: 1, minor: 2},
            static: true,
            alignment: "block",
            options: {
                matrixBoardSize: [2, 3],
                answers: [[5, -2, 1]],
                prefix: "Row 1:",
                suffix: "",
                cursorPosition: [0, 0],
            },
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 2});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            matrixBoardSize: [2, 3],
            answers: [[5, -2, 1]],
            prefix: "Row 1:",
            suffix: "",
            cursorPosition: [0, 0],
        });
    });

    it("builds a matrix widget using the options generator", () => {
        // Arrange, Act
        const widget: MatrixWidget = generateMatrixWidget({
            static: true,
            options: generateMatrixOptions({
                matrixBoardSize: [3, 4],
                answers: [
                    [5, -2, 1, 1],
                    [3, 0, 0, -2],
                    [1, 1, 7, -3],
                ],
                prefix: "Perform $R_3 \\leftrightarrow R_2$:",
            }),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.options.matrixBoardSize).toEqual([3, 4]);
        expect(widget.options.answers).toEqual([
            [5, -2, 1, 1],
            [3, 0, 0, -2],
            [1, 1, 7, -3],
        ]);
        expect(widget.options.prefix).toBe(
            "Perform $R_3 \\leftrightarrow R_2$:",
        );
        expect(widget.options.suffix).toBe("");
    });
});
