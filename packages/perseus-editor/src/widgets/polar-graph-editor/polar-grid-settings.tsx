import {
    getPolarGraphStartState,
    PolarMath,
    withPolarGraphStartPositions,
} from "@khanacademy/perseus-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import ScrolllessNumberTextField from "../../components/scrollless-number-text-field";
import {TypedSingleSelect} from "../../components/typed-single-select";

import type {PerseusPolarGraphWidgetOptions} from "@khanacademy/perseus-core";

const ANGLE_STEPS = [5, 10, 15, 30, 45, 90] as const;
type AngleStepKey = `${(typeof ANGLE_STEPS)[number]}`;
const ANGLE_STEP_LABELS: Record<AngleStepKey, string> = {
    "5": "5°",
    "10": "10°",
    "15": "15°",
    "30": "30°",
    "45": "45°",
    "90": "90°",
};

type Props = {
    options: PerseusPolarGraphWidgetOptions;
    editingDisabled: boolean;
    onChange: (changed: Partial<PerseusPolarGraphWidgetOptions>) => void;
};

/**
 * The grid: how far out it goes, how its circles and spokes are spaced,
 * and the angle unit.
 */
export function PolarGridSettings({options, editingDisabled, onChange}: Props) {
    const id = React.useId();

    // A new grid can leave the answer or a locked figure between circles,
    // where no learner can match it. This puts every placed handle back on
    // the grid. The number fields call it when the author leaves them, so a
    // half-typed value never moves anything.
    const snapFiguresToGrid = (
        changed: Partial<PolarMath.PolarGridSettings> = {},
    ) => {
        const next = {...options, ...changed};
        const settings = {
            maxRadius: next.maxRadius,
            radiusStep: next.radiusStep,
            angleStepDegrees: next.angleStepDegrees,
        };
        onChange({
            ...changed,
            correct:
                next.correct === undefined
                    ? undefined
                    : PolarMath.snapGraphToGrid(next.correct, settings),
            lockedFigures: next.lockedFigures.map((locked) => ({
                ...locked,
                figure: PolarMath.snapGraphToGrid(locked.figure, settings),
            })),
            graph:
                next.graph.startCoords == null
                    ? next.graph
                    : withPolarGraphStartPositions(
                          next.graph,
                          PolarMath.snapGraphToGrid(
                              getPolarGraphStartState(next),
                              settings,
                          ),
                      ),
        });
    };

    // Hand-written content may use a step the select does not offer; the
    // select then shows no choice rather than a wrong one.
    const angleStep = ANGLE_STEPS.find(
        (step) => step === options.angleStepDegrees,
    );
    const selectedAngleStep: AngleStepKey | null =
        angleStep === undefined ? null : `${angleStep}`;

    return (
        <>
            <LabeledField
                label="Largest radius"
                field={
                    <ScrolllessNumberTextField
                        value={options.maxRadius}
                        min={options.radiusStep}
                        onChange={(maxRadius) => {
                            if (maxRadius >= options.radiusStep) {
                                onChange({maxRadius});
                            }
                        }}
                        onBlur={() => snapFiguresToGrid()}
                        disabled={editingDisabled}
                    />
                }
            />
            <LabeledField
                label="Circle spacing"
                description="Distance between the grid circles."
                field={
                    <ScrolllessNumberTextField
                        value={options.radiusStep}
                        min={0}
                        max={options.maxRadius}
                        onChange={(radiusStep) => {
                            if (
                                radiusStep > 0 &&
                                radiusStep <= options.maxRadius
                            ) {
                                onChange({radiusStep});
                            }
                        }}
                        onBlur={() => snapFiguresToGrid()}
                        disabled={editingDisabled}
                    />
                }
            />
            <LabeledField
                label="Spoke spacing"
                field={
                    <TypedSingleSelect
                        id={`${id}-angle-step`}
                        options={ANGLE_STEP_LABELS}
                        selectedValue={selectedAngleStep}
                        onChange={(value) =>
                            snapFiguresToGrid({
                                angleStepDegrees: Number(value),
                            })
                        }
                        disabled={editingDisabled}
                    />
                }
            />
            <LabeledField
                label="Angle labels"
                field={
                    <TypedSingleSelect
                        id={`${id}-angle-unit`}
                        options={{degrees: "Degrees", radians: "Radians"}}
                        selectedValue={options.angleUnit}
                        onChange={(angleUnit) => onChange({angleUnit})}
                        disabled={editingDisabled}
                    />
                }
            />
        </>
    );
}
