import * as React from "react";
import {useRef, useState} from "react";
import {useMovable, vec} from "mafs";
import {Protractor} from "./protractor";
import useGraphConfig from "./reducer/use-graph-config";

export function StatefulProtractor() {
    const {range: [[xMin, xMax], [yMin, yMax]]} = useGraphConfig()
    const initialCenter: vec.Vector2 = [
        lerp(xMin, xMax, 0.5),
        lerp(yMin, yMax, 0.05),
    ]
    const [center, setCenter] = useState<vec.Vector2>(initialCenter)

    const draggableRef = useRef<SVGGElement>(null);
    useMovable({
        gestureTarget: draggableRef,
        onMove: setCenter,
        point: center,
        constrain: (p) => p,
    })

    return <g ref={draggableRef}><Protractor center={center} /></g>
}

// [L]inear Int[erp]olation: gets the weighted average of two values `a` and
// `b`, with the given `fraction` specifying how much weight `a` and `b` get:
// - if `fraction` is 0, `lerp` returns `a`.
// - if `fraction` is 0.5, `lerp` returns the average of `a` and `b`.
// - if `fraction` is 1, `lerp` returns `b`.
function lerp(a: number, b: number, fraction: number): number {
    return (b - a) * fraction + a
}
