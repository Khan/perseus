import {
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

import {SegmentedControl} from "../../components/segmented-control";
import Editor from "../../editor";

import {FillInTheBlankEditorContext} from "./fill-in-the-blank-editor-context";
import styles from "./fill-in-the-blank-editor.module.css";
import TileRowEditor from "./tile-row-editor";
import {getFillInTheBlankSaveWarnings} from "./validation";

import type {ChoiceMovement} from "./tile-row-editor";
import type {FillInTheBlankEditorOptions} from "./types";
import type {
    APIOptions,
    FillInTheBlankTile,
    TileUsage,
} from "@khanacademy/perseus";
import type {
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

/** Matches `Editor`'s own widget placeholder (`editor.tsx`). */
const BLANK_MARKER = (id: string) => `[[☃ ${id}]]`;

// Below this the widget stops working, so the last choices cannot be
// deleted — the same guard the radio editor applies to its options.
const MIN_CHOICES = 2;

const tileUsageOptions = [
    {value: "single", label: "Single use"},
    {value: "multi", label: "Multi use"},
] as const satisfies ReadonlyArray<{value: TileUsage; label: string}>;

// TODO(LEMS-4371): Export this again and add the folder's `index.ts` when the
// editor is registered in `all-editors.ts`. Every widget-editor folder
// normally has one; nothing outside this folder imports the editor while
// registration happens in the stories, and `knip` fails on unused files.
const defaultFillInTheBlankOptions: FillInTheBlankEditorOptions = {
    content: "",
    widgets: {},
    tiles: [],
    tileUsage: "single",
    randomizeTiles: true,
};

/** Imperative API that `WidgetEditor` calls. */
interface FillInTheBlankEditorHandle {
    serialize: () => FillInTheBlankEditorOptions;
    getSaveWarnings: () => string[];
}

interface Props extends FillInTheBlankEditorOptions {
    onChange: (
        newOptions: Partial<FillInTheBlankEditorOptions>,
        callback?: () => void,
    ) => void;
    apiOptions?: APIOptions;
}

/** The next unused `blank N` id, mirroring how `Editor` numbers widgets. */
function nextBlankId(content: string): string {
    let highest = 0;
    for (const match of content.matchAll(/\[\[☃ blank ([0-9]+)\]\]/g)) {
        highest = Math.max(highest, Number(match[1]));
    }
    return `blank ${highest + 1}`;
}

/**
 * The next choice id: one past the highest currently in use.
 *
 * Deleting the last choice therefore frees its number for reuse. That is safe
 * only because `onDeleteTile` clears every `correctId` that named the deleted
 * choice — without that, a reused id would silently repoint a correct answer
 * at a different choice. The two belong together; do not change one alone.
 */
function nextTileId(tiles: ReadonlyArray<FillInTheBlankTile>): string {
    let highest = 0;
    for (const tile of tiles) {
        const match = /^tile-([0-9]+)$/.exec(tile.id);
        if (match) {
            highest = Math.max(highest, Number(match[1]));
        }
    }
    return `tile-${highest + 1}`;
}

/** Clears every `correctId` that names a choice that no longer exists. */
function clearCorrectId(
    widgets: PerseusWidgetsMap,
    deletedTileId: string,
): PerseusWidgetsMap {
    const next = {...widgets};
    for (const [id, widget] of Object.entries(next)) {
        if (
            widget.type === "blank" &&
            widget.options.correctId === deletedTileId
        ) {
            next[id] = {
                ...widget,
                options: {...widget.options, correctId: ""},
            };
        }
    }
    return next;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for the Fill in the Blank widget: an answer zone of content with
 * inline blanks, above a choice bank of answer tiles.
 *
 * Proof of concept. The options shape it authors is the render component's
 * props shape and has not landed in `perseus-core` yet, so this editor is not
 * registered in `all-editors.ts` — Storybook is its harness. Plan and open
 * questions: `packages/perseus/src/widgets/fill-in-the-blank/notes/`.
 */
const FillInTheBlankEditor = React.forwardRef<
    FillInTheBlankEditorHandle,
    Props
>(function FillInTheBlankEditor(
    {
        content = defaultFillInTheBlankOptions.content,
        widgets = defaultFillInTheBlankOptions.widgets,
        tiles = defaultFillInTheBlankOptions.tiles,
        tileUsage = defaultFillInTheBlankOptions.tileUsage,
        maxUsesPerTile,
        randomizeTiles = defaultFillInTheBlankOptions.randomizeTiles,
        onChange,
        apiOptions,
    },
    ref,
) {
    // `WidgetEditor` passes the real APIOptions down. A read-only authoring
    // context must not leave any control usable.
    const editingDisabled = apiOptions?.editingDisabled ?? false;
    const answerZoneRef = React.useRef<Editor>(null);
    const headingIds = React.useId();

    const options: FillInTheBlankEditorOptions = {
        content,
        widgets,
        tiles,
        tileUsage,
        maxUsesPerTile,
        randomizeTiles,
    };

    React.useImperativeHandle(
        ref,
        () => ({
            serialize: () => options,
            // TODO(LEMS-3643): Move these to a perseus-linter rule once the
            // frontend uses the new linter rules for save warnings.
            getSaveWarnings: () => getFillInTheBlankSaveWarnings(options),
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [content, widgets, tiles, tileUsage, maxUsesPerTile, randomizeTiles],
    );

    /**
     * Inserts a blank at the cursor.
     *
     * Not `Editor`'s own `_addWidget`. That path seeds a new widget's options
     * from its registered editor's `defaultProps`, which reaches the widget
     * through a re-render — too late for the `onChange` below, and it would
     * leave a moment with `options: undefined` for anything that reads them
     * first. Building the widget here keeps insertion atomic. Setting
     * `lastUserValue` and `_pendingCursorPos` is how
     * `Editor` is told to route the edit through the browser's undo stack and
     * to restore the cursor after the marker — see its `componentDidUpdate`.
     */
    const insertBlank = () => {
        const editor = answerZoneRef.current;
        const textarea = editor?.textarea.current;
        const start = textarea?.selectionStart ?? content.length;
        const end = textarea?.selectionEnd ?? content.length;

        const id = nextBlankId(content);
        const marker = BLANK_MARKER(id);
        const newContent =
            content.slice(0, start) + marker + content.slice(end);

        if (editor) {
            editor.lastUserValue = content;
            editor._pendingCursorPos = start + marker.length;
        }

        onChange({
            content: newContent,
            widgets: {
                ...widgets,
                // A new blank has no correct answer yet. The generator's
                // placeholder default would look like a real, if wrong,
                // answer; "" is what the save warning looks for.
                [id]: generateBlankWidget({
                    options: generateBlankOptions({correctId: ""}),
                }),
            },
        });
        textarea?.focus();
    };

    // `Editor` emits `{content, widgets}` with the widgets map already pruned
    // to those still referenced in the content, so deleting a marker removes
    // its blank without any bookkeeping here.
    const onAnswerZoneChange = (changes: Partial<PerseusRenderer>) => {
        onChange(changes);
    };

    const onTileChange = (
        index: number,
        changes: Partial<FillInTheBlankTile>,
    ) => {
        onChange({
            tiles: tiles.map((tile, i) =>
                i === index ? {...tile, ...changes} : tile,
            ),
        });
    };

    const onAddTile = () => {
        onChange({
            tiles: [...tiles, {id: nextTileId(tiles), content: "", label: ""}],
        });
    };

    const onMoveTile = (index: number, movement: ChoiceMovement) => {
        const next = [...tiles];
        const [moved] = next.splice(index, 1);
        const to = {
            top: 0,
            up: Math.max(0, index - 1),
            down: Math.min(next.length, index + 1),
            bottom: next.length,
        }[movement];
        next.splice(to, 0, moved);
        onChange({tiles: next});
    };

    const onDeleteTile = (index: number) => {
        onChange({
            tiles: tiles.filter((tile, i) => i !== index),
            // Blanks that pointed at the deleted choice would otherwise hold a
            // dangling id that no dropdown can display.
            widgets: clearCorrectId(widgets, tiles[index].id),
        });
    };

    return (
        <View className={styles.editor}>
            {/* Configuration first, because usage changes what the choices
                below mean: a single-use choice leaves the bank once placed.
                TODO(LEMS-4371): `randomizeTiles` and `maxUsesPerTile` are in
                the options but have no control here, so nothing can author
                them. Either add controls or drop them from the shape. */}
            <div className={styles.settings}>
                <BodyText id={`${headingIds}-usage`} tag="span">
                    Usage
                </BodyText>
                <SegmentedControl
                    disabled={editingDisabled}
                    aria-labelledby={`${headingIds}-usage`}
                    options={tileUsageOptions}
                    selectedValue={tileUsage}
                    onChange={(value) =>
                        onChange({
                            // eslint-disable-next-line no-restricted-syntax
                            tileUsage: value as TileUsage,
                            // A single-use choice cannot have a cap; leaving
                            // one behind would resurface it if the author
                            // switched back to multi use.
                            maxUsesPerTile:
                                value === "single" ? undefined : maxUsesPerTile,
                        })
                    }
                />
            </div>

            {/* The answer zone: content, then "Insert blank", then a panel per
                blank. `widgetToolbar` puts our button exactly where the widget
                dropdown would have been — between the textarea and the panels
                — and replaces that dropdown, which offered every widget in
                Perseus including ones a blank cannot hold. */}
            <FillInTheBlankEditorContext.Provider value={{tiles}}>
                <Editor
                    ref={answerZoneRef}
                    content={content}
                    widgets={widgets}
                    apiOptions={apiOptions}
                    // Needed for the blank panels and the
                    // toolbar that holds "Insert blank".
                    widgetEnabled={true}
                    widgetToolbar={
                        <Button
                            kind="tertiary"
                            size="small"
                            startIcon={plusIcon}
                            disabled={editingDisabled}
                            onClick={insertBlank}
                        >
                            Insert blank
                        </Button>
                    }
                    onChange={onAnswerZoneChange}
                />
            </FillInTheBlankEditorContext.Provider>

            <section
                className={styles.section}
                aria-labelledby={`${headingIds}-choices`}
            >
                <BodyText tag="h3" weight="bold" id={`${headingIds}-choices`}>
                    Choices
                </BodyText>
                <ol className={styles.tiles}>
                    {tiles.map((tile, i) => (
                        <TileRowEditor
                            key={tile.id}
                            index={i}
                            tile={tile}
                            showMove={tiles.length > 1}
                            showDelete={tiles.length > MIN_CHOICES}
                            editingDisabled={editingDisabled}
                            onChange={(changes) => onTileChange(i, changes)}
                            onMove={(movement) => onMoveTile(i, movement)}
                            onDelete={() => onDeleteTile(i)}
                        />
                    ))}
                </ol>
                <div className={styles.addTile}>
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={plusIcon}
                        disabled={editingDisabled}
                        onClick={onAddTile}
                    >
                        Add a choice
                    </Button>
                </div>
            </section>
        </View>
    );
});

export default Object.assign(FillInTheBlankEditor, {
    // `Widgets.registerEditors` keys the registry off this, the same way the
    // class editors declare `static widgetName`.
    widgetName: "fill-in-the-blank" as const,
    // Read directly by the editor page to seed the options of a newly inserted
    // Fill in the Blank widget.
    defaultProps: defaultFillInTheBlankOptions,
});
