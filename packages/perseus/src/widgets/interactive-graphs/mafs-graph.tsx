import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";

import {SegmentGraph} from "./graphs";
import {Grid} from "./grid";
import {getLegacyGrid} from "./legacy-grid";

import type {
    InteractiveGraphProps,
    MafsGraphProps,
    OnGraphChange,
} from "./types";
import type {
    PerseusGraphType,
    PerseusGraphTypeSegment,
} from "../../perseus-types";
import type {Widget} from "../../renderer";

import "mafs/core.css";
import "./mafs-styles.css";

const renderGraph = (props: MafsGraphProps<PerseusGraphType>) => {
    const {graph, ...rest} = props;
    switch (graph.type) {
        case "segment":
            return (
                <SegmentGraph
                    {...rest}
                    graph={graph}
                    onGraphChange={
                        props.onGraphChange as OnGraphChange<PerseusGraphTypeSegment>
                    }
                />
            );
    }
};

export const MafsGraph = React.forwardRef<
    Partial<Widget>,
    React.PropsWithChildren<InteractiveGraphProps> & {box: [number, number]}
>((props, ref) => {
    const [graph, setGraph] = React.useState(props.graph);
    const handleGraphUpdate = (newGraph: PerseusGraphType) => setGraph(newGraph);

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => graph,
    }));

    const [width, height] = props.box;
    const legacyGrid = getLegacyGrid([width, height], props.backgroundImage);

    return (
        <View
            style={{
                width: props.backgroundImage?.width ?? width,
                height: props.backgroundImage?.height ?? height,
                position: "relative",
            }}
        >
            {legacyGrid}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            >
                <Mafs
                    viewBox={{
                        x: props.range[0],
                        y: props.range[1],
                        padding: 0,
                    }}
                    pan={false}
                    zoom={false}
                    width={width}
                    height={height}
                >
                    {!legacyGrid && <Grid {...props} />}
                    {renderGraph({
                        ...props,
                        graph,
                        onGraphChange: handleGraphUpdate,
                    })}
                </Mafs>
            </View>
        </View>
    );
});
