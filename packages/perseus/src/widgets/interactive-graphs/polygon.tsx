import {Line, MovablePoint} from "mafs";
import * as React from "react";

import {constrain, normalizeCoords, normalizePoints} from "./utils";

import type {Coord} from "../../interactive2/types";
import type {PerseusGraphTypePolygon} from "../../perseus-types";
import type {InteractiveGraphProps} from "../interactive-mafs";

type PolygonProps = Omit<InteractiveGraphProps, "graph"> & {
    graph: PerseusGraphTypePolygon;
};

const getPolygonCoords = ({
    graph,
    ...props
}: PolygonProps): ReadonlyArray<Coord> => {
    let coords = graph.coords;
    if (coords) {
        return coords;
    }

    const n = graph.numSides || 3;

    if (n === "unlimited") {
        coords = [];
    } else {
        const angle = (2 * Math.PI) / n;
        const offset = (1 / n - 1 / 2) * Math.PI;

        // TODO(alex): Generalize this to more than just triangles so that
        // all polygons have whole number side lengths if snapping to sides
        const radius = graph.snapTo === "sides" ? (Math.sqrt(3) / 3) * 7 : 4;

        // Generate coords of a regular polygon with n sides
        coords = [...Array(n).keys()].map((i) => [
            radius * Math.cos(i * angle + offset),
            radius * Math.sin(i * angle + offset),
        ]);
    }

    coords = normalizeCoords(coords, [
        [-10, 10],
        [-10, 10],
    ]);

    const snapToGrid = !["angles", "sides"].includes(graph.snapTo || "");
    coords = normalizePoints(
        props.range,
        props.step,
        coords,
        /* noSnap */ !snapToGrid,
    );

    return coords;
};

export const PolygonGraph = (props: PolygonProps) => {
    const [coords, setCoords] = React.useState(getPolygonCoords(props));

    return (
        <>
            {coords.map((coord, i) => (
                <>
                    <MovablePoint
                        key={i}
                        point={coord}
                        constrain={(coord) =>
                            constrain(coord, props.step, props.range)
                        }
                        onMove={(newCoord) => {
                            const newCoords = [...coords];
                            newCoords[i] = newCoord;
                            setCoords(newCoords);
                        }}
                    />
                    <Line.Segment
                        point1={coord}
                        point2={coords[(i + 1) % coords.length]}
                    />
                </>
            ))}
        </>
    );
};
