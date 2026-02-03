/* eslint-disable @typescript-eslint/no-invalid-this */
/**
 * A library of options to pass to add/draw/remove/constraints
 */
import {point as kpoint} from "@khanacademy/kmath";
import _ from "underscore";

import WrappedEllipse from "./wrapped-ellipse";

import type {Constraint, ConstraintCallbacks, Coord} from "./types";
import type {Interval} from "../util/interval";

const add = {
    constrain: function () {
        this.constrain();
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly constrain: () => void; }'.
add.standard = [add.constrain];

const modify = {
    draw: function () {
        this.draw();
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly draw: () => void; }'.
modify.standard = [modify.draw];

const draw = {
    basic: function (state: any, prevState: any) {
        // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const graphie = this.graphie;
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (!this.state.visibleShape) {
            const radii = [
                // @ts-expect-error - TS2339 - Property 'pointSize' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                this.pointSize() / graphie.scale[0],
                // @ts-expect-error - TS2339 - Property 'pointSize' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                this.pointSize() / graphie.scale[1],
            ];
            const options = {
                maxScale: Math.max(
                    // @ts-expect-error - TS2339 - Property 'highlightStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                    this.highlightStyle().scale,
                    // @ts-expect-error - TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                    this.normalStyle().scale,
                ),
                // Add in 10px of padding to avoid clipping at the edges.
                padding: 10,
                shadow: state.shadow,
            } as const;
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape = new WrappedEllipse(
                graphie,
                // @ts-expect-error - TS2339 - Property 'coord' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                this.coord(),
                // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type '[number, number]'.
                radii,
                options,
            );

            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.attr(_.omit(this.normalStyle(), "scale"));
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.toFront();

            // Keep mouseTarget in front of visible shape
            // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            if (this.mouseTarget()) {
                // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                this.mouseTarget().toFront();
            }
        }
        if (
            state.normalStyle !== prevState.normalStyle &&
            !_.isEqual(state.normalStyle, prevState.normalStyle)
        ) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.attr(this.normalStyle());
        }

        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'coord' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        this.state.visibleShape.moveTo(this.coord());
        // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (this.mouseTarget()) {
            // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'coord' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.mouseTarget().moveTo(this.coord());
        }
    },

    highlight: function (state: any, prevState: any) {
        if (state.isHovering && !prevState.isHovering) {
            // @ts-expect-error - TS2339 - Property 'highlightStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            state.visibleShape.animate(this.highlightStyle(), 50);
        } else if (!state.isHovering && prevState.isHovering) {
            // @ts-expect-error - TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            state.visibleShape.animate(this.normalStyle(), 50);
        }
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
draw.standard = [draw.basic, draw.highlight];

const remove = {
    basic: function () {
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; }'.
        if (this.state.visibleShape) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; }'.
            this.state.visibleShape.remove();
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; }'.
            this.state.visibleShape = null;
        }
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: () => void; }'.
remove.standard = remove.basic;

const constraints = {
    fixed: function (): Constraint {
        return function () {
            return false;
        };
    },

    snap: function (snap?: number | null): Constraint {
        // @ts-expect-error: Type 'boolean | Coord' is not assignable to type 'Coord'.
        return function (coord: Coord) {
            if (snap === null) {
                return true;
            }
            // @ts-expect-error - TS2339: Property 'snap' does not exist on type 'Graphie'.
            return kpoint.roundTo(coord, snap || this.graphie.snap);
        };
    },

    bound: function (
        range?: [Interval, Interval],
        snap?: Coord | number,
        optionalPaddingPx?: number,
    ): Constraint {
        const paddingPx = (() => {
            if (optionalPaddingPx === undefined) {
                if (range === undefined) {
                    return 10;
                } else {
                    return 0;
                }
            } else {
                return optionalPaddingPx;
            }
        })();

        // @ts-expect-error: Type 'boolean | Coord' is not assignable to type 'Coord'.
        return function (
            coord: Coord,
            prev: Coord,
            options: ConstraintCallbacks,
        ) {
            const graphie = this.graphie;
            range = range || graphie.range;

            if (snap === undefined) {
                // @ts-expect-error - Property 'snap' does not exist on type 'Graphie'.
                snap = graphie.snap;
            }

            let lower = graphie.unscalePoint([
                paddingPx,
                // @ts-expect-error - 'graphie.ypixels' is possibly 'undefined'.
                graphie.ypixels - paddingPx,
            ]);

            let upper = graphie.unscalePoint([
                // @ts-expect-error - 'graphie.ypixels' is possibly 'undefined'.
                graphie.xpixels - paddingPx,
                paddingPx,
            ]);

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (snap) {
                lower = kpoint.ceilTo(lower, snap);
                upper = kpoint.floorTo(upper, snap);
            }

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!!options && !!options.onOutOfBounds) {
                if (
                    coord[0] > upper[0] ||
                    coord[0] < lower[0] ||
                    coord[1] > upper[1] ||
                    coord[1] < lower[1]
                ) {
                    options.onSkipRemaining();
                    options.onOutOfBounds();
                }

                return coord;
            }

            const coordX = Math.max(lower[0], Math.min(upper[0], coord[0]));
            const coordY = Math.max(lower[1], Math.min(upper[1], coord[1]));

            return [coordX, coordY];
        };
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly fixed: () => () => boolean; readonly snap: (snap: any) => (arg1: Coord) => unknown; readonly bound: (range: any, snap: any, paddingPx: number) => (arg1: Coord, arg2: Coord, arg3: any) => Coord; }'.
constraints.standard = null;

export default {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
    onClick: {standard: null},
};
