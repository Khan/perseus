/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs, Coordinates} from "mafs";
import * as React from "react";
import _ from "underscore";

import {interactiveSizes} from "../styles/constants";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";

import {CircleGraph, RayGraph, SegmentsGraph, SinusoidGraph} from "./graphs";

import type {
    PerseusGraphType,
    PerseusImageBackground,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";
import "mafs/core.css";
import "mafs/font.css";
import type {SizeClass} from "../util/sizing-utils";

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
            case "ray":
                return <RayGraph {...props} graph={graph} />;
        }
    };

    const [backgroundImage, renderCoords] = maybeAddBackgroundImage(props);

    return (
        <View
            style={{
                // temporary to be closer to the expected style
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

export default {
    name: "interactive-mafs",
    displayName: "Interactive maf",
    widget: InteractiveMafs,
} as WidgetExports<typeof InteractiveMafs>;
