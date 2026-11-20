import {
    PolarMath,
    getPolarGraphStartState,
    generatePolarGraphAngleGraph,
    generatePolarGraphCircleGraph,
    generatePolarGraphLemniscateGraph,
    generatePolarGraphLimaconGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphOptions,
    generatePolarGraphPointGraph,
    generatePolarGraphRayGraph,
    generatePolarGraphRoseGraph,
} from "@khanacademy/perseus-core";

import scorePolarGraph from "./score-polar-graph";

const threeAtFortyFive = PolarMath.fromPolar(3, 45);

const rubric = generatePolarGraphOptions({
    correct: generatePolarGraphPointGraph({
        numPoints: 2,
        coords: [threeAtFortyFive, [0, 2]],
    }),
});

describe("scorePolarGraph", () => {
    it("is invalid before the learner has interacted", () => {
        // Arrange, Act
        const score = scorePolarGraph(undefined, rubric);

        // Assert
        expect(score).toEqual({type: "invalid", message: null});
    });

    it("is invalid when the learner input has no coordinates", () => {
        // Arrange
        const userInput = generatePolarGraphPointGraph({numPoints: 2});

        // Act
        const score = scorePolarGraph(userInput, rubric);

        // Assert
        expect(score).toHaveProperty("type", "invalid");
    });

    it("marks a wrong answer left at the start layout as incorrect", () => {
        // Arrange: the learner's handles sit where they started, which is
        // not the answer. As on interactive graph, placed handles are an
        // answer; only a graph with no coordinates is unanswered.
        const options = generatePolarGraphOptions({
            graph: generatePolarGraphPointGraph({numPoints: 2}),
            correct: generatePolarGraphPointGraph({
                numPoints: 2,
                coords: [threeAtFortyFive, [0, 2]],
            }),
        });
        const atStart = getPolarGraphStartState(options);

        // Act
        const score = scorePolarGraph(atStart, options);

        // Assert
        expect(score).toHaveProperty("earned", 0);
    });

    it("still gives credit when the answer is where the graph starts", () => {
        // Arrange: an author who never moved the answer off its start.
        const options = generatePolarGraphOptions({
            graph: generatePolarGraphCircleGraph(),
        });
        const start = getPolarGraphStartState(options);
        const rubric = {...options, correct: start};

        // Act
        const score = scorePolarGraph(start, rubric);

        // Assert
        expect(score).toHaveProperty("earned", 1);
    });

    it("awards full credit when the points match in any order", () => {
        // Arrange
        const userInput = generatePolarGraphPointGraph({
            coords: [[0, 2], threeAtFortyFive],
        });

        // Act
        const score = scorePolarGraph(userInput, rubric);

        // Assert
        expect(score).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
    });

    it("accepts a point placed with the equivalent polar name", () => {
        // Arrange: (-3, 225°) is the same spot as (3, 45°), so the (x, y) it
        // lands on is identical up to float noise.
        const userInput = generatePolarGraphPointGraph({
            coords: [PolarMath.fromPolar(-3, 225), [0, 2]],
        });

        // Act
        const score = scorePolarGraph(userInput, rubric);

        // Assert
        expect(score.type).toBe("points");
        expect(score).toHaveProperty("earned", 1);
    });

    it("gives no credit when one point is on the wrong spoke", () => {
        // Arrange
        const userInput = generatePolarGraphPointGraph({
            coords: [
                [3, 0],
                [0, 2],
            ],
        });

        // Act
        const score = scorePolarGraph(userInput, rubric);

        // Assert
        expect(score).toHaveProperty("earned", 0);
    });

    it("gives no credit for a different number of points", () => {
        // Arrange
        const userInput = generatePolarGraphPointGraph({
            coords: [threeAtFortyFive],
        });

        // Act
        const score = scorePolarGraph(userInput, rubric);

        // Assert
        expect(score).toHaveProperty("earned", 0);
    });

    it("ignores locked figures when scoring", () => {
        // Arrange: a locked circle sits exactly where the answer point is,
        // and a locked point sits where the learner put theirs.
        const withLocked = generatePolarGraphOptions({
            ...rubric,
            lockedFigures: [
                generatePolarGraphLockedFigure(
                    generatePolarGraphCircleGraph({coords: [[3, 0]]}),
                ),
                generatePolarGraphLockedFigure(
                    generatePolarGraphPointGraph({coords: [[0, 2]]}),
                ),
            ],
        });
        const userInput = generatePolarGraphPointGraph({
            numPoints: 2,
            coords: [[0, 2], threeAtFortyFive],
        });

        // Act
        const withLockedScore = scorePolarGraph(userInput, withLocked);
        const plainScore = scorePolarGraph(userInput, rubric);

        // Assert: the same score as without the locked figures.
        expect(withLockedScore).toEqual(plainScore);
        expect(withLockedScore).toHaveProperty("earned", 1);
    });

    it("throws when the rubric has no answer", () => {
        // Arrange
        const userInput = generatePolarGraphPointGraph({coords: [[3, 0]]});
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphPointGraph({numPoints: 1}),
        });

        // Act
        const score = () => scorePolarGraph(userInput, rubric);

        // Assert
        expect(score).toThrow("Polar graph rubric has no answer coordinates");
    });
});

describe("scorePolarGraph for curves", () => {
    it("scores a ray by direction alone", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphRayGraph({coords: [[0, 2]]}),
        });

        // Act
        const sameDirection = scorePolarGraph(
            generatePolarGraphRayGraph({coords: [[0, 5]]}),
            rubric,
        );
        const otherDirection = scorePolarGraph(
            generatePolarGraphRayGraph({coords: [[2, 0]]}),
            rubric,
        );

        // Assert
        expect(sameDirection).toHaveProperty("earned", 1);
        expect(otherDirection).toHaveProperty("earned", 0);
    });

    it("scores a circle by radius alone", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphCircleGraph({coords: [[3, 0]]}),
        });

        // Act
        const sameRadius = scorePolarGraph(
            generatePolarGraphCircleGraph({coords: [[0, 3]]}),
            rubric,
        );
        const otherRadius = scorePolarGraph(
            generatePolarGraphCircleGraph({coords: [[2, 0]]}),
            rubric,
        );

        // Assert
        expect(sameRadius).toHaveProperty("earned", 1);
        expect(otherRadius).toHaveProperty("earned", 0);
    });

    it("scores a limaçon by its equation, not its handle positions", () => {
        // Arrange: r = 2 + 2 cos θ: far tip (4, 0°), near point at the pole.
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphLimaconGraph({
                coords: [
                    [4, 0],
                    [0, 0],
                ],
            }),
        });

        // Act
        const sameCurve = scorePolarGraph(
            generatePolarGraphLimaconGraph({
                coords: [
                    [4, 0],
                    [0, 0],
                ],
            }),
            rubric,
        );
        // Same shape turned to point up is a different curve.
        const turnedUp = scorePolarGraph(
            generatePolarGraphLimaconGraph({
                coords: [
                    [0, 4],
                    [0, 0],
                ],
            }),
            rubric,
        );

        // Assert
        expect(sameCurve).toHaveProperty("earned", 1);
        expect(turnedUp).toHaveProperty("earned", 0);
    });

    it("scores a rose by amplitude, k and petal position", () => {
        // Arrange: r = 4 cos(3θ) has tips every 120°, so a tip at 120° is
        // the same rose.
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphRoseGraph({k: 3, coords: [[4, 0]]}),
        });

        // Act
        const samePetals = scorePolarGraph(
            generatePolarGraphRoseGraph({
                k: 3,
                coords: [PolarMath.fromPolar(4, 120)],
            }),
            rubric,
        );
        const otherK = scorePolarGraph(
            generatePolarGraphRoseGraph({k: 4, coords: [[4, 0]]}),
            rubric,
        );

        // Assert
        expect(samePetals).toHaveProperty("earned", 1);
        expect(otherK).toHaveProperty("earned", 0);
    });

    it("gives no credit when the learner drew a different sub-type", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphCircleGraph({coords: [[3, 0]]}),
        });

        // Act
        const score = scorePolarGraph(
            generatePolarGraphPointGraph({coords: [[3, 0]]}),
            rubric,
        );

        // Assert
        expect(score).toHaveProperty("earned", 0);
    });
});

describe("scorePolarGraph for angles and lemniscates", () => {
    function sides(
        initialDegrees: number,
        terminalDegrees: number,
    ): [[number, number], [number, number]] {
        return [
            PolarMath.fromPolar(3, initialDegrees),
            PolarMath.fromPolar(3, terminalDegrees),
        ];
    }

    it("needs both sides to match by default", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphAngleGraph({coords: sides(0, 150)}),
        });

        // Act
        const sameSides = scorePolarGraph(
            generatePolarGraphAngleGraph({coords: sides(0, 150)}),
            rubric,
        );
        const turnedSides = scorePolarGraph(
            generatePolarGraphAngleGraph({coords: sides(30, 180)}),
            rubric,
        );

        // Assert
        expect(sameSides).toHaveProperty("earned", 1);
        expect(turnedSides).toHaveProperty("earned", 0);
    });

    it("accepts any position when matching congruent angles", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphAngleGraph({
                match: "congruent",
                coords: sides(0, 150),
            }),
        });

        // Act
        const turnedSides = scorePolarGraph(
            generatePolarGraphAngleGraph({coords: sides(30, 180)}),
            rubric,
        );
        // Swapping the sides gives 210°, a different angle even though the
        // same two lines are drawn.
        const swappedSides = scorePolarGraph(
            generatePolarGraphAngleGraph({coords: sides(150, 0)}),
            rubric,
        );

        // Assert
        expect(turnedSides).toHaveProperty("earned", 1);
        expect(swappedSides).toHaveProperty("earned", 0);
    });

    it("scores a lemniscate by size and axis, from either lobe", () => {
        // Arrange
        const rubric = generatePolarGraphOptions({
            correct: generatePolarGraphLemniscateGraph({coords: [[3, 0]]}),
        });

        // Act
        const otherLobe = scorePolarGraph(
            generatePolarGraphLemniscateGraph({coords: [[-3, 0]]}),
            rubric,
        );
        const otherAxis = scorePolarGraph(
            generatePolarGraphLemniscateGraph({coords: [[0, 3]]}),
            rubric,
        );

        // Assert
        expect(otherLobe).toHaveProperty("earned", 1);
        expect(otherAxis).toHaveProperty("earned", 0);
    });
});
