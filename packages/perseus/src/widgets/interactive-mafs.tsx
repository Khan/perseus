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
import {StaticLabel} from "./interactive-graphs/label";
import {getLegacyGrid} from "./interactive-graphs/legacy-grid";

import type {PerseusInteractiveGraphWidgetOptions} from "../perseus-types";
import type {WidgetExports, WidgetProps} from "../types";

import "mafs/core.css";
import "mafs/font.css";
import "./interactive-graphs/styles.css";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

const renderGraph = (
    {graph, ...props}: InteractiveGraphProps,
    usesLegacyBackgoundImage: boolean,
) => {
    switch (graph.type) {
        case "sinusoid":
            return (
                <SinusoidGraph
                    {...props}
                    graph={graph}
                    usesLegacyBackgoundImage={usesLegacyBackgoundImage}
                />
            );
        case "segment":
            return (
                <SegmentsGraph
                    {...props}
                    graph={graph}
                    usesLegacyBackgoundImage={usesLegacyBackgoundImage}
                />
            );
        case "circle":
            return (
                <CircleGraph
                    {...props}
                    graph={graph}
                    usesLegacyBackgoundImage={usesLegacyBackgoundImage}
                />
            );
        case "ray":
            return (
                <RayGraph
                    {...props}
                    graph={graph}
                    usesLegacyBackgoundImage={usesLegacyBackgoundImage}
                />
            );
        case "polygon":
            return (
                <PolygonGraph
                    {...props}
                    graph={graph}
                    usesLegacyBackgoundImage={usesLegacyBackgoundImage}
                />
            );
    }
};

export const InteractiveMafs = (props: InteractiveGraphProps) => {
    // console.log(graph.type, {graph});
    // console.log({props});

    const legacyGrid = getLegacyGrid(
        props.containerSizeClass,
        props.backgroundImage,
    );

    return (
        <View
            style={{
                height: props.backgroundImage?.height ?? 400,
                width: props.backgroundImage?.width ?? 400,
                position: "relative",
            }}
        >
            {legacyGrid}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
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
                    {renderGraph(props, !!legacyGrid)}
                    <StaticLabel
                        tex={String.raw`-b \pm \sqrt{b^2 - 4ac} \over 2a`}
                        coords={[2, 5]}
                    />
                </Mafs>
            </View>
        </View>
    );
};

export default {
    name: "interactive-mafs",
    displayName: "Interactive maf",
    widget: InteractiveMafs,
} as WidgetExports<typeof InteractiveMafs>;
