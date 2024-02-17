/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs, Coordinates, Plot, useMovablePoint} from "mafs";
import * as React from "react";
import _ from "underscore";

import AssetContext from "../asset-context";
import {SvgImage} from "../components";
import {interactiveSizes} from "../styles/constants";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";

import type {Coord} from "../interactive2/types";
import type {
    PerseusGraphType,
    PerseusGraphTypeSinusoid,
    PerseusImageBackground,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";
import "mafs/core.css";
import "mafs/font.css";
import type {SineCoefficient} from "../util/geometry";
import type {SizeClass} from "../util/sizing-utils";

type RenderProps = PerseusInteractiveGraphWidgetOptions; // There's no transform function in exports
type Rubric = PerseusInteractiveGraphWidgetOptions;
type Props = WidgetProps<RenderProps, Rubric>;

export const InteractiveMafs = ({graph, ...props}: Props) => {
    console.log({graph});
    console.log({props});

    const renderGraph = (graph: PerseusGraphType) => {
        switch (graph.type) {
            case "sinusoid":
                return <Sinusoid {...props} graph={graph} />;
        }
    };

    const backgroundImage = maybeAddBackgroundImage(props);

    return (
        <View
            style={{
                filter: "invert(1)",
            }}
        >
            <Mafs
                viewBox={{x: props.range[0], y: props.range[1], padding: 0}}
                pan={false}
                zoom={false}
                width={400}
                height={400}
            >
                {backgroundImage ?? (
                    <Coordinates.Cartesian
                        xAxis={{
                            lines: props.step[0],
                            labels: (n) =>
                                renderLabel(n, props.range[0]) ? n : "",
                        }}
                        yAxis={{
                            lines: props.step[1],
                            labels: (n) =>
                                renderLabel(n, props.range[1]) ? n : "",
                        }}
                    />
                )}
                {renderGraph(graph)}
            </Mafs>
        </View>
    );
};

const maybeAddBackgroundImage = (props: {
    backgroundImage?: PerseusImageBackground;
    containerSizeClass: SizeClass;
}) => {
    const url = props.backgroundImage?.url;
    if (!url || !url.startsWith("http")) {
        return null;
    }
    const box = getInteractiveBoxFromSizeClass(props.containerSizeClass);
    const scale = box[0] / interactiveSizes.defaultBoxSize;
    return (
        <image
            href={url}
            width={props.backgroundImage?.width}
            height={props.backgroundImage?.height}
            scale={scale}
            x={-200}
            y={-225}
            style={{
                filter: "invert(1)",
            }}
        />
    );
};

const renderLabel = (n: number, [min, max]: [number, number]) =>
    n !== -1 && n !== min && n !== max;

type SinusoidProps = Omit<RenderProps, "graph"> & {
    graph: PerseusGraphTypeSinusoid;
};

const Sinusoid = (props: SinusoidProps) => {
    const coords = normalizePoints(
        props.range,
        props.step,
        props.graph.coords ?? [
            [0.5, 0.5],
            [0.65, 0.6],
        ],
    );

    const [snapX, snapY] = props.snapStep;
    const p1 = useMovablePoint(coords[0], {
        constrain: ([x, y]) => [snap(x, snapX), snap(y, snapY)],
    });
    const p2 = useMovablePoint(coords[1], {
        constrain: ([x, y]) => [snap(x, snapX), snap(y, snapY)],
    });

    const coeffs = (coords: ReadonlyArray<Coord>): SineCoefficient => {
        // It's assumed that p1 is the root and p2 is the first peak
        // Resulting coefficients are canonical for this sine curve
        const amplitude = p2.y - p1.y;
        const angularFrequency = Math.PI / (2 * (p2.x - p1.x));
        const phase = p1.x * angularFrequency;
        const verticalOffset = p1.y;

        return [amplitude, angularFrequency, phase, verticalOffset];
    };

    const [a, b, c, d] = coeffs(coords);

    return (
        <>
            <Plot.OfX y={(x) => a * Math.sin(b * x - c) + d} />
            {p1.element}
            {p2.element}
        </>
    );
};

const snap = (val: number, step: number) => {
    const inverse = 1 / step;
    return Math.round(val * inverse) / inverse;
};

const normalizePoints = (
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: ReadonlyArray<Coord>,
    noSnap?: boolean,
): ReadonlyArray<Coord> => {
    // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
    return coordsList.map((coords) =>
        coords.map((coord, i) => {
            const xRange = range[i];
            if (noSnap) {
                return xRange[0] + (xRange[1] - xRange[0]) * coord;
            }
            const xStep = step[i];
            const nSteps = Math.floor((xRange[1] - xRange[0]) / xStep);
            const tick = Math.round(coord * nSteps);
            return xRange[0] + xStep * tick;
        }),
    );
};

export default {
    name: "interactive-mafs",
    displayName: "Interactive maf",
    widget: InteractiveMafs,
} as WidgetExports<typeof InteractiveMafs>;
