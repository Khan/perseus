import {components} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import {TypedSingleSelect} from "../../../components/typed-single-select";
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
                <TypedSingleSelect
                    selectedValue={correct.snapTo || "grid"}
                    // Never uses placeholder, always has value
                    placeholder=""
                    options={{
                        grid: "grid",
                        // "interior angles" and "side measures" only apply to
                        // polygons with a fixed number of sides; hide them (via
                        // a falsey label) when the side count is unlimited.
                        angles:
                            correct.numSides !== "unlimited" &&
                            "interior angles",
                        sides:
                            correct.numSides !== "unlimited" && "side measures",
                    }}
                    onChange={(newValue) => {
                        invariant(
                            graph?.type === "polygon",
                            `Expected graph type to be polygon, but got ${graph?.type}`,
                        );

                        const updates = {
                            snapTo: newValue,
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
                />
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
                    label={
                        <BodyText size="small" tag="span">
                            Show angle measures
                        </BodyText>
                    }
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
                    label={
                        <BodyText size="small" tag="span">
                            Show side measures
                        </BodyText>
                    }
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
                <TypedSingleSelect
                    selectedValue={correct.match || "exact"}
                    onChange={(match) => {
                        onChange({correct: {...correct, match}});
                    }}
                    options={{
                        exact: "match exactly",
                        congruent: "be congruent",
                        approx: "be approximately congruent",
                        similar: "be similar",
                    }}
                    // Never uses placeholder, always has value
                    placeholder=""
                    className={styles.singleSelectShort}
                />

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
