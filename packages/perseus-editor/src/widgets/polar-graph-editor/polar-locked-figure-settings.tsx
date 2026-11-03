import {PolarGraphView} from "@khanacademy/perseus";
import {
    getPolarGraphPublicWidgetOptions,
    getPolarGraphStartState,
    PolarMath,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import plusCircle from "@phosphor-icons/core/regular/plus-circle.svg";
import * as React from "react";

import LabeledSwitch from "../../components/labeled-switch";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";
import {TypedSingleSelect} from "../../components/typed-single-select";
import ColorSelect from "../interactive-graph-editor/locked-figures/color-select";
import ColorSwatch from "../interactive-graph-editor/locked-figures/color-swatch";
import EllipseSwatch from "../interactive-graph-editor/locked-figures/ellipse-swatch";
import LabeledRow from "../interactive-graph-editor/locked-figures/labeled-row";
import LineStrokeSelect, {
    fillableStrokeStyleOptions,
    fillStyleOptions,
    lineStrokeStyleOptions,
} from "../interactive-graph-editor/locked-figures/line-stroke-select";
import LineSwatch from "../interactive-graph-editor/locked-figures/line-swatch";
import LineWeightSelect from "../interactive-graph-editor/locked-figures/line-weight-select";
import LockedFigureAria from "../interactive-graph-editor/locked-figures/locked-figure-aria";
import LockedFigureSettingsActions from "../interactive-graph-editor/locked-figures/locked-figure-settings-actions";
import {
    generateLockedFigureAppearanceDescription,
    joinLabelsAsSpokenMath,
    newLabelNear,
    recolorLabels,
} from "../interactive-graph-editor/locked-figures/util";

import {describeLockedFigure} from "./describe-locked-figure";
import {EquationReadout} from "./equation-readout";
import {formatPolarEquation} from "./format-polar-equation";
import {PolarLockedLabelSettings} from "./polar-locked-label-settings";

import type {LockedFigureSettingsMovementType} from "../interactive-graph-editor/locked-figures/locked-figure-settings-actions";
import type {
    PerseusPolarGraphType,
    PerseusPolarGraphWidgetOptions,
    PerseusPolarLockedFigure,
} from "@khanacademy/perseus-core";

// The sub-types that enclose a region and so can be filled.
const CLOSED_TYPES: ReadonlySet<PerseusPolarGraphType["type"]> = new Set([
    "circle",
    "limacon",
    "rose",
    "lemniscate",
]);

/** Every sub-type, in the order the editor's menus list them. */
export const SUB_TYPES: ReadonlyArray<PerseusPolarGraphType["type"]> = [
    "point",
    "ray",
    "angle",
    "circle",
    "limacon",
    "rose",
    "lemniscate",
];

export const SUB_TYPE_LABELS: Record<PerseusPolarGraphType["type"], string> = {
    point: "Point",
    ray: "Ray",
    angle: "Angle at the pole",
    circle: "Circle",
    limacon: "Limaçon (includes cardioid)",
    rose: "Rose",
    lemniscate: "Lemniscate",
};

const rowStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xSmall_8,
} as const;

type Props = {
    index: number;
    locked: PerseusPolarLockedFigure;
    options: PerseusPolarGraphWidgetOptions;
    /** Side of the preview graph, in pixels. */
    size: number;
    editingDisabled: boolean;
    expanded: boolean;
    onToggle: (expanded: boolean) => void;
    onChangeProps: (changed: Partial<PerseusPolarLockedFigure>) => void;
    onMove: (movement: LockedFigureSettingsMovementType) => void;
    onRemove: () => void;
};

/** The header swatch interactive graph would show for this kind of figure. */
function Swatch({locked}: {locked: PerseusPolarLockedFigure}) {
    const {figure, color, strokeStyle, filled, fillStyle} = locked;
    if (figure.type === "point") {
        return <ColorSwatch color={color} filled={filled} />;
    }
    if (CLOSED_TYPES.has(figure.type)) {
        return (
            <EllipseSwatch
                color={color}
                fillStyle={fillStyle}
                strokeStyle={strokeStyle}
            />
        );
    }
    return (
        <LineSwatch
            color={color}
            lineStyle={strokeStyle === "dashed" ? "dashed" : "solid"}
        />
    );
}

/**
 * One locked figure's settings, laid out like a figure on the interactive
 * graph editor: an accordion with a swatch in its header, the figure's
 * style controls, a preview to drag it into place, its labels and aria
 * label, and the delete and reorder actions.
 */
export function PolarLockedFigureSettings(props: Props) {
    const {
        index,
        locked,
        options,
        size,
        editingDisabled,
        expanded,
        onToggle,
        onChangeProps,
        onMove,
        onRemove,
    } = props;
    const id = React.useId();
    const {figure, color, strokeStyle, weight, filled, fillStyle, labels} =
        locked;
    const isPoint = figure.type === "point";
    const isClosed = CLOSED_TYPES.has(figure.type);
    // Narrowed once so the measure checkbox keeps its type.
    const lockedAngle = figure.type === "angle" ? figure : null;
    const [openLabels, setOpenLabels] = React.useState<boolean[]>([]);
    const equation = formatPolarEquation(figure, options.angleUnit);

    // The figure's name, its visible labels spoken as math, its
    // measurements, then its appearance, in interactive graph's pattern:
    // "Circle A with radius 3. Appearance solid gray border, with no fill."
    async function getPrepopulatedAriaLabel() {
        const {noun, details} = describeLockedFigure(figure, options.angleUnit);
        const spokenLabels = await joinLabelsAsSpokenMath(labels);
        const fill = isClosed
            ? fillStyle
            : isPoint && !filled
              ? "none"
              : undefined;
        return (
            [noun + spokenLabels, details].filter(Boolean).join(" ") +
            generateLockedFigureAppearanceDescription(
                color,
                strokeStyle,
                fill,
                weight,
            )
        );
    }

    const setLabels = (next: ReadonlyArray<(typeof labels)[number]>) =>
        onChangeProps({labels: [...next]});

    return (
        <PerseusEditorAccordion
            expanded={expanded}
            onToggle={onToggle}
            header={
                <View style={rowStyle}>
                    <BodyText size="medium" weight="bold" tag="span">
                        {SUB_TYPE_LABELS[figure.type]}
                        {equation ? ` ${equation}` : ""}
                    </BodyText>
                    <Swatch locked={locked} />
                </View>
            }
        >
            <View
                style={{gap: spacing.xSmall_8}}
                data-testid="polar-graph-editor__locked-figure"
            >
                <LabeledRow label="Figure" labelSize="medium">
                    <TypedSingleSelect
                        id={`${id}-type`}
                        options={SUB_TYPE_LABELS}
                        selectedValue={figure.type}
                        onChange={(type) =>
                            onChangeProps({
                                figure: getPolarGraphStartState({
                                    ...options,
                                    graph:
                                        type === "rose"
                                            ? {
                                                  type,
                                                  k: PolarMath.DEFAULT_ROSE_K,
                                              }
                                            : {type},
                                }),
                            })
                        }
                        disabled={editingDisabled}
                    />
                </LabeledRow>
                <ColorSelect
                    selectedValue={color}
                    // Labels take the figure's color, as on interactive
                    // graph.
                    onChange={(color) =>
                        onChangeProps({
                            color,
                            labels: recolorLabels(labels, color),
                        })
                    }
                    editingDisabled={editingDisabled}
                />
                {isPoint ? (
                    <LabeledSwitch
                        label="open point"
                        checked={!filled}
                        disabled={editingDisabled}
                        onChange={(open) => onChangeProps({filled: !open})}
                    />
                ) : (
                    <>
                        {isClosed && (
                            <BodyText
                                tag="label"
                                style={{display: "flex", ...rowStyle}}
                            >
                                fill
                                <TypedSingleSelect
                                    id={`${id}-fill`}
                                    options={fillStyleOptions}
                                    selectedValue={fillStyle}
                                    onChange={(fillStyle) =>
                                        onChangeProps({fillStyle})
                                    }
                                    disabled={editingDisabled}
                                />
                            </BodyText>
                        )}
                        {isClosed ? (
                            <LineStrokeSelect
                                selectedValue={strokeStyle}
                                options={fillableStrokeStyleOptions}
                                onChange={(strokeStyle) =>
                                    onChangeProps({strokeStyle})
                                }
                                editingDisabled={editingDisabled}
                            />
                        ) : (
                            <LineStrokeSelect
                                selectedValue={
                                    strokeStyle === "dashed"
                                        ? "dashed"
                                        : "solid"
                                }
                                options={lineStrokeStyleOptions}
                                onChange={(strokeStyle) =>
                                    onChangeProps({strokeStyle})
                                }
                                editingDisabled={editingDisabled}
                            />
                        )}
                        <LineWeightSelect
                            selectedValue={weight}
                            onChange={(weight) => onChangeProps({weight})}
                            editingDisabled={editingDisabled}
                        />
                    </>
                )}
                {lockedAngle && (
                    <Checkbox
                        label="Show angle measures"
                        checked={lockedAngle.showAngles ?? false}
                        onChange={(showAngles) =>
                            onChangeProps({
                                figure: {...lockedAngle, showAngles},
                            })
                        }
                        disabled={editingDisabled}
                    />
                )}
                <PolarGraphView
                    options={{
                        ...getPolarGraphPublicWidgetOptions(options),
                        // The preview shows this figure's own display
                        // settings, not the answer's.
                        graph: figure,
                        lockedFigures: [],
                        lockedLabels: [],
                        fullGraphAriaLabel: `Locked figure ${index + 1}`,
                        fullGraphAriaDescription: undefined,
                    }}
                    state={figure}
                    onChange={(figure) => onChangeProps({figure})}
                    size={size}
                    disabled={editingDisabled}
                />
                <EquationReadout state={figure} angleUnit={options.angleUnit} />
                {labels.map((label, labelIndex) => (
                    <PolarLockedLabelSettings
                        key={labelIndex}
                        label={label}
                        editingDisabled={editingDisabled}
                        showColor={false}
                        expanded={openLabels[labelIndex] ?? false}
                        onToggle={(open) => {
                            const next = [...openLabels];
                            next[labelIndex] = open;
                            setOpenLabels(next);
                        }}
                        onChangeProps={(changed) =>
                            setLabels(
                                labels.map((other, i) =>
                                    i === labelIndex
                                        ? {...other, ...changed}
                                        : other,
                                ),
                            )
                        }
                        onRemove={() => {
                            setLabels(
                                labels.filter((_, i) => i !== labelIndex),
                            );
                            setOpenLabels(
                                openLabels.filter((_, i) => i !== labelIndex),
                            );
                        }}
                    />
                ))}
                <Button
                    kind="tertiary"
                    size="small"
                    startIcon={plusCircle}
                    disabled={editingDisabled}
                    onClick={() => {
                        setLabels([
                            ...labels,
                            newLabelNear(
                                figure.coords?.[0] ?? [0, 0],
                                labels,
                                color,
                            ),
                        ]);
                        setOpenLabels([...openLabels, true]);
                    }}
                >
                    Add visible label
                </Button>
                <LockedFigureAria
                    ariaLabel={locked.ariaLabel}
                    getPrepopulatedAriaLabel={getPrepopulatedAriaLabel}
                    editingDisabled={editingDisabled}
                    onChangeProps={onChangeProps}
                />
                <LockedFigureSettingsActions
                    figureType={figure.type}
                    editingDisabled={editingDisabled}
                    onMove={onMove}
                    onRemove={onRemove}
                />
            </View>
        </PerseusEditorAccordion>
    );
}
