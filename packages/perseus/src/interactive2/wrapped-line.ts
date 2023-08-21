import {point as kpoint, vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import KhanMath from "../util/math";

import InteractiveUtil from "./interactive-util";
import WrappedDefaults from "./wrapped-defaults";

import type {Coord} from "./types";

const DEFAULT_OPTIONS = {
    thickness: 2,
    mouselayer: false,
} as const;

const WrappedLine = function (
    graphie: any,
    start: Coord,
    end: Coord,
    options: any,
) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Always make the line as large as possible and horizontal; this
    // simplifies a lot of the transforms, e.g., we can rotate by exactly the
    // angle of the argument points in `moveTo`.
    const initialStart = [graphie.range[0][0], 0];
    const initialEnd = [graphie.range[0][1], 0];

    // Add `wrapper` and `visibleShape`
    _.extend(
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this,
        graphie.fixedLine(initialStart, initialEnd, options.thickness),
    );

    if (options.interactiveKindForTesting) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.wrapper.setAttribute(
            "data-interactive-kind-for-testing",
            options.interactiveKindForTesting,
        );
    }

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.visibleShape.attr(options.normalStyle);

    // Save properties for computing transformations
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, {
        graphie: graphie,
        initialPoint: graphie.scalePoint(initialStart),
        initialLength: kpoint.distanceToPoint(
            graphie.scalePoint(initialStart),
            graphie.scalePoint(initialEnd),
        ),
    });

    // Add to appropriate graphie layer
    if (options.mouselayer) {
        // Disable browser handling of all panning and zooming gestures on the
        // movable wrapper so that when moved the browser does not scroll page
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.wrapper.style.touchAction = "none";

        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.graphie.addToMouseLayerWrapper(this.wrapper);
    } else {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.graphie.addToVisibleLayerWrapper(this.wrapper);
    }

    // Move to argument points
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.moveTo(start, end);
};

_.extend(WrappedLine.prototype, WrappedDefaults, {
    getMouseTarget: function () {
        return this.wrapper;
    },

    moveTo: function (start, end) {
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
    },
});

export default WrappedLine;
