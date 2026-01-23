import {point as kpoint, vector as kvector, KhanMath} from "@khanacademy/kmath";
import _ from "underscore";

import InteractiveUtil from "./interactive-util";
import WrappedDrawing from "./wrapped-drawing";

import type {Coord} from "./types";
import type {VisibleShape} from "./wrapped-drawing";

const DEFAULT_OPTIONS = {
    thickness: 2,
    mouselayer: false,
} as const;

class WrappedLine extends WrappedDrawing {
    initialLength: number;
    wrapper: HTMLDivElement;
    visibleShape: VisibleShape;

    constructor(graphie: any, start: Coord, end: Coord, options: any) {
        // Always make the line as large as possible and horizontal; this
        // simplifies a lot of the transforms, e.g., we can rotate by exactly the
        // angle of the argument points in `moveTo`.
        const initialStart = [graphie.range[0][0], 0];
        const initialEnd = [graphie.range[0][1], 0];
        const initialPoint = graphie.scalePoint(initialStart);
        super(graphie, initialPoint);
        options = _.extend({}, DEFAULT_OPTIONS, options);

        const fixedLine = graphie.fixedLine(
            initialStart,
            initialEnd,
            options.thickness,
        );
        this.wrapper = fixedLine.wrapper;
        this.visibleShape = fixedLine.visibleShape;

        if (options.interactiveKindForTesting) {
            this.wrapper.setAttribute(
                "data-interactive-kind-for-testing",
                options.interactiveKindForTesting,
            );
        }

        this.visibleShape.attr(options.normalStyle);

        // Save properties for computing transformations
        this.initialPoint = initialPoint;
        this.initialLength = kpoint.distanceToPoint(
            graphie.scalePoint(initialStart),
            graphie.scalePoint(initialEnd),
        );

        // Add to appropriate graphie layer
        if (options.mouselayer) {
            // Disable browser handling of all panning and zooming gestures on the
            // movable wrapper so that when moved the browser does not scroll page
            this.wrapper.style.touchAction = "none";

            this.graphie.addToMouseLayerWrapper(this.wrapper);
        } else {
            this.graphie.addToVisibleLayerWrapper(this.wrapper);
        }

        // Move line to initial points
        this.moveTo(start, end);
    }

    getMouseTarget() {
        return this.wrapper;
    }

    // @ts-expect-error - TS2416: Property 'moveTo' in type 'WrappedLine' is not assignable to the same property in base type 'WrappedDefaults'.
    moveTo(start, end) {
        const scaledStart = this.graphie.scalePoint(start);
        const scaledEnd = this.graphie.scalePoint(end);

        // Compute transformation parameters
        const polarDiff = kvector.polarDegFromCart(
            kvector.subtract(scaledEnd, scaledStart),
        );
        const lineLength = polarDiff[0];
        const angle = KhanMath.bound(polarDiff[1]);
        const delta = kvector.subtract(scaledStart, this.initialPoint);
        const scale = KhanMath.bound(lineLength / this.initialLength);

        // Construct and apply transformation string
        const do3dTransform = InteractiveUtil.getCanUse3dTransform();
        const transformation =
            "translateX(" +
            delta[0] +
            "px) " +
            "translateY(" +
            delta[1] +
            "px) " +
            (do3dTransform ? " translateZ(0)" : "") +
            "rotate(" +
            angle +
            "deg) " +
            "scaleX(" +
            scale +
            ") scaleY(1)";
        this.transform(transformation);
    }
}

export default WrappedLine;
