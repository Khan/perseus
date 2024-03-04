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
    // Storing the gradable state in a ref so that it can be updated without
    // causing a re-render.
    const graphRef = React.useRef(props.graph);
    const handleGraphUpdate = (
        callback: (current: PerseusGraphType) => PerseusGraphType,
    ) => {
        graphRef.current = callback(graphRef.current);
    };

    React.useImperativeHandle(ref, () => ({
        getUserInput: () => graphRef.current,
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
                        onGraphChange: handleGraphUpdate,
                    })}
                </Mafs>
            </View>
        </View>
    );
});
