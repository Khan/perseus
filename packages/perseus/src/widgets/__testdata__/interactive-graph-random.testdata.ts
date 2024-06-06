import {
    arrayOfLength,
    randomBoolean,
    randomElement,
    randomInteger,
    randomLetter,
    randomWord,
} from "./randomizers";

import type {Coord} from "../../interactive2/types";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
    PerseusImageBackground,
    PerseusRenderer,
} from "../../perseus-types";

const randomCoord = (): Coord => {
    return [randomInteger(1, 100), randomInteger(1, 100)];
};

const randomGraphTypeAngle = (): PerseusGraphTypeAngle => {
    return {
        type: "angle",
        showAngles: randomBoolean(),
        allowReflexAngles: randomBoolean(),
        angleOffsetDeg: randomInteger(1, 90),
        snapDegrees: randomInteger(1, 90),
        match: "congruent",
        // must be 3 coords for an angle graph
        coords: arrayOfLength(3).map(randomCoord),
    };
};

const randomGraphTypeCircle = (): PerseusGraphTypeCircle => {
    return {
        type: "circle",
        center: randomCoord(),
        radius: randomInteger(1, 20),
    };
};

const randomGraphTypeLinear = (): PerseusGraphTypeLinear => {
    return {
        type: "linear",
        coords: [[randomCoord(), randomCoord()]],
    };
};

const randomGraphTypeLinearSystem = (): PerseusGraphTypeLinearSystem => {
    return {
        type: "linear-system",
        coords: [
            [randomCoord(), randomCoord()],
            [randomCoord(), randomCoord()],
        ],
    };
};

const randomGraphTypePoint = (): PerseusGraphTypePoint => {
    let minCoords = 1;
    const numPoints = randomElement(["unlimited", randomInteger(1, 10)]);
    if (typeof numPoints === "number") {
        minCoords = numPoints;
    }
    return {
        type: "point",
        numPoints: typeof numPoints === "number" ? numPoints : "unlimited",
        coords: arrayOfLength(randomInteger(minCoords, 10)).map(randomCoord),
    };
};

const randomGraphTypePolygon = (): PerseusGraphTypePolygon => {
    // Note Jhead - I saw this create at least one broken graph but didn't figure out why
    return {
        type: "polygon",
        numSides: randomElement([
            "unlimited",
            undefined,
            randomInteger(3, 30),
            randomInteger(3, 30),
        ]),
        showAngles: randomBoolean(),
        showSides: randomBoolean(),
        snapTo: randomElement(["grid", "angles", "sides"]),
        match: randomElement(["similar", "congruent", "approx", undefined]),
        coords: arrayOfLength(randomInteger(3, 20)).map(randomCoord),
    };
};

const randomGraphTypeQuadratic = (): PerseusGraphTypeQuadratic => {
    return {
        type: "quadratic",
        coords: arrayOfLength(3).map(
            randomCoord,
        ) as PerseusGraphTypeQuadratic["coords"],
    };
};

const randomGraphTypeRay = (): PerseusGraphTypeRay => {
    return {
        type: "ray",
        coords: [[randomCoord(), randomCoord()]],
    };
};

const randomGraphTypeSegment = (): PerseusGraphTypeSegment => {
    const numSegments = randomInteger(1, 6);
    return {
        type: "segment",
        numSegments,
        coords: arrayOfLength(numSegments).map(() => [
            randomCoord(),
            randomCoord(),
        ]),
    };
};

const randomGraphTypeSinusoid = (): PerseusGraphTypeSinusoid => {
    return {
        type: "sinusoid",
        coords: arrayOfLength(2).map(randomCoord),
    };
};

export const randomBackgroundImage = (): PerseusImageBackground => {
    const height = randomInteger(200, 500);
    const width = randomInteger(200, 500);
    const graphieUrl =
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/a1b7a05c177742523250b64a3995c9b37aac3399";
    const placeKittenUrl = `https://placekitten.com/g/${width}/${height}`;

    return {
        scale: randomInteger(8, 12) / 10,
        bottom: randomInteger(0, 10) - 5,
        url: randomElement([graphieUrl, placeKittenUrl, null]),
        height,
        width,
        left: randomInteger(0, 10) - 5,
    };
};

export const randomInteractiveGraphGenerator = (
    type?: string,
): PerseusRenderer => {
    const randomRange = (): [number, number] => {
        const val1 = randomInteger(0, 400) - 200;
        const val2 = randomInteger(0, 400) - 200;
        if (val1 < val2) {
            return [val1, val2];
        }
        return [val2, val1];
    };

    const graphType =
        type ||
        randomElement([
            "angle",
            "circle",
            "linear",
            "linear-system",
            "point",
            "polygon",
            "quadratic",
            "ray",
            "segment",
            "sinusoid",
        ]);

    let graph: PerseusGraphType;
    let correct: PerseusGraphType;

    switch (graphType) {
        case "angle": {
            graph = randomGraphTypeAngle();
            correct = randomGraphTypeAngle();
            break;
        }
        case "circle": {
            graph = randomGraphTypeCircle();
            correct = randomGraphTypeCircle();
            break;
        }
        case "linear": {
            graph = randomGraphTypeLinear();
            correct = randomGraphTypeLinear();
            break;
        }
        case "linear-system": {
            graph = randomGraphTypeLinearSystem();
            correct = randomGraphTypeLinearSystem();
            break;
        }
        case "point": {
            graph = randomGraphTypePoint();
            correct = randomGraphTypePoint();
            break;
        }
        case "polygon": {
            graph = randomGraphTypePolygon();
            correct = randomGraphTypePolygon();
            break;
        }
        case "quadratic": {
            graph = randomGraphTypeQuadratic();
            correct = randomGraphTypeQuadratic();
            break;
        }
        case "ray": {
            graph = randomGraphTypeRay();
            correct = randomGraphTypeRay();
            break;
        }
        case "segment": {
            graph = randomGraphTypeSegment();
            correct = randomGraphTypeSegment();
            break;
        }
        case "sinusoid": {
            graph = randomGraphTypeSinusoid();
            correct = randomGraphTypeSinusoid();
            break;
        }
        default: {
            graph = randomGraphTypeAngle();
            correct = randomGraphTypeAngle();
        }
    }

    return {
        content: `[[\u2603 interactive-graph 1]]`,
        images: {},
        widgets: {
            "interactive-graph 1": {
                graded: randomBoolean(),
                version: {
                    major: 0,
                    minor: 0,
                },
                static: false, //always false for this widget
                type: "interactive-graph",
                options: {
                    rulerTicks: randomInteger(1, 100),
                    showProtractor: randomBoolean(0.2),
                    graph,
                    snapStep: [
                        randomInteger(1, 10) / 10,
                        randomInteger(1, 10) / 10,
                    ],
                    labels: [randomLetter() || "x", randomLetter() || "y"],
                    step: [randomInteger(1, 10), randomInteger(1, 10)],
                    gridStep: [randomInteger(1, 10), randomInteger(1, 10)],
                    backgroundImage: randomBackgroundImage(),
                    range: [randomRange(), randomRange()],
                    showRuler: randomBoolean(0.2),
                    markings:
                        randomElement(["none", "graph", "grid"]) || "none",
                    rulerLabel: randomElement(["", randomWord()]) || "",
                    correct,
                },
                alignment: "default",
            },
        },
    };
};
