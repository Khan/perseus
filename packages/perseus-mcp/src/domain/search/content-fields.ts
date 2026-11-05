import {traverse} from "@khanacademy/perseus-core";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * What a search document holds of an item's or article's content: its text
 * split by where it appears, so each can be searched and weighed on its own,
 * and what it's built from, for filters and counts.
 */
export type ContentFields = {
    /** Content Markdown, without widget placeholders, images or TeX. */
    text: string;
    hintText: string;
    /** The TeX between `$`s, each once. */
    math: string[];
    /** Text in widget options: choices, labels, and the like. */
    widgetText: string[];
    /** Each widget type used, once, nested widgets included. */
    widgetTypes: string[];
    /**
     * Short option values as `<type>.<path>=<value>`, such as
     * `interactive-graph.graph.type=circle`, so an option can be searched
     * for and counted. Array indices are left out of the path.
     */
    widgetProps: string[];
    widgetCount: number;
    hintCount: number;
    /** Markdown images and image widgets. */
    imageCount: number;
    hasGraphie: boolean;
    /**
     * The first non-blank line of the content as written, TeX and all, cut
     * to a length a list of hits can show. Not searched: for showing.
     */
    firstLine: string;
};

// How much of the first line a hit shows.
const FIRST_LINE_LENGTH = 200;

/** The first non-blank line of Markdown, cut to FIRST_LINE_LENGTH. */
function firstLineOf(markdown: string): string {
    const line =
        markdown
            .split("\n")
            .find((l) => l.trim() !== "")
            ?.trim() ?? "";
    return line.length > FIRST_LINE_LENGTH
        ? `${line.slice(0, FIRST_LINE_LENGTH)}…`
        : line;
}

const PLACEHOLDER = /\[\[☃ [a-z0-9-]+ \d+\]\]/g;
// ![alt](url "title"): the alt text is kept as text.
const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(\s*([^)\s]+)[^)]*\)/g;
// Option values short and plain enough to count as values, not text.
const PROP_VALUE = /^[\w.+-]{1,40}$/;
const URL = /^(https?|web\+graphie):\/\//;
// A document with more option values than this is cut off: they're for
// filtering, and a few widgets (such as a large table) have hundreds.
const MAX_PROPS = 200;

type Collector = {
    text: string[];
    math: Set<string>;
    widgetText: Set<string>;
    widgetTypes: Set<string>;
    widgetProps: Set<string>;
    widgetCount: number;
    imageCount: number;
    hasGraphie: boolean;
};

function newCollector(): Collector {
    return {
        text: [],
        math: new Set(),
        widgetText: new Set(),
        widgetTypes: new Set(),
        widgetProps: new Set(),
        widgetCount: 0,
        imageCount: 0,
        hasGraphie: false,
    };
}

/**
 * Splits Markdown into its text and its TeX (between unescaped `$`s). A
 * `\$` outside math is a dollar sign and stays in the text.
 */
export function splitMath(markdown: string): {text: string; math: string[]} {
    let text = "";
    const math: string[] = [];
    let current: string | null = null;
    for (let i = 0; i < markdown.length; i++) {
        const ch = markdown[i];
        if (ch === "\\" && i + 1 < markdown.length) {
            const pair = ch + markdown[i + 1];
            if (current == null) {
                text += markdown[i + 1] === "$" ? "$" : pair;
            } else {
                current += pair;
            }
            i++;
        } else if (ch === "$") {
            if (current == null) {
                current = "";
            } else {
                if (current.trim() !== "") {
                    math.push(current.trim());
                }
                current = null;
                text += " ";
            }
        } else if (current == null) {
            text += ch;
        } else {
            current += ch;
        }
    }
    // An unclosed `$` is text after all.
    if (current != null) {
        text += "$" + current;
    }
    return {text, math};
}

function collectContent(content: string, into: Collector): void {
    const withoutImages = content.replace(
        MARKDOWN_IMAGE,
        (_match, alt: string, url: string) => {
            into.imageCount++;
            if (url.startsWith("web+graphie://")) {
                into.hasGraphie = true;
            }
            return ` ${alt} `;
        },
    );
    const {text, math} = splitMath(withoutImages.replace(PLACEHOLDER, " "));
    for (const tex of math) {
        into.math.add(tex);
    }
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned !== "") {
        into.text.push(cleaned);
    }
}

function collectOptionValue(
    value: unknown,
    path: string,
    insideArray: boolean,
    into: Collector,
): void {
    if (typeof value === "string") {
        if (value.startsWith("web+graphie://")) {
            into.hasGraphie = true;
        }
        if (value.trim() === "" || URL.test(value)) {
            return;
        }
        if (PROP_VALUE.test(value)) {
            into.widgetProps.add(`${path}=${value}`);
        } else {
            const {text, math} = splitMath(value.replace(PLACEHOLDER, " "));
            for (const tex of math) {
                into.math.add(tex);
            }
            const cleaned = text.replace(/\s+/g, " ").trim();
            if (cleaned !== "") {
                into.widgetText.add(cleaned);
            }
        }
    } else if (typeof value === "boolean") {
        into.widgetProps.add(`${path}=${value}`);
    } else if (typeof value === "number") {
        // Numbers in arrays are coordinates, ranges and the like: too many
        // values to count by.
        if (!insideArray) {
            into.widgetProps.add(`${path}=${value}`);
        }
    } else if (Array.isArray(value)) {
        for (const element of value) {
            collectOptionValue(element, path, true, into);
        }
    } else if (value != null && typeof value === "object") {
        // A nested renderer's content and widgets are visited by traverse,
        // as content and as widgets of their own; its images are sizes.
        // (A radio choice's `content` is the choice's text, so it's kept.)
        const isRenderer = "content" in value && "widgets" in value;
        for (const [key, child] of Object.entries(value)) {
            if (
                (isRenderer &&
                    (key === "content" ||
                        key === "widgets" ||
                        key === "images")) ||
                // Ids, such as a radio choice's, are unique: no use to
                // search or count by.
                key === "id"
            ) {
                continue;
            }
            collectOptionValue(child, `${path}.${key}`, insideArray, into);
        }
    }
}

function collectRenderer(renderer: PerseusRenderer, into: Collector): void {
    traverse(
        renderer,
        (content: unknown) => {
            if (typeof content === "string") {
                collectContent(content, into);
            }
        },
        (widget: {type: string; static?: boolean; options?: unknown}) => {
            into.widgetCount++;
            into.widgetTypes.add(widget.type);
            if (widget.type === "image") {
                into.imageCount++;
            }
            if (widget.static === true) {
                into.widgetProps.add(`${widget.type}.static=true`);
            }
            collectOptionValue(widget.options, widget.type, false, into);
        },
    );
}

function fieldsOf(
    main: Collector,
    hints: Collector | null,
    hintCount: number,
): Omit<ContentFields, "firstLine"> {
    const all = hints == null ? [main] : [main, hints];
    const union = (pick: (c: Collector) => Set<string>) => [
        ...new Set(all.flatMap((c) => [...pick(c)])),
    ];
    return {
        text: main.text.join("\n"),
        hintText: hints?.text.join("\n") ?? "",
        math: union((c) => c.math),
        widgetText: union((c) => c.widgetText),
        widgetTypes: union((c) => c.widgetTypes).sort(),
        widgetProps: union((c) => c.widgetProps)
            .sort()
            .slice(0, MAX_PROPS),
        widgetCount: all.reduce((n, c) => n + c.widgetCount, 0),
        hintCount,
        imageCount: all.reduce((n, c) => n + c.imageCount, 0),
        hasGraphie: all.some((c) => c.hasGraphie),
    };
}

/** The searchable fields of an item: its question, then its hints. */
export function itemContentFields(item: PerseusItem): ContentFields {
    const question = newCollector();
    collectRenderer(item.question, question);
    const hints = newCollector();
    for (const hint of item.hints) {
        collectRenderer(hint, hints);
    }
    return {
        ...fieldsOf(question, hints, item.hints.length),
        firstLine: firstLineOf(item.question.content),
    };
}

/** The searchable fields of an article: all its sections. */
export function articleContentFields(
    sections: ReadonlyArray<PerseusRenderer>,
): ContentFields {
    const article = newCollector();
    for (const section of sections) {
        collectRenderer(section, article);
    }
    return {
        ...fieldsOf(article, null, 0),
        firstLine: firstLineOf(sections[0]?.content ?? ""),
    };
}
