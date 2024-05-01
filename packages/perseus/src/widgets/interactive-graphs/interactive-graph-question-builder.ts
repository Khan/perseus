import type {PerseusRenderer} from "../../perseus-types";
import type {Interval, vec} from "mafs";
import {PerseusGraphType} from "../../perseus-types";

export function interactiveGraphQuestionBuilder(): InteractiveGraphQuestionBuilder {
    return new InteractiveGraphQuestionBuilder();
}

class InteractiveGraphQuestionBuilder {
    private gridStep: vec.Vector2 = [1, 1];
    private labels: [string, string] = ["x", "y"];
    private markings: "graph" | "grid" | "none" = "graph";
    private xRange: Interval = [-10, 10];
    private yRange: Interval = [-10, 10];
    private snapStep: vec.Vector2 = [0.5, 0.5];
    private tickStep: vec.Vector2 = [1, 1];
    private interactiveFigureConfig: InteractiveFigureConfig = new SegmentGraphConfig(1);

    build(): PerseusRenderer {
        console.log("config", this.interactiveFigureConfig.correct())
        return {
            content: "[[☃ interactive-graph 1]]",
            images: {},
            widgets: {
                "interactive-graph 1": {
                    graded: true,
                    options: {
                        correct: this.interactiveFigureConfig.correct(),
                        graph: this.interactiveFigureConfig.graph(),
                        gridStep: this.gridStep,
                        labels: this.labels,
                        markings: this.markings,
                        range: [this.xRange, this.yRange],
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: false,
                        showRuler: false,
                        snapStep: this.snapStep,
                        step: this.tickStep,
                    },
                    type: "interactive-graph",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        };
    }

    withGridStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.gridStep = [x, y];
        return this;
    }

    withAxisLabels(x: string, y: string): InteractiveGraphQuestionBuilder {
        this.labels = [x, y];
        return this;
    }

    withMarkings(
        markings: "graph" | "grid" | "none",
    ): InteractiveGraphQuestionBuilder {
        this.markings = markings;
        return this;
    }

    withXRange(min: number, max: number): InteractiveGraphQuestionBuilder {
        this.xRange = [min, max];
        return this;
    }

    withYRange(min: number, max: number): InteractiveGraphQuestionBuilder {
        this.yRange = [min, max];
        return this;
    }

    withSnapStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.snapStep = [x, y];
        return this;
    }

    withTickStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.tickStep = [x, y];
        return this;
    }

    withSegments(numSegments: number): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SegmentGraphConfig(numSegments)
        return this;
    }
}

interface InteractiveFigureConfig {
    graph(): PerseusGraphType
    correct(): PerseusGraphType
}

class SegmentGraphConfig implements InteractiveFigureConfig {
    private numSegments: number;
    constructor(numSegments: number) {
        this.numSegments = numSegments;
    }
    
    correct(): PerseusGraphType {
        return {
            type: "segment",
            numSegments: this.numSegments,
            coords: repeat(this.numSegments,
                [
                    [-7, 7],
                    [2, 5],
                ],
            ),
        };
    }

    graph(): PerseusGraphType {
        return {type: "segment", numSegments: this.numSegments};
    }
}

function repeat<T>(n: number, item: T): T[] {
    return new Array(n).fill(null).map(() => item);
}
