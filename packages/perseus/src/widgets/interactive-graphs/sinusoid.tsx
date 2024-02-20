import {useMovablePoint, Plot} from "mafs";
import * as React from "react";

import {Grid} from "./grid";
import {normalizePoints, constrain} from "./utils";

import type {PerseusGraphTypeSinusoid} from "../../perseus-types";
import type {SineCoefficient} from "../../util/geometry";
import type {InteractiveGraphProps} from "../interactive-mafs";

type SinusoidProps = Omit<InteractiveGraphProps, "graph"> & {
    graph: PerseusGraphTypeSinusoid;
};

export const SinusoidGraph = (props: SinusoidProps) => {
    const coords = normalizePoints(
        props.range,
        props.step,
        props.graph.coords ?? [
            [0.5, 0.5],
            [0.65, 0.6],
        ],
    );

    const p1 = useMovablePoint(coords[0], {
        constrain: (coord) => constrain(coord, props.snapStep, props.range),
    });
    const p2 = useMovablePoint(coords[1], {
        constrain: (coord) => constrain(coord, props.snapStep, props.range),
    });

    const coeffs = (): SineCoefficient => {
        // It's assumed that p1 is the root and p2 is the first peak
        // Resulting coefficients are canonical for this sine curve
        const amplitude = p2.y - p1.y;
        const angularFrequency = Math.PI / (2 * (p2.x - p1.x));
        const phase = p1.x * angularFrequency;
        const verticalOffset = p1.y;

        return [amplitude, angularFrequency, phase, verticalOffset];
    };

    const [a, b, c, d] = coeffs();

    return (
        <>
            <Grid {...props} />
            <Plot.OfX y={(x) => a * Math.sin(b * x - c) + d} />
            {p1.element}
            {p2.element}
        </>
    );
};
