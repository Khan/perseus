import {getPolarGraphStartState, PolarMath} from "@khanacademy/perseus-core";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import ScrolllessNumberTextField from "../../components/scrollless-number-text-field";
import {TypedSingleSelect} from "../../components/typed-single-select";
import ShowPointLabelsToggle from "../interactive-graph-editor/components/show-point-labels-toggle";
import LabeledRow from "../interactive-graph-editor/locked-figures/labeled-row";

import type {
    PerseusPolarGraphType,
    PerseusPolarGraphWidgetOptions,
} from "@khanacademy/perseus-core";

const MAX_POINTS = 10;

type Props = {
    options: PerseusPolarGraphWidgetOptions;
    /** The answer as shown, always of the graph's sub-type and with coords. */
    correct: PerseusPolarGraphType;
    editingDisabled: boolean;
    onChange: (changed: Partial<PerseusPolarGraphWidgetOptions>) => void;
};

/**
 * The settings that belong to one sub-type: how many points, their labels,
 * the rose's k, and the angle's measure and scoring. Shown under the
 * correct-answer graph, where interactive graph shows its own.
 */
export function PolarSubTypeSettings({
    options,
    correct,
    editingDisabled,
    onChange,
}: Props) {
    const id = React.useId();
    const {graph} = options;
    // Narrowed once here so the callbacks below keep the types.
    const pointGraph = graph.type === "point" ? graph : null;
    const roseGraph = graph.type === "rose" ? graph : null;
    const roseCorrect = correct.type === "rose" ? correct : null;
    const angleGraph = graph.type === "angle" ? graph : null;
    const angleCorrect = correct.type === "angle" ? correct : null;

    const setNumPoints = (value: number) => {
        if (!pointGraph) {
            return;
        }
        const numPoints = Math.min(MAX_POINTS, Math.max(1, Math.round(value)));
        const start = getPolarGraphStartState({
            ...options,
            graph: {type: "point", numPoints, startCoords: undefined},
        });
        const previous = correct.coords ?? [];
        // Points already placed stay put; new ones get default spots.
        const coords = (start.coords ?? []).map(
            (fallback, i) => previous[i] ?? fallback,
        );
        onChange({
            graph: {
                ...pointGraph,
                numPoints,
                // Labels and start positions of points that no longer exist
                // go too.
                pointLabels: pointGraph.pointLabels?.slice(0, numPoints),
                startCoords: pointGraph.startCoords?.slice(0, numPoints),
            },
            correct: {type: "point", numPoints, coords},
        });
    };

    const setPointLabel = (index: number, label: string) => {
        if (!pointGraph) {
            return;
        }
        const count = pointGraph.numPoints ?? PolarMath.DEFAULT_NUM_POINTS;
        const pointLabels = Array.from({length: count}, (_, i) =>
            i === index ? label : pointGraph.pointLabels?.[i] ?? "",
        );
        onChange({graph: {...pointGraph, pointLabels}});
    };

    const setK = (value: number) => {
        if (!roseGraph || !roseCorrect) {
            return;
        }
        const k = Math.min(
            PolarMath.MAX_ROSE_K,
            Math.max(PolarMath.MIN_ROSE_K, Math.round(value)),
        );
        // A fixed k is the answer's k too; otherwise only where the
        // learner starts changes.
        onChange({
            graph: {...roseGraph, k},
            ...(roseGraph.fixedK && {correct: {...roseCorrect, k}}),
        });
    };

    const setFixedK = (fixedK: boolean) => {
        if (!roseGraph || !roseCorrect) {
            return;
        }
        // Fixing k hands the learner the answer's k.
        onChange({
            graph: {
                ...roseGraph,
                fixedK: fixedK || undefined,
                k: fixedK
                    ? roseCorrect.k ?? PolarMath.DEFAULT_ROSE_K
                    : roseGraph.k,
            },
        });
    };

    if (pointGraph) {
        const numPoints = pointGraph.numPoints ?? PolarMath.DEFAULT_NUM_POINTS;
        return (
            <>
                <LabeledField
                    label="Number of points"
                    field={
                        <ScrolllessNumberTextField
                            value={numPoints}
                            min={1}
                            max={MAX_POINTS}
                            onChange={setNumPoints}
                            disabled={editingDisabled}
                        />
                    }
                />
                <ShowPointLabelsToggle
                    showPointLabels={pointGraph.showPointLabels ?? false}
                    pointLabels={pointGraph.pointLabels}
                    onChange={(showPointLabels) =>
                        onChange({graph: {...pointGraph, showPointLabels}})
                    }
                />
                {Array.from({length: numPoints}, (_, index) => (
                    <LabeledField
                        key={index}
                        label={`Label for point ${index + 1}`}
                        field={
                            <TextField
                                id={`${id}-point-label-${index}`}
                                value={pointGraph.pointLabels?.[index] ?? ""}
                                onChange={(label) =>
                                    setPointLabel(index, label)
                                }
                                disabled={editingDisabled}
                            />
                        }
                    />
                ))}
            </>
        );
    }

    if (roseGraph) {
        return (
            <>
                <Checkbox
                    label="Fixed k"
                    description={
                        "The learner cannot change k. The answer uses the k " +
                        "set here."
                    }
                    checked={roseGraph.fixedK ?? false}
                    onChange={setFixedK}
                    disabled={editingDisabled}
                />
                <LabeledField
                    label={roseGraph.fixedK ? "k" : "Starting k"}
                    description={
                        roseGraph.fixedK
                            ? "The k in r = a cos(kθ) for the learner and " +
                              "the answer."
                            : "The k in r = a cos(kθ) the learner starts " +
                              "from. They can change it on the graph."
                    }
                    field={
                        <ScrolllessNumberTextField
                            value={roseGraph.k ?? PolarMath.DEFAULT_ROSE_K}
                            min={PolarMath.MIN_ROSE_K}
                            max={PolarMath.MAX_ROSE_K}
                            onChange={setK}
                            disabled={editingDisabled}
                        />
                    }
                />
            </>
        );
    }

    if (angleGraph && angleCorrect) {
        return (
            <>
                <Checkbox
                    label="Show angle measures"
                    checked={angleGraph.showAngles ?? false}
                    onChange={(showAngles) =>
                        onChange({graph: {...angleGraph, showAngles}})
                    }
                    disabled={editingDisabled}
                />
                <LabeledRow label="Student answer must" labelSize="medium">
                    <TypedSingleSelect
                        id={`${id}-angle-match`}
                        options={{
                            exact: "match exactly",
                            congruent: "be congruent",
                        }}
                        selectedValue={angleCorrect.match ?? "exact"}
                        onChange={(value) =>
                            // Exact matching is the absence of `match`, as
                            // on interactive graph; the scorer reads it
                            // from the answer.
                            onChange({
                                correct: {
                                    ...angleCorrect,
                                    match:
                                        value === "congruent"
                                            ? "congruent"
                                            : undefined,
                                },
                            })
                        }
                        disabled={editingDisabled}
                    />
                </LabeledRow>
            </>
        );
    }

    return null;
}
