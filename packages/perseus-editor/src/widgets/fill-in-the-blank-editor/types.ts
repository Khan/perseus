import type {FillInTheBlankTile, TileUsage} from "@khanacademy/perseus";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

/**
 * TODO(LEMS-4371): Delete this in favour of
 * `PerseusFillInTheBlankWidgetOptions` in `perseus-core`'s `data-schema.ts`,
 * once the shape has survived design review. That move also has to settle
 * three things this POC left open: who owns the learner's input (the parent's
 * `placements` map, as the render component assumes, or each blank's own
 * `PerseusBlankUserInput.selected`); whether a tile carries an authored
 * `label`; and whether `randomizeTiles` / `maxUsesPerTile` belong in the
 * schema at all, given neither has UI here.
 *
 * What the Fill in the Blank editor authors.
 *
 * Deliberately local to the editor. The render POC's plan keeps the real
 * schema out of `perseus-core` until the shape survives design review, so
 * this mirrors `FillInTheBlankProps` minus the runtime-only placement props
 * (`placements` / `onPlacementsChange`), plus `randomizeTiles` which the plan
 * lists but the render POC has not implemented yet.
 *
 * `FillInTheBlankTile` and `TileUsage` are imported from the render component
 * rather than redeclared, so the authoring side and the rendering side cannot
 * drift apart while the shape is still moving.
 */
export interface FillInTheBlankEditorOptions {
    /**
     * Answer zone: Perseus markdown containing `[[☃ blank n]]` markers.
     * Translators receive this string and can move the markers within it.
     */
    content: string;
    /** The embedded blank widgets, keyed by marker name ("blank 1"). */
    widgets: PerseusWidgetsMap;
    /**
     * The choice bank. Two tiles may carry identical content (the Figma
     * "Choice Configuration" frame allows it), which is why tiles are
     * identified by a stable `id` rather than by their content.
     */
    tiles: ReadonlyArray<FillInTheBlankTile>;
    tileUsage: TileUsage;
    /** Multi-use only. Omitted means unlimited. */
    maxUsesPerTile?: number;
    randomizeTiles: boolean;
}

/**
 * The kind of content a tile holds. The FITB spec forbids mixing Text, TeX and
 * Image tiles in one widget; Empty tiles may be mixed with any single other
 * kind (e.g. to balance a chemical equation).
 */
export type TileContentKind = "empty" | "text" | "tex" | "image";
