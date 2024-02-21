/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";
import _ from "underscore";

import AssetContext from "../asset-context";
import {SvgImage} from "../components";
import {interactiveSizes} from "../styles/constants";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";

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
import "./interactive-graphs/styles.css";

export type InteractiveGraphProps = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphWidgetOptions
>;

export const InteractiveMafs = ({graph, ...props}: InteractiveGraphProps) => {
    console.log(graph.type, {graph});
    console.log({props});

    const renderGraph = (
        graph: PerseusGraphType,
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

    let image;
    const {url, width, height} = props.backgroundImage ?? {};
    if (url && typeof url === "string") {
        const box = getInteractiveBoxFromSizeClass(props.containerSizeClass);
        const scale = box[0] / interactiveSizes.defaultBoxSize;
        image = (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            >
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={url}
                            width={width}
                            height={height}
                            scale={scale}
                            responsive={false}
                            setAssetStatus={setAssetStatus}
                            alt=""
                        />
                    )}
                </AssetContext.Consumer>
            </View>
        );
    } else {
        image = null;
    }

    return (
        <View
            style={{
                height: props.backgroundImage?.height ?? 400,
                width: props.backgroundImage?.width ?? 400,
                position: "relative",
            }}
        >
            {image}
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
                    {renderGraph(graph, !!image)}
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
