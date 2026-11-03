// The preview page for one draft (`/drafts/<itemId>/preview`). It follows the
// draft's event stream and sends each revision to the preview frame, so the
// page shows the draft's latest state without reloading.
import {usePreviewController} from "@khanacademy/perseus-editor";
import * as React from "react";
import {createRoot} from "react-dom/client";

import type {PerseusItem, ShowSolutions} from "@khanacademy/perseus-core";
import type {HintsState, PreviewOptions} from "@khanacademy/perseus-editor";

type DraftEvent = {
    itemId: string;
    revision: number;
    updatedAt: string;
    item: PerseusItem;
};

type Connection = "connecting" | "open" | "lost";

const CONNECTION_TEXT: Record<Connection, string> = {
    connecting: "Connecting…",
    open: "Live: updates as the draft changes.",
    // EventSource reconnects by itself.
    lost: "Lost the connection to perseus-mcp. Reconnecting…",
};

function useDraftEvents(itemId: string) {
    const [draft, setDraft] = React.useState<DraftEvent | null>(null);
    const [connection, setConnection] =
        React.useState<Connection>("connecting");

    React.useEffect(() => {
        const events = new EventSource(
            `/drafts/${encodeURIComponent(itemId)}/events`,
        );
        events.addEventListener("draft", (event) => {
            setDraft(JSON.parse(event.data));
            setConnection("open");
        });
        events.addEventListener("error", () => setConnection("lost"));
        return () => events.close();
    }, [itemId]);

    return {draft, connection};
}

function describeHintsState({
    hintsVisible,
    total,
    visibleCount,
    isFinalHelpPage,
}: HintsState): string {
    const revealed = `${hintsVisible} of ${total} hints revealed.`;
    if (isFinalHelpPage) {
        // HintsRenderer stays in this mode until the hints are hidden.
        return (
            `${revealed} More than one was revealed at once, so this is the ` +
            "final help page: every revealed hint shows, even ones marked " +
            "to replace the hint before them."
        );
    }
    if (visibleCount < hintsVisible) {
        return (
            `${revealed} ${visibleCount} showing: some replace the hint ` +
            "before them."
        );
    }
    return revealed;
}

function HintControls({
    hintsState,
    revealHint,
}: {
    hintsState: HintsState | null;
    revealHint: (hintsVisible?: number) => void;
}) {
    if (hintsState?.total === 0) {
        return <p>This item has no hints.</p>;
    }
    const hintsVisible = hintsState?.hintsVisible ?? 0;
    const allRevealed =
        hintsState == null || hintsState.hintsVisible >= hintsState.total;
    return (
        <fieldset>
            <legend>Hints</legend>
            <div className="controls">
                <button
                    type="button"
                    disabled={allRevealed}
                    onClick={() => revealHint()}
                >
                    Show next hint
                </button>
                <button
                    type="button"
                    disabled={allRevealed}
                    onClick={() => revealHint(-1)}
                >
                    Show all hints
                </button>
                <button
                    type="button"
                    disabled={hintsVisible === 0}
                    onClick={() => revealHint(0)}
                >
                    Hide hints
                </button>
            </div>
            {hintsState != null && <p>{describeHintsState(hintsState)}</p>}
        </fieldset>
    );
}

// The preview options the shell offers. The others (mobile, locale, color
// scheme) aren't supported by the preview yet.
type OfferedOptions = Pick<
    PreviewOptions,
    "reviewMode" | "showSolutions" | "answerless" | "readOnly"
>;

const SHOW_SOLUTIONS_TEXT: Record<ShowSolutions, string> = {
    none: "None",
    selected: "For the selected choices",
    all: "For every choice",
};

function isShowSolutions(value: string): value is ShowSolutions {
    return Object.keys(SHOW_SOLUTIONS_TEXT).includes(value);
}

function OptionControls({
    options,
    onChange,
}: {
    options: OfferedOptions;
    onChange: (options: Partial<OfferedOptions>) => void;
}) {
    const checkbox = (
        name: "reviewMode" | "answerless" | "readOnly",
        label: string,
    ) => (
        <label>
            <input
                type="checkbox"
                checked={options[name]}
                onChange={(event) => onChange({[name]: event.target.checked})}
            />
            {label}
        </label>
    );
    return (
        <fieldset>
            <legend>Preview options</legend>
            <div className="controls">
                {checkbox("reviewMode", "Review mode")}
                {checkbox("answerless", "Without answers, as learners get it")}
                {checkbox("readOnly", "Read only")}
                <label>
                    Show solutions
                    <select
                        value={options.showSolutions}
                        onChange={(event) => {
                            const {value} = event.target;
                            if (isShowSolutions(value)) {
                                onChange({showSolutions: value});
                            }
                        }}
                    >
                        {Object.entries(SHOW_SOLUTIONS_TEXT).map(
                            ([value, text]) => (
                                <option key={value} value={value}>
                                    {text}
                                </option>
                            ),
                        )}
                    </select>
                </label>
            </div>
        </fieldset>
    );
}

function Shell({itemId}: {itemId: string}) {
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const {sendData, height, revealHint, hintsState, setPreviewOptions} =
        usePreviewController(iframeRef);
    const [options, setOptions] = React.useState<OfferedOptions>({
        reviewMode: false,
        showSolutions: "none",
        answerless: false,
        readOnly: false,
    });
    React.useEffect(() => {
        setPreviewOptions(options);
    }, [options, setPreviewOptions]);
    const {draft, connection} = useDraftEvents(itemId);
    const status =
        draft == null
            ? CONNECTION_TEXT[connection]
            : `Revision ${draft.revision}. ${CONNECTION_TEXT[connection]}`;

    React.useEffect(() => {
        if (draft == null) {
            return;
        }
        sendData({
            type: "exercise",
            data: {item: draft.item, apiOptions: {}, showRationales: false},
        });
    }, [draft, sendData]);

    return (
        <>
            <header>
                <h1>{`Preview of draft ${itemId}`}</h1>
                <p>{status}</p>
            </header>
            <main>
                <HintControls hintsState={hintsState} revealHint={revealHint} />
                <OptionControls
                    options={options}
                    onChange={(changed) =>
                        setOptions((current) => ({...current, ...changed}))
                    }
                />
                <iframe
                    ref={iframeRef}
                    src="/preview/frame"
                    title={`Draft ${itemId}`}
                    style={{height: height ?? undefined}}
                />
            </main>
        </>
    );
}

// The page's path is /drafts/<itemId>/preview.
const itemId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(<Shell itemId={itemId} />);
