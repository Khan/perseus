/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";
import _ from "underscore";

import {
    CircleGraph,
    PolygonGraph,
    RayGraph,
    SegmentsGraph,
    SinusoidGraph,
} from "./interactive-graphs";

import type {
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";
import "mafs/core.css";
import "mafs/font.css";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export const InteractiveMafs = ({graph, ...props}: InteractiveGraphProps) => {
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
            case "polygon":
                return <PolygonGraph {...props} graph={graph} />;
        }
    };

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
