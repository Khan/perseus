import {userEvent as userEventLib} from "@testing-library/user-event";

import {ApiOptions} from "../../perseus-api";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    pointQuestion,
    polygonQuestion,
    quadraticQuestion,
    rayQuestion,
    segmentQuestion,
    sinusoidQuestion,
} from "../../widgets/interactive-graphs/interactive-graph.testdata";

import {getPromptJSON} from "./interactive-graph-ai-utils";

import type {UserEvent} from "@testing-library/user-event";

const apiOptions = ApiOptions.defaults;

describe("InteractiveGraph AI utils", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    it("should return JSON for an angle graph", () => {
        const renderProps: any = {
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
            },
            userInput: {
                center: [1, 1],
                radius: 2,
            },
        });
    });

    it("should return JSON for a linear graph", () => {
        const renderProps: any = {
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
                type: "point",
                numPoints: "unlimited",
                startCoords: [1, 1],
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
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
            labels: ["$x$", "$y$"],
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
                labels: ["$x$", "$y$"],
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
            userInput: {
                type: "fake-graph-type",
            },
            backgroundImage: {url: "https://example.com/image.png"},
            range: [
                [-10, 10],
                [-10, 10],
            ],
            labels: ["$x$", "$y$"],
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

    it("should get prompt JSON for an angle graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(angleQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Drag the vertex of the angle to place the vertex at point $\\text{A}$.**  \n\n**Drag another point on the angle to make one of the rays go through point $\\text{B}$.**\n\n**Make the other ray go through one of the unlabeled black points to create an acute angle.**  \n*The arc symbol near the vertex indicates the angle being measured.*\n\n[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "angle",
                            angleOffsetDegrees: 1,
                            startCoords: undefined,
                        },
                        backgroundImageUrl:
                            "https://ka-perseus-graphie.s3.amazonaws.com/807ea77cf7031c1b9a45694083f05b5e09b01946.png",
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [6.998933866094739, 0.12216684506098452],
                            [0, 0],
                            [6.535062985480412, 2.5085756468171017],
                        ],
                        angleOffsetDegrees: 1,
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a circle graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(circleQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "circle",
                            startParams: {
                                center: undefined,
                                radius: undefined,
                            },
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        center: [0, 0],
                        radius: 2,
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a linear graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(linearQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "linear",
                            startCoords: undefined,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [-5, 5],
                            [5, 5],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a linear system graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(linearSystemQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "linear-system",
                            startCoords: undefined,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [
                                [-5, 5],
                                [5, 5],
                            ],
                            [
                                [-5, -5],
                                [5, -5],
                            ],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a point graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(pointQuestion, apiOptions);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "We want to find the zeros of this polynomial:\n\n$p(x)=x(2x+5)(x+1)$\n\n**Plot all the zeros ($x$-intercepts) of the polynomial in the interactive graph.**\n\n[[\u2603 interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "point",
                            numPoints: "unlimited",
                            startCoords: undefined,
                        },
                        backgroundImageUrl:
                            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/9e825947f778170369f22da5f87239cbf4c1ebe3",
                        range: [
                            [-4, 4],
                            [-4, 4],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: undefined,
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a polygon graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(polygonQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Sides shown** Drag the vertices of the triangle below to draw a right triangle with side lengths $3$, $4$, and $5$. \n[[\u2603 interactive-graph 1]] \n",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "polygon",
                            match: undefined,
                            numSides: 3,
                            startCoords: undefined,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-1, 6],
                            [-1, 6],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [3.5, 2],
                            [2.5, 4],
                            [1.5, 2],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a quadratic graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(quadraticQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "quadratic",
                            startCoords: undefined,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [-5, 5],
                            [0, -5],
                            [5, 5],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a ray graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(rayQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Move the ray so it has an endpoint at point $\\text{B}$ and goes through point $\\text{A}$. Then complete the statement below.**\n\n[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "ray",
                            startCoords: undefined,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [-5, 5],
                            [5, 5],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a segment graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(segmentQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "Line segment $\\overline{OG}$ is rotated $180^\\circ$ about the point $(-2,4)$.  \n\n**Draw the image of this rotation using the interactive graph.**\n\n*The direction of a rotation by a positive angle is counter-clockwise.* \n\n[[☃ interactive-graph 1]]\n\n",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "segment",
                            startCoords: undefined,
                            numSegments: 1,
                        },
                        backgroundImageUrl: null,
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [
                                [-5, 5],
                                [5, 5],
                            ],
                        ],
                    },
                },
            },
        });
    });

    it("should get prompt JSON for a sinusoid graph", async () => {
        // Arrange
        const {renderer} = renderQuestion(sinusoidQuestion, apiOptions);

        // Act
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("{arrowup}{arrowdown}");
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "**Graph $h(x)=3\\sin(2x-\\pi)+2$ in the interactive widget.**  \n*Note that one moveable point always defines an extremum point in the graph and the other point always defines a neighbouring intersection with the midline.*\n\n[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        graph: {
                            type: "sinusoid",
                            startCoords: undefined,
                        },
                        backgroundImageUrl:
                            "https://ka-perseus-graphie.s3.amazonaws.com/ba6cf7327a7aaed2386ca00d48b6d554a357ac57.png",
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["$x$", "$y$"],
                    },
                    userInput: {
                        coords: [
                            [0, 0],
                            [3, 2],
                        ],
                    },
                },
            },
        });
    });
});
