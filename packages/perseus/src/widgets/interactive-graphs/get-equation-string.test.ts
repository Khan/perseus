import {getEquationString} from "./get-equation-string";

import type {Coord} from "../../interactive2/types";

describe("getEquationString", () => {
    describe("logarithm", () => {
        function makeProps(coords: [Coord, Coord], asymptote: number) {
            // eslint-disable-next-line no-restricted-syntax
            return {
                userInput: {
                    type: "logarithm",
                    coords,
                    asymptote,
                },
            } as unknown as Parameters<typeof getEquationString>[0];
        }

        it("omits the constant term when asymptote is 0 (c === 0)", () => {
            // Arrange — asymptote=0 produces c=0
            const props = makeProps(
                [
                    [3, 2],
                    [5, 4],
                ],
                0,
            );

            // Act
            const equation = getEquationString(props);

            // Assert — should NOT contain "+ 0.000"
            expect(equation).not.toContain("+ 0.000");
            expect(equation).toMatch(/ln\(\d+\.\d+x\)/);
        });

        it("shows subtracted constant when c < 0", () => {
            // Arrange — asymptote=2 produces a negative c
            const props = makeProps(
                [
                    [3, 2],
                    [5, 4],
                ],
                2,
            );

            // Act
            const equation = getEquationString(props);

            // Assert — should contain "x - " for negative c
            expect(equation).toContain("x - ");
            expect(equation).not.toContain("x + -");
        });

        it("shows added constant when c > 0", () => {
            // Arrange — asymptote=-2 produces a positive c
            const props = makeProps(
                [
                    [3, 2],
                    [5, 4],
                ],
                -2,
            );

            // Act
            const equation = getEquationString(props);

            // Assert — should contain "x + " for positive c
            expect(equation).toContain("x + ");
        });
    });
});
