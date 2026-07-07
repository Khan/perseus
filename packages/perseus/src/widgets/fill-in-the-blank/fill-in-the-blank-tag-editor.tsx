/**
 * PROTOTYPE (LEMS-4311 — FITB editor exploration): the "renderer-based, blank-tag"
 * authoring approach, as an alternative to the drag-and-drop card composer.
 *
 * The author writes the sentence/equation in a text field and inserts blank
 * tags where blanks go. Each tag carries a STABLE id (`{{blank 1}}`), so a
 * blank's settings (correct answer, display type) are keyed by that id — not by
 * position. Editing or reordering the surrounding text can't reshuffle which
 * answer belongs to which blank. This mirrors how every rich Perseus widget
 * stores content: a `content` string with id-bearing references plus an
 * id-keyed lookup table.
 *
 * A live preview renders the content through the real Perseus <Renderer> (via
 * the inline-flow spike component). The exported JSON is the recommended widget
 * shape: `{content, blanks, choices, …}` where `content` is the authored string,
 * `blanks` is keyed by blank id, and `choices` is the answer bank. Choices
 * support markdown (text/TeX) and image content types, with a widget-level
 * image-height preset.
 *
 * The controls are built with Wonder Blocks so the prototype reads like a real
 * Perseus editor. Throwaway prototype: local state only, no scoring, no drag.
 * Blanks are added via the "Insert blank" button, which assigns each a fresh
 * stable id.
 */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {Checkbox, TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import {
    border,
    font,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import FillInTheBlankContentPreview from "./fill-in-the-blank-content-preview";

import type {FITBPreviewSegment} from "./fill-in-the-blank-content-preview";

// Sentinel option value for "no correct answer chosen yet".
const UNASSIGNED = "__unassigned__";

// A blank reference in the content string, e.g. `{{blank 3}}`. The captured id
// (`blank 3`) follows Perseus's `type number` id convention. This is FITB-owned
// syntax — deliberately NOT a Perseus widget reference (`[[☃ …]]`) — so it can't
// be mistaken for, or collide with, a registered widget.
const BLANK_RE = /\{\{(blank \d+)\}\}/g;
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

// Split the content string into preview segments: markdown runs, with each
// `{{blank id}}` becoming a blank segment that carries the id from the tag.
function parseSegments(content: string): FITBPreviewSegment[] {
    const segments: FITBPreviewSegment[] = [];
    let last = 0;
    let mdIndex = 0;
    for (const match of content.matchAll(BLANK_RE)) {
        const start = match.index ?? 0;
        if (start > last) {
            segments.push({
                type: "markdown",
                id: `md-${mdIndex++}`,
                markdown: content.slice(last, start),
            });
        }
        segments.push({type: "blank", id: match[1]});
        last = start + match[0].length;
    }
    if (last < content.length) {
        segments.push({
            type: "markdown",
            id: `md-${mdIndex++}`,
            markdown: content.slice(last),
        });
    }
    return segments;
}

// The blank ids present in a content string, in document order.
function blankIdsIn(content: string): string[] {
    return [...content.matchAll(BLANK_RE)].map((m) => m[1]);
}

// The highest blank number used in a content string (0 if none). New ids are
// assigned as maxBlankNum + 1 — the same "safe, non-conflicting number" idea the
// Perseus editor uses when inserting or pasting widgets.
function maxBlankNum(content: string): number {
    return blankIdsIn(content)
        .map((id) => parseInt(id.replace(/\D/g, ""), 10))
        .filter((n) => !isNaN(n))
        .reduce((max, n) => Math.max(max, n), 0);
}

// If the same blank id appears more than once — e.g. after pasting a sentence
// that already contains a blank — give the later copies fresh ids so each blank
// keeps its own settings instead of silently sharing them. This is the reactive
// analog of the Perseus editor renaming pasted widgets to non-conflicting ids
// (see _safeWidgetNameMapping in perseus-editor/src/editor.tsx).
function dedupeBlankIds(content: string): string {
    const seen = new Set<string>();
    let nextNum = maxBlankNum(content);
    return content.replace(BLANK_RE, (whole, id) => {
        if (!seen.has(id)) {
            seen.add(id);
            return whole;
        }
        nextNum += 1;
        const fresh = `blank ${nextNum}`;
        seen.add(fresh);
        return `{{${fresh}}}`;
    });
}

function choiceLabel(c: Choice, i: number): string {
    if (c.type === "image") {
        return `🖼 ${c.alt || `Image ${i + 1}`}`;
    }
    return c.markdown || `Choice ${i + 1}`;
}

export default function FillInTheBlankTagEditor({
    initialContent = "",
    initialChoices = [],
    initialBlankSettings = [],
    initialImageHeight = 48,
}: {
    initialContent?: string;
    initialChoices?: ReadonlyArray<Choice>;
    // Optional pre-assigned per-blank settings, in blank order. Zipped onto the
    // initial content's blank ids at mount. Handy for stories that should load
    // already-answered.
    initialBlankSettings?: ReadonlyArray<BlankSetting>;
    initialImageHeight?: ImageHeight;
}): React.ReactElement {
    const [content, setContent] = React.useState(initialContent);
    const [choices, setChoices] = React.useState<Choice[]>([...initialChoices]);
    // Per-blank settings, keyed by the blank's stable id (not by position).
    const [blankSettings, setBlankSettings] = React.useState<
        Record<string, BlankSetting>
    >(() => {
        const map: Record<string, BlankSetting> = {};
        blankIdsIn(initialContent).forEach((id, i) => {
            map[id] = initialBlankSettings[i] ?? {
                correct: null,
                displayType: "normal",
            };
        });
        return map;
    });
    const [tileUsage, setTileUsage] = React.useState<"single" | "multi">(
        "single",
    );
    const [randomize, setRandomize] = React.useState(true);
    const [imageHeight, setImageHeight] =
        React.useState<ImageHeight>(initialImageHeight);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const segments = React.useMemo(() => parseSegments(content), [content]);
    const blankIds = React.useMemo(() => blankIdsIn(content), [content]);
    const blankCount = blankIds.length;

    // Segments for the live preview, with each blank's displayType merged in so
    // sub/superscript blanks render off the baseline.
    const previewSegments = React.useMemo(
        () =>
            segments.map((s) =>
                s.type === "blank"
                    ? {
                          ...s,
                          displayType:
                              blankSettings[s.id]?.displayType ?? "normal",
                      }
                    : s,
            ),
        [segments, blankSettings],
    );

    // Keep the settings map in sync with the blanks in the content: add defaults
    // for new ids, drop entries for ids that no longer appear.
    React.useEffect(() => {
        setBlankSettings((prev) => {
            const next: Record<string, BlankSetting> = {};
            for (const id of blankIds) {
                next[id] = prev[id] ?? {correct: null, displayType: "normal"};
            }
            const unchanged =
                Object.keys(prev).length === blankIds.length &&
                blankIds.every((id) => id in prev);
            return unchanged ? prev : next;
        });
    }, [blankIds]);

    const insertBlank = () => {
        const ta = textareaRef.current;
        const at = ta ? ta.selectionEnd : content.length;
        const tag = `{{blank ${maxBlankNum(content) + 1}}}`;
        setContent(content.slice(0, at) + tag + content.slice(at));
    };

    const setBlank = (id: string, patch: Partial<BlankSetting>) =>
        setBlankSettings((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id] ?? {correct: null, displayType: "normal"}),
                ...patch,
            },
        }));

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
            prev.map((c) => {
                if (c.id !== id) {
                    return c;
                }
                // eslint-disable-next-line no-restricted-syntax -- prototype: loose merge of a string patch onto the Choice union; callers only pass fields valid for that choice's type.
                return {...c, ...patch} as Choice;
            }),
        );
    const removeChoice = (id: string) => {
        setChoices((prev) => prev.filter((c) => c.id !== id));
        // Any blank pointing at this choice loses its correct answer.
        setBlankSettings((prev) => {
            const next: Record<string, BlankSetting> = {};
            for (const [bid, s] of Object.entries(prev)) {
                next[bid] = s.correct === id ? {...s, correct: null} : s;
            }
            return next;
        });
    };

    // Build the exported widget JSON (answerful) from current state — the
    // recommended shape: content string + id-keyed blanks + choices.
    const exported = React.useMemo(() => {
        const blanks: Record<
            string,
            {correct: string | null; displayType: DisplayType}
        > = {};
        for (const id of blankIds) {
            const s = blankSettings[id] ?? {
                correct: null,
                displayType: "normal" as const,
            };
            blanks[id] = {correct: s.correct, displayType: s.displayType};
        }
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
            content,
            blanks,
            choices: choicesOut,
            tileUsage,
            randomizeChoices: randomize,
            ...(hasImageChoice ? {imageHeight} : {}),
        };
    }, [
        content,
        blankIds,
        blankSettings,
        choices,
        tileUsage,
        randomize,
        imageHeight,
    ]);

    const hasImageChoice = choices.some((c) => c.type === "image");

    return (
        <View style={styles.root}>
            {/* Controls column — kept ~narrow to mirror the real editor panel. */}
            <View style={styles.controls}>
                <Heading size="small" tag="h3" style={styles.section}>
                    Content
                </Heading>
                <TextArea
                    ref={textareaRef}
                    value={content}
                    onChange={(value) => setContent(dedupeBlankIds(value))}
                    rows={4}
                    autoResize={true}
                    style={styles.mono}
                    aria-label="Content with blank tags"
                />
                <View style={styles.insertRow}>
                    <Button kind="secondary" onClick={insertBlank}>
                        Insert blank
                    </Button>
                </View>
                <BodyText size="small">
                    Type text and <code>$…$</code> for TeX. Use{" "}
                    <strong>Insert blank</strong> to drop a blank at the cursor
                    — each gets a stable id like <code>{"{{blank 1}}"}</code>,
                    so its answer stays put when you edit around it.
                </BodyText>

                <Heading size="small" tag="h3" style={styles.section}>
                    Choices
                </Heading>
                {choices.map((c, i) => (
                    <View key={c.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <BodyText tag="span" style={styles.strong}>
                                {c.type === "image"
                                    ? `Image choice ${i + 1}`
                                    : `Text choice ${i + 1}`}
                            </BodyText>
                            <Button
                                kind="tertiary"
                                onClick={() => removeChoice(c.id)}
                            >
                                Remove
                            </Button>
                        </View>
                        {c.type === "image" ? (
                            <>
                                <TextField
                                    aria-label={`Choice ${i + 1} image URL`}
                                    placeholder="Image URL"
                                    value={c.url}
                                    onChange={(value) =>
                                        updateChoice(c.id, {url: value})
                                    }
                                />
                                <TextField
                                    aria-label={`Choice ${i + 1} alt text`}
                                    placeholder="Alt text"
                                    value={c.alt}
                                    onChange={(value) =>
                                        updateChoice(c.id, {alt: value})
                                    }
                                />
                                <TextField
                                    aria-label={`Choice ${i + 1} long description`}
                                    placeholder="Long description"
                                    value={c.longDescription}
                                    onChange={(value) =>
                                        updateChoice(c.id, {
                                            longDescription: value,
                                        })
                                    }
                                />
                            </>
                        ) : (
                            <TextField
                                aria-label={`Choice ${i + 1} text`}
                                placeholder="Text or $TeX$"
                                value={c.markdown}
                                onChange={(value) =>
                                    updateChoice(c.id, {markdown: value})
                                }
                            />
                        )}
                    </View>
                ))}
                <View style={styles.buttonRow}>
                    <Button kind="secondary" onClick={addTextChoice}>
                        Text choice
                    </Button>
                    <Button kind="secondary" onClick={addImageChoice}>
                        Image choice
                    </Button>
                </View>

                <Heading size="small" tag="h3" style={styles.section}>
                    Blanks
                </Heading>
                {blankCount === 0 && (
                    <BodyText size="small">
                        No blanks yet — insert one above.
                    </BodyText>
                )}
                {blankIds.map((id, i) => {
                    const setting = blankSettings[id] ?? {
                        correct: null,
                        displayType: "normal" as const,
                    };
                    return (
                        <View key={id} style={styles.card}>
                            <BodyText tag="span" style={styles.strong}>
                                Blank {i + 1}
                            </BodyText>
                            <View style={styles.fieldRow}>
                                <BodyText
                                    id={`lbl-correct-${id}`}
                                    tag="span"
                                    size="small"
                                    style={styles.fieldLabel}
                                >
                                    Correct
                                </BodyText>
                                <SingleSelect
                                    aria-labelledby={`lbl-correct-${id}`}
                                    placeholder="Choose a choice"
                                    selectedValue={setting.correct ?? undefined}
                                    onChange={(value) =>
                                        setBlank(id, {
                                            correct:
                                                value === UNASSIGNED
                                                    ? null
                                                    : value,
                                        })
                                    }
                                >
                                    {[
                                        <OptionItem
                                            key={UNASSIGNED}
                                            value={UNASSIGNED}
                                            label="(unassigned)"
                                        />,
                                        ...choices.map((c, ci) => (
                                            <OptionItem
                                                key={c.id}
                                                value={c.id}
                                                label={choiceLabel(c, ci)}
                                            />
                                        )),
                                    ]}
                                </SingleSelect>
                            </View>
                            <View style={styles.fieldRow}>
                                <BodyText
                                    id={`lbl-display-${id}`}
                                    tag="span"
                                    size="small"
                                    style={styles.fieldLabel}
                                >
                                    Display
                                </BodyText>
                                <SingleSelect
                                    aria-labelledby={`lbl-display-${id}`}
                                    placeholder="Display type"
                                    selectedValue={setting.displayType}
                                    onChange={(value) =>
                                        setBlank(id, {
                                            displayType:
                                                value === "superscript" ||
                                                value === "subscript"
                                                    ? value
                                                    : "normal",
                                        })
                                    }
                                >
                                    <OptionItem value="normal" label="normal" />
                                    <OptionItem
                                        value="superscript"
                                        label="superscript"
                                    />
                                    <OptionItem
                                        value="subscript"
                                        label="subscript"
                                    />
                                </SingleSelect>
                            </View>
                        </View>
                    );
                })}

                <Heading size="small" tag="h3" style={styles.section}>
                    Settings
                </Heading>
                <View style={styles.fieldRow}>
                    <BodyText
                        id="lbl-tile-usage"
                        tag="span"
                        size="small"
                        style={styles.fieldLabel}
                    >
                        Tile usage
                    </BodyText>
                    <SingleSelect
                        aria-labelledby="lbl-tile-usage"
                        placeholder="Tile usage"
                        selectedValue={tileUsage}
                        onChange={(value) =>
                            setTileUsage(value === "multi" ? "multi" : "single")
                        }
                    >
                        <OptionItem value="single" label="single" />
                        <OptionItem value="multi" label="multi" />
                    </SingleSelect>
                </View>
                {hasImageChoice && (
                    <View style={styles.fieldRow}>
                        <BodyText
                            id="lbl-image-height"
                            tag="span"
                            size="small"
                            style={styles.fieldLabel}
                        >
                            Image height
                        </BodyText>
                        <SingleSelect
                            aria-labelledby="lbl-image-height"
                            placeholder="Image height"
                            selectedValue={String(imageHeight)}
                            onChange={(value) => {
                                const height = IMAGE_HEIGHTS.find(
                                    (h) => h === Number(value),
                                );
                                if (height != null) {
                                    setImageHeight(height);
                                }
                            }}
                        >
                            {IMAGE_HEIGHTS.map((h) => (
                                <OptionItem
                                    key={h}
                                    value={String(h)}
                                    label={`${h}px`}
                                />
                            ))}
                        </SingleSelect>
                    </View>
                )}
                <Checkbox
                    label="Randomize choices"
                    checked={randomize}
                    onChange={(newValue) => setRandomize(newValue)}
                />
            </View>

            {/* Preview + exported JSON. */}
            <View style={styles.preview}>
                <Heading size="small" tag="h3" style={styles.section}>
                    Preview
                </Heading>
                <View style={styles.previewBox}>
                    <FillInTheBlankContentPreview
                        content={previewSegments}
                        getBlankLabel={(n) => n}
                    />
                    <Heading size="small" tag="h3" style={styles.section}>
                        Choices
                    </Heading>
                    <View style={styles.choiceTiles}>
                        {choices.map((c, i) => (
                            <View key={c.id} style={styles.choiceTile}>
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
                                        <BodyText tag="span" size="small">
                                            {`Image ${i + 1}`}
                                        </BodyText>
                                    )
                                ) : (
                                    // Render the choice's markdown/TeX through
                                    // the same Renderer, compact for a tile.
                                    <FillInTheBlankContentPreview
                                        content={[
                                            {
                                                type: "markdown",
                                                id: c.id,
                                                markdown:
                                                    c.markdown ||
                                                    `Choice ${i + 1}`,
                                            },
                                        ]}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <Heading size="small" tag="h3" style={styles.section}>
                    Exported widget JSON
                </Heading>
                <View style={styles.jsonBlock}>
                    <pre
                        style={{
                            margin: 0,
                            fontFamily: "monospace",
                            fontSize: font.body.size.xsmall,
                            lineHeight: font.body.lineHeight.small,
                        }}
                    >
                        {JSON.stringify(exported, null, 2)}
                    </pre>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        gap: sizing.size_240,
        alignItems: "flex-start",
    },
    controls: {
        inlineSize: 380,
        flexShrink: 0,
        gap: sizing.size_080,
    },
    preview: {
        flexGrow: 1,
        minInlineSize: 0,
        gap: sizing.size_080,
    },
    section: {
        marginBlockStart: sizing.size_160,
    },
    strong: {
        fontWeight: font.weight.bold,
    },
    mono: {
        fontFamily: "monospace",
    },
    insertRow: {
        alignItems: "flex-start",
    },
    buttonRow: {
        flexDirection: "row",
        gap: sizing.size_080,
    },
    card: {
        borderWidth: border.width.thin,
        borderStyle: "solid",
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: border.radius.radius_040,
        padding: sizing.size_080,
        gap: sizing.size_080,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fieldRow: {
        flexDirection: "row",
        gap: sizing.size_080,
        alignItems: "center",
    },
    fieldLabel: {
        inlineSize: 84,
        flexShrink: 0,
    },
    previewBox: {
        borderWidth: border.width.thin,
        borderStyle: "solid",
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: border.radius.radius_040,
        padding: sizing.size_160,
        gap: sizing.size_080,
    },
    choiceTiles: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: sizing.size_080,
    },
    choiceTile: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: border.width.thin,
        borderStyle: "solid",
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: border.radius.radius_040,
        padding: sizing.size_040,
    },
    jsonBlock: {
        borderWidth: border.width.thin,
        borderStyle: "solid",
        borderColor: semanticColor.core.border.neutral.default,
        borderRadius: border.radius.radius_040,
        padding: sizing.size_120,
        overflowX: "auto",
    },
});
