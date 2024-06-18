import * as React from "react";
import {useRef, useState} from "react";
import {useMovable, vec} from "mafs";
import {Protractor} from "./protractor";

export function StatefulProtractor() {
    const [center, setCenter] = useState<vec.Vector2>([0, -9])

    const draggableRef = useRef<SVGGElement>(null);

    useMovable({
        gestureTarget: draggableRef,
        onMove: setCenter,
        point: center,
        constrain: (p) => p,
    })

    return <g ref={draggableRef}><Protractor center={center} /></g>
}
