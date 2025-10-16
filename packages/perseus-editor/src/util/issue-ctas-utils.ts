import {PerseusMarkdown, Util} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    type PerseusRenderer,
    type PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

// Match image markdown syntax: ![alt text](url)
const IMAGE_MARKDOWN_REGEX = /!\[[^\]]*\]\([^)]+\)/g;

type IssueCta = {
    label: string;
    onClick: () => void;
};

// Exported for testing
/**
 * Based on the given widgets within a question, return the first available
 * index for a specified widget type.
 *
 * Example: If the question has two image widgets named "image 1" and "image 3",
 * the next available index for an image widget would be 2, for "image 2".
 *
 * @param widgetType - The type of the widget to get the index for. (e.g. "image", "radio", etc.)
 * @param widgets - The question's `widgets` to search through.
 * @returns The first available index for the given widget type, starting from 1.
 */
export function getFirstAvailableWidgetIndex(
    widgetType: string,
    widgets: PerseusWidgetsMap,
): number {
    const widgetNames = Object.keys(widgets);

    for (let i = 1; i <= widgetNames.length + 1; i++) {
        if (!widgetNames.includes(`${widgetType} ${i}`)) {
            return i;
        }
    }

    return 1;
}

/**
 * Convert all image markdown in a question to image widgets.
 *
 * This function uses regex to find image markdown, then replaces it with an
 * image widget. It does not use PerseusMarkdown to parse the content for image
 * markdown, because PerseusMarkdown doesn't have a node-to-text converter. We'd
 * have to manually process the tree to convert every single other markdown syntax
 * type back to its text content form.
 *
 * @param question - The question being parsed for image markdown.
 * @param onEditorChange - The function to update the editor's content.
 */
export async function convertImageMarkdownToImageWidget(
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
) {
    const {content, widgets} = question;
    const newWidgets = {...widgets};

    // Find all image markdown matches
    const matches = Array.from(content.matchAll(IMAGE_MARKDOWN_REGEX));

    if (matches.length === 0) {
        return; // No image markdown to convert
    }

    // Process each match sequentially to ensure unique widget indices
    const replacements: Array<{original: string; replacement: string}> = [];
    for (const match of matches) {
        const imageIndex = getFirstAvailableWidgetIndex("image", newWidgets);
        const imageNode = PerseusMarkdown.parse(match[0], {});
        const imageUrl = imageNode[0].content[0].target;
        const imageAlt = imageNode[0].content[0].alt;

        const imageSize = await Util.getImageSizeModern(imageUrl);

        newWidgets[`image ${imageIndex}`] = generateImageWidget({
            options: generateImageOptions({
                backgroundImage: {
                    url: imageUrl,
                    width: imageSize[0],
                    height: imageSize[1],
                },
                alt: imageAlt,
            }),
        });

        replacements.push({
            original: match[0],
            replacement: `[[☃ image ${imageIndex}]]`,
        });
    }

    // Replace all matches in the content
    let newContent = content;
    for (const {original, replacement} of replacements) {
        newContent = newContent.replace(original, replacement);
    }

    onEditorChange({
        content: newContent,
        widgets: newWidgets,
    });
}

/**
 * Based on the given issue id, return the appropriate CTA for the issue.
 * Example: If the issue id is "image-markdown", return the CTA to convert all
 * image markdown to image widgets.
 *
 * @param issueId - The id of the issue to get the CTA for.
 * @param question - The question being parsed for the issue.
 * @param onEditorChange - The function to update the editor's content.
 * @returns the `label` for the button text and the `onClick` function to call
 *          when the button is clicked. Returns `null` if no CTA is found for
 *          the given issue id.
 */
export function getCtaForIssueId(
    issueId: string,
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
): IssueCta | null {
    switch (issueId) {
        case "image-markdown":
            return {
                label: "Convert all image markdown to widget",
                onClick: () =>
                    convertImageMarkdownToImageWidget(question, onEditorChange),
            };
        // Add more cases here as we develop more CTAs for issues.
        default:
            return null;
    }
}
