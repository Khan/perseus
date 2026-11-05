// The MCP Apps page for preview_item: the draft as learners see it, shown
// in the chat. Hosts don't let app pages frame or reach the local server, so
// the page renders the item itself and follows the draft through the host,
// polling the app-only get_preview_draft tool, which also sends the drawings
// of the Graffiti diagrams the draft shows.
import {DependenciesContext} from "@khanacademy/perseus";
import {
    DEFAULT_PREVIEW_OPTIONS,
    describeHints,
    INITIAL_HINTS_REVEAL,
    revealHints,
} from "@khanacademy/perseus-preview";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {App} from "@modelcontextprotocol/ext-apps";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {
    DEFAULT_OFFERED_OPTIONS,
    HintControls,
    OptionControls,
} from "../page/controls";
import {Exercise} from "../page/exercise";
import {dependenciesV2} from "../page/perseus-environment";

import {createDiagramStore, serveDiagramsThroughFetch} from "./diagram-files";
import {describePreview} from "./model-context";
import styles from "./preview-app.module.css";

import type {DiagramFiles} from "./diagram-files";
import type {AnswerCheck} from "./model-context";
import type {OfferedOptions} from "../page/controls";
import type {PerseusItem} from "@khanacademy/perseus-core";

// How often the page asks for a newer revision of the draft.
const POLL_MS = 2000;

type ToolResult = {
    content?: ReadonlyArray<{type: string; text?: string}>;
    isError?: boolean;
};

function textOf(result: ToolResult): string {
    return result.content?.find((block) => block.type === "text")?.text ?? "";
}

function jsonOf(result: ToolResult): Record<string, unknown> | null {
    try {
        return JSON.parse(textOf(result));
    } catch {
        return null;
    }
}

// The draft to show, from preview_item's arguments or result. The host sends
// them as soon as the page connects, which may be before React renders, so
// they're kept here rather than in component state.
let itemId: string | null = null;
let connectionError: string | null = null;
const listeners = new Set<() => void>();

function update(change: () => void) {
    change();
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

const diagramStore = createDiagramStore();
serveDiagramsThroughFetch(diagramStore);
const dependencies = {...dependenciesV2, generateUrl: diagramStore.generateUrl};

const app = new App({name: "perseus-preview", version: "0.0.1"}, {});

// The host replaces any handler set after connect(), so these come first.
app.ontoolinput = ({arguments: args}) => {
    if (typeof args?.itemId === "string") {
        const id = args.itemId;
        update(() => (itemId = id));
    }
};
app.ontoolresult = (result) => {
    const id = jsonOf(result)?.itemId;
    if (typeof id === "string") {
        update(() => (itemId = id));
    }
};

app.connect().catch((error: unknown) =>
    update(() => (connectionError = `Couldn't connect: ${String(error)}`)),
);

type Draft = {
    revision: number;
    item: PerseusItem;
    /** Diagrams the item shows that the server doesn't have. */
    missingDiagrams: string[];
};

/**
 * The draft, fetched now and again whenever its revision or a diagram it
 * shows changes.
 */
function useDraft(id: string | null): {draft: Draft | null; error: string} {
    const [draft, setDraft] = React.useState<Draft | null>(null);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (id == null) {
            return;
        }
        let sinceRevision: number | undefined;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let stopped = false;

        async function poll() {
            try {
                const result = await app.callServerTool({
                    name: "get_preview_draft",
                    arguments: {
                        itemId: id,
                        sinceRevision,
                        diagramRevisions: diagramStore.revisions(),
                    },
                });
                const json = jsonOf(result);
                if (result.isError || json == null) {
                    setError(textOf(result));
                } else if (json.changed === true) {
                    diagramStore.update(
                        // The server sends what it drew.
                        // eslint-disable-next-line no-restricted-syntax
                        (json.diagrams ?? {}) as Record<string, DiagramFiles>,
                    );
                    const next = {
                        revision: Number(json.revision),
                        // The server sends what it saved: a parsed item, new
                        // each time, so Perseus loads the diagrams again.
                        // eslint-disable-next-line no-restricted-syntax
                        item: json.item as PerseusItem,
                        missingDiagrams: Array.isArray(json.missingDiagrams)
                            ? json.missingDiagrams.map(String)
                            : [],
                    };
                    sinceRevision = next.revision;
                    setDraft(next);
                    setError("");
                }
            } catch (e) {
                setError(String(e));
            } finally {
                if (!stopped) {
                    timer = setTimeout(poll, POLL_MS);
                }
            }
        }

        void poll();
        return () => {
            stopped = true;
            clearTimeout(timer);
        };
    }, [id]);

    return {draft, error};
}

/**
 * Tells the model what the person is doing in the preview, when the host
 * accepts it. The host sends the latest description with the person's next
 * message, without prompting a reply, so they can ask about what they did.
 */
function useModelContext(text: string) {
    React.useEffect(() => {
        if (app.getHostCapabilities()?.updateModelContext == null) {
            return;
        }
        app.updateModelContext({content: [{type: "text", text}]}).catch(
            // The preview works without it; the model just knows less.
            () => {},
        );
    }, [text]);
}

function Preview({itemId: id, draft}: {itemId: string; draft: Draft}) {
    const {item} = draft;
    const [options, setOptions] = React.useState<OfferedOptions>(
        DEFAULT_OFFERED_OPTIONS,
    );
    const [reveal, setReveal] = React.useState(INITIAL_HINTS_REVEAL);
    const hintsState = describeHints(item.hints, reveal);
    const [lastCheck, setLastCheck] = React.useState<AnswerCheck | null>(null);
    // A new revision may change the answer, so an old check no longer
    // applies (Exercise clears its result too).
    React.useEffect(() => setLastCheck(null), [item]);

    useModelContext(
        describePreview({
            itemId: id,
            revision: draft.revision,
            options,
            hintsState,
            lastCheck,
        }),
    );

    return (
        <View className={styles.page}>
            <OptionControls
                options={options}
                onChange={(changed) =>
                    setOptions((current) => ({...current, ...changed}))
                }
            />
            <HintControls
                hintsState={hintsState}
                revealHint={(hintsVisible) =>
                    setReveal((current) =>
                        revealHints(current, hintsVisible, item.hints.length),
                    )
                }
            />
            <View className="framework-perseus box-sizing-border-box-reset">
                <Exercise
                    data={{item, apiOptions: {}, showRationales: false}}
                    previewOptions={{...DEFAULT_PREVIEW_OPTIONS, ...options}}
                    hintsState={hintsState}
                    dependencies={dependencies}
                    onCheck={(userInput, result) =>
                        setLastCheck({userInput, result})
                    }
                />
            </View>
        </View>
    );
}

function describeMissing(graffitiIds: string[]): string {
    return graffitiIds.length === 0
        ? ""
        : ` It shows diagrams that don't exist: ${graffitiIds.join(", ")}.`;
}

function PreviewApp() {
    const id = React.useSyncExternalStore(subscribe, () => itemId);
    const failure = React.useSyncExternalStore(
        subscribe,
        () => connectionError,
    );
    const {draft, error} = useDraft(id);

    const status =
        failure ??
        (error !== ""
            ? error
            : draft == null
              ? "Loading the draft…"
              : `Draft ${id}, revision ${draft.revision}. Updates as the ` +
                "draft changes." +
                describeMissing(draft.missingDiagrams));
    return (
        <View className={styles.page}>
            <BodyText>{status}</BodyText>
            {id != null && draft != null && (
                <Preview itemId={id} draft={draft} />
            )}
        </View>
    );
}

createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <DependenciesContext.Provider value={dependencies}>
            <PreviewApp />
        </DependenciesContext.Provider>
    </RenderStateRoot>,
);
