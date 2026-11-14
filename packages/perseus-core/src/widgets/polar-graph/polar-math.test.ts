import {
    anglesEqual,
    pointsEqual,
    valuesEqual,
    getAngleMeasureDegrees,
    getLemniscateParams,
    lemniscatePoint,
    lemniscatesEqual,
    formatAngleLabel,
    formatRadians,
    fromPolar,
    getLimaconControlPoints,
    getLimaconNearKeyboardConstraint,
    getLimaconParams,
    getPolarKeyboardConstraint,
    getRoseParams,
    limaconsEqual,
    moveLimaconTip,
    normalizeDegrees,
    outerRadius,
    rosePeriodDegrees,
    rosesEqual,
    snapGraphToGrid,
    snapLimaconNearDistance,
    snapToPolarGrid,
    snapToPolarGridCoord,
    toPolar,
} from "./polar-math";

const grid = {maxRadius: 5, radiusStep: 1, angleStepDegrees: 15};

describe("toPolar and fromPolar", () => {
    it("round-trips (3, 45°) without float noise", () => {
        // Arrange
        const point = fromPolar(3, 45);

        // Act
        const polar = toPolar(point);

        // Assert
        expect(polar).toEqual({r: 3, thetaDegrees: 45});
    });

    it("reports angles in [0, 360)", () => {
        // Arrange, Act
        const polar = toPolar([0, -2]);

        // Assert
        expect(polar.thetaDegrees).toBe(270);
    });
});

describe("normalizeDegrees", () => {
    it.each([
        [-90, 270],
        [360, 0],
    ])("brings %s degrees into [0, 360) as %s", (degrees, expected) => {
        // Arrange, Act
        const normalized = normalizeDegrees(degrees);

        // Assert
        expect(normalized).toBe(expected);
    });
});

describe("snapToPolarGrid", () => {
    it("rounds to the nearest circle and spoke", () => {
        // Arrange
        const nearThreeAtFortyFive = fromPolar(2.8, 49);

        // Act
        const snapped = snapToPolarGrid(nearThreeAtFortyFive, grid);

        // Assert
        expect(snapped).toEqual({r: 3, thetaDegrees: 45});
    });

    it("clamps the radius to the graph", () => {
        // Arrange, Act
        const snapped = snapToPolarGrid([9, 0], grid);

        // Assert
        expect(snapped.r).toBe(5);
    });

    it("reports the pole as radius 0 at angle 0", () => {
        // Arrange, Act
        const snapped = snapToPolarGrid(fromPolar(0.3, 200), grid);

        // Assert
        expect(snapped).toEqual({r: 0, thetaDegrees: 0});
    });

    it.each([
        [90, [0, 2]],
        [180, [-2, 0]],
    ])("returns a clean point on the %s degree axis", (degrees, expected) => {
        // Arrange, Act
        const coord = snapToPolarGridCoord(fromPolar(2, degrees), grid);

        // Assert
        expect(coord).toEqual(expected);
    });
});

describe("getPolarKeyboardConstraint", () => {
    it("moves outward and inward along the spoke", () => {
        // Arrange
        const point = fromPolar(3, 45);

        // Act
        const moves = getPolarKeyboardConstraint(point, grid);

        // Assert
        expect(toPolar(moves.up)).toEqual({r: 4, thetaDegrees: 45});
        expect(toPolar(moves.down)).toEqual({r: 2, thetaDegrees: 45});
    });

    it("turns counterclockwise on left and clockwise on right", () => {
        // Arrange
        const point = fromPolar(3, 0);

        // Act
        const moves = getPolarKeyboardConstraint(point, grid);

        // Assert
        expect(toPolar(moves.left)).toEqual({r: 3, thetaDegrees: 15});
        expect(toPolar(moves.right)).toEqual({r: 3, thetaDegrees: 345});
    });

    it("stops at the outer circle and at the pole", () => {
        // Arrange, Act
        const atEdge = getPolarKeyboardConstraint(fromPolar(5, 30), grid);
        const nearPole = getPolarKeyboardConstraint(fromPolar(1, 30), grid);

        // Assert
        expect(toPolar(atEdge.up).r).toBe(5);
        expect(nearPole.down).toEqual([0, 0]);
    });

    it("only moves outward from the pole", () => {
        // Arrange, Act
        const moves = getPolarKeyboardConstraint([0, 0], grid);

        // Assert
        expect(moves.up).toEqual([1, 0]);
        expect(moves.down).toEqual([0, 0]);
        expect(moves.left).toEqual([0, 0]);
        expect(moves.right).toEqual([0, 0]);
    });
});

describe("outerRadius", () => {
    it("stops handles on the last circle inside the edge", () => {
        // Arrange: circles at 2 and 4, with the graph's edge at 5.
        const coarse = {maxRadius: 5, radiusStep: 2, angleStepDegrees: 15};

        // Act
        const radius = outerRadius(coarse);
        const snapped = snapToPolarGrid([5.5, 0], coarse);
        const moves = getPolarKeyboardConstraint([4, 0], coarse);

        // Assert
        expect(radius).toBe(4);
        expect(snapped.r).toBe(4);
        expect(moves.up).toEqual([4, 0]);
    });

    it("counts the circles exactly despite float division", () => {
        // Arrange, Act
        const radius = outerRadius({
            maxRadius: 0.6,
            radiusStep: 0.2,
            angleStepDegrees: 15,
        });

        // Assert
        expect(radius).toBe(0.6);
    });
});

describe("snapGraphToGrid", () => {
    it("moves points onto the nearest grid point", () => {
        // Arrange, Act
        const snapped = snapGraphToGrid(
            {type: "point", coords: [[2.2, 0.1], fromPolar(7, 45)]},
            grid,
        );

        // Assert
        expect(snapped).toEqual({
            type: "point",
            coords: [[2, 0], fromPolar(5, 45)],
        });
    });

    it("keeps handles that need a direction off the pole", () => {
        // Arrange, Act
        const ray = snapGraphToGrid({type: "ray", coords: [[0.1, 0.2]]}, grid);
        const angle = snapGraphToGrid(
            {type: "angle", coords: [fromPolar(0.2, 30), fromPolar(3, 91)]},
            grid,
        );

        // Assert: the ray keeps its direction but moves out to the first
        // circle.
        expect(ray.coords).toEqual([
            fromPolar(1, toPolar([0.1, 0.2]).thetaDegrees),
        ]);
        expect(angle.coords).toEqual([fromPolar(1, 30), fromPolar(3, 90)]);
    });

    it("keeps the limaçon's near point on the tip's line", () => {
        // Arrange: circle spacing grows to 2, so the tip at 3 must move.
        const coarse = {maxRadius: 6, radiusStep: 2, angleStepDegrees: 15};

        // Act
        const snapped = snapGraphToGrid(
            {type: "limacon", coords: [fromPolar(3, 0), fromPolar(1, 0)]},
            coarse,
        );

        // Assert
        expect(snapped.coords).toEqual([
            [4, 0],
            [2, 0],
        ]);
    });
});

describe("formatRadians", () => {
    it.each([
        [0, "0"],
        [15, "π/12"],
        [45, "π/4"],
        [90, "π/2"],
        [150, "5π/6"],
        [180, "π"],
        [270, "3π/2"],
        [330, "11π/6"],
        [22.5, "π/8"],
        [7.5, "π/24"],
    ])("writes %s degrees as %s", (degrees, expected) => {
        // Arrange, Act
        const label = formatRadians(degrees);

        // Assert
        expect(label).toBe(expected);
    });
});

describe("formatAngleLabel", () => {
    it("uses the degree sign for degrees and π for radians", () => {
        // Arrange, Act
        const inDegrees = formatAngleLabel(45, "degrees");
        const inRadians = formatAngleLabel(45, "radians");

        // Assert
        expect(inDegrees).toBe("45°");
        expect(inRadians).toBe("π/4");
    });
});

describe("getLimaconParams", () => {
    it("reads a cardioid off a far tip and a near point at the pole", () => {
        // Arrange, Act
        const params = getLimaconParams([fromPolar(4, 0), [0, 0]]);

        // Assert
        expect(params).toEqual({a: 2, b: 2, phiDegrees: 0});
    });

    it("reads a dimpled limaçon whose near point is past the pole", () => {
        // Arrange, Act
        // r = 3 + cos θ: far tip at 4, near point at (−2, 0).
        const params = getLimaconParams([fromPolar(4, 0), [-2, 0]]);

        // Assert
        expect(params).toEqual({a: 3, b: 1, phiDegrees: 0});
    });

    it("reads an inner loop whose near point is on the tip's side", () => {
        // Arrange, Act
        // r = 1 + 2 cos θ: far tip at 3, inner loop crossing at (1, 0).
        const params = getLimaconParams([fromPolar(3, 0), [1, 0]]);

        // Assert
        expect(params).toEqual({a: 1, b: 2, phiDegrees: 0});
    });

    it("keeps the orientation of a tip on the 90 degree axis", () => {
        // Arrange, Act
        const params = getLimaconParams([fromPolar(4, 90), [0, 0]]);

        // Assert
        expect(params).toEqual({a: 2, b: 2, phiDegrees: 90});
    });

    it("round-trips through the control points", () => {
        // Arrange
        const params = {a: 3, b: 1, phiDegrees: 270};

        // Act
        const roundTripped = getLimaconParams(getLimaconControlPoints(params));

        // Assert
        expect(roundTripped).toEqual(params);
    });
});

describe("limaconsEqual", () => {
    it("treats a negative b as the same curve turned half way round", () => {
        // Arrange, Act
        const equal = limaconsEqual(
            {a: 2, b: -1, phiDegrees: 0},
            {a: 2, b: 1, phiDegrees: 180},
        );

        // Assert
        expect(equal).toBe(true);
    });

    it("ignores orientation for a plain circle", () => {
        // Arrange, Act
        const equal = limaconsEqual(
            {a: 2, b: 0, phiDegrees: 0},
            {a: 2, b: 0, phiDegrees: 90},
        );

        // Assert
        expect(equal).toBe(true);
    });

    it("tells a cardioid from its mirror image", () => {
        // Arrange, Act
        const equal = limaconsEqual(
            {a: 2, b: 2, phiDegrees: 0},
            {a: 2, b: 2, phiDegrees: 180},
        );

        // Assert
        expect(equal).toBe(false);
    });
});

describe("rose curves", () => {
    it("folds the tip angle to one petal", () => {
        // Arrange, Act
        // A three-petal rose repeats every 120°.
        const params = getRoseParams([fromPolar(2, 150)], 3);

        // Assert
        expect(params).toEqual({a: 2, k: 3, phiDegrees: 30});
    });

    it("uses a half-size period for an even k", () => {
        // Arrange, Act
        const evenPeriod = rosePeriodDegrees(2);
        const oddPeriod = rosePeriodDegrees(3);

        // Assert
        expect(evenPeriod).toBe(90);
        expect(oddPeriod).toBe(120);
    });

    it("matches r = a sin(2θ) to the cosine form turned by 45 degrees", () => {
        // Arrange: a sin(2θ) = a cos(2(θ − 45°)), so a tip at 45° is the
        // same rose as a tip at 135°.
        const tipAtFortyFive = getRoseParams([fromPolar(2, 45)], 2);
        const tipAtOneThirtyFive = getRoseParams([fromPolar(2, 135)], 2);

        // Act
        const equal = rosesEqual(tipAtFortyFive, tipAtOneThirtyFive);

        // Assert
        expect(equal).toBe(true);
    });

    it("tells roses with different petal counts apart", () => {
        // Arrange, Act
        const equal = rosesEqual(
            getRoseParams([fromPolar(2, 0)], 2),
            getRoseParams([fromPolar(2, 0)], 3),
        );

        // Assert
        expect(equal).toBe(false);
    });
});

describe("anglesEqual", () => {
    it.each([
        [0, 360],
        [15, 375],
    ])("treats %s and %s degrees as the same direction", (a, b) => {
        // Arrange, Act
        const equal = anglesEqual(a, b);

        // Assert
        expect(equal).toBe(true);
    });

    it("keeps different spokes apart", () => {
        // Arrange, Act
        const equal = anglesEqual(15, 30);

        // Assert
        expect(equal).toBe(false);
    });
});

describe("limaçon near point helpers", () => {
    it("snaps the near point onto the tip's line, short of the tip", () => {
        // Arrange
        const farTip = fromPolar(4, 0);

        // Act
        const offLine = snapLimaconNearDistance([1.2, 0.7], farTip, grid);
        const pastTip = snapLimaconNearDistance([9, 0], farTip, grid);
        const pastFarSide = snapLimaconNearDistance([-9, 0], farTip, grid);

        // Assert
        expect(offLine).toBe(1);
        expect(pastTip).toBe(4);
        // Past the tip's distance on the far side, the far tip would stop
        // being the farthest point.
        expect(pastFarSide).toBe(-4);
    });

    it("carries the near point with the tip and shrinks it to fit", () => {
        // Arrange
        const farTip = fromPolar(4, 0);
        const nearPoint = fromPolar(2, 0);

        // Act
        const turned = moveLimaconTip(
            fromPolar(4, 90),
            nearPoint,
            farTip,
            grid,
        );
        const shrunk = moveLimaconTip(fromPolar(1, 0), nearPoint, farTip, grid);

        // Assert
        expect(turned).toEqual([
            [0, 4],
            [0, 2],
        ]);
        expect(shrunk).toEqual([
            [1, 0],
            [1, 0],
        ]);
    });

    it("moves the near point along the line with up and down only", () => {
        // Arrange
        const farTip = fromPolar(4, 0);

        // Act
        const moves = getLimaconNearKeyboardConstraint([0, 0], farTip, grid);

        // Assert
        expect(moves.up).toEqual([1, 0]);
        expect(moves.down).toEqual([-1, 0]);
        expect(moves.left).toEqual([0, 0]);
        expect(moves.right).toEqual([0, 0]);
    });
});

describe("lemniscates", () => {
    it("folds the tip angle to a half turn", () => {
        // Arrange, Act
        const params = getLemniscateParams([fromPolar(3, 210)]);

        // Assert
        expect(params).toEqual({a: 3, phiDegrees: 30});
    });

    it("treats the two lobe tips as the same curve", () => {
        // Arrange
        const oneLobe = getLemniscateParams([fromPolar(3, 30)]);
        const otherLobe = getLemniscateParams([fromPolar(3, 210)]);

        // Act
        const equal = lemniscatesEqual(oneLobe, otherLobe);

        // Assert
        expect(equal).toBe(true);
    });

    it("tells lemniscates on different axes apart", () => {
        // Arrange
        const atThirty = getLemniscateParams([fromPolar(3, 30)]);
        const atSixty = getLemniscateParams([fromPolar(3, 60)]);

        // Act
        const equal = lemniscatesEqual(atThirty, atSixty);

        // Assert
        expect(equal).toBe(false);
    });

    it("passes through the pole at the lobe edges and the tip mid-lobe", () => {
        // Arrange
        const params = {a: 3, phiDegrees: 0};

        // Act
        const firstTip = lemniscatePoint(params, 0, 0);
        const secondTip = lemniscatePoint(params, 0, 1);
        const lobeEdge = lemniscatePoint(params, 45, 0);

        // Assert
        expect(firstTip).toEqual([3, 0]);
        expect(secondTip).toEqual([-3, 0]);
        expect(lobeEdge).toEqual([0, 0]);
    });
});

describe("getAngleMeasureDegrees", () => {
    it.each([
        [0, 150, 150],
        [0, 210, 210],
        [90, 0, 270],
    ])("measures %s° to %s° counterclockwise as %s°", (from, to, expected) => {
        // Arrange, Act
        const measure = getAngleMeasureDegrees([
            fromPolar(3, from),
            fromPolar(2, to),
        ]);

        // Assert
        expect(measure).toBe(expected);
    });
});

describe("valuesEqual and pointsEqual", () => {
    it.each([
        [44.999999, 45],
        [2.999999, 3.000001],
    ])("treats %s and %s, a rounding step apart, as equal", (a, b) => {
        // Arrange, Act
        const equal = valuesEqual(a, b);

        // Assert
        expect(equal).toBe(true);
    });

    it("keeps grid neighbors apart", () => {
        // Arrange, Act
        const valuesMatch = valuesEqual(45, 45.5);
        const pointsMatch = pointsEqual([3, 0], [3, 0.5]);

        // Assert
        expect(valuesMatch).toBe(false);
        expect(pointsMatch).toBe(false);
    });

    it("matches a typed point to the grid's version of it", () => {
        // Arrange, Act
        const equal = pointsEqual(
            [2.1213203436, 2.1213203436],
            fromPolar(3, 45),
        );

        // Assert
        expect(equal).toBe(true);
    });
});
