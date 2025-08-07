import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import {parsePointCount} from "../../../util/points";
import LabeledRow from "../locked-figures/labeled-row";

import GraphPointsCountSelector from "./graph-points-count-selector";
import SegmentCountSelector from "./segment-count-selector";

import type {
    PerseusGraphType,
    PerseusGraphTypePolygon,
} from "@khanacademy/perseus-core";

const {InfoTip} = components;

const POLYGON_SIDES = _.map(_.range(3, 13), function (value) {
    return (
        <OptionItem
            key={`polygon-sides-${value}`}
            value={`${value}`}
            label={`${value} sides`}
        />
    );
});

interface Props {
    correct: PerseusGraphType;
    graph: PerseusGraphType | undefined;
    onChange: (props: Partial<Props>) => void;
}

export const GraphTypeAnswerSpecifications = ({
    correct,
    graph,
    onChange,
}: Props) => {
    return (
        <>
            {correct?.type === "point" && (
                <LabeledRow label="Number of Points:">
                    <GraphPointsCountSelector
                        numPoints={correct?.numPoints}
                        onChange={(points) => {
                            onChange({
                                correct: {
                                    type: "point",
                                    numPoints: points,
                                },
                                graph: {
                                    type: "point",
                                    numPoints: points,
                                },
                            });
                        }}
                    />
                </LabeledRow>
            )}
            {correct?.type === "angle" && (
                <>
                    <View style={styles.row}>
                        <Checkbox
                            label={<LabelSmall>Show angle measures</LabelSmall>}
                            checked={
                                // Don't show indeterminate checkbox state
                                !!correct?.showAngles
                            }
                            onChange={(newValue) => {
                                if (graph?.type === "angle") {
                                    invariant(
                                        correct.type === "angle",
                                        `Expected graph type to be angle, but got ${correct.type}`,
                                    );
                                    onChange({
                                        correct: {
                                            ...correct,
                                            showAngles: newValue,
                                        },
                                        graph: {
                                            ...graph,
                                            showAngles: newValue,
                                        },
                                    });
                                }
                            }}
                        />
                        <InfoTip>
                            <p>Displays the interior angle measures.</p>
                        </InfoTip>
                    </View>
                    <View style={styles.row}>
                        <Checkbox
                            label={<LabelSmall>Allow reflex angles</LabelSmall>}
                            checked={
                                // Don't show indeterminate checkbox state
                                !!correct?.allowReflexAngles
                            }
                            onChange={(newValue) => {
                                invariant(
                                    correct.type === "angle",
                                    `Expected graph type to be angle, but got ${correct.type}`,
                                );
                                invariant(
                                    graph?.type === "angle",
                                    `Expected graph type to be angle, but got ${graph?.type}`,
                                );

                                const update = {
                                    allowReflexAngles: newValue,
                                };

                                onChange({
                                    correct: {
                                        ...correct,
                                        ...update,
                                    },
                                    graph: {
                                        ...graph,
                                        ...update,
                                    },
                                });
                            }}
                        />
                        <InfoTip>
                            <p>
                                Allow students to be able to create reflex
                                angles.
                            </p>
                        </InfoTip>
                    </View>
                </>
            )}
            {correct?.type === "polygon" && (
                <>
                    <LabeledRow label="Number of sides:">
                        <SingleSelect
                            key="polygon-select"
                            selectedValue={
                                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                correct?.numSides ? `${correct.numSides}` : "3"
                            }
                            placeholder=""
                            onChange={(newValue) => {
                                invariant(graph?.type === "polygon");
                                const updates = {
                                    numSides: parsePointCount(newValue),
                                    coords: undefined,
                                    startCoords: undefined,
                                    // reset the snap for UNLIMITED, which
                                    // only supports "grid"
                                    // From: D6578
                                    snapTo: "grid",
                                } as const;

                                onChange({
                                    correct: {
                                        ...correct,
                                        ...updates,
                                    },
                                    graph: {
                                        ...graph,
                                        ...updates,
                                    },
                                });
                            }}
                            style={styles.singleSelectShort}
                        >
                            {[
                                ...POLYGON_SIDES,
                                <OptionItem
                                    key="unlimited"
                                    value="unlimited"
                                    label="unlimited sides"
                                />,
                            ]}
                        </SingleSelect>
                    </LabeledRow>
                    <LabeledRow label="Snap to:">
                        <SingleSelect
                            selectedValue={correct?.snapTo || "grid"}
                            // Never uses placeholder, always has value
                            placeholder=""
                            onChange={(newValue) => {
                                invariant(
                                    correct.type === "polygon",
                                    `Expected correct answer type to be polygon, but got ${correct.type}`,
                                );
                                invariant(
                                    graph?.type === "polygon",
                                    `Expected graph type to be polygon, but got ${graph?.type}`,
                                );

                                const updates = {
                                    snapTo: newValue as PerseusGraphTypePolygon["snapTo"],
                                    coords: null,
                                } as const;

                                onChange({
                                    correct: {
                                        ...correct,
                                        ...updates,
                                    },
                                    graph: {
                                        ...graph,
                                        ...updates,
                                    },
                                });
                            }}
                            style={styles.singleSelectShort}
                        >
                            <OptionItem value="grid" label="grid" />
                            {correct?.numSides !== "unlimited" && (
                                <OptionItem
                                    value="angles"
                                    label="interior angles"
                                />
                            )}
                            {correct?.numSides !== "unlimited" && (
                                <OptionItem
                                    value="sides"
                                    label="side measures"
                                />
                            )}
                        </SingleSelect>
                        <InfoTip>
                            <p>
                                These options affect the movement of the vertex
                                points. The grid option will guide the points to
                                the nearest half step along the grid.
                            </p>
                            <p>
                                The interior angle and side measure options
                                guide the points to the nearest whole angle or
                                side measure respectively.
                            </p>
                        </InfoTip>
                    </LabeledRow>
                    <View style={styles.row}>
                        <Checkbox
                            label={<LabelSmall>Show angle measures</LabelSmall>}
                            checked={
                                // Don't show indeterminate checkbox state
                                !!correct?.showAngles
                            }
                            onChange={() => {
                                if (graph?.type === "polygon") {
                                    invariant(
                                        correct.type === "polygon",
                                        `Expected graph type to be polygon, but got ${correct.type}`,
                                    );
                                    onChange({
                                        correct: {
                                            ...correct,
                                            showAngles: !correct.showAngles,
                                        },
                                        graph: {
                                            ...graph,
                                            showAngles: !graph.showAngles,
                                        },
                                    });
                                }
                            }}
                        />
                        <InfoTip>
                            <p>Displays the interior angle measures.</p>
                        </InfoTip>
                    </View>
                    <View style={styles.row}>
                        <Checkbox
                            label={<LabelSmall>Show side measures</LabelSmall>}
                            checked={
                                // Don't show indeterminate checkbox state
                                !!correct?.showSides
                            }
                            onChange={() => {
                                if (
                                    graph?.type === "polygon" &&
                                    correct.type === "polygon"
                                ) {
                                    onChange({
                                        correct: {
                                            ...correct,
                                            showSides: !correct.showSides,
                                        },
                                        graph: {
                                            ...graph,
                                            showSides: !graph.showSides,
                                        },
                                    });
                                }
                            }}
                        />
                        <InfoTip>
                            <p>Displays the side lengths.</p>
                        </InfoTip>
                    </View>
                </>
            )}
            {correct?.type === "segment" && (
                <LabeledRow label="Number of segments:">
                    <SegmentCountSelector
                        numSegments={correct?.numSegments}
                        onChange={(sides) => {
                            onChange({
                                correct: {
                                    type: "segment",
                                    numSegments: sides,
                                    coords: null,
                                },
                                graph: {
                                    type: "segment",
                                    numSegments: sides,
                                },
                            });
                        }}
                    />
                </LabeledRow>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: spacing.xSmall_8,
        alignItems: "center",
    },
});
