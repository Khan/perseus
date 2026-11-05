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
