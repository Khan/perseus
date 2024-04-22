import type {PerseusRenderer} from "../../perseus-types";
import type {Interval, vec} from "mafs";

export function interactiveGraphQuestionBuilder(): InteractiveGraphQuestionBuilder {
    return new InteractiveGraphQuestionBuilder();
}

class InteractiveGraphQuestionBuilder {
    gridStep: vec.Vector2 = [1, 1];
    labels: [string, string] = ["x", "y"];
    markings: "graph" | "grid" | "none" = "graph";
    xRange: Interval = [-10, 10];
    yRange: Interval = [-10, 10];
    snapStep: vec.Vector2 = [0.5, 0.5];
    tickStep: vec.Vector2 = [1, 1];

    build(): PerseusRenderer {
        return {
            content: "[[☃ interactive-graph 1]]",
            images: {},
            widgets: {
                "interactive-graph 1": {
                    graded: true,
                    options: {
                        correct: {
                            coords: [
                                [
                                    [-7, 7],
                                    [2, 5],
                                ],
                            ],
                            type: "segment",
                        },
                        graph: {
                            type: "segment",
                        },
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
}
