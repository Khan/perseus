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

function getFirstAvailableWidgetIndex(
    widgetType: string,
    widgets: PerseusWidgetsMap,
): number {
    const widgetNames = Object.keys(widgets ?? {});

    for (let i = 1; i <= 1000; i++) {
        if (!widgetNames.includes(`${widgetType} ${i}`)) {
            return i;
        }
    }

    return 1;
}

// Use regex to find image markdown, then replace it with image widget.
//
// NOTE: Not using PerseusMarkdown to parse the content for image markdown,
// because PerseusMarkdown doesn't have a node-to-text converter. We'd have
// to manually process the tree to convert every single other markdown syntax
// type back to its text content form.
export async function convertImageMarkdownToImageWidget(
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
) {
    const {content, widgets = {}} = question;
    const newWidgets = {...widgets};

    // Find all image markdown matches
    const matches = Array.from(content.matchAll(IMAGE_MARKDOWN_REGEX));

    if (matches.length === 0) {
        return; // No image markdown to convert
    }

    // Process each match to get the replacement data
    const replacements = await Promise.all(
        matches.map(async (match) => {
            const imageIndex = getFirstAvailableWidgetIndex(
                "image",
                newWidgets,
            );
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

            return {
                original: match[0],
                replacement: `[[☃ image ${imageIndex}]]`,
            };
        }),
    );

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

export function getAllCtasMap(
    question: PerseusRenderer,
    onEditorChange: (newProps: any) => void,
): Record<string, IssueCta> {
    return {
        "image-markdown": {
            label: "Convert all image markdown to image widget",
            onClick: () =>
                convertImageMarkdownToImageWidget(question, onEditorChange),
        },
    };
}
