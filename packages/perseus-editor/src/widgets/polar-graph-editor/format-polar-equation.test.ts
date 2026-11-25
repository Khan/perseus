import {PolarMath} from "@khanacademy/perseus-core";

import {formatPolarEquation} from "./format-polar-equation";

import type {PerseusPolarGraphType} from "@khanacademy/perseus-core";

const {fromPolar} = PolarMath;

describe("formatPolarEquation", () => {
    it.each<[string, PerseusPolarGraphType, "degrees" | "radians", string]>([
        [
            "points, as their polar names",
            {type: "point", coords: [fromPolar(3, 45), [0, 2]]},
            "degrees",
            "(3, 45°), (2, 90°)",
        ],
        [
            "a ray, by its angle",
            {type: "ray", coords: [fromPolar(2, 150)]},
            "radians",
            "θ = 5π/6",
        ],
        ["a circle", {type: "circle", coords: [[0, 3]]}, "degrees", "r = 3"],
        [
            "a cardioid",
            {
                type: "limacon",
                coords: [
                    [4, 0],
                    [0, 0],
                ],
            },
            "degrees",
            "r = 2 + 2 cos θ",
        ],
        [
            "a rose",
            {type: "rose", k: 3, coords: [fromPolar(4, 0)]},
            "degrees",
            "r = 4 cos(3θ)",
        ],
        [
            "a lemniscate turned a quarter period, as a sine",
            {type: "lemniscate", coords: [fromPolar(3, 45)]},
            "degrees",
            "r² = 9 sin(2θ)",
        ],
        [
            "an angle, by its measure and both sides",
            {type: "angle", coords: [fromPolar(3, 0), fromPolar(3, 150)]},
            "degrees",
            "150° from θ = 0° to θ = 150°",
        ],
    ])("writes %s the way a textbook would", (_name, figure, unit, text) => {
        // Arrange, Act
        const equation = formatPolarEquation(figure, unit);

        // Assert
        expect(equation).toBe(text);
    });

    it.each<[string, PerseusPolarGraphType, "degrees" | "radians", string]>([
        [
            "a cardioid opening upward, as a sine",
            {
                type: "limacon",
                coords: [
                    [0, 4],
                    [0, 0],
                ],
            },
            "degrees",
            "r = 2 + 2 sin θ",
        ],
        [
            "a rose turned a quarter period, as a sine",
            {type: "rose", k: 2, coords: [fromPolar(4, 45)]},
            "degrees",
            "r = 4 sin(2θ)",
        ],
        [
            "a cardioid turned by an odd angle, as a shift in radians",
            {type: "limacon", coords: [fromPolar(4, 30), [0, 0]]},
            "radians",
            "r = 2 + 2 cos(θ − π/6)",
        ],
        [
            "a cardioid opening left, with a minus",
            {
                type: "limacon",
                coords: [
                    [-4, 0],
                    [0, 0],
                ],
            },
            "degrees",
            "r = 2 − 2 cos θ",
        ],
        [
            "a cardioid opening downward, as a negative sine",
            {
                type: "limacon",
                coords: [
                    [0, -4],
                    [0, 0],
                ],
            },
            "degrees",
            "r = 2 − 2 sin θ",
        ],
        [
            "a rose turned half a period, as a negative cosine",
            {type: "rose", k: 3, coords: [fromPolar(4, 60)]},
            "degrees",
            "r = −4 cos(3θ)",
        ],
        [
            "a rose turned by an odd angle, as a shift inside k",
            {type: "rose", k: 3, coords: [fromPolar(4, 20)]},
            "degrees",
            "r = 4 cos(3(θ − 20°))",
        ],
        [
            "a lemniscate turned half a period, as a negative cosine",
            {type: "lemniscate", coords: [fromPolar(3, 90)]},
            "degrees",
            "r² = −9 cos(2θ)",
        ],
        [
            "a lemniscate turned by an odd angle, as a shift in radians",
            {type: "lemniscate", coords: [fromPolar(3, 30)]},
            "radians",
            "r² = 9 cos(2(θ − π/6))",
        ],
        [
            "a plain even-petaled rose, as a cosine and not a negative one",
            {type: "rose", k: 4, coords: [fromPolar(3, 0)]},
            "degrees",
            "r = 3 cos(4θ)",
        ],
        [
            "a lemniscate turned three quarters, as a negative sine",
            {type: "lemniscate", coords: [fromPolar(3, 135)]},
            "degrees",
            "r² = −9 sin(2θ)",
        ],
        [
            "a one-petal rose pointing down, as a negative sine",
            {type: "rose", k: 1, coords: [fromPolar(2, 270)]},
            "degrees",
            "r = −2 sin θ",
        ],
        [
            "a circle through the pole opening upward, as a sine",
            {
                type: "limacon",
                coords: [
                    [0, 4],
                    [0, 4],
                ],
            },
            "degrees",
            "r = 4 sin θ",
        ],
    ])("writes %s", (_name, figure, unit, text) => {
        // Arrange, Act
        const equation = formatPolarEquation(figure, unit);

        // Assert
        expect(equation).toBe(text);
    });

    it("writes a limaçon with its near point on the tip as a circle", () => {
        // Arrange, Act: the near point on the tip means a = 0.
        const equation = formatPolarEquation(
            {
                type: "limacon",
                coords: [
                    [4, 0],
                    [4, 0],
                ],
            },
            "degrees",
        );

        // Assert
        expect(equation).toBe("r = 4 cos θ");
    });

    it("writes a limaçon with the near point past the pole as a circle", () => {
        // Arrange, Act: the near point opposite the tip means b = 0.
        const equation = formatPolarEquation(
            {
                type: "limacon",
                coords: [
                    [3, 0],
                    [-3, 0],
                ],
            },
            "degrees",
        );

        // Assert
        expect(equation).toBe("r = 3");
    });

    it("returns nothing for a figure with no coordinates", () => {
        // Arrange, Act
        const equation = formatPolarEquation({type: "circle"}, "degrees");

        // Assert
        expect(equation).toBe("");
    });
});
