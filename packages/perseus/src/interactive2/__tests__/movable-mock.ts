/**
 * Create a Mocked Movable
 */

import _ from "underscore";

import {Graphie} from "../../util/graphie";
import {Movable} from "../movable";

import type {Coord} from "@khanacademy/perseus";

const createMock = function (): any {
    return new MovableMock(new Graphie(document.createElement("div")), {});
};

class MovableMock extends Movable<Record<string, never>> {
    modify(options: any) {
        // TODO(benchristel): what is mouseTarget? It seems to be unused.
        super.modify(_.omit(options, "mouseTarget"));
    }

    move(...args) {
        const [startPoint, ...rest] = args;
        // TODO(jack): Move these into onMoveStart, onMove, and onMoveEnd
        this.state.isMouseOver = true;
        this.state.isHovering = true;
        this.onMoveStart(startPoint, startPoint);
        rest.forEach((point, i) => {
            this.state.isDragging = true;
            this.onMove(point, args[i]);
        });
        this.onMoveEnd(_.last(args), startPoint);
        this.state.isDragging = false;
        this.state.isMouseOver = false;
        this.state.isHovering = false;
    }

    onMoveStart(coord: Coord, prevCoord: Coord) {
        this._fireEvent(this.state.onMoveStart, coord, prevCoord);
    }

    onMove(coord: Coord, prevCoord: Coord) {
        this._fireEvent(this.state.onMove, coord, prevCoord);
    }

    onMoveEnd(coord: Coord, prevCoord: Coord) {
        this._fireEvent(this.state.onMoveEnd, coord, prevCoord);
    }

    onClick(coord: Coord, prevCoord: Coord) {
        this._fireEvent(this.state.onClick, coord, prevCoord);
    }
}

export default createMock;
