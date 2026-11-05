/**
 * Content guidelines: a Markdown document an organization keeps (style,
 * hints, accessibility), read from a local file so its text needn't be in
 * this repository. Its headings divide it into sections, so an agent can
 * read the section a task needs instead of the whole document.
 */

export type GuidelineSection = {
    /** The heading's text, without its `#`s. */
    heading: string;
    level: number;
    /** The section's text, its heading included, up to the next heading. */
    text: string;
};

const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

/**
 * Splits a document into sections at its headings. Text before the first
 * heading is a section with an empty heading.
 */
export function splitSections(markdown: string): GuidelineSection[] {
    const sections: GuidelineSection[] = [];
    let current: GuidelineSection = {heading: "", level: 0, text: ""};
    let inFence = false;
    for (const line of markdown.split("\n")) {
        if (line.trimStart().startsWith("```")) {
            inFence = !inFence;
        }
        const match = inFence ? null : HEADING.exec(line);
        if (match != null) {
            if (current.text.trim() !== "") {
                sections.push(current);
            }
            current = {heading: match[2], level: match[1].length, text: ""};
        }
        current.text += `${line}\n`;
    }
    if (current.text.trim() !== "") {
        sections.push(current);
    }
    return sections.map((section) => ({
        ...section,
        text: section.text.trimEnd(),
    }));
}

/**
 * The sections whose headings contain `query` (any case), each with the
 * sections under it.
 */
export function findSections(
    sections: ReadonlyArray<GuidelineSection>,
    query: string,
): GuidelineSection[] {
    const wanted = query.toLowerCase();
    const found: GuidelineSection[] = [];
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section.heading.toLowerCase().includes(wanted)) {
            continue;
        }
        let text = section.text;
        let j = i + 1;
        while (j < sections.length && sections[j].level > section.level) {
            text += `\n\n${sections[j].text}`;
            j++;
        }
        found.push({...section, text});
        i = j - 1;
    }
    return found;
}

/**
 * One guidelines document of several, each on its own subject (TeX, math
 * content, writing in general), so an agent reads the ones its task needs.
 * Its frontmatter says what it covers and when to read it.
 */
export type GuidelineTopic = {
    /** The file's name without `.md`, which get_guidelines takes. */
    topic: string;
    title: string;
    /** What the document covers, in a sentence. */
    summary: string;
    /** The tasks it's for, so an agent can tell whether to read it. */
    readWhen: string;
    /** Topics to read with this one, such as the more general ones. */
    seeAlso: string[];
    /** The document, without its frontmatter. */
    text: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Reads a topic's document: `---`-fenced frontmatter of `key: value` lines
 * (`seeAlso` as `[a, b]`), then Markdown. A document without frontmatter is
 * a topic titled by its name.
 */
export function parseTopic(topic: string, markdown: string): GuidelineTopic {
    const match = FRONTMATTER.exec(markdown);
    const fields = new Map<string, string>();
    for (const line of match?.[1].split(/\r?\n/) ?? []) {
        const colon = line.indexOf(":");
        if (colon > 0) {
            fields.set(
                line.slice(0, colon).trim(),
                unquote(line.slice(colon + 1).trim()),
            );
        }
    }
    const seeAlso = fields.get("seeAlso") ?? "";
    return {
        topic,
        title: fields.get("title") || topic,
        summary: fields.get("summary") ?? "",
        readWhen: fields.get("readWhen") ?? "",
        seeAlso: seeAlso
            .replace(/^\[|\]$/g, "")
            .split(",")
            .map((name) => unquote(name.trim()))
            .filter((name) => name !== ""),
        text: (match == null
            ? markdown
            : markdown.slice(match[0].length)
        ).trim(),
    };
}

function unquote(value: string): string {
    return /^(["']).*\1$/.test(value) ? value.slice(1, -1) : value;
}
