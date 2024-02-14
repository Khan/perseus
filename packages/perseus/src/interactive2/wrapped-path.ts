import _ from "underscore";

import WrappedDrawing from "./wrapped-drawing";

import type {Coord} from "./types";
import type {VisibleShape} from "./wrapped-drawing";

const DEFAULT_OPTIONS = {
    center: null, // gets ignored in `graphie.fixedPath` if `null`
    createPath: null, // gets defaulted in `graphie.fixedPath` if `null`
    mouselayer: false,
} as const;

class WrappedPath extends WrappedDrawing {
    wrapper: HTMLDivElement;
    visibleShape: VisibleShape;

    constructor(graphie: any, points: ReadonlyArray<Coord>, options: any) {
        const initialPoint = graphie.scalePoint(_.head(points));
        super(graphie, initialPoint);
        options = _.extend({}, DEFAULT_OPTIONS, options);

        const fixedPath = graphie.fixedPath(
            points,
            options.center,
            options.createPath,
        );
        this.wrapper = fixedPath.wrapper;
        this.visibleShape = fixedPath.visibleShape;

        // Add to appropriate graphie layer
        if (options.mouselayer) {
            // Disable browser handling of all panning and zooming gestures on the
            // movable wrapper so that when moved the browser does not scroll page
            this.wrapper.style.touchAction = "none";

            this.graphie.addToMouseLayerWrapper(this.wrapper);
        } else {
            this.graphie.addToVisibleLayerWrapper(this.wrapper);
        }
    }
}

export default WrappedPath;
