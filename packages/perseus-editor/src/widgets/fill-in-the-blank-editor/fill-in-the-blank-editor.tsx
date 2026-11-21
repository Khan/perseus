import {ApiOptions} from "@khanacademy/perseus";
import {isFeatureOn} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";

import Editor from "../../editor";

import styles from "./fill-in-the-blank-editor.module.css";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";

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
 * Choosing each blank's answer and configuring the choice bank are not built
 * yet (LEMS-4371).
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
        </div>
    );
}
