import Rule from "../rule";

// These are 3-letter and longer words that we would not expect to be
// capitalized even in a title-case heading.  See
// http://blog.apastyle.org/apastyle/2012/03/title-case-and-sentence-case-capitalization-in-apa-style.html
const littleWords = {
    and: true,
    nor: true,
    but: true,
    the: true,
    for: true,
} as const;

function isCapitalized(word: any) {
    const c = word[0];
    return c === c.toUpperCase();
}

export default Rule.makeRule({
    name: "heading-title-case",
    severity: Rule.Severity.GUIDELINE,
    selector: "heading",
    pattern: /[^\s:]\s+[A-Z]+[a-z]/,
    locale: "en",
    lint: function (state, content, nodes, match) {
        // We want to assert that heading text is in sentence case, not
        // title case. The pattern above requires a capital letter at the
        // start of the heading and allows them after a colon, or in
        // acronyms that are all capitalized.
        //
        // But we can't warn just because the pattern matched because
        // proper nouns are also allowed bo be capitalized. We're not
        // going to do dictionary lookup to check for proper nouns, so
        // we try a heuristic: if the title is more than 3 words long
        // and if all the words are capitalized or are on the list of
        // words that don't get capitalized, then we'll assume that
        // the heading is incorrectly in title case and will warn.
        // But if there is at least one non-capitalized long word then
        // we're not in title case and we should not warn.

        const heading = content.trim();
        let words = heading.split(/\s+/);

        // Remove the first word and the little words
        words.shift();
        words = words.filter(
            // eslint-disable-next-line no-prototype-builtins
            (w) => w.length > 2 && !littleWords.hasOwnProperty(w),
        );

        // If there are at least 3 remaining words and all
        // are capitalized, then the heading is in title case.
        if (words.length >= 3 && words.every((w) => isCapitalized(w))) {
            return `Title-case heading:
This heading appears to be in title-case, but should be sentence-case.
Only capitalize the first letter and proper nouns.`;
        }
    },
}) as Rule;
