import {parseBlankIds} from "@khanacademy/perseus";

import type {FillInTheBlankEditorOptions, TileContentKind} from "./types";
import type {FillInTheBlankTile} from "@khanacademy/perseus";

/**
 * Save warnings for the Fill in the Blank editor.
 *
 * Two families of rule live here:
 *
 * - **Structural** — the authored options are internally inconsistent and the
 *   widget cannot work (a blank with no correct answer, a `correctId` left
 *   dangling by a deleted choice). These are unambiguous bugs.
 * - **FITB spec** — the authoring constraints from the Fill in the Blank
 *   Confluence page (single word per choice, no mixing content types). These
 *   encode editorial policy, so they are worded as guidance.
 *
 * Kept pure and separate from the component so the rules are testable without
 * rendering, and so they can move into a `perseus-linter` rule later without
 * being rewritten. See the new-widget checklist in
 * `packages/perseus/src/widgets/CLAUDE.md` step 8.
 *
 * TODO(LEMS-3643): Move these into
 * `perseus-linter/src/rules/fill-in-the-blank-widget-error.ts` and register it
 * in `all-rules.ts`, once the frontend uses the linter rules for save
 * warnings. They are written pure so that is a move, not a rewrite.
 */

// There must be something to sort into the blanks, and a single choice makes
// the answer a foregone conclusion.
const MIN_TILES = 2;

/**
 * Character budget for a text choice, as a stand-in for the spec's real rule.
 *
 * The spec caps a tile's *content* at 200px (and the whole tile at 256px, the
 * choice bank's width at the 320px viewport). Neither is knowable while
 * authoring: text width depends on the rendered font, TeX width is not known
 * until KaTeX has typeset it, and an image's width falls out of its aspect
 * ratio once loaded. So this approximates the text case only — Plus Jakarta
 * Sans at the tile's 16px body size averages roughly 8.5px per character, so
 * 200px is about 23 characters; 20 leaves room for wide glyphs.
 *
 * TODO(LEMS-4371): replace with a real measurement once the render component
 * can report measured tile widths back to the editor — `useWidestTileWidth`
 * already measures every tile for blank sizing, so the number exists at
 * runtime, just not at save time.
 */
const MAX_TEXT_TILE_CHARS = 20;

const IMAGE_ONLY = /^\s*!\[[^\]]*\]\([^)]*\)\s*$/;

/**
 * Reads a field that the type says is a string but the data may not supply.
 *
 * Options reach this editor from hand-edited or pasted JSON as well as from
 * the UI — that is the whole reason `fill-in-the-blank-widget-error` exists
 * and the `WithInvalidJson` story with it. A missing `label` or `content` must
 * produce a save warning, not a `TypeError` that takes the warnings down.
 */
function readString(value: unknown): string {
    return typeof value === "string" ? value : "";
}

/** Classifies a choice by the kind of content it holds. */
export function getTileContentKind(value: unknown): TileContentKind {
    const content = readString(value);
    if (content.trim() === "") {
        return "empty";
    }
    if (IMAGE_ONLY.test(content)) {
        return "image";
    }
    if (content.includes("$")) {
        return "tex";
    }
    return "text";
}

/** How a choice should be referred to in a warning. */
function describeTile(tile: FillInTheBlankTile, index: number): string {
    const shown =
        readString(tile.content).trim() || readString(tile.label).trim();
    return shown === "" ? `Choice ${index + 1}` : `Choice "${shown}"`;
}

export function getFillInTheBlankSaveWarnings(
    options: FillInTheBlankEditorOptions,
): string[] {
    const {content, widgets, tiles, tileUsage, maxUsesPerTile} = options;
    const warnings: string[] = [];

    const blankIds = parseBlankIds(content, widgets);
    const tileIds = new Set(tiles.map((tile) => tile?.id));

    // --- Structural ------------------------------------------------------

    if (blankIds.length === 0) {
        warnings.push(
            "Fill in the Blank needs at least one blank in the answer zone.",
        );
    }

    if (tiles.length < MIN_TILES) {
        warnings.push(`Fill in the Blank needs at least ${MIN_TILES} choices.`);
    }

    // Every blank needs a correct answer, and that answer has to still exist.
    // Deleting a choice clears the `correctId`s that pointed at it, so a
    // dangling id means the options were edited outside this editor (raw JSON,
    // an older content version, a translation round-trip).
    blankIds.forEach((blankId, index) => {
        const blankNumber = index + 1;
        const widget = widgets[blankId];
        const correctId =
            widget?.type === "blank" ? widget.options.correctId : "";

        if (correctId === "") {
            warnings.push(`Blank ${blankNumber} has no correct answer.`);
        } else if (!tileIds.has(correctId)) {
            warnings.push(
                `Blank ${blankNumber}'s correct answer refers to a choice ` +
                    `that no longer exists.`,
            );
        }
    });

    // With single-use choices, every blank consumes one, so too few choices
    // makes the exercise unsolvable rather than merely easy.
    if (tileUsage === "single" && tiles.length < blankIds.length) {
        warnings.push(
            `There are ${blankIds.length} blanks but only ${tiles.length} ` +
                `single-use choices, so the blanks cannot all be filled.`,
        );
    }

    if (tileUsage === "multi" && maxUsesPerTile != null && maxUsesPerTile < 1) {
        warnings.push("Maximum uses per choice must be at least 1.");
    }

    // --- FITB spec -------------------------------------------------------

    // "Single word or standalone character only" — multi-word tiles hurt
    // readability and make the reflow rules much harder to satisfy. Only text
    // is checked: TeX legitimately contains spaces (`$2 + 2$`) and image
    // markdown always does.
    tiles.forEach((tile, index) => {
        if (getTileContentKind(tile.content) !== "text") {
            return;
        }
        const content = readString(tile.content).trim();
        if (/\s/.test(content)) {
            warnings.push(
                `${describeTile(tile, index)} must be a single word or ` +
                    `standalone character.`,
            );
        } else if (content.length > MAX_TEXT_TILE_CHARS) {
            warnings.push(
                `${describeTile(tile, index)} may be too wide for the choice ` +
                    `bank on a narrow screen.`,
            );
        }
    });

    // "Text/TeX/Images may not be mixed with each other" — Empty is the one
    // kind that may accompany another.
    const kinds = new Set(
        tiles
            .map((tile) => getTileContentKind(tile.content))
            .filter((kind) => kind !== "empty"),
    );
    if (kinds.size > 1) {
        warnings.push(
            `Choices mix ${[...kinds].sort().join(", ")} content. Only text, ` +
                `only TeX, or only images (empty choices may be mixed in).`,
        );
    }

    // An image choice needs alt text for the image itself, and one of the
    // seven display heights — without a height the render component has no
    // basis for scaling it.
    //
    // The spec's other image rules are *not* here: "prefers square, landscape
    // only otherwise" and "must not exceed the tile width" both need the
    // image's natural dimensions, which are deliberately absent from the
    // schema. Those checks live in `tile-image-editor.tsx`, which already
    // fetches dimensions for the preview. "No images of text" is a judgement
    // call no check can make.
    tiles.forEach((tile, index) => {
        if (getTileContentKind(tile.content) !== "image") {
            return;
        }
        const alt =
            /^\s*!\[([^\]]*)\]/.exec(readString(tile.content))?.[1] ?? "";
        if (alt.trim() === "") {
            warnings.push(`${describeTile(tile, index)} needs image alt text.`);
        }
        if (tile.imageHeight == null) {
            warnings.push(
                `${describeTile(tile, index)} needs a display height.`,
            );
        }
    });

    // Every choice needs screen-reader text. An empty choice renders nothing,
    // so its label is the only thing a screen reader has to announce. Image
    // choices are exempt: their alt text is their screen reader text, and is
    // checked above — warning twice for one missing description would just be
    // noise.
    tiles.forEach((tile, index) => {
        if (getTileContentKind(tile.content) === "image") {
            return;
        }
        if (readString(tile.label).trim() === "") {
            warnings.push(
                `${describeTile(tile, index)} needs a screen reader label.`,
            );
        }
    });

    return warnings;
}
