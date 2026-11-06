import {
    containerSizeClass,
    getInteractiveBoxFromSizeClass,
    PolarGraphView,
} from "@khanacademy/perseus";
import {
    getPolarGraphPublicWidgetOptions,
    getPolarGraphStartState,
    withPolarGraphStartPositions,
    PolarMath,
    polarGraphLogic,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../components/typed-single-select";
import InteractiveGraphDescription from "../interactive-graph-editor/components/interactive-graph-description";
import LabeledRow from "../interactive-graph-editor/locked-figures/labeled-row";

import {CollapsibleSection} from "./collapsible-section";
import {EquationReadout} from "./equation-readout";
import {PolarGridSettings} from "./polar-grid-settings";
import {SUB_TYPE_LABELS} from "./polar-locked-figure-settings";
import {PolarLockedFiguresSection} from "./polar-locked-figures-section";
import {PolarSubTypeSettings} from "./polar-sub-type-settings";

import type {WidgetEditorProps} from "../widget-editor-props";
import type {
    PerseusPolarGraphType,
    PerseusPolarGraphWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetEditorProps<PerseusPolarGraphWidgetOptions>;

/**
 * Laid out like the interactive graph editor: the answer type, the screen
 * reader title and description, the correct answer dragged into place on
 * a live copy of the graph with the sub-type's settings under it, then
 * the start positions, the grid and the locked figures.
 */
function PolarGraphEditor(props: Props) {
    const {onChange, apiOptions, static: _, ...rest} = props;
    const options: PerseusPolarGraphWidgetOptions = {
        ...polarGraphLogic.defaultWidgetOptions,
        ...rest,
    };
    const editingDisabled = apiOptions?.editingDisabled ?? false;
    const id = React.useId();
    const [size] = getInteractiveBoxFromSizeClass(containerSizeClass.SMALL);

    const handleChange = (changed: Partial<PerseusPolarGraphWidgetOptions>) => {
        onChange({...options, ...changed});
    };

    // The answer must be of the graph's sub-type and have its handles
    // placed. Interactive graph's answer graph writes its first layout
    // back into the options as soon as it renders, so a saved widget always
    // has an answer; this does the same.
    const usableAnswer =
        options.correct?.type === options.graph.type &&
        (options.correct.coords?.length ?? 0) > 0
            ? options.correct
            : undefined;
    const correct: PerseusPolarGraphType =
        usableAnswer ?? getPolarGraphStartState(options);
    React.useEffect(() => {
        if (usableAnswer === undefined) {
            handleChange({correct});
        }
    });

    // The learner's first view of the graph: the default layout, or
    // positions the author chose. Choosing stores the current layout so
    // the author can drag from there.
    const startState = getPolarGraphStartState(options);
    const hasCustomStart = options.graph.startCoords != null;
    const setStartState = (start: PerseusPolarGraphType | undefined) =>
        handleChange({
            graph: withPolarGraphStartPositions(options.graph, start),
        });
    const startMatchesAnswer = PolarMath.figuresEqual(startState, correct);

    // Changing the sub-type resets the answer, since the old handles no
    // longer mean anything.
    const setSubType = (type: PerseusPolarGraphType["type"]) => {
        const graph: PerseusPolarGraphType =
            type === "point"
                ? {type, numPoints: PolarMath.DEFAULT_NUM_POINTS}
                : type === "rose"
                  ? {type, k: PolarMath.DEFAULT_ROSE_K}
                  : {type};
        handleChange({
            graph,
            correct: getPolarGraphStartState({...options, graph}),
        });
    };

    const publicOptions = getPolarGraphPublicWidgetOptions(options);

    return (
        <View style={{gap: spacing.small_12}}>
            <LabeledRow label="Answer type" labelSize="medium">
                <TypedSingleSelect
                    id={`${id}-sub-type`}
                    options={SUB_TYPE_LABELS}
                    selectedValue={options.graph.type}
                    onChange={setSubType}
                    disabled={editingDisabled}
                />
            </LabeledRow>

            <InteractiveGraphDescription
                ariaLabelValue={options.fullGraphAriaLabel ?? ""}
                ariaDescriptionValue={options.fullGraphAriaDescription ?? ""}
                editingDisabled={editingDisabled}
                onChange={(changed) => {
                    // The shared component sends one field at a time, under
                    // the same names this widget uses.
                    if ("fullGraphAriaLabel" in changed) {
                        handleChange({
                            fullGraphAriaLabel: changed.fullGraphAriaLabel,
                        });
                    }
                    if ("fullGraphAriaDescription" in changed) {
                        handleChange({
                            fullGraphAriaDescription:
                                changed.fullGraphAriaDescription,
                        });
                    }
                }}
            />

            <CollapsibleSection title="Correct answer">
                <BodyText size="small">
                    Drag the handles on the graph below into the correct
                    position. For a rose, set k with the buttons under the
                    graph, or in the k field when k is fixed. For an angle, the
                    first handle is the initial side and the second the terminal
                    side; the angle opens counterclockwise.
                </BodyText>
                <PolarGraphView
                    options={{
                        ...publicOptions,
                        fullGraphAriaLabel: "Correct answer",
                    }}
                    state={correct}
                    onChange={(next) => handleChange({correct: next})}
                    size={size}
                    disabled={editingDisabled}
                />
                <EquationReadout
                    state={correct}
                    angleUnit={options.angleUnit}
                />
                <PolarSubTypeSettings
                    options={options}
                    correct={correct}
                    editingDisabled={editingDisabled}
                    onChange={handleChange}
                />
            </CollapsibleSection>

            <CollapsibleSection title="Starting positions">
                <BodyText size="small">
                    Where the handles sit before the learner moves them. By
                    default they start in a standard layout.
                </BodyText>
                <Checkbox
                    label="Choose where the handles start"
                    checked={hasCustomStart}
                    onChange={(checked) =>
                        setStartState(checked ? startState : undefined)
                    }
                    disabled={editingDisabled}
                />
                {hasCustomStart && (
                    <>
                        <PolarGraphView
                            options={{
                                ...publicOptions,
                                fullGraphAriaLabel: "Starting positions",
                            }}
                            state={startState}
                            onChange={setStartState}
                            size={size}
                            disabled={editingDisabled}
                        />
                        <EquationReadout
                            state={startState}
                            angleUnit={options.angleUnit}
                        />
                    </>
                )}
                {startMatchesAnswer && (
                    <BodyText size="small" weight="bold">
                        The handles start in the correct position, so a learner
                        who moves nothing would be marked correct.
                    </BodyText>
                )}
            </CollapsibleSection>

            <CollapsibleSection title="Grid">
                <PolarGridSettings
                    options={options}
                    editingDisabled={editingDisabled}
                    onChange={handleChange}
                />
            </CollapsibleSection>

            <CollapsibleSection title="Locked figures">
                <PolarLockedFiguresSection
                    options={options}
                    size={size}
                    editingDisabled={editingDisabled}
                    onChange={handleChange}
                />
            </CollapsibleSection>
        </View>
    );
}

export default Object.assign(PolarGraphEditor, {
    // Read directly by the editor page to seed the options of a newly inserted
    // polar graph.
    defaultProps: polarGraphLogic.defaultWidgetOptions,
});
