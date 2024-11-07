import {getPromptJSON} from "./prompt-utils";

describe("getPromptJSON", () => {
    it("should return JSON for an angle graph", () => {
        const renderProps: any = {
            graph: {
                type: "angle",
                angleOffsetDeg: 45,
                startCoords: [
                    [0, 0],
                    [1, 1],
                    [2, 2],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "angle",
            coords: [
                [1, 0],
                [2, 1],
                [3, 2],
            ],
            angleOffsetDeg: 45,
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "angle",
                    angleOffsetDegrees: 45,
                    startCoords: [
                        [0, 0],
                        [1, 1],
                        [2, 2],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [1, 0],
                    [2, 1],
                    [3, 2],
                ],
                angleOffsetDegrees: 45,
            },
        });
    });

    it("should return JSON for a circle graph", () => {
        const renderProps: any = {
            graph: {
                type: "circle",
                startCoords: {
                    center: [0, 0],
                    radius: 5,
                },
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "circle",
            center: [1, 1],
            radius: 2,
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "circle",
                    startParams: {
                        center: [0, 0],
                        radius: 5,
                    },
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                center: [1, 1],
                radius: 2,
            },
        });
    });

    it("should return JSON for a linear graph", () => {
        const renderProps: any = {
            graph: {
                type: "linear",
                startCoords: [
                    [0, 0],
                    [1, 1],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "linear",
            coords: [
                [0, 0],
                [2, 2],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "linear",
                    startCoords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [0, 0],
                    [2, 2],
                ],
            },
        });
    });

    it("should return JSON for a linear system graph", () => {
        const renderProps: any = {
            graph: {
                type: "linear-system",
                startCoords: [
                    [
                        [0, 0],
                        [1, 1],
                    ],
                    [
                        [2, 2],
                        [3, 3],
                    ],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "linear-system",
            coords: [
                [
                    [1, 4],
                    [2, 2],
                ],
                [
                    [4, 1],
                    [5, 5],
                ],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "linear-system",
                    startCoords: [
                        [
                            [0, 0],
                            [1, 1],
                        ],
                        [
                            [2, 2],
                            [3, 3],
                        ],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [
                        [1, 4],
                        [2, 2],
                    ],
                    [
                        [4, 1],
                        [5, 5],
                    ],
                ],
            },
        });
    });

    it("should return JSON for a point graph", () => {
        const renderProps: any = {
            graph: {type: "point", numPoints: "unlimited", startCoords: [1, 1]},
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "point",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "point",
                    numPoints: "unlimited",
                    startCoords: [1, 1],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [0, 0],
                    [1, 1],
                ],
            },
        });
    });

    it("should return JSON for a polygon graph", () => {
        const renderProps: any = {
            graph: {
                type: "polygon",
                match: "match",
                numSides: 3,
                startCoords: [
                    [0, 0],
                    [1, 1],
                    [2, 2],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "polygon",
            coords: [
                [3, 3],
                [4, 4],
                [1, 1],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "polygon",
                    match: "match",
                    numSides: 3,
                    startCoords: [
                        [0, 0],
                        [1, 1],
                        [2, 2],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [3, 3],
                    [4, 4],
                    [1, 1],
                ],
            },
        });
    });

    it("should return JSON for a quadratic graph", () => {
        const renderProps: any = {
            graph: {
                type: "quadratic",
                startCoords: [
                    [0, 0],
                    [1, 1],
                    [2, 2],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "quadratic",
            coords: [
                [1, 1],
                [2, 2],
                [3, 3],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "quadratic",
                    startCoords: [
                        [0, 0],
                        [1, 1],
                        [2, 2],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                ],
            },
        });
    });

    it("should return JSON for a ray graph", () => {
        const renderProps: any = {
            graph: {
                type: "ray",
                startCoords: [
                    [0, 0],
                    [1, 1],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "ray",
            coords: [
                [-5, 0],
                [1, 5],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "ray",
                    startCoords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [-5, 0],
                    [1, 5],
                ],
            },
        });
    });

    it("should return JSON for a segment graph", () => {
        const renderProps: any = {
            graph: {
                type: "segment",
                numSegments: 1,
                startCoords: [
                    [0, 0],
                    [1, 1],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "segment",
            coords: [
                [2, 3],
                [3, 1],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "segment",
                    numSegments: 1,
                    startCoords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [2, 3],
                    [3, 1],
                ],
            },
        });
    });

    it("should return JSON for a sinusoid graph", () => {
        const renderProps: any = {
            graph: {
                type: "sinusoid",
                startCoords: [
                    [0, 0],
                    [1, 1],
                ],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "sinusoid",
            coords: [
                [2, 0],
                [1, 3],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "interactive-graph",
            options: {
                graph: {
                    type: "sinusoid",
                    startCoords: [
                        [0, 0],
                        [1, 1],
                    ],
                },
                backgroundImageUrl: "https://example.com/image.png",
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                labels: ["x", "y"],
            },
            userInput: {
                coords: [
                    [2, 0],
                    [1, 3],
                ],
            },
        });
    });

    it("should throw an exception for an unsupported graph", () => {
        const renderProps: any = {
            graph: {
                type: "fake-graph-type",
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["x", "y"],
        };

        const userInput: any = {
            type: "invalid",
            coords: [
                [0, 0],
                [1, 1],
            ],
        };

        expect(() => {
            getPromptJSON(renderProps, userInput);
        }).toThrow("Unhandled case for 'fake-graph-type'");
    });
});
