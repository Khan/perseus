import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./interaction-ai-utils";

import type {PerseusRenderer} from "../../perseus-types";

const question1: PerseusRenderer = {
    content:
        "Drag the dot all the way to the right.\n\n[[☃ interaction 1]]\n\n\n*Notice that we add a zero to the empty place value.* ",
    images: {},
    widgets: {
        "interaction 1": {
            alignment: "default",
            graded: true,
            options: {
                elements: [
                    {
                        key: "parametric-80c114",
                        options: {
                            color: "#6495ED",
                            rangeMax: "2\\pi",
                            rangeMin: "0",
                            strokeDasharray: "",
                            strokeWidth: 4,
                            x: "\\frac{\\cos(t)}{8}-0.5",
                            y: "\\frac{\\sin(t)}{3.8}-10+\\frac{10.5}{1+e^{-60\\left(x_0+2.5\\right)}}",
                        },
                        type: "parametric",
                    },
                    {
                        key: "line-32ec77",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "-4",
                            endY: "0",
                            startX: "-4",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-5ce426",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "-3",
                            endY: "0",
                            startX: "-3",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-camf1d",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "-2",
                            endY: "0",
                            startX: "-2",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-4cam1d",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "-1",
                            endY: "0",
                            startX: "-1",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-47camd",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "0",
                            endY: "0",
                            startX: "0",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-c7afmd",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "1",
                            endY: "0",
                            startX: "1",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-4cfa1m",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "2",
                            endY: "0",
                            startX: "2",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "line-4cafmd",
                        options: {
                            arrows: "",
                            color: "gray",
                            endX: "3",
                            endY: "0",
                            startX: "3",
                            startY: "1",
                            strokeDasharray: "- ",
                            strokeWidth: 1,
                        },
                        type: "line",
                    },
                    {
                        key: "movable-point-4c3809",
                        options: {
                            constraint: "y",
                            constraintFn: "2",
                            constraintXMax: "-2",
                            constraintXMin: "-4",
                            constraintYMax: "10",
                            constraintYMin: "-10",
                            snap: 0.5,
                            startX: "-4",
                            startY: "2",
                            varSubscript: 0,
                        },
                        type: "movable-point",
                    },
                    {
                        key: "line-190529",
                        options: {
                            arrows: "",
                            color: "black",
                            endX: "-2",
                            endY: "2",
                            startX: "-4",
                            startY: "2",
                            strokeDasharray: "",
                            strokeWidth: 2,
                        },
                        type: "line",
                    },
                    {
                        key: "point-eaff7e",
                        options: {
                            color: "black",
                            coordX: "0",
                            coordY: "0.2",
                        },
                        type: "point",
                    },
                    {
                        key: "label-cam26c",
                        options: {
                            color: "#6495ED",
                            coordX: "-2.5-\\frac{1}{1+e^{-6\\left(x_0+3\\right)}}",
                            coordY: "0.5",
                            label: "\\Huge 2",
                        },
                        type: "label",
                    },
                    {
                        key: "label-cam9e1",
                        options: {
                            color: "#6495ED",
                            coordX: "-1.5-\\frac{1}{1+e^{-6\\left(x_0+3\\right)}}",
                            coordY: "0.5",
                            label: "\\Huge 5",
                        },
                        type: "label",
                    },
                    {
                        key: "label-cam716",
                        options: {
                            color: "#6495ED",
                            coordX: "-0.5-\\frac{1}{1+e^{-6\\left(x_0+3\\right)}}",
                            coordY: "0.5",
                            label: "\\Huge 9",
                        },
                        type: "label",
                    },
                    {
                        key: "label-a06c8d",
                        options: {
                            color: "gray",
                            coordX: "-4",
                            coordY: "1.7",
                            label: "$\\small 259$",
                        },
                        type: "label",
                    },
                    {
                        key: "label-bcd711",
                        options: {
                            color: "gray",
                            coordX: "-2",
                            coordY: "1.7",
                            label: "$\\small 259 \\times 10$",
                        },
                        type: "label",
                    },
                ],
                graph: {
                    backgroundImage: {
                        height: 0,
                        url: null,
                        width: 0,
                    },
                    box: [480, 120],
                    editableSettings: ["canvas", "graph"],
                    gridStep: [0.5, 0.5],
                    labels: ["x", "y"],
                    markings: "none",
                    range: [
                        [-4.3, 3.1],
                        [-0.1, 2.2],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    snapStep: [1, 1],
                    tickStep: [0.5, 1],
                    valid: "Step is too large, there must be at least 3 ticks.",
                },
                static: false,
            },
            static: false,
            type: "interaction",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

describe("Interaction AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const resultJSON = getPromptJSON();

        expect(resultJSON).toEqual({
            type: "interaction",
            isSupported: false,
            message: "",
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "Drag the dot all the way to the right.\n\n[[☃ interaction 1]]\n\n\n*Notice that we add a zero to the empty place value.* ",
            widgets: {
                "interaction 1": {
                    type: "interaction",
                    isSupported: false,
                    message: "",
                },
            },
        });
    });
});