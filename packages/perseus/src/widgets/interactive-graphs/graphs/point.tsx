import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";
import graphIcon from "@phosphor-icons/core/regular/trash.svg";
import * as React from "react";

import {actions} from "../reducer/interactive-graph-action";
import useGraphConfig from "../reducer/use-graph-config";

import {MovablePoint} from "./components/movable-point";
import {
    useTransformDimensionsToPixels,
    useTransformVectorsToPixels,
    pixelsToVectors,
} from "./use-transform";

import type {PointGraphState, MafsGraphProps} from "../types";

type PointGraphProps = MafsGraphProps<PointGraphState>;

export function LimitedPointGraph(props: PointGraphProps) {
    const {dispatch} = props;

    return (
        <>
            {props.graphState.coords.map((point, i) => (
                <MovablePoint
                    key={i}
                    point={point}
                    onMove={(destination) =>
                        dispatch(actions.pointGraph.movePoint(i, destination))
                    }
                />
            ))}
        </>
    );
}

export function UnlimitedPointGraph(props: PointGraphProps) {
    const {dispatch} = props;
    const graphState = useGraphConfig();
    const {
        range: [[minX, maxX], [minY, maxY]],
    } = graphState;
    const width = maxX - minX;
    const height = maxY - minY;
    const [[widthPx, heightPx]] = useTransformDimensionsToPixels([
        width,
        height,
    ]);

    const [popoverVisibleForPointId, setShowPopover] = React.useState<
        number | null
    >(null);

    const [[left, top]] = useTransformVectorsToPixels([minX, maxY]);
    return (
        <>
            {/* This rect is here to grab clicks so that new points can be added */}
            {/* It's important because it stops mouse events from propogating
                when dragging a points around */}
            <rect
                style={{
                    fill: "rgba(0,0,0,0)",
                    cursor: "crosshair",
                }}
                width={widthPx}
                height={heightPx}
                x={left}
                y={top}
                onClick={(event) => {
                    setShowPopover(null);

                    const elementRect =
                        event.currentTarget.getBoundingClientRect();

                    const x = event.clientX - elementRect.x;
                    const y = event.clientY - elementRect.y;

                    const graphCoordinates = pixelsToVectors(
                        [[x, y]],
                        graphState,
                    );
                    dispatch(actions.pointGraph.addPoint(graphCoordinates[0]));
                }}
            />
            {props.graphState.coords.map((point, i) => (
                <Popover
                    onClose={() => {}}
                    opened={popoverVisibleForPointId === i}
                    content={
                        <PopoverContent
                            title=""
                            content=""
                            actions={
                                <>
                                    <IconButton
                                        icon={graphIcon}
                                        color="destructive"
                                        onClick={() => {
                                            setShowPopover(null);
                                            dispatch(
                                                actions.pointGraph.removePoint(
                                                    i,
                                                ),
                                            );
                                        }}
                                    />
                                </>
                            }
                            closeButtonVisible={false}
                            style={{
                                height: "60px",
                                paddingBottom: "50px",
                            }}
                        />
                    }
                >
                    <MovablePoint
                        key={i}
                        point={point}
                        onMove={(destination) => {
                            dispatch(
                                actions.pointGraph.movePoint(i, destination),
                            );
                            setShowPopover(null);
                        }}
                        onFocusChange={(isFocused) => {
                            if (isFocused) {
                                dispatch(actions.pointGraph.focusPoint(i));
                            } else {
                                dispatch(actions.pointGraph.blurPoint());
                            }
                        }}
                        onActivate={() => {
                            if (popoverVisibleForPointId === i) {
                                setShowPopover(null);
                            } else {
                                setShowPopover(i);
                            }
                        }}
                    />
                </Popover>
            ))}
        </>
    );
}

export function PointGraph(props: PointGraphProps) {
    const numPoints = props.graphState.numPoints;
    if (numPoints === "unlimited") {
        return UnlimitedPointGraph(props);
    }

    return LimitedPointGraph(props);
}
