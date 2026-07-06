/**
 * PROTOTYPE (LEMS-4311 — FITB editor exploration): the "renderer-based, blank-tag"
 * authoring approach, as an alternative to the drag-and-drop card composer.
 *
 * Instead of dragging cards, the author writes the sentence/equation in a text
 * field and inserts `{{blank}}` tags where blanks go. A live preview renders the
 * content through the real Perseus <Renderer> (via the inline-flow spike
 * component), and per-blank settings + a choices bank are edited alongside. It
 * exports the same widget JSON the card version produces, so the two authoring
 * feels can be compared on identical output.
 *
 * Choices support both markdown (text/TeX) and image content types, with a
 * widget-level image-height preset. This is a throwaway prototype: local state
 * only, no scoring, no drag. Blank settings are keyed by document position,
 * which deliberately exposes the "identity lives in editable text" fragility of
 * the tag approach — useful signal for the comparison.
 */
import * as React from "react";

import FillInTheBlankContentPreview from "./fill-in-the-blank-content-preview";

import type {FITBPreviewSegment} from "./fill-in-the-blank-content-preview";

const BLANK_TAG = "{{blank}}";
const BLANK_RE = /\{\{blank\}\}/g;
const IMAGE_HEIGHTS = [24, 36, 48, 60, 72, 84, 96] as const;
type ImageHeight = (typeof IMAGE_HEIGHTS)[number];

type MarkdownChoice = {id: string; type: "markdown"; markdown: string};
type ImageChoice = {
    id: string;
    type: "image";
    url: string;
    alt: string;
    longDescription: string;
};
type Choice = MarkdownChoice | ImageChoice;
type DisplayType = "normal" | "superscript" | "subscript";
type BlankSetting = {correct: string | null; displayType: DisplayType};

// Split the content string into preview segments: markdown runs with `{{blank}}`
// tags becoming blank segments. Segment ids are position-derived (stable across
// renders for the same content).
function parseSegments(content: string): FITBPreviewSegment[] {
    const parts = content.split(BLANK_RE);
    const segments: FITBPreviewSegment[] = [];
    parts.forEach((part, i) => {
        if (part.length > 0) {
            segments.push({type: "markdown", id: `md-${i}`, markdown: part});
        }
        if (i < parts.length - 1) {
            segments.push({type: "blank", id: `bk-${i}`});
        }
    });
    return segments;
}

function choiceLabel(c: Choice, i: number): string {
    if (c.type === "image") {
        return `🖼 ${c.alt || `Image ${i + 1}`}`;
    }
    return c.markdown || `Choice ${i + 1}`;
}

const heading: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: "#6b7280",
    margin: "16px 0 6px",
};
const field: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "6px 8px",
    border: "1px solid #d6d8da",
    borderRadius: 4,
    fontSize: 14,
};
const cardBox: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
};

export default function FillInTheBlankTagEditor({
    initialContent = "",
    initialChoices = [],
    initialBlankSettings = [],
    initialImageHeight = 48,
}: {
    initialContent?: string;
    initialChoices?: ReadonlyArray<Choice>;
    // Optional pre-assigned per-blank settings, in blank order. Handy for
    // stories that should load already-answered.
    initialBlankSettings?: ReadonlyArray<BlankSetting>;
    initialImageHeight?: ImageHeight;
}): React.ReactElement {
    const [content, setContent] = React.useState(initialContent);
    const [choices, setChoices] = React.useState<Choice[]>([...initialChoices]);
    const [blankSettings, setBlankSettings] = React.useState<BlankSetting[]>([
        ...initialBlankSettings,
    ]);
    const [tileUsage, setTileUsage] = React.useState<"single" | "multi">(
        "single",
    );
    const [randomize, setRandomize] = React.useState(true);
    const [imageHeight, setImageHeight] =
        React.useState<ImageHeight>(initialImageHeight);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const segments = React.useMemo(() => parseSegments(content), [content]);
    const blankCount = React.useMemo(
        () => (content.match(BLANK_RE) || []).length,
        [content],
    );

    // Keep the per-blank settings array the same length as the number of tags.
    React.useEffect(() => {
        setBlankSettings((prev) => {
            if (prev.length === blankCount) {
                return prev;
            }
            const next = prev.slice(0, blankCount);
            while (next.length < blankCount) {
                next.push({correct: null, displayType: "normal"});
            }
            return next;
        });
    }, [blankCount]);

    const insertBlank = () => {
        const ta = textareaRef.current;
        const at = ta ? ta.selectionEnd : content.length;
        setContent(content.slice(0, at) + BLANK_TAG + content.slice(at));
    };

    const setBlank = (i: number, patch: Partial<BlankSetting>) =>
        setBlankSettings((prev) =>
            prev.map((b, idx) => (idx === i ? {...b, ...patch} : b)),
        );

    const addTextChoice = () =>
        setChoices((prev) => [
            ...prev,
            {id: crypto.randomUUID(), type: "markdown", markdown: ""},
        ]);
    const addImageChoice = () =>
        setChoices((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                type: "image",
                url: "",
                alt: "",
                longDescription: "",
            },
        ]);
    // Patch a choice by id (fields vary by type; merge loosely for the prototype).
    const updateChoice = (id: string, patch: Record<string, string>) =>
        setChoices((prev) =>
            prev.map((c) => (c.id === id ? ({...c, ...patch} as Choice) : c)),
        );
    const removeChoice = (id: string) => {
        setChoices((prev) => prev.filter((c) => c.id !== id));
        setBlankSettings((prev) =>
            prev.map((b) => (b.correct === id ? {...b, correct: null} : b)),
        );
    };

    // Build the exported widget JSON (answerful) from current state.
    const exported = React.useMemo(() => {
        let bi = 0;
        const contentOut = segments.map((s) => {
            if (s.type === "markdown") {
                return {type: "markdown", id: s.id, markdown: s.markdown};
            }
            const setting = blankSettings[bi] ?? {
                correct: null,
                displayType: "normal" as const,
            };
            const out = {
                type: "blank",
                id: `blank-${bi + 1}`,
                displayType: setting.displayType,
                correct: setting.correct,
            };
            bi += 1;
            return out;
        });
        const choicesOut = choices.map((c) =>
            c.type === "image"
                ? {
                      type: "image",
                      id: c.id,
                      url: c.url,
                      alt: c.alt,
                      longDescription: c.longDescription,
                  }
                : {type: "markdown", id: c.id, markdown: c.markdown},
        );
        const hasImageChoice = choices.some((c) => c.type === "image");
        return {
            content: contentOut,
            choices: choicesOut,
            tileUsage,
            randomizeChoices: randomize,
            ...(hasImageChoice ? {imageHeight} : {}),
        };
    }, [segments, blankSettings, choices, tileUsage, randomize, imageHeight]);

    const hasImageChoice = choices.some((c) => c.type === "image");

    return (
        <div style={{display: "flex", gap: 24, alignItems: "flex-start"}}>
            {/* Controls column — kept ~narrow to mirror the real editor panel. */}
            <div style={{width: 380, flex: "0 0 380px"}}>
                <div style={heading}>Content</div>
                <textarea
                    ref={textareaRef}
                    style={{...field, minHeight: 120, fontFamily: "monospace"}}
                    aria-label="Content with blank tags"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="button"
                    style={{marginTop: 6}}
                    onClick={insertBlank}
                >
                    + Insert blank
                </button>
                <div style={{fontSize: 12, color: "#6b7280", marginTop: 4}}>
                    Type text and <code>$…$</code> for TeX. Use{" "}
                    <strong>Insert blank</strong> to drop a{" "}
                    <code>{BLANK_TAG}</code> at the cursor.
                </div>

                <div style={heading}>Choices</div>
                {choices.map((c, i) => (
                    <div key={c.id} style={cardBox}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 4,
                            }}
                        >
                            <span style={{fontWeight: 600, fontSize: 13}}>
                                {c.type === "image"
                                    ? `Image choice ${i + 1}`
                                    : `Text choice ${i + 1}`}
                            </span>
                            <button
                                type="button"
                                aria-label={`Remove choice ${i + 1}`}
                                onClick={() => removeChoice(c.id)}
                            >
                                −
                            </button>
                        </div>
                        {c.type === "image" ? (
                            <>
                                <input
                                    style={{...field, marginBottom: 4}}
                                    aria-label={`Choice ${i + 1} image URL`}
                                    placeholder="Image URL"
                                    value={c.url}
                                    onChange={(e) =>
                                        updateChoice(c.id, {
                                            url: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    style={{...field, marginBottom: 4}}
                                    aria-label={`Choice ${i + 1} alt text`}
                                    placeholder="Alt text"
                                    value={c.alt}
                                    onChange={(e) =>
                                        updateChoice(c.id, {
                                            alt: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    style={field}
                                    aria-label={`Choice ${i + 1} long description`}
                                    placeholder="Long description"
                                    value={c.longDescription}
                                    onChange={(e) =>
                                        updateChoice(c.id, {
                                            longDescription: e.target.value,
                                        })
                                    }
                                />
                            </>
                        ) : (
                            <input
                                style={field}
                                aria-label={`Choice ${i + 1} text`}
                                placeholder="Text or $TeX$"
                                value={c.markdown}
                                onChange={(e) =>
                                    updateChoice(c.id, {
                                        markdown: e.target.value,
                                    })
                                }
                            />
                        )}
                    </div>
                ))}
                <div style={{display: "flex", gap: 8}}>
                    <button type="button" onClick={addTextChoice}>
                        + Text choice
                    </button>
                    <button type="button" onClick={addImageChoice}>
                        + Image choice
                    </button>
                </div>

                <div style={heading}>Blanks</div>
                {blankCount === 0 && (
                    <div style={{fontSize: 13, color: "#6b7280"}}>
                        No blanks yet — insert one above.
                    </div>
                )}
                {Array.from({length: blankCount}, (_, i) => {
                    const setting = blankSettings[i] ?? {
                        correct: null,
                        displayType: "normal" as const,
                    };
                    return (
                        <div key={i} style={cardBox}>
                            <div style={{fontWeight: 600, marginBottom: 4}}>
                                Blank {i + 1}
                            </div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 13,
                                    marginBottom: 4,
                                }}
                            >
                                Correct{" "}
                                <select
                                    style={field}
                                    value={setting.correct ?? ""}
                                    onChange={(e) =>
                                        setBlank(i, {
                                            correct: e.target.value || null,
                                        })
                                    }
                                >
                                    <option value="">(unassigned)</option>
                                    {choices.map((c, ci) => (
                                        <option key={c.id} value={c.id}>
                                            {choiceLabel(c, ci)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label style={{display: "block", fontSize: 13}}>
                                Display{" "}
                                <select
                                    style={field}
                                    value={setting.displayType}
                                    onChange={(e) =>
                                        setBlank(i, {
                                            displayType: e.target
                                                .value as DisplayType,
                                        })
                                    }
                                >
                                    <option value="normal">normal</option>
                                    <option value="superscript">
                                        superscript
                                    </option>
                                    <option value="subscript">subscript</option>
                                </select>
                            </label>
                        </div>
                    );
                })}

                <div style={heading}>Settings</div>
                <label
                    style={{display: "block", fontSize: 13, marginBottom: 6}}
                >
                    Tile usage{" "}
                    <select
                        style={field}
                        value={tileUsage}
                        onChange={(e) =>
                            setTileUsage(e.target.value as "single" | "multi")
                        }
                    >
                        <option value="single">single</option>
                        <option value="multi">multi</option>
                    </select>
                </label>
                {hasImageChoice && (
                    <label
                        style={{
                            display: "block",
                            fontSize: 13,
                            marginBottom: 6,
                        }}
                    >
                        Image height{" "}
                        <select
                            style={field}
                            value={imageHeight}
                            onChange={(e) =>
                                setImageHeight(
                                    Number(e.target.value) as ImageHeight,
                                )
                            }
                        >
                            {IMAGE_HEIGHTS.map((h) => (
                                <option key={h} value={h}>
                                    {h}px
                                </option>
                            ))}
                        </select>
                    </label>
                )}
                <label style={{display: "block", fontSize: 13}}>
                    <input
                        type="checkbox"
                        checked={randomize}
                        onChange={(e) => setRandomize(e.target.checked)}
                    />{" "}
                    Randomize choices
                </label>
            </div>

            {/* Preview + exported JSON. */}
            <div style={{flex: 1, minWidth: 0}}>
                <div style={heading}>Preview</div>
                <div
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: 16,
                    }}
                >
                    <FillInTheBlankContentPreview
                        content={segments}
                        getBlankLabel={(n) => n}
                    />
                    <div style={heading}>Choices</div>
                    <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
                        {choices.map((c, i) => (
                            <div
                                key={c.id}
                                style={{
                                    border: "1px solid #d6d8da",
                                    borderRadius: 4,
                                    padding: "4px 10px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                }}
                            >
                                {c.type === "image" ? (
                                    c.url ? (
                                        <img
                                            src={c.url}
                                            alt={c.alt}
                                            style={{
                                                height: imageHeight,
                                                maxWidth: 200,
                                                display: "block",
                                            }}
                                        />
                                    ) : (
                                        <span style={{color: "#9ca3af"}}>
                                            {`Image ${i + 1}`}
                                        </span>
                                    )
                                ) : (
                                    c.markdown || `Choice ${i + 1}`
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={heading}>Exported widget JSON</div>
                <pre
                    style={{
                        background: "#f6f7f8",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 12,
                        overflowX: "auto",
                    }}
                >
                    {JSON.stringify(exported, null, 2)}
                </pre>
            </div>
        </div>
    );
}
