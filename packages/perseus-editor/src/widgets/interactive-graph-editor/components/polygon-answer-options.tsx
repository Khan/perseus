import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import {parsePointCount} from "../../../util/points";
import styles from "../interactive-graph-editor.module.css";
import LabeledRow from "../locked-figures/labeled-row";

import type {Props as EditorProps} from "../interactive-graph-editor";
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
    correct: PerseusGraphTypePolygon;
    graph: PerseusGraphType | undefined;
    onChange: (props: Partial<EditorProps>) => void;
}

export default function PolygonAnswerOptions({
    correct,
    graph,
    onChange,
}: Props) {
    return (
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
                    className={styles.singleSelectShort}
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
                    className={styles.singleSelectShort}
                >
                    <OptionItem value="grid" label="grid" />
                    {correct?.numSides !== "unlimited" && (
                        <OptionItem value="angles" label="interior angles" />
                    )}
                    {correct?.numSides !== "unlimited" && (
                        <OptionItem value="sides" label="side measures" />
                    )}
                </SingleSelect>
                <InfoTip>
                    <p>
                        These options affect the movement of the vertex points.
                        The grid option will guide the points to the nearest
                        half step along the grid.
                    </p>
                    <p>
                        The interior angle and side measure options guide the
                        points to the nearest whole angle or side measure
                        respectively.
                    </p>
                </InfoTip>
            </LabeledRow>
            <View className={styles.row}>
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
            <View className={styles.row}>
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
            <LabeledRow label="Student answer must">
                <SingleSelect
                    selectedValue={correct.match || "exact"}
                    onChange={(newValue) => {
                        invariant(
                            correct.type === "polygon",
                            `Expected graph type to be polygon, but got ${correct.type}`,
                        );
                        const updatedCorrect = {
                            ...correct,
                            // TODO(benchristel): this cast is necessary
                            // because "exact" is not actually a valid
                            // value for `match`; a value of undefined
                            // means exact matching. The code happens
                            // to work because "exact" falls through
                            // to the correct else branch when scoring
                            match: newValue as PerseusGraphTypePolygon["match"],
                        };
                        onChange({correct: updatedCorrect});
                    }}
                    // Never uses placeholder, always has value
                    placeholder=""
                    className={styles.singleSelectShort}
                >
                    <OptionItem value="exact" label="match exactly" />
                    <OptionItem value="congruent" label="be congruent" />
                    <OptionItem
                        value="approx"
                        label="be approximately congruent"
                    />
                    <OptionItem value="similar" label="be similar" />
                </SingleSelect>

                <InfoTip>
                    <ul>
                        <li>
                            <p>
                                <b>Match Exactly:</b> Match exactly in size,
                                orientation, and location on the grid even if it
                                is not shown in the background.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Be Congruent:</b> Be congruent in size and
                                shape, but can be located anywhere on the grid.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Be Approximately Congruent:</b> Be exactly
                                similar, and congruent in size and shape to
                                within 0.1 units, but can be located anywhere on
                                the grid.{" "}
                                <em>
                                    Use this with snapping to angle measure.
                                </em>
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Be Similar:</b> Be similar with matching
                                interior angles, and side measures that are
                                matching or a multiple of the correct side
                                measures. The figure can be located anywhere on
                                the grid.
                            </p>
                        </li>
                    </ul>
                </InfoTip>
            </LabeledRow>
        </>
    );
}
