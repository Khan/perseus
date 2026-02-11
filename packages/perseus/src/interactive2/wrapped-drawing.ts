/**
 * Default methods for a wrapped movable.
 */

import {vector as kvector} from "@khanacademy/kmath";
import $ from "jquery";

import InteractiveUtil from "./interactive-util";

import type {Coord} from "./types";
import type {Graphie} from "../util/graphie";

/*
 * attr() and animate() simply pass the
 * arguments to the underlying Raphael object.
 */
export interface VisibleShape {
    attr: (...args: any[]) => void;
    animate: (...args: any[]) => void;
    remove: () => void;
    hide: () => void;
    show: () => void;
}

export default abstract class WrappedDrawing {
    graphie: Graphie;
    abstract wrapper: HTMLDivElement;
    abstract visibleShape: VisibleShape;
    initialPoint: Coord;

    constructor(graphie: Graphie, initialPoint: Coord) {
        this.graphie = graphie;
        this.initialPoint = initialPoint;
    }

    transform(transformation) {
        const prefixedTransform = InteractiveUtil.getPrefixedTransform();
        // @ts-expect-error - TS2538 - Type 'null' cannot be used as an index type. | TS2538 - Type 'undefined' cannot be used as an index type.
        this.wrapper.style[prefixedTransform] = transformation;
    }

    toFront() {
        const parentNode = this.wrapper.parentNode;
        // NOTE(emily): Sometimes, we call `.remove()` but then hold a
        // reference to this object, and sometimes call `.toFront` on it.
        // Notably, this happens in the reflection transformation in the
        // Transformer widget. This is a hacky fix.
        if (parentNode) {
            parentNode.appendChild(this.wrapper);
        }
    }

    toBack() {
        const parentNode = this.wrapper.parentNode;
        if (parentNode != null && parentNode.firstChild !== this.wrapper) {
            parentNode.insertBefore(this.wrapper, parentNode.firstChild);
        }
    }

    remove() {
        this.visibleShape.remove();
        $(this.wrapper).remove();
    }

    getMouseTarget() {
        return this.visibleShape[0];
    }

    moveTo(point) {
        const delta = kvector.subtract(
            this.graphie.scalePoint(point),
            this.graphie.scalePoint(this.initialPoint),
        );
        const do3dTransform = InteractiveUtil.getCanUse3dTransform();
        const transformation =
            "translateX(" +
            delta[0] +
            "px) " +
            "translateY(" +
            delta[1] +
            "px)" +
            (do3dTransform ? " translateZ(0)" : "");
        this.transform(transformation);
    }

    hide() {
        this.visibleShape.hide();
    }

    show() {
        this.visibleShape.show();
    }

    attr(...args) {
        this.visibleShape.attr(...args);
    }

    animate(...args) {
        this.visibleShape.animate(...args);
    }
}
