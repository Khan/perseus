import {useMovablePoint, Circle, MovablePoint} from "mafs";
import * as React from "react";

import {Grid} from "./grid";
import {constrain, snap} from "./utils";

import type {MafsGraphProps} from "./types";
import type {PerseusGraphTypeCircle} from "../../perseus-types";
import type {vec} from "mafs";

type CircleProps = MafsGraphProps<PerseusGraphTypeCircle>;

export const CircleGraph = (props: CircleProps) => {
    const [r, setR] = React.useState(
        props.graph.radius || Math.min(...props.step),
    );
    const center = useMovablePoint(props.graph.center ?? [0, 0], {
        constrain: (coord) => constrain(coord, props.snapStep, props.range),
    });

    const radiusHandle = [
        center.point[0] + r,
        center.point[1],
    ] satisfies vec.Vector2;

    return (
        <>
            {!props.usesLegacyBackgoundImage && <Grid {...props} />}
            <Circle center={center.point} radius={r} fillOpacity={0} />
            {center.element}
            {/* {radiusHandle.element} */}
            <MovablePoint
                point={radiusHandle}
                onMove={([x]) => {
                    // cannot pull the radius handle to go outside the range
                    if (x < props.range[0][0] || x > props.range[0][1]) {
                        return;
                    }
                    // set the radius to the distance between the center and the
                    // handle, minimum 1
                    setR(Math.abs(snap(x - center.x, props.step[0])) || 1);
                }}
            />
        </>
    );
};
