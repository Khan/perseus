/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {View} from "@khanacademy/wonder-blocks-core";
import {
    Mafs,
    Coordinates,
    Plot,
    useMovablePoint,
    Line,
    Circle,
    MovablePoint,
} from "mafs";
import * as React from "react";
import _ from "underscore";

import {interactiveSizes} from "../styles/constants";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";

import type {Coord} from "../interactive2/types";
import type {
    PerseusGraphType,
    PerseusGraphTypeCircle,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
    PerseusImageBackground,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";
import "mafs/core.css";
import "mafs/font.css";
import type {SineCoefficient} from "../util/geometry";
import type {SizeClass} from "../util/sizing-utils";
import type {vec} from "mafs";

type RenderProps = PerseusInteractiveGraphWidgetOptions;
type Rubric = PerseusInteractiveGraphWidgetOptions;
type Props = WidgetProps<RenderProps, Rubric>;

const maybeAddBackgroundImage = (props: {
    backgroundImage?: PerseusImageBackground;
    containerSizeClass: SizeClass;
}): [JSX.Element | null, boolean] => {
    let renderCoords = true;
    let url = props.backgroundImage?.url;
    if (!url) {
        return [null, renderCoords];
    }

    // replace protocol with https
    if (url.startsWith("web+graphie")) {
        url = url.replace(/web\+graphie/, "https") + ".svg";
    } else {
        renderCoords = false;
    }

    const box = getInteractiveBoxFromSizeClass(props.containerSizeClass);
    const scale = box[0] / interactiveSizes.defaultBoxSize;
    return [
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
        />,
        renderCoords,
    ];
};

const renderLabel = (n: number, [min, max]: [number, number]) =>
    n !== -1 && n !== min && n !== max;

export const InteractiveMafs = ({graph, ...props}: Props) => {
    console.log(graph.type, {graph});
    console.log({props});

    const renderGraph = (graph: PerseusGraphType) => {
        switch (graph.type) {
            case "sinusoid":
                return <SinusoidGraph {...props} graph={graph} />;
            case "segment":
                return <SegmentsGraph {...props} graph={graph} />;
            case "circle":
                return <CircleGraph {...props} graph={graph} />;
        }
    };

    const [backgroundImage, renderCoords] = maybeAddBackgroundImage(props);

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
                {backgroundImage}
                {renderCoords && (
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

// Interactive Graphs

const snap = (val: number, step: number) => {
    const inverse = 1 / step;
    return Math.round(val * inverse) / inverse;
};

const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

const constrain = (
    coord: [number, number],
    snapStep: [number, number],
    range: [[number, number], [number, number]],
): [number, number] => {
    const [x, y] = coord;
    const [xSnap, ySnap] = snapStep;
    const [[xMin, xMax], [yMin, yMax]] = range;
    return [
        clamp(snap(x, xSnap), xMin, xMax),
        clamp(snap(y, ySnap), yMin, yMax),
    ];
};

// same as pointsFromNormalized in interactive-graph.tsx
const normalizePoints = (
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: ReadonlyArray<Coord>,
    noSnap?: boolean,
): Array<Coord> =>
    coordsList.map(
        (coords) =>
            coords.map((coord, i) => {
                const xRange = range[i];
                if (noSnap) {
                    return xRange[0] + (xRange[1] - xRange[0]) * coord;
                }
                const xStep = step[i];
                const nSteps = Math.floor((xRange[1] - xRange[0]) / xStep);
                const tick = Math.round(coord * nSteps);
                return xRange[0] + xStep * tick;
            }) as Coord,
    );

const normalizeCoords = (
    coordsList: ReadonlyArray<Coord>,
    ranges: RenderProps["range"],
): Array<Coord> =>
    coordsList.map<Coord>(
        (coords) =>
            coords.map((coord, i) => {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            }) as Coord,
    );

type SinusoidProps = Omit<RenderProps, "graph"> & {
    graph: PerseusGraphTypeSinusoid;
};

const SinusoidGraph = (props: SinusoidProps) => {
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

type SegmentProps = Omit<RenderProps, "graph"> & {
    graph: PerseusGraphTypeSegment;
};

const getSegmentCoords = (
    props: SegmentProps,
): ReadonlyArray<ReadonlyArray<Coord>> => {
    const coords = props.graph.coords;
    if (coords) {
        return coords;
    }

    const ys = (n?: number) => {
        switch (n) {
            case 2:
                return [5, -5];
            case 3:
                return [5, 0, -5];
            case 4:
                return [6, 2, -2, -6];
            case 5:
                return [6, 3, 0, -3, -6];
            case 6:
                return [5, 3, 1, -1, -3, -5];
            default:
                return [5];
        }
    };

    return ys(props.graph.numSegments).map((y) => {
        let segment: Coord[] = [
            [-5, y],
            [5, y],
        ];
        segment = normalizeCoords(segment, props.range);
        segment = normalizePoints(props.range, props.step, segment);
        return segment;
    });
};

const SegmentsGraph = (props: SegmentProps) => {
    const segments = getSegmentCoords(props);
    return (
        <>
            {segments.map((segment, i) => (
                <Segment
                    key={i}
                    segment={segment}
                    snaps={props.snapStep}
                    range={props.range}
                />
            ))}
        </>
    );
};

const Segment = (props: {
    segment: ReadonlyArray<Coord>;
    snaps: [number, number];
    range: [[number, number], [number, number]];
}) => {
    const [start, end] = props.segment;
    const p1 = useMovablePoint(start, {
        constrain: (coord) => constrain(coord, props.snaps, props.range),
    });
    const p2 = useMovablePoint(end, {
        constrain: (coord) => constrain(coord, props.snaps, props.range),
    });
    return (
        <>
            <Line.Segment point1={p1.point} point2={p2.point} />
            {p1.element}
            {p2.element}
        </>
    );
};

type CircleProps = Omit<RenderProps, "graph"> & {
    graph: PerseusGraphTypeCircle;
};

const CircleGraph = (props: CircleProps) => {
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
            <Circle center={center.point} radius={r} />
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

export default {
    name: "interactive-mafs",
    displayName: "Interactive maf",
    widget: InteractiveMafs,
} as WidgetExports<typeof InteractiveMafs>;
