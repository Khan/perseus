// The image-description rules code can check, for validate_item. The
// linter already checks that a non-decorative image widget has alt text of 8
// to 125 characters and that a Markdown image has some; these are the
// rules of style it doesn't, from the content guidelines' image-descriptions
// topic. Judging what a description says is review_item's.
import type {Issue} from "./validate";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

/** An image's description and where it is, for checking. */
type Description = {
    path: string;
    text: string;
    field: "alt" | "longDescription";
};

const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(/g;
// An en or em dash, two hyphens, or a hyphen between spaces: a dash. A
// hyphen inside a word ("two-digit") isn't one.
const DASH = /[–—]|--|\s-\s/;
const AXIS_HYPHEN = /\b[xyz]-axis\b/i;
// "The diagram shows…": the opening the guidelines rule out, since a screen
// reader has already said it's an image.
const OPENING =
    /^\s*(the|this|an?)\s+(diagram|image|picture|figure|illustration)\s+(shows|uses|depicts|illustrates|is of|of)\b/i;

/** The descriptions of a renderer's images: widgets and Markdown images. */
function descriptionsOf(
    renderer: PerseusRenderer,
    path: string,
): Description[] {
    const found: Description[] = [];
    for (const [id, widget] of Object.entries(renderer.widgets ?? {})) {
        if (widget?.type !== "image" || widget.options.decorative === true) {
            continue;
        }
        const widgetPath = `${path}.widgets["${id}"].options`;
        if (widget.options.alt != null && widget.options.alt !== "") {
            found.push({
                path: `${widgetPath}.alt`,
                text: widget.options.alt,
                field: "alt",
            });
        }
        const long = widget.options.longDescription;
        if (long != null && long !== "") {
            found.push({
                path: `${widgetPath}.longDescription`,
                text: long,
                field: "longDescription",
            });
        }
    }
    for (const match of renderer.content.matchAll(MARKDOWN_IMAGE)) {
        if (match[1] !== "") {
            found.push({path: `${path}.content`, text: match[1], field: "alt"});
        }
    }
    return found;
}

/**
 * Style issues in a renderer's image descriptions: dashes in alt text, "x-axis"
 * for "x axis", and an opening such as "The diagram shows".
 */
export function altTextIssues(
    renderer: PerseusRenderer,
    path: string,
): Issue[] {
    const issues: Issue[] = [];
    for (const {path: where, text, field} of descriptionsOf(renderer, path)) {
        // Long descriptions are Markdown, whose list items start with "- ".
        if (field === "alt" && DASH.test(text)) {
            issues.push({
                severity: "warning",
                code: "alt-text-dash",
                path: where,
                message:
                    "Alt text shouldn't use dashes (a screen reader may skip " +
                    "or misread them): use a comma, a period or words.",
            });
        }
        if (AXIS_HYPHEN.test(text)) {
            issues.push({
                severity: "warning",
                code: "alt-text-axis-hyphen",
                path: where,
                message: `Write "x axis" (no hyphen), not "${AXIS_HYPHEN.exec(text)?.[0]}".`,
            });
        }
        if (OPENING.test(text)) {
            issues.push({
                severity: "warning",
                code: "alt-text-opening",
                path: where,
                message:
                    `Don't open with "${OPENING.exec(text)?.[0].trim()}": a ` +
                    "screen reader has already said it's an image. Start " +
                    "with what it shows.",
            });
        }
    }
    return issues;
}
