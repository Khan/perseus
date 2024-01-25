// Defines the bounds of the visible area of a graph, in Cartesian coordinates.
// GraphBounds is immutable.
export class GraphBounds {
    readonly xMin: number;
    readonly xMax: number;
    readonly yMin: number;
    readonly yMax: number;

    constructor(xRange: [number, number], yRange: [number, number]) {
        this.xMin = xRange[0];
        this.xMax = xRange[1];
        this.yMin = yRange[0];
        this.yMax = yRange[1];
    }

    width(): number {
        return this.xMax - this.xMin;
    }

    height(): number {
        return this.yMax - this.yMin;
    }
}
