import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";

import {SegmentGraph} from "./graphs";
import {getLegacyGrid} from "./legacy-grid";

import type {InteractiveGraphProps, MafsGraphProps} from "./types";
import type {PerseusGraphType} from "../../perseus-types";

import "mafs/core.css";
import "mafs/font.css";
import "./mafs-styles.css";

export const mafsGraphTypes = ["segment"];

const renderGraph = (props: MafsGraphProps<PerseusGraphType>) => {
    const {graph, ...rest} = props;
    switch (graph.type) {
        case "segment":
            return <SegmentGraph {...rest} graph={graph} />;
    }
};

export const MafsGraph = React.forwardRef<
    PerseusGraphType,
    React.PropsWithChildren<InteractiveGraphProps>
>((props, ref) => {
    // Storing the gradable state in a ref so that it can be updated without
    // causing a re-render.
    const graphRef = React.useRef(props.graph);
    const handleGraphUpdate = (
        callback: (current: PerseusGraphType) => PerseusGraphType,
    ) => {
        graphRef.current = callback(graphRef.current);
    };

    // Exposing the gradable state to the parent. We cannot wrap the parent
    // in a context, and it is incredibly complex, so using its already very
    // busy state object would be difficult. Plus, it would trigger re-renders.
    React.useImperativeHandle(ref, () => graphRef.current, [graphRef]);

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
                    width={400}
                    height={400}
                >
                    {renderGraph({
                        ...props,
                        usesLegacyGrid: !!legacyGrid,
                        onChange: handleGraphUpdate,
                    })}
                </Mafs>
            </View>
        </View>
    );
});
