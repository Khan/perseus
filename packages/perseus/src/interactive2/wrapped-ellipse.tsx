import {vector as kvector} from "@khanacademy/kmath";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import * as React from "react";
import _ from "underscore";

import {MountInDiv} from "../util/mount-in-div";
import reactRender from "../util/react-render";

import InteractiveUtil from "./interactive-util";
import WrappedDrawing from "./wrapped-drawing";

import type {Coord} from "./types";
import type {VisibleShape} from "./wrapped-drawing";

const DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
    shadow: false,
    disableMouseEventsOnWrapper: false,
} as const;

class WrappedEllipse extends WrappedDrawing {
    initialPoint: Coord;
    wrapper: HTMLDivElement;
    visibleShape: VisibleShape;

    constructor(
        graphie: any,
        center: Coord,
        radii: [number, number],
        options: any,
    ) {
        super(graphie, center);
        options = _.extend({}, DEFAULT_OPTIONS, options);

        // Add `wrapper`, `visibleShape`, and remaining properties.
        const fixedEllipse = graphie.fixedEllipse(
            center,
            radii,
            options.maxScale,
            options.padding,
        );
        this.visibleShape = fixedEllipse.visibleShape;
        this.wrapper = fixedEllipse.wrapper;
        this.graphie = graphie;
        this.initialPoint = center;

        if (options.interactiveKindForTesting) {
            this.wrapper.setAttribute(
                "data-interactive-kind-for-testing",
                options.interactiveKindForTesting,
            );
        }

        // Add to appropriate graphie layer
        if (options.mouselayer) {
            // Disable browser handling of all panning and zooming gestures on the
            // movable wrapper so that when moved the browser does not scroll page
            this.wrapper.style.touchAction = "none";

            // Option 2: instead of addToMouseLayerWrapper(this.wrapper)
            // we could do addToMouseLayerWrapper(reactRoot)
            reactRender(
                <Clickable
                    style={{
                        width: this.wrapper.style.width,
                        height: this.wrapper.style.height,
                    }}
                >
                    {() => (
                        <MountInDiv element={fixedEllipse.raphaelContainer} />
                    )}
                </Clickable>,
                this.wrapper,
            );
            this.graphie.addToMouseLayerWrapper(this.wrapper);
        } else {
            this.graphie.addToVisibleLayerWrapper(this.wrapper);
        }

        if (options.shadow) {
            const filter = "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";
            const wrapper = this.wrapper;
            wrapper.style.filter = filter;

            this.moveTo = function (point: any) {
                const delta = kvector.subtract(
                    this.graphie.scalePoint(point),
                    this.graphie.scalePoint(this.initialPoint),
                );
                const do3dTransform = InteractiveUtil.getCanUse3dTransform();
                const transform =
                    "translateX(" +
                    Math.round(delta[0]) +
                    "px) " +
                    "translateY(" +
                    Math.round(delta[1]) +
                    "px)" +
                    (do3dTransform ? " translateZ(0)" : "");
                this.transform(transform);
            };
        }

        if (options.disableMouseEventsOnWrapper) {
            this.wrapper.style.pointerEvents = "none";
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.visibleShape.node.style.pointerEvents = "auto";
        }
    }
}

export default WrappedEllipse;
