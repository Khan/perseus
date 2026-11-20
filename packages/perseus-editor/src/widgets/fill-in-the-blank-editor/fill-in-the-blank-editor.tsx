import {ApiOptions} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

import Editor from "../../editor";

import {ChoiceSettings} from "./choice-settings";
import styles from "./fill-in-the-blank-editor.module.css";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusFillInTheBlankTile,
    PerseusFillInTheBlankWidgetOptions,
} from "@khanacademy/perseus-core";

// TODO(benchristel): Define Props in terms of WidgetEditorProps. We can't do
//  this currently because `pnpm build:types` fails with a cryptic error. The
//  cause seems to be a combination of WidgetEditorProps' use of APIOptions and
//  the fact that this is a functional component.
interface Props extends PerseusFillInTheBlankWidgetOptions {
    onChange: (options: PerseusFillInTheBlankWidgetOptions) => void;
    apiOptions?: APIOptions;
}

/**
 * An editor for a Fill in the Blank widget, where the learner drags answer
 * tiles from a choice bank into blanks in a passage.
 *
 * Choosing each blank's answer is not built yet (LEMS-4371).
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

    // The widget editor container replaces the widget's options with what
    // onChange receives, so every change sends the full options.
    function handleChange(
        changes: Partial<PerseusFillInTheBlankWidgetOptions>,
    ) {
        onChange({content, widgets, tiles, randomize, ...changes});
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
        handleChange({tiles: tiles.filter((tile) => tile.id !== tileId)});
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
