import type {GraphBounds} from "./graph-bounds";
import type {Coord} from "../interactive2/types";

interface Raphael {
    setSize(width: number, height: number);
}

// DrawingTransform is responsible for transforming from "math coordinates"
// (on the Cartesian plane) to "canvas coordinates" in pixels.
export class DrawingTransform {
    raphael: Raphael;

    // Scale is measured in pixels per unit on the Cartesian plane.
    xScale: number;
    yScale: number;
    bounds: GraphBounds;

    constructor(
        raphael: Raphael,
        initialScale: [number, number],
        bounds: GraphBounds,
    ) {
        this.raphael = raphael;
        this.bounds = bounds;
        this.xScale = initialScale[0];
        this.yScale = initialScale[1];
        this.setScale(initialScale);
    }

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
        return [
            (x - this.bounds.xMin) * this.xScale,
            (this.bounds.yMax - y) * this.yScale,
        ];
    };

    unscalePoint = (point: number | Coord) => {
        if (typeof point === "number") {
            return this.unscalePoint([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [
            x / this.xScale + this.bounds.xMin,
            this.bounds.yMax - y / this.yScale,
        ];
    };

    unscaleVector = (point: number | Coord) => {
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
        this.raphael.setSize(...this.canvasDimensions());
    };

    canvasDimensions = (): Coord => {
        return [
            this.bounds.width() * this.xScale,
            this.bounds.height() * this.yScale,
        ];
    };

    pixelsPerUnitX = (): number => {
        return this.xScale;
    };

    pixelsPerUnitY = (): number => {
        return this.yScale;
    };
}
