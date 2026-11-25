import {
    getDefaultFigureForType,
    getPolarGraphStartState,
    PolarMath,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {
    moveItem,
    moveTarget,
    useExpandedStates,
} from "../interactive-graph-editor/locked-figures/use-expanded-states";

import {
    PolarLockedFigureSettings,
    SUB_TYPE_LABELS,
    SUB_TYPES,
} from "./polar-locked-figure-settings";
import {PolarLockedLabelSettings} from "./polar-locked-label-settings";

import type {LockedFigureSettingsMovementType} from "../interactive-graph-editor/locked-figures/locked-figure-settings-actions";
import type {
    LockedLabelType,
    PerseusPolarGraphType,
    PerseusPolarGraphWidgetOptions,
    PerseusPolarLockedFigure,
} from "@khanacademy/perseus-core";

type Props = {
    options: PerseusPolarGraphWidgetOptions;
    /** Side of each preview graph, in pixels. */
    size: number;
    editingDisabled: boolean;
    onChange: (changed: Partial<PerseusPolarGraphWidgetOptions>) => void;
};

/**
 * The locked figures and free labels, each in its own accordion, with one
 * menu to add either, as on interactive graph. Figures are drawn in list
 * order, so the move buttons change what sits on top. Labels are stored
 * apart from figures because a figure has no type field to tell them
 * apart by, so they list after the figures and cannot be reordered.
 */
export function PolarLockedFiguresSection({
    options,
    size,
    editingDisabled,
    onChange,
}: Props) {
    const {lockedFigures, lockedLabels} = options;
    const id = React.useId();
    const addMenuRef = React.useRef<HTMLElement>(null);
    const figuresOpen = useExpandedStates(
        lockedFigures.length,
        editingDisabled,
    );
    const labelsOpen = useExpandedStates(lockedLabels.length, editingDisabled);
    const allCollapsed = figuresOpen.allCollapsed && labelsOpen.allCollapsed;
    const hasItems = lockedFigures.length + lockedLabels.length > 0;

    // A new figure starts where the learner's figure of that sub-type
    // would, as a new figure on interactive graph starts at its default.
    const addFigure = (type: PerseusPolarGraphType["type"]) => {
        const graph: PerseusPolarGraphType =
            type === "rose" ? {type, k: PolarMath.DEFAULT_ROSE_K} : {type};
        onChange({
            lockedFigures: [
                ...lockedFigures,
                {
                    figure: getPolarGraphStartState({...options, graph}),
                    color: "grayH",
                    strokeStyle: "solid",
                    weight: "medium",
                    filled: true,
                    fillStyle: "none",
                    labels: [],
                },
            ],
        });
        figuresOpen.added();
    };

    const addLabel = () => {
        onChange({
            lockedLabels: [
                ...lockedLabels,
                {
                    ...getDefaultFigureForType("label"),
                    // On the outer circle, clear of the polar axis.
                    coord: PolarMath.fromPolar(options.maxRadius, 45),
                },
            ],
        });
        labelsOpen.added();
    };

    const setFigure = (
        index: number,
        changed: Partial<PerseusPolarLockedFigure>,
    ) =>
        onChange({
            lockedFigures: lockedFigures.map((locked, i) =>
                i === index ? {...locked, ...changed} : locked,
            ),
        });

    const removeFigure = (index: number) => {
        // eslint-disable-next-line no-alert
        if (!window.confirm("Are you sure you want to delete this figure?")) {
            return;
        }
        onChange({lockedFigures: lockedFigures.filter((_, i) => i !== index)});
        figuresOpen.removed(index);
        // The button that was clicked is about to unmount; keep keyboard
        // focus in the section instead of letting it fall to the page.
        addMenuRef.current?.focus();
    };

    const moveFigure = (
        index: number,
        movement: LockedFigureSettingsMovementType,
    ) => {
        const target = moveTarget(index, lockedFigures.length, movement);
        if (target === index) {
            return;
        }
        onChange({lockedFigures: moveItem(lockedFigures, index, target)});
        figuresOpen.moved(index, target);
    };

    const setLabel = (index: number, changed: Partial<LockedLabelType>) =>
        onChange({
            lockedLabels: lockedLabels.map((label, i) =>
                i === index ? {...label, ...changed} : label,
            ),
        });

    const removeLabel = (index: number) => {
        // eslint-disable-next-line no-alert
        if (!window.confirm("Are you sure you want to delete this label?")) {
            return;
        }
        onChange({lockedLabels: lockedLabels.filter((_, i) => i !== index)});
        labelsOpen.removed(index);
        addMenuRef.current?.focus();
    };

    return (
        <>
            <BodyText size="small">
                Figures and labels the learner reads from but cannot move. A
                figure with no aria label is hidden from screen readers, and
                labels always are, so describe them in the graph description
                above.
            </BodyText>
            {lockedFigures.map((locked, index) => (
                <PolarLockedFigureSettings
                    key={index}
                    index={index}
                    locked={locked}
                    options={options}
                    size={size}
                    editingDisabled={editingDisabled}
                    expanded={figuresOpen.isOpen(index)}
                    onToggle={(open) => figuresOpen.setOpen(index, open)}
                    onChangeProps={(changed) => setFigure(index, changed)}
                    onMove={(movement) => moveFigure(index, movement)}
                    onRemove={() => removeFigure(index)}
                />
            ))}
            {lockedLabels.map((label, index) => (
                <PolarLockedLabelSettings
                    key={index}
                    label={label}
                    editingDisabled={editingDisabled}
                    showColor={true}
                    expanded={labelsOpen.isOpen(index)}
                    onToggle={(open) => labelsOpen.setOpen(index, open)}
                    onChangeProps={(changed) => setLabel(index, changed)}
                    onRemove={() => removeLabel(index)}
                />
            ))}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacing.xSmall_8,
                }}
            >
                <ActionMenu
                    ref={addMenuRef}
                    menuText="Add locked figure"
                    disabled={editingDisabled}
                >
                    {[
                        ...SUB_TYPES.map((type) => (
                            <ActionItem
                                key={`${id}-${type}`}
                                label={SUB_TYPE_LABELS[type]}
                                onClick={() => addFigure(type)}
                            />
                        )),
                        <ActionItem
                            key={`${id}-label`}
                            label="Label"
                            onClick={addLabel}
                        />,
                    ]}
                </ActionMenu>
                {hasItems && (
                    <Button
                        kind="secondary"
                        size="small"
                        disabled={editingDisabled}
                        onClick={() => {
                            figuresOpen.setAll(allCollapsed);
                            labelsOpen.setAll(allCollapsed);
                        }}
                    >
                        {allCollapsed ? "Expand all" : "Collapse all"}
                    </Button>
                )}
            </View>
        </>
    );
}
