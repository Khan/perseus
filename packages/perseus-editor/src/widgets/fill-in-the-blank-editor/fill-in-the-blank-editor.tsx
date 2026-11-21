import {ApiOptions} from "@khanacademy/perseus";
import {getWidgetIdsFromContent, isFeatureOn} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

import Editor from "../../editor";

import {BlankEditor} from "./blank-editor";
import {ChoiceSettings} from "./choice-settings";
import styles from "./fill-in-the-blank-editor.module.css";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    BlankWidget,
    PerseusFillInTheBlankTile,
    PerseusFillInTheBlankWidgetOptions,
    PerseusWidget,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

// TODO(benchristel): Define Props in terms of WidgetEditorProps. We can't do
//  this currently because `pnpm build:types` fails with a cryptic error. The
//  cause seems to be a combination of WidgetEditorProps' use of APIOptions and
//  the fact that this is a functional component.
interface Props extends PerseusFillInTheBlankWidgetOptions {
    onChange: (options: PerseusFillInTheBlankWidgetOptions) => void;
    apiOptions?: APIOptions;
}

function isBlank(
    entry: [string, PerseusWidget],
): entry is [string, BlankWidget] {
    return entry[1].type === "blank";
}

/**
 * The blanks in `content`, in the order the learner reads them. A blank's id
 * can appear in `widgets` after its placeholder was deleted from the content;
 * those are left out.
 */
function getBlanksInContent(
    content: string,
    widgets: PerseusWidgetsMap,
): Array<[string, BlankWidget]> {
    const blanksById = new Map(Object.entries(widgets).filter(isBlank));
    return getWidgetIdsFromContent(content).flatMap((id) => {
        const blank = blanksById.get(id);
        return blank == null
            ? []
            : [[id, blank] satisfies [string, BlankWidget]];
    });
}

/**
 * An editor for a Fill in the Blank widget, where the learner drags answer
 * tiles from a choice bank into blanks in a passage.
 */
export default function FillInTheBlankEditor({
    content,
    widgets,
    tiles,
    randomize,
    apiOptions,
    onChange,
}: Props) {
    const editorRef = React.useRef<Editor>(null);

    // TODO(LEMS-4396): clean up feature flag
    if (!isFeatureOn({apiOptions}, "dnd-widget-fitb")) {
        return null;
    }

    const editingDisabled = apiOptions?.editingDisabled ?? false;
    const blanks = getBlanksInContent(content, widgets);

    function handleChange(
        changes: Partial<PerseusFillInTheBlankWidgetOptions>,
    ) {
        onChange({content, widgets, tiles, randomize, ...changes});
    }

    function handleCorrectIdChange(blankId: string, correctId: string) {
        const blank = blanks.find(([id]) => id === blankId)?.[1];
        if (blank == null) {
            return;
        }
        handleChange({
            widgets: {
                ...widgets,
                [blankId]: {...blank, options: {...blank.options, correctId}},
            },
        });
    }

    function handleTileChange(
        tileId: string,
        changes: Partial<PerseusFillInTheBlankTile>,
    ) {
        handleChange({
            tiles: tiles.map((tile) =>
                tile.id === tileId ? {...tile, ...changes} : tile,
            ),
        });
    }

    function handleAddTile() {
        handleChange({
            tiles: [
                ...tiles,
                {
                    id: crypto.randomUUID(),
                    content: "",
                    label: "",
                    maxUses: 1,
                },
            ],
        });
    }

    function handleRemoveTile(tileId: string) {
        // Unset the answer of every blank that pointed at the removed tile,
        // so no blank is left naming a tile that doesn't exist.
        const newWidgets = {...widgets};
        for (const [id, blank] of blanks) {
            if (blank.options.correctId === tileId) {
                newWidgets[id] = {
                    ...blank,
                    options: {...blank.options, correctId: ""},
                };
            }
        }
        handleChange({
            tiles: tiles.filter((tile) => tile.id !== tileId),
            widgets: newWidgets,
        });
    }

    return (
        <div className={styles.container}>
            <Editor
                ref={editorRef}
                content={content}
                widgets={widgets}
                apiOptions={apiOptions ?? ApiOptions.defaults}
                placeholder="Type the passage, then insert blanks into it."
                widgetEnabled={true}
                hideWidgetControls={true}
                onChange={(renderer) =>
                    onChange({
                        content: renderer.content,
                        widgets: renderer.widgets,
                        tiles,
                        randomize,
                    })
                }
            />
            <div className={styles.contentToolbar}>
                <Button
                    kind="tertiary"
                    size="small"
                    startIcon={plusIcon}
                    onClick={() => editorRef.current?.addWidget("blank")}
                    disabled={editingDisabled}
                >
                    Insert blank
                </Button>
            </div>

            <section className={styles.section}>
                <Heading size="medium" tag="h3">
                    Blanks
                </Heading>
                {blanks.length > 0 ? (
                    <ul className={`${styles.list} ${styles.blankList}`}>
                        {blanks.map(([blankId, blank]) => (
                            <li key={blankId} className={styles.listItem}>
                                <BlankEditor
                                    blankId={blankId}
                                    correctId={blank.options.correctId}
                                    tiles={tiles}
                                    editingDisabled={editingDisabled}
                                    onCorrectIdChange={(correctId) =>
                                        handleCorrectIdChange(
                                            blankId,
                                            correctId,
                                        )
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No blanks yet. Use “Insert blank” to add one.</p>
                )}
            </section>

            <section className={styles.section}>
                <Heading size="medium" tag="h3">
                    Choices
                </Heading>
                {tiles.length > 0 && (
                    <ul className={styles.list}>
                        {tiles.map((tile, index) => (
                            <li key={tile.id} className={styles.listItem}>
                                <ChoiceSettings
                                    tile={tile}
                                    index={index}
                                    editingDisabled={editingDisabled}
                                    onChange={(changes) =>
                                        handleTileChange(tile.id, changes)
                                    }
                                    onRemove={() => handleRemoveTile(tile.id)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <div>
                    <Button
                        kind="tertiary"
                        size="small"
                        startIcon={plusIcon}
                        onClick={handleAddTile}
                        disabled={editingDisabled}
                    >
                        Add a choice
                    </Button>
                </div>
            </section>
        </div>
    );
}
