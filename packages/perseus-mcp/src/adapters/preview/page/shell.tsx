// The preview page for one draft (`/drafts/<itemId>/preview`). It follows the
// draft's event stream and sends each revision to the preview frame, so the
// page shows the draft's latest state without reloading.
import {usePreviewController} from "@khanacademy/perseus-editor";
import Button from "@khanacademy/wonder-blocks-button";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {CheckboxGroup, Choice} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import styles from "./shell.module.css";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

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
    const headingId = React.useId();
    const hintsVisible = hintsState?.hintsVisible ?? 0;
    const allRevealed =
        hintsState == null || hintsState.hintsVisible >= hintsState.total;
    return (
        <View
            tag="section"
            aria-labelledby={headingId}
            className={styles.group}
        >
            <Heading id={headingId} tag="h2" size="medium">
                Hints
            </Heading>
            {hintsState?.total === 0 ? (
                <BodyText>This item has no hints.</BodyText>
            ) : (
                <>
                    <View className={styles.row}>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={allRevealed}
                            onClick={() => revealHint()}
                        >
                            Show next hint
                        </Button>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={allRevealed}
                            onClick={() => revealHint(-1)}
                        >
                            Show all hints
                        </Button>
                        <Button
                            kind="secondary"
                            size="small"
                            disabled={hintsVisible === 0}
                            onClick={() => revealHint(0)}
                        >
                            Hide hints
                        </Button>
                    </View>
                    {hintsState != null && (
                        <BodyText>{describeHintsState(hintsState)}</BodyText>
                    )}
                </>
            )}
        </View>
    );
}

// The preview options the shell offers. The others (mobile, locale, color
// scheme) aren't supported by the preview yet.
type OfferedOptions = Pick<
    PreviewOptions,
    "reviewMode" | "showSolutions" | "answerless" | "readOnly"
>;

const TOGGLES = {
    reviewMode: "Review mode",
    answerless: "Without answers, as learners get it",
    readOnly: "Read only",
} satisfies Record<Exclude<keyof OfferedOptions, "showSolutions">, string>;

type Toggle = keyof typeof TOGGLES;

function isToggle(value: string): value is Toggle {
    return Object.keys(TOGGLES).includes(value);
}

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
    const toggles = Object.keys(TOGGLES).filter(isToggle);
    return (
        <View className={styles.row}>
            <CheckboxGroup
                label="Preview options"
                groupName="preview-options"
                selectedValues={toggles.filter((toggle) => options[toggle])}
                onChange={(selected) =>
                    onChange(
                        Object.fromEntries(
                            toggles.map((toggle) => [
                                toggle,
                                selected.includes(toggle),
                            ]),
                        ),
                    )
                }
            >
                {toggles.map((toggle) => (
                    <Choice
                        key={toggle}
                        label={TOGGLES[toggle]}
                        value={toggle}
                    />
                ))}
            </CheckboxGroup>
            <LabeledField
                label="Show solutions"
                field={
                    <SingleSelect
                        placeholder="Choose when to show solutions"
                        selectedValue={options.showSolutions}
                        onChange={(value) => {
                            if (isShowSolutions(value)) {
                                onChange({showSolutions: value});
                            }
                        }}
                    >
                        {Object.entries(SHOW_SOLUTIONS_TEXT).map(
                            ([value, text]) => (
                                <OptionItem
                                    key={value}
                                    label={text}
                                    value={value}
                                />
                            ),
                        )}
                    </SingleSelect>
                }
            />
        </View>
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
        <View className={`${styles.root} ${styles.page}`}>
            <View tag="header" className={styles.group}>
                <Heading tag="h1" size="xlarge">
                    {`Preview of draft ${itemId}`}
                </Heading>
                <BodyText>{status}</BodyText>
            </View>
            <View tag="main" className={styles.page}>
                <OptionControls
                    options={options}
                    onChange={(changed) =>
                        setOptions((current) => ({...current, ...changed}))
                    }
                />
                <HintControls hintsState={hintsState} revealHint={revealHint} />
                <iframe
                    ref={iframeRef}
                    src="/preview/frame"
                    title={`Draft ${itemId}`}
                    className={styles.frame}
                    style={{blockSize: height ?? undefined}}
                />
            </View>
        </View>
    );
}

// The page's path is /drafts/<itemId>/preview.
const itemId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <Shell itemId={itemId} />
    </RenderStateRoot>,
);
