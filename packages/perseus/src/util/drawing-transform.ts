// DrawingTransform is responsible for transforming from "math coordinates"
// (on the Cartesian plane) to "canvas coordinates" in pixels.

import type {Coord} from "../interactive2/types";
import { Interval, size } from "./interval";

interface Raphael {
    setSize(width: number, height: number);
}

export class DrawingTransform {
    raphael: Raphael;

    // Scale is measured in pixels per unit on the Cartesian plane.
    // TODO(benchristel): confirm that this is true.
    xScale: number;
    yScale: number;
    xRange: Interval;
    yRange: Interval;

    constructor(raphael: Raphael, initialScale: [number, number], initialRanges: [Interval, Interval]) {
        this.raphael = raphael;
        [this.xScale, this.yScale] = initialScale;
        [this.xRange, this.yRange] = initialRanges;
        raphael.setSize(...this.canvasDimensions());
    }

    // TODO(benchristel): rename these methods to transform* instead of scale*.
    // They're doing more than scaling! Some of them also translate.
    scaleVector = (point: number | Coord) => {
        if (typeof point === "number") {
            return this.scaleVector([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [x * this.xScale, y * this.yScale];
    };

    scalePoint = (point: number | Coord): Coord => {
        if (typeof point === "number") {
            return this.scalePoint([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [(x - this.xRange[0]) * this.xScale, (this.yRange[1] - y) * this.yScale];
    };

    unscalePoint = (point: Array<never>) => {
        if (typeof point === "number") {
            return this.unscalePoint([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [x / this.xScale + this.xRange[0], this.yRange[1] - y / this.yScale];
    };

    unscaleVector = (point: Array<never>) => {
        if (typeof point === "number") {
            return this.unscaleVector([point, point]);
        }

        return [point[0] / this.xScale, point[1] / this.yScale];
    };

    setScale = (scale: number | Coord) => {
        if (typeof scale === "number") {
            scale = [scale, scale];
        }

        this.xScale = scale[0];
        this.yScale = scale[1];

        // Update the canvas size
        this.raphael.setSize(
            size(this.xRange) * this.xScale,
            size(this.yRange) * this.yScale,
        );
    }

    canvasDimensions = (): Coord => {
        return [size(this.xRange) * this.xScale, size(this.yRange) * this.yScale];
    }
}

