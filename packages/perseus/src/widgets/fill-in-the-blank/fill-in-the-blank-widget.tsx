import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {FillInTheBlank} from "../../components/drag-and-drop/fill-in-the-blank";

import type {FillInTheBlankTile} from "../../components/drag-and-drop/fill-in-the-blank";
import type {
    TilePlacements,
    TileUsage,
} from "../../components/drag-and-drop/tile-placements";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PerseusWidgetsMap, WidgetLogic} from "@khanacademy/perseus-core";

/**
 * Options the Fill in the Blank widget is authored with.
 *
 * Deliberately local: this shape has not landed in `perseus-core`'s
 * `data-schema.ts` yet, because the render plan keeps it out until it has
 * survived design review. It matches `FillInTheBlankEditorOptions` in
 * `perseus-editor`.
 */
export interface PocFillInTheBlankWidgetOptions {
    content: string;
    widgets: PerseusWidgetsMap;
    tiles: ReadonlyArray<FillInTheBlankTile>;
    tileUsage: TileUsage;
    maxUsesPerTile?: number;
    randomizeTiles: boolean;
}

/**
 * The learner's answer: which tile sits in which blank.
 *
 * Parent-owned, matching the render component's controlled `placements` prop
 * and the shared `tile-placements.ts` transitions. The `blank` widget's own
 * `PerseusBlankUserInput.selected` therefore goes unused inside Fill in the
 * Blank — blanks render from `FillInTheBlankContext` and report no input.
 *
 * PROVISIONAL. `fitb-render-component-plan.md` flags this as the open question
 * to settle before the real widget ("Decide before the real widget"); this POC
 * picks the parent-owned side so an EditorPage demo is possible, not because
 * the question is closed.
 */
export interface PocFillInTheBlankUserInput {
    placements: TilePlacements;
}

type Props = WidgetProps<
    PocFillInTheBlankWidgetOptions,
    PocFillInTheBlankUserInput
>;

/**
 * TODO(LEMS-4371): Register this in `extra-widgets.ts`, and fold in the render
 * component when it migrates out of `components/drag-and-drop/fill-in-the-blank/`
 * (that folder is a temporary POC home by its own plan's decision 10). At that
 * point this file becomes plain `fill-in-the-blank.tsx`, per the new-widget
 * checklist in `widgets/CLAUDE.md`.
 *
 * TODO(LEMS-4371): `PocFillInTheBlankWidgetOptions` and
 * `PocFillInTheBlankUserInput` become the real schema types in `perseus-core`'s
 * `data-schema.ts` / `validation.types.ts`. Scoring
 * (`perseus-score/src/widgets/fill-in-the-blank/`) follows — until it exists,
 * `correctId` is authored but never read.
 *
 * Fill in the Blank as a Perseus widget, so it can be authored and previewed
 * inside `EditorPage`.
 *
 * Proof of concept. Not registered in `extra-widgets.ts` — the Storybook story
 * registers it for itself, so nothing here affects the rest of Perseus. Plan
 * and open questions: `widgets/fill-in-the-blank/notes/`.
 */
const FillInTheBlankWidget = forwardRef<Widget, Props>(
    function FillInTheBlankWidget(props, ref) {
        const {options, userInput, handleUserInput} = props;

        // TODO(LEMS-4471): getPromptJSON, once the TUT team has said what they
        // need from this widget.
        useImperativeHandle(ref, () => ({}));

        return (
            <FillInTheBlank
                content={options.content}
                widgets={options.widgets}
                tiles={options.tiles}
                tileUsage={options.tileUsage}
                maxUsesPerTile={options.maxUsesPerTile}
                placements={userInput?.placements ?? {}}
                onPlacementsChange={(placements) =>
                    handleUserInput({placements})
                }
            />
        );
    },
);

export default {
    name: "fill-in-the-blank",
    displayName: "Fill in the Blank",
    widget: FillInTheBlankWidget,
    isLintable: false,
} satisfies WidgetExports<typeof FillInTheBlankWidget>;

/**
 * The core-registry entry for the widget.
 *
 * `Editor` needs this before it can insert a Fill in the Blank: adding a
 * widget calls `CoreWidgetRegistry.getDefaultAlignment` and
 * `getCurrentVersion`, both of which throw for an unregistered type.
 *
 * Lives here rather than in `perseus-core/src/widgets/` because the POC does
 * not register globally — the Storybook story registers it for itself.
 */
export const pocFillInTheBlankWidgetLogic: WidgetLogic<PocFillInTheBlankWidgetOptions> =
    {
        name: "fill-in-the-blank",
        version: {major: 0, minor: 0},
        // The widget is a paragraph above a choice bank, so it occupies its
        // own block; `Editor` uses this to surround the marker with newlines.
        defaultAlignment: "block",
        defaultWidgetOptions: {
            content: "",
            widgets: {},
            tiles: [],
            tileUsage: "single",
            randomizeTiles: true,
        } satisfies PocFillInTheBlankWidgetOptions,
        // Same shape as `group`: the authored options nest a renderer
        // (`content` + `widgets`), so traversal has to walk into it to reach
        // the blanks.
        traverseChildWidgets: (props, traverseRenderer) => ({
            ...props,
            ...traverseRenderer(props),
        }),
    };
