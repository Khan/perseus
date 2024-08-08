import Rule from "../rule";

export default Rule.makeRule({
    name: "math-align-linebreaks",
    severity: Rule.Severity.WARNING,
    selector: "blockMath",
    // Match any align block with double backslashes in it
    // Use [\s\S]* instead of .* so we match newlines as well.
    pattern: /\\begin{align}[\s\S]*\\\\[\s\S]+\\end{align}/,
    // Look for double backslashes and ensure that they are
    // followed by optional space and another pair of backslashes.
    // Note that this rule can't know where line breaks belong so
    // it can't tell whether backslashes are completely missing. It just
    // enforces that you don't have the wrong number of pairs of backslashes.
    lint: function (state, content, nodes, match) {
        let text = match[0];
        while (text.length) {
            const index = text.indexOf("\\\\");
            if (index === -1) {
                // No more backslash pairs, so we found no lint
                return;
            }
            text = text.substring(index + 2);

            // Now we expect to find optional spaces, another pair of
            // backslashes, and more optional spaces not followed immediately
            // by another pair of backslashes.
            const nextpair = text.match(/^\s*\\\\\s*(?!\\\\)/);

            // If that does not match then we either have too few or too
            // many pairs of backslashes.
            if (!nextpair) {
                return "Use four backslashes between lines of an align block";
            }

            // If it did match, then, shorten the string and continue looping
            // (because a single align block may have multiple lines that
            // all must be separated by two sets of double backslashes).
            text = text.substring(nextpair[0].length);
        }
    },
}) as Rule;
